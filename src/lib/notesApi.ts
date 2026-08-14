// Client layer for the shared notes API. Notes are stored server-side so every
// user reads and writes the same community notes. Components import these
// helpers rather than touching localStorage directly.

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

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`Notes request failed (${res.status})`)
  return res.json() as Promise<T>
}

export function listNotes(): Promise<StudyNote[]> {
  return request<StudyNote[]>(API)
}

export function createNote(note: NewNote): Promise<StudyNote> {
  return request<StudyNote>(API, { method: 'POST', body: JSON.stringify(note) })
}

export function addReply(noteId: string, reply: Omit<StudyReply, 'id' | 'createdAt'>): Promise<StudyReply> {
  return request<StudyReply>(`${API}/${encodeURIComponent(noteId)}/replies`, {
    method: 'POST',
    body: JSON.stringify(reply),
  })
}

export function removeNote(id: string): Promise<void> {
  return request<{ ok: boolean }>(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE' }).then(() => undefined)
}
