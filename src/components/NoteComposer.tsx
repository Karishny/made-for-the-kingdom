import { useEffect, useRef, useState } from 'react'
import Button from '@/components/Button'
import {
  createNote,
  NOTE_TYPES,
  noteTypeColor,
  type NewNote,
  type StudyNote,
} from '@/lib/notesApi'
import type { User } from '@/context/UserContext'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89',
}

const FONT_SANS = "'Source Sans 3', sans-serif"
const FONT_SERIF = "'Fraunces', serif"

export const DEFAULT_DRAFT = {
  study: 'Isaiah',
  scripture: '',
  noteType: 'Question',
  title: '',
  tag: '',
  body: '',
}

export function Avatar({ name, color, initials }: { name: string; color: string; initials: string }) {
  return (
    <div
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
      title={name}
      style={{ background: `${color}25`, color, border: `1.5px solid ${color}55`, fontFamily: FONT_SANS }}
    >
      {initials}
    </div>
  )
}

// Custom dropdown replacing the native <select>. The opening is a short, calm
// ease-out (fade + gentle slide) tuned for touch, instead of the OS picker.
export function NoteDropdown({
  label, ariaLabel, value, options, onChange, highlight,
}: {
  label: string
  ariaLabel: string
  value: string
  options: string[]
  onChange: (v: string) => void
  highlight?: (v: string) => string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const accent = highlight ? highlight(value) : undefined

  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.2em] uppercase mb-1"
        style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
        {label}
      </span>
      <div className="relative" ref={ref}>
        <button
          type="button"
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="w-full rounded-sm px-3 py-2 pr-8 text-sm text-left cursor-pointer outline-none"
          style={{
            fontFamily: FONT_SANS,
            background: C.bg,
            border: `1px solid ${accent ? `${accent}55` : `${C.ink}25`}`,
            color: C.ink,
            fontWeight: accent ? 600 : 400,
          }}
        >
          {value}
        </button>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <path d="M4 6 L8 10 L12 6" stroke={accent ?? C.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {open && (
          <div role="listbox" className="note-drop-panel absolute z-30 mt-1 w-full rounded-sm border overflow-hidden"
            style={{ background: C.bg, borderColor: `${C.ink}25`, boxShadow: '0 6px 22px rgba(46,45,42,0.14)' }}>
            {options.map((o) => {
              const active = o === value
              const oColor = highlight?.(o) ?? C.ink
              return (
                <button key={o} type="button" role="option" aria-selected={active}
                  onClick={() => { onChange(o); setOpen(false) }}
                  className="block w-full text-left px-3 py-2.5 text-sm transition-colors duration-100 cursor-pointer"
                  style={{
                    fontFamily: FONT_SANS,
                    color: active ? oColor : C.ink,
                    background: active ? `${C.ink}08` : 'transparent',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {o}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </label>
  )
}

// Shared note composer. Used on the study week page (inline) and on the Notes
// page, so the compose experience stays identical everywhere.
export default function NoteComposer({
  user,
  initialDraft,
  studies,
  accent = C.terra,
  onSaved,
  onCancel,
}: {
  user: User
  initialDraft?: Partial<NewNote>
  studies: string[]
  accent?: string
  onSaved: (note: StudyNote) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState(() => ({ ...DEFAULT_DRAFT, ...initialDraft }))
  const [saveError, setSaveError] = useState(false)
  const [saving, setSaving] = useState(false)

  const inputStyle = {
    fontFamily: FONT_SANS,
    background: C.bg,
    border: `1px solid ${C.ink}25`,
    color: C.ink,
    borderRadius: 2,
  }

  async function saveNote() {
    if (!draft.body.trim() || saving) return
    setSaveError(false)
    setSaving(true)
    try {
      const created = await createNote({
        authorId: user.id,
        authorName: user.name,
        authorColor: user.color,
        authorInitials: user.initials,
        study: draft.study || 'Isaiah',
        part: draft.part,
        week: draft.week,
        chapter: draft.chapter,
        scripture: draft.scripture || 'Isaiah',
        noteType: draft.noteType || 'Question',
        title: draft.title.trim() || 'Untitled Note',
        body: draft.body.trim(),
        tag: draft.tag.trim() || 'Study Note',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      })
      onSaved(created)
    } catch {
      setSaveError(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded border overflow-hidden"
      style={{ borderColor: `${accent}45`, background: `${accent}07` }}>
      <div className="px-5 py-3 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${accent}20` }}>
        <Avatar name={user.name} color={user.color} initials={user.initials} />
        <span className="text-xs tracking-widest uppercase"
          style={{ color: accent, fontFamily: FONT_SANS, fontWeight: 600 }}>
          {user.name}
        </span>
        <div className="flex-1" />
        <button onClick={onCancel} className="text-xs cursor-pointer"
          style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>
          Cancel
        </button>
      </div>

      <div className="p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <NoteDropdown label="Study" ariaLabel="Note study" value={draft.study}
            onChange={(v) => setDraft({ ...draft, study: v })}
            options={studies} />
          <label className="block">
            <span className="block text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
              Scripture Reference
            </span>
            <input type="text" placeholder="Isaiah 6:1-8"
              value={draft.scripture} onChange={(e) => setDraft({ ...draft, scripture: e.target.value })}
              className="w-full rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle} />
          </label>
        </div>

        <NoteDropdown label="What are you sharing?" ariaLabel="Note type" value={draft.noteType}
          onChange={(v) => setDraft({ ...draft, noteType: v })}
          options={[...NOTE_TYPES]}
          highlight={noteTypeColor} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
              Note Title
            </span>
            <input type="text" placeholder="A short headline for your note…"
              value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle} />
          </label>
          <label className="block">
            <span className="block text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
              Tags (optional)
            </span>
            <input type="text" placeholder="Prayer, Comfort, Faith…"
              value={draft.tag} onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
              className="w-full rounded-sm px-3 py-2 text-sm outline-none"
              style={inputStyle} />
          </label>
        </div>

        <label className="block">
          <span className="block text-[10px] tracking-[0.2em] uppercase mb-1"
            style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
            Your Note
          </span>
          <textarea rows={5} placeholder="Write your thought, question, or insight…"
            value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            className="w-full rounded-sm px-3 py-2 text-sm outline-none resize-none"
            style={{ ...inputStyle, lineHeight: '1.7' }} />
        </label>

        {saveError && (
          <p className="text-xs" style={{ fontFamily: FONT_SANS, color: C.rose }}>
            Could not save your note. Please try again.
          </p>
        )}
        <div className="flex justify-end">
          <Button onClick={() => void saveNote()} variant="solid" size="sm" disabled={!draft.body.trim() || saving}>
            {saving ? 'saving…' : 'save note'}
          </Button>
        </div>
      </div>
    </div>
  )
}
