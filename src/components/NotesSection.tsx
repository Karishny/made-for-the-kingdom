import { useState } from 'react'
import { useUser } from '@/context/UserContext'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89',
}

const TAG_COLORS = [C.terra, C.olive, C.goldDeep, C.lavender, C.rose, C.mauve, '#454930', '#763f21']

function tagColor(index: number) { return TAG_COLORS[index % TAG_COLORS.length] }

export interface StudyNote {
  id: string
  authorId: string
  authorName: string
  authorColor: string
  authorInitials: string
  scripture: string
  title: string
  body: string
  date: string
  tag: string
}

const SEED_NOTES: StudyNote[] = [
  {
    id: 'seed1', authorId: 'seed', authorName: 'Sarah', authorColor: C.olive, authorInitials: 'SA',
    scripture: 'Isaiah 6:1–8', title: "Isaiah's Vision of the Holy God",
    body: "The seraphim cry 'Holy, holy, holy' — the threefold repetition emphasises the absolute holiness of God. Isaiah's immediate response is one of undone-ness, recognising his own sinfulness in contrast to God's purity. The live coal from the altar speaks of atonement making him fit for God's call.",
    date: 'July 28, 2026', tag: 'Calling & Holiness',
  },
  {
    id: 'seed2', authorId: 'seed', authorName: 'Michael', authorColor: C.terra, authorInitials: 'MI',
    scripture: 'Isaiah 40:1–11', title: 'Comfort, O Comfort My People',
    body: "The dramatic shift in tone from chapter 39 to 40 is striking. God speaks tenderly — 'comfort my people'. The chapter balances the transcendence of God (measuring the waters in the hollow of his hand) with his pastoral gentleness (he gently leads those that are with young).",
    date: 'July 30, 2026', tag: 'Comfort & Sovereignty',
  },
  {
    id: 'seed3', authorId: 'seed', authorName: 'Grace', authorColor: C.goldDeep, authorInitials: 'GR',
    scripture: 'Isaiah 53:1–12', title: 'The Suffering Servant',
    body: 'This passage is one of the most remarkable in all of Old Testament prophecy. Written 700 years before the crucifixion, it describes with startling precision the rejection, suffering, and atoning death of Jesus. "He was wounded for our transgressions" — substitutionary atonement in full view.',
    date: 'Aug 1, 2026', tag: 'Messianic Prophecy',
  },
]

function loadNotes(): StudyNote[] {
  try {
    const raw = localStorage.getItem('mftk_notes')
    return raw ? JSON.parse(raw) : SEED_NOTES
  } catch { return SEED_NOTES }
}

function saveNotes(notes: StudyNote[]) {
  localStorage.setItem('mftk_notes', JSON.stringify(notes))
}

function Avatar({ name, color, initials }: { name: string; color: string; initials: string }) {
  return (
    <div
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
      title={name}
      style={{ background: `${color}25`, color, border: `1.5px solid ${color}55`, fontFamily: "'Source Sans 3', sans-serif" }}
    >
      {initials}
    </div>
  )
}

