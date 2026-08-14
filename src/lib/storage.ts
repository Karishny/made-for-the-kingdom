// Per-account data layer built on localStorage. Account data is namespaced by
// a stable account id so each user's progress is independent, while study notes
// remain community-shared. The helpers are grouped here so they can be re-pointed
// at a real backend later without changing the components that use them.

export interface StoredUser {
  id: string
  name: string
  color: string
  initials: string
  createdAt: string
}

const USERS_KEY = 'mftk_users'
const SESSION_KEY = 'mftk_user'
const LEGACY_PROGRESS_KEY = 'mftk_completed_weeks'

const AVATAR_COLORS = ['#a85b31', '#949b61', '#cfac29', '#927f9b', '#a84c5c', '#454930', '#c57c89', '#763f21']

function colorForName(name: string): string {
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function initialsFor(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

// Stable account id derived from the user's chosen name. Signing back in with
// the same name restores the same account, its progress, and its notes.
export function normalizeAccountId(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
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

// ─── Account registry ───

function loadUsers(): Record<string, StoredUser> {
  return readJSON<Record<string, StoredUser>>(USERS_KEY) ?? {}
}

export function getStoredUser(id: string): StoredUser | null {
  return loadUsers()[id] ?? null
}

// Registers the account for a name (reusing an existing profile if present) and
// returns the stored profile so display data stays consistent across sign-ins.
export function registerUser(name: string): StoredUser {
  const id = normalizeAccountId(name)
  const users = loadUsers()
  const existing = users[id]
  const stored: StoredUser =
    existing ?? {
      id,
      name,
      color: colorForName(name),
      initials: initialsFor(name),
      createdAt: new Date().toISOString(),
    }
  users[id] = stored
  writeJSON(USERS_KEY, users)
  return stored
}

// ─── Session ───

export function loadSession(): StoredUser | null {
  return readJSON<StoredUser>(SESSION_KEY)
}

export function saveSession(user: StoredUser) {
  writeJSON(SESSION_KEY, user)
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
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

function resourcesKey(id: string) {
  return `mftk_resources_${id}`
}

export function loadResources(id: string): Record<string, string[]> {
  return readJSON<Record<string, string[]>>(resourcesKey(id)) ?? {}
}

export function saveResources(id: string, resources: Record<string, string[]>) {
  writeJSON(resourcesKey(id), resources)
}

// ─── Per-user discussion completion ───
// weekKey -> "done". A simple set so each week's Discussion Questions has one
// subtle done state, stored privately per account like the other progress.

function discussionKey(id: string) {
  return `mftk_discussion_${id}`
}

export function loadDiscussionDone(id: string): Set<string> {
  return new Set<string>(readJSON<string[]>(discussionKey(id)) ?? [])
}

export function saveDiscussionDone(id: string, weeks: Set<string>) {
  writeJSON(discussionKey(id), [...weeks])
}

// One-time migration: if the account has no saved progress yet, move the old
// shared progress key into it so existing data is not silently lost.
export function adoptLegacyProgress(id: string) {
  try {
    if (localStorage.getItem(progressKey(id)) !== null) return
    const raw = localStorage.getItem(LEGACY_PROGRESS_KEY)
    if (!raw) return
    const weeks = new Set<string>(JSON.parse(raw))
    saveProgress(id, weeks)
    localStorage.removeItem(LEGACY_PROGRESS_KEY)
  } catch {
    /* ignore */
  }
}
