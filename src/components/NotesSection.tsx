import { useEffect, useRef, useState } from "react"
import { useUser } from "@/context/UserContext"
import SectionHeader from "@/components/SectionHeader"
import Button from "@/components/Button"
import NoteComposer, { NoteDropdown, Avatar } from "@/components/NoteComposer"
import {
  listNotes,
  addReply,
  removeNote,
  subscribeNotes,
  esvBibleUrl,
  cvRef,
  NOTE_TYPES,
  noteTypeLabel,
  noteTypeColor,
  youVersionUrl,
  type StudyNote,
  type ComplementaryVerse,
  type NoteNotification,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  bootstrapSeenReplies,
  detectNewReplies,
} from "@/lib/notesApi"

const C = {
  bg: "#F7F6F2",
  ink: "#2e2d2a",
  terra: "#a85b31",
  terraDark: "#763f21",
  goldDeep: "#cfac29",
  lavender: "#927f9b",
  olive: "#949b61",
  rose: "#a84c5c",
  mauve: "#c57c89",
}

const FONT_SANS = "'Source Sans 3', sans-serif"
const FONT_SERIF = "'Fraunces', serif"

type NoteTab = "mine" | "community" | "notifications"

function TypeBadge({ type }: { type?: string }) {
  const color = noteTypeColor(type)
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-sm"
      style={{
        color,
        background: `${color}12`,
        border: `1px solid ${color}38`,
        fontFamily: FONT_SANS,
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: "0.16em",
      }}
    >
      {noteTypeLabel(type).toUpperCase()}
    </span>
  )
}