export default function NotesSection({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { user } = useUser()
  const [notes, setNotes] = useState<StudyNote[]>(loadNotes)
  const [drafting, setDrafting] = useState(false)
  const [draft, setDraft] = useState({ scripture: '', title: '', body: '', tag: '' })
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('All')

  const authors = ['All', ...Array.from(new Set(notes.map((n) => n.authorName)))]

  function saveNote() {
    if (!user || (!draft.title.trim() && !draft.body.trim())) return
    const newNote: StudyNote = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.name,
      authorColor: user.color,
      authorInitials: user.initials,
      scripture: draft.scripture || 'Isaiah',
      title: draft.title || 'Untitled Note',
      body: draft.body,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      tag: draft.tag || 'Study Note',
    }
    const updated = [newNote, ...notes]
    setNotes(updated)
    saveNotes(updated)
    setDraft({ scripture: '', title: '', body: '', tag: '' })
    setDrafting(false)
  }

  function deleteNote(id: string) {
    const updated = notes.filter((n) => n.id !== id)
    setNotes(updated)
    saveNotes(updated)
    if (activeNote === id) setActiveNote(null)
  }

  const visible = filter === 'All' ? notes : notes.filter((n) => n.authorName === filter)

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 400, color: C.ink }}>
            Study Notes
          </h3>
          <p className="text-xs mt-0.5 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
            Isaiah · Shared with the group
          </p>
        </div>
        <div className="flex-1 h-px" style={{ background: `${C.ink}18` }} />

        {user ? (
          <button
            onClick={() => setDrafting(true)}
            className="px-3 py-1.5 text-xs tracking-[0.12em] uppercase rounded-sm transition-all duration-150"
            style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: C.bg, background: C.terra }}
          >
            + Add Note
          </button>
        ) : (
          <button
            onClick={onOpenLogin}
            className="px-3 py-1.5 text-xs tracking-[0.12em] uppercase rounded-sm transition-all duration-150"
            style={{
              fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: C.terra,
              background: `${C.terra}10`, border: `1px solid ${C.terra}40`,
            }}
          >
            Log in to add notes
          </button>
        )}
      </div>

      {/* Logged-in user banner */}
      {user && (
        <div className="flex items-center gap-3 mb-5 px-3 py-2 rounded-sm"
          style={{ background: `${user.color}10`, border: `1px solid ${user.color}30` }}>
          <Avatar name={user.name} color={user.color} initials={user.initials} />
          <p className="text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif", color: C.ink }}>
            Signed in as <strong>{user.name}</strong> — your notes are visible to the whole group
          </p>
        </div>
      )}

      {/* Author filter */}
      {authors.length > 2 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs tracking-widest uppercase"
            style={{ color: `${C.ink}55`, fontFamily: "'Source Sans 3', sans-serif" }}>
            Filter:
          </span>
          {authors.map((a) => (
            <button key={a}
              onClick={() => setFilter(a)}
              className="px-3 py-0.5 text-xs rounded-full transition-all duration-150"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: filter === a ? C.bg : `${C.ink}77`,
                background: filter === a ? C.terra : `${C.ink}0a`,
                border: `1px solid ${filter === a ? C.terra : C.ink + '20'}`,
              }}>
              {a}
            </button>
          ))}
        </div>
      )}

      {/* New note compose */}
      {drafting && user && (
        <div className="rounded border mb-6 overflow-hidden"
          style={{ borderColor: `${C.terra}45`, background: `${C.terra}07` }}>
          <div className="px-5 py-3 flex items-center gap-3"
            style={{ borderBottom: `1px solid ${C.terra}20` }}>
            <Avatar name={user.name} color={user.color} initials={user.initials} />
            <span className="text-xs tracking-widest uppercase"
              style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
              {user.name}
            </span>
            <div className="flex-1" />
            <button onClick={() => setDrafting(false)} className="text-xs"
              style={{ color: `${C.ink}55`, fontFamily: "'Source Sans 3', sans-serif" }}>
              Cancel
            </button>
          </div>
          <div className="p-5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Scripture reference (e.g. Isaiah 53:1–6)"
                value={draft.scripture} onChange={(e) => setDraft({ ...draft, scripture: e.target.value })}
                className="rounded-sm px-3 py-2 text-sm outline-none"
                style={{ fontFamily: "'Source Sans 3', sans-serif", background: C.bg, border: `1px solid ${C.ink}25`, color: C.ink }} />
              <input type="text" placeholder="Note title"
                value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="rounded-sm px-3 py-2 text-sm outline-none"
                style={{ fontFamily: "'Source Sans 3', sans-serif", background: C.bg, border: `1px solid ${C.ink}25`, color: C.ink }} />
            </div>
            <input type="text" placeholder="Tag (e.g. Messianic Prophecy, Comfort, Prayer)"
              value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
              className="w-full rounded-sm px-3 py-2 text-sm outline-none"
              style={{ fontFamily: "'Source Sans 3', sans-serif", background: C.bg, border: `1px solid ${C.ink}25`, color: C.ink }} />
            <textarea rows={5} placeholder="Write your study note, reflection, or observation…"
              value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              className="w-full rounded-sm px-3 py-2 text-sm outline-none resize-none"
              style={{ fontFamily: "'Source Sans 3', sans-serif", lineHeight: '1.7', background: C.bg, border: `1px solid ${C.ink}25`, color: C.ink }} />
            <div className="flex justify-end">
              <button onClick={saveNote}
                className="px-5 py-2 text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-150"
                style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: C.bg, background: C.terra }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.terraDark }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.terra }}>
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="space-y-3">
        {visible.map((note, idx) => {
          const accent = tagColor(idx)
          return (
            <article key={note.id}
              className="rounded border overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                borderColor: activeNote === note.id ? accent : `${accent}33`,
                background: activeNote === note.id ? `${accent}09` : `${accent}04`,
              }}
              onClick={() => setActiveNote(activeNote === note.id ? null : note.id)}>
              <div className="flex">
                <div className="w-0.5 flex-shrink-0" style={{ background: accent }} />
                <div className="flex-1 px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Author + meta row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Avatar name={note.authorName} color={note.authorColor} initials={note.authorInitials} />
                        <span className="text-xs font-semibold"
                          style={{ color: note.authorColor, fontFamily: "'Source Sans 3', sans-serif" }}>
                          {note.authorName}
                        </span>
                        <span className="text-xs" style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>·</span>
                        <span className="text-xs px-2 py-0.5 rounded-sm"
                          style={{ color: accent, background: `${accent}15`, border: `1px solid ${accent}28`, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, fontSize: '10px', letterSpacing: '0.05em' }}>
                          {note.scripture}
                        </span>
                        {note.tag && (
                          <span className="text-xs"
                            style={{ color: `${C.ink}55`, fontFamily: "'Source Sans 3', sans-serif" }}>
                            {note.tag}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-0.5 mb-1"
                        style={{ fontFamily: "'Fraunces', serif", fontSize: '1rem', fontWeight: 400, color: C.ink }}>
                        {note.title}
                      </h4>

                      {activeNote !== note.id ? (
                        <p className="text-sm"
                          style={{
                            fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}77`, lineHeight: '1.6',
                            overflow: 'hidden', display: '-webkit-box',
                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                          } as React.CSSProperties}>
                          {note.body}
                        </p>
                      ) : (
                        <p className="text-sm mt-2 leading-relaxed"
                          style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb`, lineHeight: '1.8' }}>
                          {note.body}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs whitespace-nowrap"
                        style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>
                        {note.date}
                      </span>
                      {activeNote === note.id && user && note.authorId === user.id && (
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                          className="text-xs px-2 py-0.5 rounded-sm transition-all duration-150"
                          style={{ color: C.rose, border: `1px solid ${C.rose}35`, fontFamily: "'Source Sans 3', sans-serif", background: `${C.rose}08` }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {visible.length === 0 && (
        <div className="text-center py-16 rounded border"
          style={{ borderColor: `${C.ink}15`, borderStyle: 'dashed' }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: `${C.ink}55`, fontSize: '1rem' }}>
            No notes yet. Begin studying and record your reflections.
          </p>
        </div>
      )}
    </section>
  )
}
