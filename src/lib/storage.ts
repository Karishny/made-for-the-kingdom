// Per-user progress data (completed weeks, chapters, resources, discussion).
// Namespaced by the authenticated user's Supabase id so each account's progress
// is independent. This is the only localStorage usage left — study notes live in
// Supabase, never here.
//
// Signing in to the same account on another device will not carry progress over
// (progress is browser-local convenience data); notes are the shared persistent
// store.

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) as T : null
  } catch {
    return null
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

// ─── Per-user progress ───

function progressKey(id: string) {
  return `mftk_progress_${id}`
}

function chaptersKey(id: string) {
  return `mftk_chapters_${id}`
}

function resourcesKey(id: string) {
  return `mftk_resources_${id}`
}

function discussionKey(id: string) {
  return `mftk_discussion_${id}`
}

export function loadProgress(id: string): Set<string> {
  return new Set<string>(readJSON<string[]>(progressKey(id)) ?? [])
}

export function saveProgress(id: string, weeks: Set<string>) {
  writeJSON(progressKey(id), [...weeks])
}

export function loadChapters(id: string): Set<number> {
  return new Set<number>(readJSON<number[]>(chaptersKey(id)) ?? [])
}

export function saveChapters(id: string, chapters: Set<number>) {
  writeJSON(chaptersKey(id), [...chapters])
}

// ─── Per-user weekly-resource completion ───
// weekKey -> completed resource types. Completing any one resource completes
// the week, so this lives alongside (and feeds) the completed-weeks set.

export function loadResources(id: string): Record<string, string[]> {
  return readJSON<Record<string, string[]>>(resourcesKey(id)) ?? {}
}

export function saveResources(id: string, resources: Record<string, string[]>) {
  writeJSON(resourcesKey(id), resources)
}

// ─── Per-user discussion completion ───
// weekKey -> "done". A simple set so each week's Discussion Questions has one
// subtle done state, stored privately per account like the other progress.

export function loadDiscussionDone(id: string): Set<string> {
  return new Set<string>(readJSON<string[]>(discussionKey(id)) ?? [])
}

export function saveDiscussionDone(id: string, weeks: Set<string>) {
  writeJSON(discussionKey(id), [...weeks])
}
