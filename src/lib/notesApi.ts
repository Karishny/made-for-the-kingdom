// Client layer for the shared notes backend. Notes live in a Supabase database
// (see supabase/migrations/0001_init.sql) so they are genuinely shared: any
// authenticated user reads and writes the same store, across devices, and
// nothing depends on the browser's localStorage.
//
// The public StudyNote/StudyReply shapes and the noteType helpers are kept
// identical to what the components already use, so the Notes UI did not need a
// rewrite — only this layer changed from the old per-browser mock to Supabase.
import { supabase } from "@/lib/supabase"

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

export type NewNote = Omit<StudyNote, "id" | "createdAt">

// Canonical note categories. Kept in one place so the compose form, the
// filters, and the card badges always stay in sync across the whole site.
export const NOTE_TYPES = [
  "Question",
  "Verse",
  "Complementary Verse",
  "Insight",
  "Reflection",
  "Prayer",
  "Group Discussion",
] as const

export const FALLBACK_NOTE_TYPE = "Study Note"

// Calm, muted palette for each note category. The type is the first thing a
// reader sees, so each category gets a recognisable accent.
const NOTE_TYPE_COLORS: Record<string, string> = {
  Question: "#a85b31",
  Verse: "#cfac29",
  "Complementary Verse": "#927f9b",
  Insight: "#949b61",
  Reflection: "#c57c89",
  Prayer: "#763f21",
  "Group Discussion": "#454930",
  "Study Note": "#2e2d2a",
}

export function noteTypeLabel(type?: string): string {
  return type && type.trim() ? type.trim() : FALLBACK_NOTE_TYPE
}

export function noteTypeColor(type?: string): string {
  return (
    NOTE_TYPE_COLORS[noteTypeLabel(type)] ??
    NOTE_TYPE_COLORS[FALLBACK_NOTE_TYPE]
  )
}

// Distinct failure kinds so callers can decide whether to surface a message.
export class NotesUnavailableError extends Error {
  constructor() {
    super("Study notes are not available yet (Supabase is not configured)")
    this.name = "NotesUnavailableError"
  }
}

// Raised when a signed-out client tries to read notes. Row Level Security would
// silently return nothing, so we make the state explicit instead.
export class NotesAuthError extends Error {
  constructor() {
    super("You need to be signed in to view study notes")
    this.name = "NotesAuthError"
  }
}

function client() {
  if (!supabase) throw new NotesUnavailableError()
  return supabase
}

function displayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// ─── Row ↔ app-shape mapping (DB column names → the StudyNote/StudyReply the UI uses) ───

interface ReplyRow {
  id: string
  user_id: string
  author_name: string
  author_color: string
  author_initials: string
  body: string
  date: string | null
  created_at: string
}

interface NoteRow {
  id: string
  user_id: string
  author_name: string
  author_color: string
  author_initials: string
  study: string
  part: number | null
  week: number | null
  chapter: number | null
  note_type: string
  scripture: string | null
  title: string
  body: string
  date: string | null
  tag: string
  created_at: string
  updated_at: string
  replies?: ReplyRow[] | null
}

function toReply(r: ReplyRow): StudyReply {
  return {
    id: r.id,
    createdAt: r.created_at,
    authorId: r.user_id,
    authorName: r.author_name,
    authorColor: r.author_color,
    authorInitials: r.author_initials,
    body: r.body,
    date: r.date ?? "",
  }
}

function toNote(n: NoteRow): StudyNote {
  return {
    id: n.id,
    createdAt: n.created_at,
    authorId: n.user_id,
    authorName: n.author_name,
    authorColor: n.author_color,
    authorInitials: n.author_initials,
    study: n.study,
    part: n.part ?? undefined,
    week: n.week ?? undefined,
    chapter: n.chapter ?? undefined,
    scripture: n.scripture ?? "",
    title: n.title,
    body: n.body,
    date: n.date ?? "",
    tag: n.tag,
    noteType: n.note_type,
    replies: (n.replies ?? []).map(toReply),
  }
}

// ─── Notes API ───

export async function listNotes(): Promise<StudyNote[]> {
  const { data, error } = await client()
    .from("notes")
    .select("*, replies(*)")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []).map(toNote)
}

export async function createNote(note: NewNote): Promise<StudyNote> {
  const { data, error } = await client()
    .from("notes")
    .insert({
      user_id: note.authorId,
      author_name: note.authorName,
      author_color: note.authorColor || "#a85b31",
      author_initials:
        note.authorInitials || note.authorName.slice(0, 2).toUpperCase(),
      study: note.study || "Isaiah",
      part: note.part ?? null,
      week: note.week ?? null,
      chapter: note.chapter ?? null,
      note_type: note.noteType || "Study Note",
      scripture:
        note.scripture || (note.chapter ? `Isaiah ${note.chapter}` : "Isaiah"),
      title: note.title || "Untitled Note",
      body: note.body,
      date: note.date || displayDate(),
      tag: note.tag || "Study Note",
    })
    .select("*, replies(*)")
    .single()
  if (error) throw error
  return toNote(data)
}

// Owner-only edit. Row Level Security rejects updates to other users' notes.
export async function updateNote(
  id: string,
  patch: Partial<Pick<StudyNote, "title" | "body" | "tag" | "noteType" | "scripture">>,
): Promise<void> {
  const updates: Record<string, string> = {}
  if (patch.title !== undefined) updates.title = patch.title
  if (patch.body !== undefined) updates.body = patch.body
  if (patch.tag !== undefined) updates.tag = patch.tag
  if (patch.noteType !== undefined) updates.note_type = patch.noteType
  if (patch.scripture !== undefined) updates.scripture = patch.scripture
  const { error } = await client().from("notes").update(updates).eq("id", id)
  if (error) throw error
}

export async function addReply(
  noteId: string,
  reply: Omit<StudyReply, "id" | "createdAt">,
): Promise<StudyReply> {
  const { data, error } = await client()
    .from("replies")
    .insert({
      note_id: noteId,
      user_id: reply.authorId,
      author_name: reply.authorName,
      author_color: reply.authorColor || "#a85b31",
      author_initials:
        reply.authorInitials || reply.authorName.slice(0, 2).toUpperCase(),
      body: reply.body,
      date: reply.date || displayDate(),
    })
    .select()
    .single()
  if (error) throw error
  return toReply(data)
}

// Owner-only delete. Row Level Security rejects deletes of other users' notes.
export async function removeNote(id: string): Promise<void> {
  const { error } = await client().from("notes").delete().eq("id", id)
  if (error) throw error
}

// ─── Realtime ───
// Subscribes to note + reply changes and calls onNotesChanged() so the UI can
// refetch. Refetch-on-event is deliberately simple and reliable: it can never
// drift out of sync with the database, even when multiple events arrive at once.
export function subscribeNotes(onNotesChanged: () => void): () => void {
  const client = supabase
  if (!client) return () => {}
  const channel = client
    .channel("mftk-notes-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notes" },
      () => onNotesChanged(),
    )
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "replies" },
      () => onNotesChanged(),
    )
    .subscribe()
  return () => {
    void client.removeChannel(channel)
  }
}
