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

export interface ComplementaryVerse {
  id: string
  noteId: string
  book: string
  chapter: number
  verse?: number
  sortOrder: number
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
  complementaryBook?: string
  complementaryChapter?: number
  complementaryVerse?: number
  complementaryVerses?: ComplementaryVerse[]
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

// YouVersion / Bible App link generator. Turns a free-text scripture reference
// (e.g. "2 Kings 15:5") into a Bible.com search URL that opens the passage.
// Uses ESV (version_id 59) as default; the search resolves the reference.
export function youVersionUrl(scripture: string): string | null {
  const ref = scripture.trim()
  if (!ref) return null
  return `https://www.bible.com/search/bible?q=${encodeURIComponent(ref)}&version_id=59`
}

// Bible.com ESV book abbreviations. Maps display names to Bible.com URL slugs.
const BIBLE_COM_BOOKS: Record<string, string> = {
  'Genesis': 'GEN', 'Exodus': 'EXO', 'Leviticus': 'LEV', 'Numbers': 'NUM',
  'Deuteronomy': 'DEU', 'Joshua': 'JOS', 'Judges': 'JDG', 'Ruth': 'RUT',
  '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI', '2 Kings': '2KI',
  '1 Chronicles': '1CH', '2 Chronicles': '2CH', 'Ezra': 'EZR', 'Nehemiah': 'NEH',
  'Esther': 'EST', 'Job': 'JOB', 'Psalms': 'PSA', 'Psalm': 'PSA',
  'Proverbs': 'PRO', 'Ecclesiastes': 'ECC', 'Song of Solomon': 'SNG',
  'Isaiah': 'ISA', 'Jeremiah': 'JER', 'Lamentations': 'LAM', 'Ezekiel': 'EZK',
  'Daniel': 'DAN', 'Hosea': 'HOS', 'Joel': 'JOE', 'Amos': 'AMO',
  'Obadiah': 'OBA', 'Jonah': 'JON', 'Micah': 'MIC', 'Nahum': 'NAM',
  'Habakkuk': 'HAB', 'Zephaniah': 'ZEP', 'Haggai': 'HAG', 'Zechariah': 'ZEC',
  'Malachi': 'MAL', 'Matthew': 'MAT', 'Mark': 'MRK', 'Luke': 'LUK',
  'John': 'JHN', 'Acts': 'ACT', 'Romans': 'ROM', '1 Corinthians': '1CO',
  '2 Corinthians': '2CO', 'Galatians': 'GAL', 'Ephesians': 'EPH',
  'Philippians': 'PHP', 'Colossians': 'COL', '1 Thessalonians': '1TH',
  '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI',
  'Titus': 'TIT', 'Philemon': 'PHM', 'Hebrews': 'HEB', 'James': 'JAS',
  '1 Peter': '1PE', '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN',
  '3 John': '3JN', 'Jude': 'JUD', 'Revelation': 'REV',
}

// ESV direct link generator using Bible.com. Given a structured book/chapter/verse,
// builds a Bible.com passage link with ESV translation (version 59).
export function esvBibleUrl(book: string, chapter: number, verse?: number): string | null {
  const b = book?.trim()
  if (!b || !chapter) return null
  const slug = BIBLE_COM_BOOKS[b] ?? b.replace(/\s+/g, '').toUpperCase()
  const ref = verse ? `${slug}.${chapter}.${verse}` : `${slug}.${chapter}`
  return `https://www.bible.com/bible/59/${ref}`
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
  complementary_book: string | null
  complementary_chapter: number | null
  complementary_verse: number | null
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

interface CvRow {
  id: string
  note_id: string
  book: string
  chapter: number
  verse: number | null
  sort_order: number
  created_at: string
}

function toCv(r: CvRow): ComplementaryVerse {
  return {
    id: r.id,
    noteId: r.note_id,
    book: r.book,
    chapter: r.chapter,
    verse: r.verse ?? undefined,
    sortOrder: r.sort_order,
  }
}

function toNote(n: NoteRow, cvs?: CvRow[] | null): StudyNote {
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
    complementaryBook: n.complementary_book ?? undefined,
    complementaryChapter: n.complementary_chapter ?? undefined,
    complementaryVerse: n.complementary_verse ?? undefined,
    complementaryVerses: cvs ? cvs.map(toCv) : [],
    replies: (n.replies ?? []).map(toReply),
  }
}

// Format a ComplementaryVerse as a readable Bible reference string.
export function cvRef(v: ComplementaryVerse): string {
  return `${v.book} ${v.chapter}${v.verse ? `:${v.verse}` : ""}`
}

// ─── Notes API ───

export async function listNotes(): Promise<StudyNote[]> {
  const { data: noteData, error: noteError } = await client()
    .from("notes")
    .select("*, replies(*)")
    .order("created_at", { ascending: false })
  if (noteError) throw noteError
  const noteIds = (noteData ?? []).map((n: NoteRow) => n.id)
  let cvRows: CvRow[] = []
  if (noteIds.length > 0) {
    const { data } = await client()
      .from("note_complementary_verses")
      .select("*")
      .in("note_id", noteIds)
      .order("sort_order", { ascending: true })
    cvRows = (data ?? []) as CvRow[]
  }
  const cvByNote = new Map<string, CvRow[]>()
  for (const row of cvRows) {
    const arr = cvByNote.get(row.note_id) ?? []
    arr.push(row)
    cvByNote.set(row.note_id, arr)
  }
  return (noteData ?? []).map((n: NoteRow) => toNote(n, cvByNote.get(n.id)))
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
      body: note.body || " ",
      date: note.date || displayDate(),
      tag: note.tag || "Study Note",
      complementary_book: note.complementaryBook ?? null,
      complementary_chapter: note.complementaryChapter ?? null,
      complementary_verse: note.complementaryVerse ?? null,
    })
    .select("*, replies(*)")
    .single()
  if (error) throw error
  return toNote(data)
}

