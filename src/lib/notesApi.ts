// Client layer for the shared notes API. Notes are stored server-side so every
// user reads and writes the same community notes. Components import these
// helpers rather than touching localStorage directly.

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
}

export type NewNote = Omit<StudyNote, 'id' | 'createdAt'>

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

export function removeNote(id: string): Promise<void> {
  return request<{ ok: boolean }>(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE' }).then(() => undefined)
}
