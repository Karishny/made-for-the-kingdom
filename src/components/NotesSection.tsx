import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import NoteComposer, { NoteDropdown, Avatar } from '@/components/NoteComposer'
import {
  listNotes,
  addReply,
  removeNote,
  NOTE_TYPES,
  noteTypeLabel,
  noteTypeColor,
  type StudyNote,
} from '@/lib/notesApi'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89',
}

const FONT_SANS = "'Source Sans 3', sans-serif"
const FONT_SERIF = "'Fraunces', serif"

function TypeBadge({ type }: { type?: string }) {
  const color = noteTypeColor(type)
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-sm"
      style={{
        color, background: `${color}12`, border: `1px solid ${color}38`,
        fontFamily: FONT_SANS, fontWeight: 600, fontSize: 10, letterSpacing: '0.16em',
      }}>
      {noteTypeLabel(type).toUpperCase()}
    </span>
  )
}

function NoteSelect({
  value, onChange, options, ariaLabel, label,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  ariaLabel: string
  label: string
}) {
  return (
    <NoteDropdown
      label={label}
      ariaLabel={ariaLabel}
      value={value}
      onChange={onChange}
      options={options}
    />
  )
}

export default function NotesSection({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { user } = useUser()
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [drafting, setDrafting] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [studyFilter, setStudyFilter] = useState('All Studies')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [search, setSearch] = useState('')
  const [replyBody, setReplyBody] = useState('')

  useEffect(() => {
    let cancelled = false
    listNotes()
      .then((list) => {
        if (!cancelled) setNotes(list)
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Studies come from the notes themselves (plus the known base list), so new
  // Bible studies appear here automatically the moment their first note exists.
  const knownStudies = ['Isaiah']
  const studies = ['All Studies', ...Array.from(new Set([
    ...knownStudies,
    ...notes.map((n) => (n.study && n.study.trim() ? n.study.trim() : 'Isaiah')),
  ]))]

  function openNote(id: string) {
    setActiveNote((cur) => (cur === id ? null : id))
    setReplyBody('')
  }

  async function submitReply() {
    if (!user || !activeNote || !replyBody.trim()) return
    try {
      const reply = await addReply(activeNote, {
        authorId: user.id,
        authorName: user.name,
        authorColor: user.color,
        authorInitials: user.initials,
        body: replyBody.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      })
      setNotes((prev) => prev.map((n) =>
        n.id === activeNote ? { ...n, replies: [...(n.replies ?? []), reply] } : n,
      ))
      setReplyBody('')
    } catch {
      /* ignore */
    }
  }

  async function deleteNote(id: string) {
    try {
      await removeNote(id)
      setNotes(notes.filter((n) => n.id !== id))
      if (activeNote === id) setActiveNote(null)
    } catch {
      /* ignore */
    }
  }

  const query = search.trim().toLowerCase()
  const visible = notes.filter((n) => {
    if (studyFilter !== 'All Studies' && (n.study || 'Isaiah') !== studyFilter) return false
    if (typeFilter !== 'All Types' && noteTypeLabel(n.noteType) !== typeFilter) return false
    if (!query) return true
    return [n.title, n.scripture, n.body, n.tag, n.authorName]
      .some((field) => field && field.toLowerCase().includes(query))
  })

  const activeFilterCount =
    (studyFilter !== 'All Studies' ? 1 : 0) + (typeFilter !== 'All Types' ? 1 : 0) + (query ? 1 : 0)

  const inputStyle = {
    fontFamily: FONT_SANS,
    background: C.bg,
    border: `1px solid ${C.ink}25`,
    color: C.ink,
    borderRadius: 2,
  }

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <SectionHeader
          kicker="notes"
          title="study notes"
          sub={`shared with the group · ${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`}
          align="left"
          size="sm"
          divider={false}
        />

        {user ? (
          <Button onClick={() => setDrafting((d) => !d)} size="sm" className="mt-2">
            {drafting ? 'cancel' : '+ add note'}
          </Button>
        ) : (
          <Button onClick={onOpenLogin} size="sm" className="mt-2">
            log in to add notes
          </Button>
        )}
      </div>

      {/* Filters: hidden behind a "search notes" toggle so the page stays calm */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs tracking-[0.18em] uppercase cursor-pointer"
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 600,
            color: `${C.ink}66`,
            border: `1px solid ${C.ink}18`,
            background: `${C.ink}04`,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ opacity: 0.7 }}>
            <circle cx="7" cy="7" r="4.5" stroke={C.ink} strokeWidth="1.3" />
            <path d="M10.5 10.5 L14 14" stroke={C.ink} strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {filtersOpen ? 'hide search & filters' : 'search notes'}
          {!filtersOpen && activeFilterCount > 0 && (
            <span
              className="inline-flex items-center justify-center rounded-full w-5 h-5 text-[10px]"
              style={{ color: C.bg, background: C.terra, fontFamily: FONT_SANS, fontWeight: 700 }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>

        {filtersOpen && (
          <div className="note-fade-in rounded border mt-3 p-4"
            style={{ borderColor: `${C.ink}18`, background: `${C.ink}04` }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
              <NoteSelect label="Study" ariaLabel="Filter by study" value={studyFilter} onChange={setStudyFilter} options={studies} />
              <NoteSelect label="Type" ariaLabel="Filter by note type" value={typeFilter} onChange={setTypeFilter} options={['All Types', ...NOTE_TYPES]} />
              <div className="sm:col-span-2">
                <span className="block text-[10px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
                  Search
                </span>
                <div className="relative">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ opacity: 0.5 }}>
                    <circle cx="7" cy="7" r="4.5" stroke={C.ink} strokeWidth="1.3" />
                    <path d="M10.5 10.5 L14 14" stroke={C.ink} strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search titles, scripture, notes, tags…"
                    className="w-full rounded-sm pl-9 pr-3 py-2 text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New note compose */}
      {drafting && user && (
        <div className="mb-6">
          <NoteComposer
            user={user}
            studies={studies.filter((s) => s !== 'All Studies')}
            onCancel={() => setDrafting(false)}
            onSaved={(created) => {
              setNotes((prev) => [created, ...prev])
              setDrafting(false)
            }}
          />
        </div>
      )}

      {/* Notes list */}
      {loading ? (
        <div className="text-center py-16 rounded border"
          style={{ borderColor: `${C.ink}15`, borderStyle: 'dashed' }}>
          <p style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: `${C.ink}55`, fontSize: '1rem' }}>
            Loading shared notes…
          </p>
        </div>
      ) : loadError ? (
        <div className="text-center py-16 rounded border"
          style={{ borderColor: `${C.ink}15`, borderStyle: 'dashed' }}>
          <p style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: `${C.ink}55`, fontSize: '1rem' }}>
            Shared notes are currently unavailable.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((note) => {
            const accent = noteTypeColor(note.noteType)
            const expanded = activeNote === note.id
            const replies = note.replies ?? []
            const tags = note.tag
              ? note.tag.split(',').map((t) => t.trim()).filter(Boolean).filter((t) => t !== 'Study Note')
              : []
            return (
              <article key={note.id}
                className="rounded border overflow-hidden transition-all duration-200 cursor-pointer"
                style={{ borderColor: expanded ? accent : `${C.ink}20`, background: expanded ? `${accent}06` : C.bg }}
                onClick={() => openNote(note.id)}>
                <div className="flex">
                  <div className="w-1 flex-shrink-0" style={{ background: accent }} />
                  <div className="flex-1 px-5 py-4">
                    {/* Type + scripture */}
                    <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                      <TypeBadge type={note.noteType} />
                      {note.study && note.study !== 'Isaiah' && (
                        <span className="text-[10px] tracking-[0.16em] uppercase"
                          style={{ color: `${C.ink}55`, fontFamily: FONT_SANS, fontWeight: 600 }}>
                          {note.study}
                        </span>
                      )}
                      <span className="text-xs" style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: `${C.ink}66` }}>
                        {note.scripture}
                      </span>
                    </div>

                    <h4 className="mb-1"
                      style={{ fontFamily: FONT_SERIF, fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
                      {note.title}
                    </h4>

                    {!expanded ? (
                      <p className="text-sm"
                        style={{
                          fontFamily: FONT_SANS, color: `${C.ink}77`, lineHeight: '1.6',
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        } as React.CSSProperties}>
                        {note.body}
                      </p>
                    ) : (
                      <p className="text-sm mt-1 leading-relaxed whitespace-pre-line"
                        style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.8' }}>
                        {note.body}
                      </p>
                    )}

                    {tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mt-2">
                        {tags.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{ background: `${C.ink}0a`, border: `1px solid ${C.ink}18`, color: `${C.ink}66`, fontFamily: FONT_SANS }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-3 pt-3 flex items-center gap-2 flex-wrap border-t"
                      style={{ borderColor: `${C.ink}12` }}>
                      <Avatar name={note.authorName} color={note.authorColor} initials={note.authorInitials} />
                      <span className="text-xs font-semibold"
                        style={{ color: note.authorColor, fontFamily: FONT_SANS }}>
                        {note.authorName}
                      </span>
                      {note.authorId === user?.id && (
                        <span className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm"
                          style={{ color: '#fff', background: note.authorColor, fontFamily: FONT_SANS, fontWeight: 600 }}>
                          you
                        </span>
                      )}
                      <span className="text-xs" style={{ color: `${C.ink}44`, fontFamily: FONT_SANS }}>·</span>
                      <span className="text-xs" style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>{note.date}</span>
                      <div className="flex-1" />
                      <span className="text-xs" style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>
                        {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                      </span>
                      {expanded && note.authorId === user?.id && (
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                          className="text-xs px-2 py-0.5 rounded-sm transition-all duration-150"
                          style={{ color: C.rose, border: `1px solid ${C.rose}35`, fontFamily: FONT_SANS, background: `${C.rose}08` }}>
                          Delete
                        </button>
                      )}
                    </div>

                    {/* Discussion / replies */}
                    {expanded && (
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: `${C.ink}12` }}
                        onClick={(e) => e.stopPropagation()}>
                        <p className="text-[10px] tracking-[0.25em] uppercase mb-3"
                          style={{ color: `${C.ink}55`, fontFamily: FONT_SANS, fontWeight: 600 }}>
                          discussion · {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                        </p>

                        {replies.length > 0 ? (
                          <div className="space-y-3 mb-4">
                            {replies.map((r) => (
                              <div key={r.id} className="rounded border px-3 py-2.5"
                                style={{ borderColor: `${C.ink}18`, background: `${C.ink}04` }}>
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  <Avatar name={r.authorName} color={r.authorColor} initials={r.authorInitials} />
                                  <span className="text-xs font-semibold"
                                    style={{ color: r.authorColor, fontFamily: FONT_SANS }}>
                                    {r.authorName}
                                  </span>
                                  <span className="text-xs" style={{ color: `${C.ink}44`, fontFamily: FONT_SANS }}>·</span>
                                  <span className="text-xs" style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>{r.date}</span>
                                </div>
                                <p className="text-sm whitespace-pre-line"
                                  style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.7' }}>
                                  {r.body}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm italic mb-4" style={{ fontFamily: FONT_SERIF, color: `${C.ink}55` }}>
                            No replies yet — start the discussion.
                          </p>
                        )}

                        {user ? (
                          <div className="flex items-start gap-2">
                            <textarea rows={2} placeholder="Write a reply…"
                              value={replyBody} onChange={(e) => setReplyBody(e.target.value)}
                              className="flex-1 rounded-sm px-3 py-2 text-sm outline-none resize-none"
                              style={{ ...inputStyle, lineHeight: '1.6' }} />
                            <Button size="sm" variant="solid" onClick={() => void submitReply()} disabled={!replyBody.trim()}>
                              reply
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" onClick={onOpenLogin}>
                            log in to reply
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}

          {visible.length === 0 && (
            <div className="text-center py-16 rounded border"
              style={{ borderColor: `${C.ink}15`, borderStyle: 'dashed' }}>
              <p style={{ fontFamily: FONT_SERIF, fontStyle: 'italic', color: `${C.ink}55`, fontSize: '1rem' }}>
                {notes.length === 0
                  ? 'No notes yet. Begin studying and record your reflections.'
                  : 'No notes match your filters.'}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
