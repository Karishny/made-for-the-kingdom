// Shared notes backend for the Isaiah study.
//
// This project is a Vite SPA with no separate server, so the notes API runs as
// Vite dev-server middleware (`apply: 'serve'`). Notes are persisted to a
// server-side JSON file (`data/notes.json`), which makes them genuinely shared:
// any user who opens the app against this server reads and writes the same
// store. It survives restarts and is not tied to any browser's localStorage.
//
// If the app is later deployed behind a real server, the client layer
// (`src/lib/notesApi.ts`) can be re-pointed at that server's endpoints without
// changing the components that use it.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

interface StoredNote {
  id: string
  createdAt: string
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

const DATA_DIR = join(process.cwd(), 'data')
const NOTES_FILE = join(DATA_DIR, 'notes.json')

function loadNotes(): StoredNote[] {
  try {
    const raw = readFileSync(NOTES_FILE, 'utf-8')
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as StoredNote[]) : []
  } catch {
    return []
  }
}

function persist(notes: StoredNote[]) {
  mkdirSync(DATA_DIR, { recursive: true })
  writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8')
}

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}') as Record<string, unknown>)
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.statusCode = status
  res.end(JSON.stringify(data))
}

function normalize(body: Record<string, unknown>): StoredNote | null {
  const authorId = typeof body.authorId === 'string' ? body.authorId.trim() : ''
  const authorName = typeof body.authorName === 'string' ? body.authorName.trim() : ''
  const noteBody = typeof body.body === 'string' ? body.body.trim() : ''
  if (!authorId || !authorName || !noteBody) return null

  const chapter = typeof body.chapter === 'number' ? body.chapter : undefined
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    authorId,
    authorName,
    authorColor: typeof body.authorColor === 'string' ? body.authorColor : '#a85b31',
    authorInitials: typeof body.authorInitials === 'string' ? body.authorInitials : authorName.slice(0, 2).toUpperCase(),
    study: typeof body.study === 'string' && body.study ? body.study : 'Isaiah',
    part: typeof body.part === 'number' ? body.part : undefined,
    week: typeof body.week === 'number' ? body.week : undefined,
    chapter,
    scripture: typeof body.scripture === 'string' && body.scripture ? body.scripture : chapter ? `Isaiah ${chapter}` : 'Isaiah',
    title: typeof body.title === 'string' && body.title.trim() ? body.title.trim() : 'Untitled Note',
    body: noteBody,
    date: typeof body.date === 'string' && body.date ? body.date : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    tag: typeof body.tag === 'string' && body.tag ? body.tag.trim() : 'Study Note',
  }
}

export function notesApiPlugin(): Plugin {
  return {
    name: 'mftk-notes-api',
    apply: 'serve',
    configureServer(server) {
      const store = loadNotes()

      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        if (!url.startsWith('/api/notes')) return next()

        if (req.method === 'GET' && url === '/api/notes') {
          const sorted = [...store].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
          sendJson(res, 200, sorted)
          return
        }

        if (req.method === 'POST' && url === '/api/notes') {
          void (async () => {
            try {
              const note = normalize(await readBody(req))
              if (!note) {
                sendJson(res, 400, { error: 'authorId, authorName and body are required' })
                return
              }
              store.unshift(note)
              persist(store)
              sendJson(res, 201, note)
            } catch (err) {
              sendJson(res, 400, { error: err instanceof Error ? err.message : 'Invalid request' })
            }
          })()
          return
        }

        const match = /^\/api\/notes\/([^/]+)$/.exec(url)
        if (req.method === 'DELETE' && match) {
          const id = decodeURIComponent(match[1])
          const idx = store.findIndex((n) => n.id === id)
          if (idx === -1) {
            sendJson(res, 404, { error: 'Note not found' })
            return
          }
          store.splice(idx, 1)
          persist(store)
          sendJson(res, 200, { ok: true })
          return
        }

        next()
      })
    },
  }
}