function NoteSelect({
  value,
  onChange,
  options,
  ariaLabel,
  label,
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

export default function NotesSection({
  onOpenLogin,
}: {
  onOpenLogin: () => void
}) {
  const { user } = useUser()
  const [notes, setNotes] = useState<StudyNote[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [tab, setTab] = useState<NoteTab>("community")
  const [drafting, setDrafting] = useState(false)
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [studyFilter, setStudyFilter] = useState("All Studies")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [search, setSearch] = useState("")
  const [replyBody, setReplyBody] = useState("")
  const replyInputRef = useRef<HTMLTextAreaElement | null>(null)
  const [notifications, setNotifications] = useState<NoteNotification[]>([])

  const userId = user?.id

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setNotes([])
      setLoading(false)
      setLoadError(false)
      setNotifications([])
      return () => {
        cancelled = true
      }
    }

    setLoading(true)
    setLoadError(false)
    listNotes()
      .then((list) => {
        if (cancelled) return
        setNotes(list)
        bootstrapSeenReplies(list, userId)
        detectNewReplies(list, userId)
        setNotifications(getNotifications(userId))
      })
      .catch(() => {
        if (!cancelled) setLoadError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    // Realtime: refetch whenever notes/replies change so community notes update
    // live. Refetch-on-event is simple and can never drift out of sync.
    const unsubscribe = subscribeNotes(() => {
      if (cancelled) return
      listNotes()
        .then((list) => {
          if (cancelled) return
          setNotes(list)
          detectNewReplies(list, userId)
          setNotifications(getNotifications(userId))
        })
        .catch(() => {})
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [userId])

  // Studies come from the notes themselves (plus the known base list), so new
  // Bible studies appear here automatically the moment their first note exists.
  const knownStudies = ["Isaiah"]
  const studies = [
    "All Studies",
    ...Array.from(
      new Set([
        ...knownStudies,
        ...notes.map((n) =>
          n.study && n.study.trim() ? n.study.trim() : "Isaiah",
        ),
      ]),
    ),
  ]

  function openNote(id: string) {
    setActiveNote((cur) => (cur === id ? null : id))
    setEditingNote(null)
    setReplyBody("")
    setPendingDelete(null)
  }

  // Always-visible Reply action: opens the existing discussion section without
  // requiring a whole-note click, then focuses the reply input.
  function openReply(noteId: string) {
    setActiveNote((cur) => (cur === noteId ? cur : noteId))
    setReplyBody("")
    setPendingDelete(null)
    setTimeout(() => {
      replyInputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" })
      replyInputRef.current?.focus()
    }, 50)
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
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      })
      setNotes((prev) =>
        prev.map((n) =>
          n.id === activeNote
            ? { ...n, replies: [...(n.replies ?? []), reply] }
            : n,
        ),
      )
      setReplyBody("")
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

  const myNotes = user ? notes.filter((n) => n.authorId === user.id) : []
  const communityNotes = notes
  const scoped = tab === "mine" ? myNotes : tab === "community" ? communityNotes : []

  const query = search.trim().toLowerCase()
  const visible = scoped.filter((n) => {
    if (studyFilter !== "All Studies" && (n.study || "Isaiah") !== studyFilter)
      return false
    if (typeFilter !== "All Types" && noteTypeLabel(n.noteType) !== typeFilter)
      return false
    if (!query) return true
    return [n.title, n.scripture, n.body, n.tag, n.authorName].some(
      (field) => field && field.toLowerCase().includes(query),
    )
  })

  const activeFilterCount =
    (studyFilter !== "All Studies" ? 1 : 0) +
    (typeFilter !== "All Types" ? 1 : 0) +
    (query ? 1 : 0)

  const inputStyle = {
    fontFamily: FONT_SANS,
    background: C.bg,
    border: `1px solid ${C.ink}25`,
    color: C.ink,
    borderRadius: 2,
  }

  const headerCount = tab === "mine" ? myNotes.length : tab === "community" ? communityNotes.length : notifications.length
  const unreadCount = notifications.filter((n) => !n.read).length

  function viewNotification(notification: NoteNotification) {
    if (!userId) return
    markNotificationRead(userId, notification.id)
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n,
      ),
    )
    setTab("community")
    setActiveNote(notification.noteId)
    setTimeout(() => {
      const noteEl = document.querySelector(
        `[data-note-id="${notification.noteId}"]`,
      )
      noteEl?.scrollIntoView({ block: "center", behavior: "smooth" })
    }, 100)
  }

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <SectionHeader
          kicker="notes"
          title="study notes"
          sub={
            user
              ? `${
                  tab === "mine"
                    ? "your notes"
                    : tab === "community"
                      ? "community notes"
                      : "notifications"
                } · ${
                  tab === "notifications"
                    ? `${unreadCount} unread`
                    : `${headerCount} ${headerCount === 1 ? "note" : "notes"}`
                }`
              : "shared with the group"
          }
          align="left"
          size="sm"
          divider={false}
        />

        {user ? (
          <Button
            onClick={() => setDrafting((d) => !d)}
            size="sm"
            className="mt-2"
          >
            {drafting ? "cancel" : "+ add note"}
          </Button>
        ) : (
          <Button onClick={onOpenLogin} size="sm" className="mt-2">
            log in to add notes
          </Button>
        )}
      </div>

      {!user ? (
        <div
          className="text-center py-16 rounded border"
          style={{
            borderColor: `${C.goldDeep}30`,
            background: `${C.goldDeep}08`,
          }}
        >
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontStyle: "italic",
              color: `${C.ink}66`,
              fontSize: "1.05rem",
            }}
          >
            Study notes are shared with the group.
          </p>
          <p
            className="mt-1.5 mb-6 text-sm"
            style={{ fontFamily: FONT_SANS, color: `${C.ink}77` }}
          >
            Sign in to read community notes and write your own.
          </p>
          <Button onClick={onOpenLogin} size="sm" variant="solid">
            sign in
          </Button>
        </div>
      ) : (
        <>
          {/* Community Notes / My Notes + notification bell */}
          <div className="mb-6 flex items-center gap-3">
            <div
              className="inline-flex rounded border overflow-hidden"
              style={{ borderColor: `${C.ink}18` }}
            >
              <button
                type="button"
                onClick={() => {
                  setTab("community")
                  setActiveNote(null)
                }}
                className="px-4 py-2 text-xs tracking-[0.16em] uppercase cursor-pointer transition-colors duration-150"
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  color: tab === "community" ? C.bg : `${C.ink}66`,
                  background: tab === "community" ? C.terra : "transparent",
                }}
              >
                Community Notes · {communityNotes.length}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("mine")
                  setActiveNote(null)
                }}
                className="px-4 py-2 text-xs tracking-[0.16em] uppercase cursor-pointer transition-colors duration-150"
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  color: tab === "mine" ? C.bg : `${C.ink}66`,
                  background: tab === "mine" ? C.terra : "transparent",
                  borderLeft: `1px solid ${C.ink}18`,
                }}
              >
                My Notes · {myNotes.length}
              </button>
            </div>

            <div className="flex-1" />

            {/* Notification bell — standalone action button */}
            <button
              type="button"
              onClick={() => {
                setTab("notifications")
                setActiveNote(null)
              }}
              className="relative inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs cursor-pointer transition-all duration-150"
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                color: tab === "notifications" ? C.bg : `${C.ink}66`,
                background: tab === "notifications" ? C.terra : `${C.ink}04`,
                border: `1px solid ${tab === "notifications" ? `${C.terra}40` : `${C.ink}18`}`,
              }}
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {unreadCount > 0 && (
                <span
                  className="inline-flex items-center justify-center rounded-full min-w-[16px] h-[16px] text-[9px] px-1"
                  style={{
                    color: "#fff",
                    background: C.terraDark,
                    fontFamily: FONT_SANS,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
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
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{ opacity: 0.7 }}
              >
                <circle
                  cx="7"
                  cy="7"
                  r="4.5"
                  stroke={C.ink}
                  strokeWidth="1.3"
                />
                <path
                  d="M10.5 10.5 L14 14"
                  stroke={C.ink}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              {filtersOpen ? "hide search & filters" : "search notes"}
              {!filtersOpen && activeFilterCount > 0 && (
                <span
                  className="inline-flex items-center justify-center rounded-full w-5 h-5 text-[10px]"
                  style={{
                    color: C.bg,
                    background: C.terra,
                    fontFamily: FONT_SANS,
                    fontWeight: 700,
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {filtersOpen && (
              <div
                className="note-fade-in rounded border mt-3 p-4"
                style={{ borderColor: `${C.ink}18`, background: `${C.ink}04` }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
                  <NoteSelect
                    label="Study"
                    ariaLabel="Filter by study"
                    value={studyFilter}
                    onChange={setStudyFilter}
                    options={studies}
                  />
                  <NoteSelect
                    label="Type"
                    ariaLabel="Filter by note type"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    options={["All Types", ...NOTE_TYPES]}
                  />
                  <div className="sm:col-span-2">
                    <span
                      className="block text-[10px] tracking-[0.2em] uppercase mb-1"
                      style={{
                        color: `${C.ink}66`,
                        fontFamily: FONT_SANS,
                        fontWeight: 600,
                      }}
                    >
                      Search
                    </span>
                    <div className="relative">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ opacity: 0.5 }}
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="4.5"
                          stroke={C.ink}
                          strokeWidth="1.3"
                        />
                        <path
                          d="M10.5 10.5 L14 14"
                          stroke={C.ink}
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
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
                studies={studies.filter((s) => s !== "All Studies")}
                onCancel={() => setDrafting(false)}
                onSaved={(created) => {
                  setNotes((prev) => [created, ...prev])
                  setTab("mine")
                  setDrafting(false)
                }}
              />
            </div>
          )}

          {/* Edit note compose */}
          {editingNote && user && (
            <div className="mb-6">
              <NoteComposer
                user={user}
                editingNote={editingNote}
                studies={studies.filter((s) => s !== "All Studies")}
                onCancel={() => setEditingNote(null)}
                onUpdate={(updated) => {
                  setNotes((prev) =>
                    prev.map((n) => (n.id === updated.id ? updated : n)),
                  )
                  setEditingNote(null)
                }}
              />
            </div>
          )}

          {/* Notes list OR Notifications list */}
          {tab !== "notifications" ? (
            loading ? (
              <div
                className="text-center py-16 rounded border"
                style={{ borderColor: `${C.ink}15`, borderStyle: "dashed" }}
              >
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: "italic",
                    color: `${C.ink}55`,
                    fontSize: "1rem",
                  }}
                >
                  Loading shared notes…
                </p>
              </div>
            ) : loadError ? (
              <div
                className="text-center py-16 rounded border"
                style={{ borderColor: `${C.ink}15`, borderStyle: "dashed" }}
              >
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontStyle: "italic",
                    color: `${C.ink}55`,
                    fontSize: "1rem",
                  }}
                >
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
                    ? note.tag
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                        .filter((t) => t !== "Study Note")
                    : []
                  return (
                    <article
                      key={note.id}
                      data-note-id={note.id}
                      className="rounded border overflow-hidden transition-all duration-200 cursor-pointer"
                      style={{
                        borderColor: expanded ? accent : `${C.ink}20`,
                        background: expanded ? `${accent}06` : C.bg,
                      }}
                      onClick={() => openNote(note.id)}
                    >
                      <div className="flex">
                        <div
                          className="w-1 flex-shrink-0"
                          style={{ background: accent }}
                        />
                        <div className="flex-1 px-5 py-4">
                          {/* Type + scripture */}
                          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                            <TypeBadge type={note.noteType} />
                            {note.study && note.study !== "Isaiah" && (
                              <span
                                className="text-[10px] tracking-[0.16em] uppercase"
                                style={{
                                  color: `${C.ink}55`,
                                  fontFamily: FONT_SANS,
                                  fontWeight: 600,
                                }}
                              >
                                {note.study}
                              </span>
                            )}
                            {note.scripture &&
                            youVersionUrl(note.scripture) ? (
                              <a
                                href={youVersionUrl(note.scripture)!}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-xs inline-flex items-center gap-1 transition-opacity duration-150 hover:opacity-70"
                                style={{
                                  fontFamily: FONT_SERIF,
                                  fontStyle: "italic",
                                  color: `${C.ink}66`,
                                }}
                              >
                                {note.scripture}
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  aria-hidden="true"
                                  style={{ opacity: 0.6 }}
                                >
                                  <path
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </a>
                            ) : (
                              <span
                                className="text-xs"
                                style={{
                                  fontFamily: FONT_SERIF,
                                  fontStyle: "italic",
                                  color: `${C.ink}66`,
                                }}
                              >
                                {note.scripture}
                              </span>
                            )}
                          </div>

                          <h4
                            className="mb-1"
                            style={{
                              fontFamily: FONT_SERIF,
                              fontSize: "1.05rem",
                              fontWeight: 400,
                              color: C.ink,
                            }}
                          >
                            {note.title}
                          </h4>

                          {/* Complementary Verses — rendered as content where body text would be */}
                          {note.noteType === "Complementary Verse" && (() => {
                            const cvs: ComplementaryVerse[] = note.complementaryVerses ?? []
                            const refs = cvs.length > 0
                              ? cvs
                              : note.complementaryBook && note.complementaryChapter
                                ? [{ id: 'legacy', noteId: note.id, book: note.complementaryBook, chapter: note.complementaryChapter, verse: note.complementaryVerse, sortOrder: 0 }]
                                : []
                            if (refs.length === 0) return null
                            return (
                              <div className="mb-1">
                                {refs.map((cv) => {
                                  const label = cvRef(cv)
                                  const url = esvBibleUrl(cv.book, cv.chapter, cv.verse)
                                  return url ? (
                                    <a
                                      key={cv.id}
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1.5 text-sm transition-opacity duration-150 hover:opacity-70"
                                      style={{
                                        fontFamily: FONT_SANS,
                                        color: C.lavender,
                                        lineHeight: "1.8",
                                        fontWeight: 500,
                                        textDecoration: "none",
                                      }}
                                    >
                                      {label}
                                      <svg
                                        width="11"
                                        height="11"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                        style={{ opacity: 0.65, flexShrink: 0 }}
                                      >
                                        <path
                                          d="M7 17L17 7M17 7H7M17 7V17"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span
                                      key={cv.id}
                                      className="inline-flex items-center gap-1.5 text-sm"
                                      style={{
                                        fontFamily: FONT_SANS,
                                        color: C.lavender,
                                        lineHeight: "1.8",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {label}
                                    </span>
                                  )
                                })}
                              </div>
                            )
                          })()}

                          {!expanded ? (
                            note.body ? (
                              <p
                                className="text-sm"
                                style={
                                  {
                                    fontFamily: FONT_SANS,
                                    color: `${C.ink}77`,
                                    lineHeight: "1.6",
                                    whiteSpace: "pre-wrap",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                  } as React.CSSProperties
                                }
                              >
                                {note.body}
                              </p>
                            ) : note.noteType !== "Complementary Verse" ? (
                              <p
                                className="text-sm italic"
                                style={{
                                  fontFamily: FONT_SANS,
                                  color: `${C.ink}44`,
                                  lineHeight: "1.6",
                                }}
                              >
                                No written note yet.
                              </p>
                            ) : null
                          ) : (
                            note.body ? (
                              <p
                                className="text-sm mt-1 leading-relaxed whitespace-pre-line"
                                style={{
                                  fontFamily: FONT_SANS,
                                  color: `${C.ink}bb`,
                                  lineHeight: "1.8",
                                }}
                              >
                                {note.body}
                              </p>
                            ) : null
                          )}

                          {tags.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap mt-2">
                              {tags.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] px-2 py-0.5 rounded-full"
                                  style={{
                                    background: `${C.ink}0a`,
                                    border: `1px solid ${C.ink}18`,
                                    color: `${C.ink}66`,
                                    fontFamily: FONT_SANS,
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Footer */}
                          <div
                            className="mt-3 pt-3 flex items-center gap-2 flex-wrap border-t"
                            style={{ borderColor: `${C.ink}12` }}
                          >
                            <Avatar
                              name={note.authorName}
                              color={note.authorColor}
                              initials={note.authorInitials}
                            />
                            <span
                              className="text-xs font-semibold"
                              style={{
                                color: note.authorColor,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {note.authorName}
                            </span>
                            {note.authorId === user?.id && (
                              <span
                                className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm"
                                style={{
                                  color: "#fff",
                                  background: note.authorColor,
                                  fontFamily: FONT_SANS,
                                  fontWeight: 600,
                                }}
                              >
                                you
                              </span>
                            )}
                            <span
                              className="text-xs"
                              style={{
                                color: `${C.ink}44`,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              ·
                            </span>
                            <span
                              className="text-xs"
                              style={{
                                color: `${C.ink}55`,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {note.date}
                            </span>
                            <div className="flex-1" />
                            <span
                              className="text-xs"
                              style={{
                                color: `${C.ink}55`,
                                fontFamily: FONT_SANS,
                              }}
                            >
                              {replies.length}{" "}
                              {replies.length === 1 ? "reply" : "replies"}
                            </span>
                            {!expanded && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openReply(note.id)
                                }}
                                className="text-xs px-3 py-2 rounded-sm transition-all duration-150 cursor-pointer inline-flex items-center gap-1"
                                style={{
                                  color: C.olive,
                                  border: `1px solid ${C.olive}40`,
                                  fontFamily: FONT_SANS,
                                  fontWeight: 600,
                                  background: "transparent",
                                }}
                              >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ opacity: 0.8 }}>
                                  <path
                                    d="M12 21 C7 21 4 17.5 4 13 C4 8.5 7.5 5 12 5 C16.5 5 20 8.5 20 13 C20 15.5 18.8 17.5 17 19 L20 21 Z"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path d="M8 12 H16 M12 8 V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                                reply
                              </button>
                            )}
                            {expanded && note.authorId === user?.id && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setEditingNote(note)
                                    setPendingDelete(null)
                                  }}
                                  className="text-xs px-2 py-1.5 rounded-sm transition-all duration-150 cursor-pointer"
                                  style={{
                                    color: `${C.ink}66`,
                                    border: `1px solid ${C.ink}22`,
                                    fontFamily: FONT_SANS,
                                    background: `${C.ink}04`,
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setPendingDelete(note.id)
                                  }}
                                  aria-label="Delete note"
                                  className="text-xs min-w-[32px] min-h-[32px] rounded-sm transition-all duration-150 cursor-pointer inline-flex items-center justify-center"
                                  style={{
                                    color: `${C.rose}99`,
                                    border: `1px solid ${C.rose}25`,
                                    fontFamily: FONT_SANS,
                                    background: `${C.rose}06`,
                                  }}
                                >
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>

                          {/* Delete confirmation */}
                          {expanded && pendingDelete === note.id && (
                            <div
                              className="mt-3 rounded border px-4 py-3 flex items-center justify-between gap-3 flex-wrap"
                              style={{
                                borderColor: `${C.rose}30`,
                                background: `${C.rose}06`,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <p
                                className="text-sm"
                                style={{
                                  fontFamily: FONT_SANS,
                                  color: `${C.ink}88`,
                                  lineHeight: "1.5",
                                }}
                              >
                                Are you sure you want to delete this note?
                              </p>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Button
                                  size="sm"
                                  onClick={() => setPendingDelete(null)}
                                >
                                  cancel
                                </Button>
                                <Button
                                  size="sm"
                                  variant="solid"
                                  onClick={() => {
                                    setPendingDelete(null)
                                    void deleteNote(note.id)
                                  }}
                                >
                                  delete
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Discussion / replies */}
                          {expanded && (
                            <div
                              className="mt-4 pt-4 border-t"
                              style={{ borderColor: `${C.ink}12` }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <p
                                className="text-[10px] tracking-[0.25em] uppercase mb-3"
                                style={{
                                  color: `${C.ink}55`,
                                  fontFamily: FONT_SANS,
                                  fontWeight: 600,
                                }}
                              >
                                discussion · {replies.length}{" "}
                                {replies.length === 1 ? "reply" : "replies"}
                              </p>

                              {replies.length > 0 ? (
                                <div className="space-y-3 mb-4">
                                  {replies.map((r) => (
                                    <div
                                      key={r.id}
                                      className="rounded border px-3 py-2.5"
                                      style={{
                                        borderColor: `${C.ink}18`,
                                        background: `${C.ink}04`,
                                      }}
                                    >
                                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                        <Avatar
                                          name={r.authorName}
                                          color={r.authorColor}
                                          initials={r.authorInitials}
                                        />
                                        <span
                                          className="text-xs font-semibold"
                                          style={{
                                            color: r.authorColor,
                                            fontFamily: FONT_SANS,
                                          }}
                                        >
                                          {r.authorName}
                                        </span>
                                        <span
                                          className="text-xs"
                                          style={{
                                            color: `${C.ink}44`,
                                            fontFamily: FONT_SANS,
                                          }}
                                        >
                                          ·
                                        </span>
                                        <span
                                          className="text-xs"
                                          style={{
                                            color: `${C.ink}55`,
                                            fontFamily: FONT_SANS,
                                          }}
                                        >
                                          {r.date}
                                        </span>
                                      </div>
                                      <p
                                        className="text-sm whitespace-pre-line"
                                        style={{
                                          fontFamily: FONT_SANS,
                                          color: `${C.ink}bb`,
                                          lineHeight: "1.7",
                                        }}
                                      >
                                        {r.body}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p
                                  className="text-sm italic mb-4"
                                  style={{
                                    fontFamily: FONT_SERIF,
                                    color: `${C.ink}55`,
                                  }}
                                >
                                  No replies yet — start the discussion.
                                </p>
                              )}

                              {user ? (
                                <div className="flex items-start gap-2">
                                  <textarea
                                    rows={2}
                                    ref={replyInputRef}
                                    placeholder="Write a reply…"
                                    value={replyBody}
                                    onChange={(e) => setReplyBody(e.target.value)}
                                    className="flex-1 rounded-sm px-3 py-2 text-sm outline-none resize-none"
                                    style={{ ...inputStyle, lineHeight: "1.6" }}
                                  />
                                  <Button
                                    size="sm"
                                    variant="solid"
                                    onClick={() => void submitReply()}
                                    disabled={!replyBody.trim()}
                                  >
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
                  <div
                    className="text-center py-16 rounded border"
                    style={{ borderColor: `${C.ink}15`, borderStyle: "dashed" }}
                  >
                    <p
                      style={{
                        fontFamily: FONT_SERIF,
                        fontStyle: "italic",
                        color: `${C.ink}55`,
                        fontSize: "1rem",
                      }}
                    >
                      {scoped.length === 0
                        ? tab === "mine"
                          ? "You have not written any notes yet. Begin studying and record your reflections."
                          : "No community notes yet. Be the first to share an insight."
                        : "No notes match your filters."}
                    </p>
                  </div>
                )}
              </div>
            )
          ) : (
            /* Notifications tab */
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <div
                  className="text-center py-16 rounded border"
                  style={{ borderColor: `${C.ink}15`, borderStyle: "dashed" }}
                >
                  <p
                    style={{
                      fontFamily: FONT_SERIF,
                      fontStyle: "italic",
                      color: `${C.ink}55`,
                      fontSize: "1rem",
                    }}
                  >
                    No notifications yet. You will see a notification when
                    someone replies to one of your notes.
                  </p>
                </div>
              ) : (
                <>
                  {unreadCount > 0 && (
                    <div className="flex justify-end mb-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (userId) {
                            markAllNotificationsRead(userId)
                            setNotifications((prev) =>
                              prev.map((n) => ({ ...n, read: true })),
                            )
                          }
                        }}
                        className="text-xs tracking-[0.12em] uppercase cursor-pointer transition-colors duration-150"
                        style={{
                          fontFamily: FONT_SANS,
                          fontWeight: 600,
                          color: `${C.ink}55`,
                        }}
                      >
                        mark all as read
                      </button>
                    </div>
                  )}
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="rounded border overflow-hidden transition-all duration-200"
                      style={{
                        borderColor: n.read ? `${C.ink}18` : `${C.goldDeep}40`,
                        background: n.read ? C.bg : `${C.goldDeep}06`,
                      }}
                    >
                      <div className="flex">
                        {!n.read && (
                          <div
                            className="w-1 flex-shrink-0"
                            style={{ background: C.goldDeep }}
                          />
                        )}
                        <div className="flex-1 px-5 py-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className="text-[10px] tracking-[0.16em] uppercase px-2 py-0.5 rounded-sm"
                              style={{
                                color: C.terra,
                                background: `${C.terra}12`,
                                border: `1px solid ${C.terra}38`,
                                fontFamily: FONT_SANS,
                                fontWeight: 600,
                              }}
                            >
                              REPLY
                            </span>
                            {!n.read && (
                              <span
                                className="text-[10px] tracking-[0.12em] uppercase px-1.5 py-0.5 rounded-sm"
                                style={{
                                  color: "#fff",
                                  background: C.goldDeep,
                                  fontFamily: FONT_SANS,
                                  fontWeight: 600,
                                }}
                              >
                                new
                              </span>
                            )}
                          </div>

                          <p
                            className="text-sm mb-1"
                            style={{
                              fontFamily: FONT_SANS,
                              color: `${C.ink}88`,
                              lineHeight: "1.5",
                            }}
                          >
                            <span
                              className="font-semibold"
                              style={{ color: C.terra }}
                            >
                              {n.replyAuthor}
                            </span>{" "}
                            replied to your note
                          </p>

                          <h4
                            className="mb-1.5"
                            style={{
                              fontFamily: FONT_SERIF,
                              fontSize: "1.05rem",
                              fontWeight: 400,
                              color: C.ink,
                            }}
                          >
                            {n.noteTitle}
                          </h4>

                          <p
                            className="text-sm italic mb-2"
                            style={{
                              fontFamily: FONT_SANS,
                              color: `${C.ink}66`,
                              lineHeight: "1.6",
                            }}
                          >
                            &ldquo;{n.replyBody.length > 120
                              ? n.replyBody.slice(0, 120) + "…"
                              : n.replyBody}&rdquo;
                          </p>

                          <div className="flex items-center gap-2 text-xs mb-3" style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>
                            <span>{n.noteScripture}</span>
                            <span>·</span>
                            <span>{n.replyDate}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => viewNotification(n)}
                            className="text-xs px-3 py-2 rounded-sm transition-all duration-150 cursor-pointer inline-flex items-center gap-1.5"
                            style={{
                              color: C.goldDeep,
                              border: `1px solid ${C.goldDeep}40`,
                              fontFamily: FONT_SANS,
                              fontWeight: 600,
                              background: `${C.goldDeep}08`,
                            }}
                          >
                            View Reply
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M5 12 H19 M14 7 L19 12 L14 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </>
      )}
    </section>
  )
}