// Owner-only edit. Row Level Security rejects updates to other users' notes.
export async function updateNote(
  id: string,
  patch: Partial<Pick<StudyNote, "title" | "body" | "tag" | "noteType" | "scripture" | "complementaryBook" | "complementaryChapter" | "complementaryVerse">>,
): Promise<void> {
  const updates: Record<string, string | number | null> = {}
  if (patch.title !== undefined) updates.title = patch.title
  if (patch.body !== undefined) updates.body = patch.body || " "
  if (patch.tag !== undefined) updates.tag = patch.tag
  if (patch.noteType !== undefined) updates.note_type = patch.noteType
  if (patch.scripture !== undefined) updates.scripture = patch.scripture
  if (patch.complementaryBook !== undefined) updates.complementary_book = patch.complementaryBook ?? null
  if (patch.complementaryChapter !== undefined) updates.complementary_chapter = patch.complementaryChapter ?? null
  if (patch.complementaryVerse !== undefined) updates.complementary_verse = patch.complementaryVerse ?? null
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

// ─── Complementary Verses CRUD ───

export async function saveComplementaryVerses(
  noteId: string,
  verses: { book: string; chapter: number; verse?: number }[],
): Promise<void> {
  // Delete existing rows for this note, then re-insert (simple replace strategy).
  await client().from("note_complementary_verses").delete().eq("note_id", noteId)
  if (verses.length === 0) return
  const rows = verses.map((v, i) => ({
    note_id: noteId,
    book: v.book,
    chapter: v.chapter,
    verse: v.verse ?? null,
    sort_order: i,
  }))
  const { error } = await client().from("note_complementary_verses").insert(rows)
  if (error) throw error
}

// Fetch complementary verses for a single note.
export async function fetchComplementaryVerses(noteId: string): Promise<ComplementaryVerse[]> {
  const { data, error } = await client()
    .from("note_complementary_verses")
    .select("*")
    .eq("note_id", noteId)
    .order("sort_order", { ascending: true })
  if (error) throw error
  return (data ?? []).map(toCv)
}

// ─── Notifications (localStorage, per-user) ───
// Notifications are lightweight and local: they track replies to the current
// user's notes so the UI can show an unread badge. No database table needed.

export interface NoteNotification {
  id: string
  noteId: string
  noteTitle: string
  noteScripture: string
  replyId: string
  replyAuthor: string
  replyBody: string
  replyDate: string
  read: boolean
  createdAt: string
}

const NOTIFICATIONS_KEY = "mftk_notifications"
const SEEN_REPLIES_KEY = "mftk_seen_replies"

function notificationsKey(userId: string) {
  return `${NOTIFICATIONS_KEY}_${userId}`
}

function seenRepliesKey(userId: string) {
  return `${SEEN_REPLIES_KEY}_${userId}`
}

export function getNotifications(userId: string): NoteNotification[] {
  try {
    const raw = localStorage.getItem(notificationsKey(userId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveNotifications(
  userId: string,
  notifications: NoteNotification[],
): void {
  try {
    localStorage.setItem(
      notificationsKey(userId),
      JSON.stringify(notifications),
    )
  } catch {
    /* ignore */
  }
}

export function markNotificationRead(
  userId: string,
  notificationId: string,
): void {
  const notifications = getNotifications(userId)
  const updated = notifications.map((n) =>
    n.id === notificationId ? { ...n, read: true } : n,
  )
  saveNotifications(userId, updated)
}

export function markAllNotificationsRead(userId: string): void {
  const notifications = getNotifications(userId)
  saveNotifications(
    userId,
    notifications.map((n) => ({ ...n, read: true })),
  )
}

function getSeenReplyIds(userId: string): Set<string> {
  try {
    const raw = localStorage.getItem(seenRepliesKey(userId))
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveSeenReplyIds(userId: string, ids: Set<string>): void {
  try {
    localStorage.setItem(seenRepliesKey(userId), JSON.stringify([...ids]))
  } catch {
    /* ignore */
  }
}

// On first load, mark all existing replies as seen so only genuinely new replies
// (added after the user's first visit) trigger notifications.
export function bootstrapSeenReplies(
  notes: StudyNote[],
  userId: string,
): void {
  const seenIds = getSeenReplyIds(userId)
  if (seenIds.size > 0) return
  const allReplyIds = new Set<string>()
  for (const note of notes) {
    for (const reply of note.replies ?? []) {
      allReplyIds.add(reply.id)
    }
  }
  saveSeenReplyIds(userId, allReplyIds)
}

// Scans the user's notes for replies not yet in the seen set. New replies from
// other users become unread notifications; own replies are silently marked seen.
export function detectNewReplies(
  notes: StudyNote[],
  userId: string,
): NoteNotification[] {
  const seenIds = getSeenReplyIds(userId)
  const newNotifications: NoteNotification[] = []
  const myNotes = notes.filter((n) => n.authorId === userId)

  for (const note of myNotes) {
    for (const reply of note.replies ?? []) {
      if (seenIds.has(reply.id)) continue
      seenIds.add(reply.id)
      if (reply.authorId === userId) continue
      newNotifications.push({
        id: `${note.id}_${reply.id}`,
        noteId: note.id,
        noteTitle: note.title,
        noteScripture: note.scripture,
        replyId: reply.id,
        replyAuthor: reply.authorName,
        replyBody: reply.body,
        replyDate: reply.date,
        read: false,
        createdAt: new Date().toISOString(),
      })
    }
  }

  if (newNotifications.length > 0) {
    const existing = getNotifications(userId)
    saveNotifications(userId, [...newNotifications, ...existing])
  }
  saveSeenReplyIds(userId, seenIds)
  return newNotifications
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
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "note_complementary_verses" },
      () => onNotesChanged(),
    )
    .subscribe()
  return () => {
    void client.removeChannel(channel)
  }
}
