import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'

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

function loadNotes(): StudyNote[] {
  try {
    const raw = localStorage.getItem('mftk_notes')
    if (raw) {
      const parsed: StudyNote[] = JSON.parse(raw)
      return parsed.filter((n) => n.authorId !== 'seed')
    }
    return []
  } catch { return [] }
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
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <SectionHeader
          kicker="notes"
          title="study notes"
          sub="isaiah · shared with the group"
          align="left"
          size="sm"
          divider={false}
        />

        {user ? (
          <Button
            onClick={() => setDrafting(true)}
            size="sm"
            className="mt-2"
          >
            + add note
          </Button>
        ) : (
          <Button
            onClick={onOpenLogin}
            size="sm"
            className="mt-2"
          >
            log in to add notes
          </Button>
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
              <Button onClick={saveNote} variant="solid" size="sm">
                save note
              </Button>
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
                        {note.authorId === user?.id && (
                          <span className="text-[10px] tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-sm"
                            style={{ color: '#fff', background: note.authorColor, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                            you
                          </span>
                        )}
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
