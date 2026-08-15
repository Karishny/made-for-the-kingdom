// Client layer for the shared notes API. Notes are normally stored server-side
// (see server/notes.ts) so every user reads and writes the same community notes.
// Components import these helpers rather than touching localStorage directly.
//
// The dev server exposes /api/notes, but deployed builds are purely static — the
// API simply does not exist there (requests 404 or come back as the SPA HTML).
// To keep saving working everywhere, each call tries the server first and, only
// when the failure is an infrastructure problem (no network, 404, 5xx, or a
// non-JSON response) rather than a validation error, transparently falls back to
// a localStorage mirror of the same community notes. Validation errors (HTTP 400)
// are always surfaced to the caller.

export interface StudyReply {
  id: string
  createdAt?: string
  authorId: string
  authorName: string
  authorColor: string
  authorInitials: string
  body: string
  date: string
}

export interface StudyNote {
  id: string
  createdAt?: string
  authorId: string
  authorName: string
  authorColor: string
  authorInitials: string
  study?: string
  part?: number
  week?: number
  chapter?: number
  scripture: string
  title: string
  body: string
  date: string
  tag: string
  noteType?: string
  replies?: StudyReply[]
}

export type NewNote = Omit<StudyNote, 'id' | 'createdAt'>

// Canonical note categories. Kept in one place so the compose form, the
// filters, and the card badges always stay in sync across the whole site.
export const NOTE_TYPES = [
  'Question',
  'Verse',
  'Complementary Verse',
  'Insight',
  'Reflection',
  'Prayer',
  'Group Discussion',
] as const

export const FALLBACK_NOTE_TYPE = 'Study Note'

// Calm, muted palette for each note category. The type is the first thing a
// reader sees, so each category gets a recognisable accent.
const NOTE_TYPE_COLORS: Record<string, string> = {
  Question: '#a85b31',
  Verse: '#cfac29',
  'Complementary Verse': '#927f9b',
  Insight: '#949b61',
  Reflection: '#c57c89',
  Prayer: '#763f21',
  'Group Discussion': '#454930',
  'Study Note': '#2e2d2a',
}

export function noteTypeLabel(type?: string): string {
  return type && type.trim() ? type.trim() : FALLBACK_NOTE_TYPE
}

export function noteTypeColor(type?: string): string {
  return NOTE_TYPE_COLORS[noteTypeLabel(type)] ?? NOTE_TYPE_COLORS[FALLBACK_NOTE_TYPE]
}

const API = '/api/notes'

// Local mirror used when the app runs as a static build with no notes server.
// Same store shape as the server's data/notes.json, so the two are interchangeable.
const MIRROR_KEY = 'mftk_notes_mirror_v1'

class NotesRequestError extends Error {
  status: number
  constructor(status: number) {
    super(`Notes request failed (${status})`)
    this.status = status
  }
}

class NotesNetworkError extends Error {
  status = 0
  constructor() {
    super('Notes request failed (network)')
  }
}

class NotesParseError extends Error {
  status = 0
  constructor() {
    super('Notes request returned a non-JSON response')
  }
}

// Infrastructure failures are the ones we can recover from by using the local
// mirror. A 400 is the server actively rejecting the note and must be rethrown.
function isInfraFailure(err: unknown): boolean {
  if (err instanceof NotesNetworkError || err instanceof NotesParseError) return true
  if (err instanceof NotesRequestError) return err.status === 404 || err.status >= 500
  return false
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...init,
    })
  } catch {
    throw new NotesNetworkError()
  }
  if (!res.ok) throw new NotesRequestError(res.status)
  try {
    return (await res.json()) as T
  } catch {
    throw new NotesParseError()
  }
}

// ─── Local mirror helpers ───
// Keep the exact same StoredNote/StoredReply shapes the server produces, sorted
// newest-first like the server's GET response.

function loadMirror(): StudyNote[] {
  try {
    const raw = localStorage.getItem(MIRROR_KEY)
    const parsed = raw ? (JSON.parse(raw) as unknown) : null
    return Array.isArray(parsed) ? (parsed as StudyNote[]) : []
  } catch {
    return []
  }
}

function saveMirror(notes: StudyNote[]) {
  const sorted = [...notes].sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? '') * -1)
  try {
    localStorage.setItem(MIRROR_KEY, JSON.stringify(sorted))
  } catch {
    /* ignore */
  }
}

function localId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `note_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

function localReply(r: Omit<StudyReply, 'id' | 'createdAt'>): StudyReply {
  return {
    id: localId(),
    createdAt: new Date().toISOString(),
    authorId: r.authorId,
    authorName: r.authorName,
    authorColor: r.authorColor || '#a85b31',
    authorInitials: r.authorInitials || r.authorName.slice(0, 2).toUpperCase(),
    body: r.body,
    date: r.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

function localNote(note: NewNote): StudyNote {
  const created: StudyNote = {
    id: localId(),
    createdAt: new Date().toISOString(),
    authorId: note.authorId,
    authorName: note.authorName,
    authorColor: note.authorColor || '#a85b31',
    authorInitials: note.authorInitials || note.authorName.slice(0, 2).toUpperCase(),
    study: note.study || 'Isaiah',
    part: note.part,
    week: note.week,
    chapter: note.chapter,
    scripture: note.scripture || (note.chapter ? `Isaiah ${note.chapter}` : 'Isaiah'),
    title: note.title || 'Untitled Note',
    body: note.body,
    date: note.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    tag: note.tag || 'Study Note',
    noteType: note.noteType || 'Study Note',
    replies: [],
  }
  const mirror = loadMirror()
  mirror.unshift(created)
  saveMirror(mirror)
  return created
}

export async function listNotes(): Promise<StudyNote[]> {
  try {
    return await request<StudyNote[]>(API)
  } catch (err) {
    if (isInfraFailure(err)) return loadMirror()
    throw err
  }
}

export async function createNote(note: NewNote): Promise<StudyNote> {
  try {
    return await request<StudyNote>(API, { method: 'POST', body: JSON.stringify(note) })
  } catch (err) {
    if (isInfraFailure(err)) return localNote(note)
    throw err
  }
}

export async function addReply(noteId: string, reply: Omit<StudyReply, 'id' | 'createdAt'>): Promise<StudyReply> {
  try {
    return await request<StudyReply>(`${API}/${encodeURIComponent(noteId)}/replies`, {
      method: 'POST',
      body: JSON.stringify(reply),
    })
  } catch (err) {
    if (isInfraFailure(err)) {
      const mirror = loadMirror()
      const note = mirror.find((n) => n.id === noteId)
      if (!note) throw new Error('Note not found')
      const created = localReply(reply)
      note.replies = [...(note.replies ?? []), created]
      saveMirror(mirror)
      return created
    }
    throw err
  }
}

export async function removeNote(id: string): Promise<void> {
  try {
    await request<{ ok: boolean }>(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE' })
  } catch (err) {
    if (isInfraFailure(err)) {
      saveMirror(loadMirror().filter((n) => n.id !== id))
      return
    }
    throw err
  }
}
