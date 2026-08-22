import { useEffect, useRef, useState } from 'react'
import Button from '@/components/Button'
import {
  createNote,
  updateNote,
  esvBibleUrl,
  saveComplementaryVerses,
  fetchComplementaryVerses,
  cvRef,
  NOTE_TYPES,
  noteTypeColor,
  type NewNote,
  type StudyNote,
  type ComplementaryVerse,
} from '@/lib/notesApi'
import { getBibleBooks, getChapterCount, getVerseCount } from '@/data/bibleBooks'
import { suggestTags } from '@/lib/tagSuggestions'
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

export interface CvDraft {
  book: string
  chapter: string
  verse: string
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

// Custom dropdown replacing the native <select>. Supports both scrolling and
// typing/search. A search input appears at the top of the panel when open.
export function NoteDropdown({
  label, ariaLabel, value, options, onChange, highlight, placeholder,
}: {
  label: string
  ariaLabel: string
  value: string
  options: string[]
  onChange: (v: string) => void
  highlight?: (v: string) => string
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setSearch('')
    setTimeout(() => searchRef.current?.focus(), 80)
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
  const displayValue = value || placeholder || value
  const q = search.trim().toLowerCase()
  const filtered = q ? options.filter((o) => o.toLowerCase().includes(q)) : options

  function onSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered.length === 1) {
        onChange(filtered[0])
        setOpen(false)
      } else {
        const exact = filtered.find((o) => o.toLowerCase() === q)
        if (exact) {
          onChange(exact)
          setOpen(false)
        }
      }
    }
  }

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
            color: value ? C.ink : `${C.ink}55`,
            fontWeight: accent ? 600 : 400,
          }}
        >
          {displayValue}
        </button>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <path d="M4 6 L8 10 L12 6" stroke={accent ?? C.ink} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {open && (
          <div role="listbox" className="note-drop-panel absolute z-50 mt-1 w-full rounded-sm border"
            style={{ background: C.bg, borderColor: `${C.ink}25`, boxShadow: '0 6px 22px rgba(46,45,42,0.14)' }}>
            {options.length > 6 && (
              <div style={{ borderBottom: `1px solid ${C.ink}12`, padding: '4px 6px' }}>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Type to search\u2026"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={onSearchKeyDown}
                  className="w-full px-2 py-1.5 text-sm rounded-sm outline-none"
                  style={{
                    fontFamily: FONT_SANS,
                    background: `${C.ink}06`,
                    border: `1px solid ${C.ink}12`,
                    color: C.ink,
                  }}
                />
              </div>
            )}
            <div style={{ maxHeight: 'min(200px, 40vh)', overflowY: 'auto' }}>
              {filtered.length === 0 && (
                <div className="px-3 py-2.5 text-xs" style={{ color: `${C.ink}44`, fontFamily: FONT_SANS }}>
                  {q ? 'No matches' : 'No options available'}
                </div>
              )}
              {filtered.map((o) => {
                const active = o === value
                const oColor = highlight?.(o) ?? C.ink
                return (
                  <button key={o} type="button" role="option" aria-selected={active}
                    onPointerDown={(e) => e.stopPropagation()}
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
  editingNote,
  studies,
  accent = C.terra,
  onSaved,
  onUpdate,
  onCancel,
}: {
  user: User
  initialDraft?: Partial<NewNote>
  editingNote?: StudyNote
  studies: string[]
  accent?: string
  onSaved?: (note: StudyNote) => void
  onUpdate?: (note: StudyNote) => void
  onCancel: () => void
}) {
  const isEditing = !!editingNote
  const [draft, setDraft] = useState(() => {
    if (editingNote) {
      return {
        study: editingNote.study || 'Isaiah',
        scripture: editingNote.scripture || '',
        noteType: editingNote.noteType || 'Question',
        title: editingNote.title || '',
        tag: editingNote.tag || '',
        body: editingNote.body || '',
      }
    }
    return {
      study: initialDraft?.study ?? 'Isaiah',
      scripture: initialDraft?.scripture ?? '',
      noteType: initialDraft?.noteType ?? 'Question',
      title: initialDraft?.title ?? '',
      tag: initialDraft?.tag ?? '',
      body: initialDraft?.body ?? '',
      part: initialDraft?.part,
      week: initialDraft?.week,
      chapter: initialDraft?.chapter,
    }
  })
  const [complementaryVerses, setComplementaryVerses] = useState<CvDraft[]>(() => {
    if (editingNote?.complementaryVerses && editingNote.complementaryVerses.length > 0) {
      return editingNote.complementaryVerses.map((v) => ({
        book: v.book,
        chapter: String(v.chapter),
        verse: v.verse != null ? String(v.verse) : '',
      }))
    }
    if (editingNote?.complementaryBook) {
      return [{
        book: editingNote.complementaryBook,
        chapter: editingNote.complementaryChapter?.toString() || '',
        verse: editingNote.complementaryVerse?.toString() || '',
      }]
    }
    return [{ book: '', chapter: '', verse: '' }]
  })
  const [saveError, setSaveError] = useState(false)
  const [saveErrorMessage, setSaveErrorMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const existing = (editingNote?.tag || '').split(',').map(t => t.trim()).filter(Boolean).filter(t => t !== 'Study Note')
    return existing
  })
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [showManualInput, setShowManualInput] = useState(false)
  const [manualTagInput, setManualTagInput] = useState('')
  const tagInputRef = useRef<HTMLInputElement>(null)

  const inputStyle = {
    fontFamily: FONT_SANS,
    background: C.bg,
    border: `1px solid ${C.ink}25`,
    color: C.ink,
    borderRadius: 2,
  }

  const isComplementaryVerse = draft.noteType === 'Complementary Verse'

  // Generate tag suggestions when content changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const newSuggestions = suggestTags(draft.title, draft.body, draft.scripture)
      setSuggestedTags(newSuggestions)
    }, 600)
    return () => clearTimeout(timer)
  }, [draft.title, draft.body, draft.scripture])

  function updateCv(index: number, field: keyof CvDraft, value: string) {
    setComplementaryVerses((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      if (field === 'book') {
        next[index] = { ...next[index], chapter: '', verse: '' }
      }
      if (field === 'chapter') {
        next[index] = { ...next[index], verse: '' }
      }
      return next
    })
  }

  function addCv() {
    setComplementaryVerses((prev) => [...prev, { book: '', chapter: '', verse: '' }])
  }

  function removeCv(index: number) {
    setComplementaryVerses((prev) => prev.filter((_, i) => i !== index))
  }

  async function saveNote() {
    const errors: string[] = []
    if (!draft.scripture.trim()) errors.push('Scripture reference is required')
    if (!draft.title.trim()) errors.push('Title is required')
    if (!isComplementaryVerse && !draft.body.trim()) errors.push('Note is required')
    if (isComplementaryVerse) {
      const validCvs = complementaryVerses.filter((v) => v.book && v.chapter)
      if (validCvs.length === 0) errors.push('At least one complementary verse is required')
    }
    if (errors.length > 0) {
      setSaveError(true)
      setSaveErrorMessage(errors[0])
      return
    }
    if (saving) return
    setSaveError(false)
    setSaveErrorMessage('')
    setSaving(true)
    const finalTag = selectedTags.length > 0 ? selectedTags.join(', ') : 'Study Note'
    // Build the first valid CV for the legacy single fields (backward compat)
    const firstValidCv = isComplementaryVerse
      ? complementaryVerses.find((v) => v.book && v.chapter)
      : undefined
    const cvBook = firstValidCv?.book ?? ''
    const rawCvChapter = firstValidCv?.chapter ? parseInt(firstValidCv.chapter, 10) : undefined
    const rawCvVerse = firstValidCv?.verse ? parseInt(firstValidCv.verse, 10) : undefined
    const cvChapter = rawCvChapter != null && !isNaN(rawCvChapter) ? rawCvChapter : undefined
    const cvVerse = rawCvVerse != null && !isNaN(rawCvVerse) ? rawCvVerse : undefined
    try {
      let savedNote: StudyNote
      if (isEditing && editingNote) {
        await updateNote(editingNote.id, {
          title: draft.title.trim(),
          body: draft.body.trim(),
          tag: finalTag,
          noteType: draft.noteType || 'Question',
          scripture: draft.scripture.trim(),
          complementaryBook: cvBook || undefined,
          complementaryChapter: cvChapter,
          complementaryVerse: cvVerse,
        })
        savedNote = {
          ...editingNote,
          title: draft.title.trim(),
          body: draft.body.trim(),
          tag: finalTag,
          noteType: draft.noteType || 'Question',
          scripture: draft.scripture.trim(),
          complementaryBook: cvBook || undefined,
          complementaryChapter: cvChapter,
          complementaryVerse: cvVerse,
        }
        // Defer onUpdate for CV notes — will fire after CV save below
        if (!isComplementaryVerse) onUpdate?.(savedNote)
      } else {
        savedNote = await createNote({
          authorId: user.id,
          authorName: user.name,
          authorColor: user.color,
          authorInitials: user.initials,
          study: draft.study || 'Isaiah',
          part: draft.part,
          week: draft.week,
          chapter: draft.chapter,
          scripture: draft.scripture.trim(),
          noteType: draft.noteType || 'Question',
          title: draft.title.trim(),
          body: draft.body.trim(),
          tag: finalTag,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          complementaryBook: cvBook || undefined,
          complementaryChapter: cvChapter,
          complementaryVerse: cvVerse,
        })
        // Defer onSaved for CV notes — will fire after CV save below
        if (!isComplementaryVerse) onSaved?.(savedNote)
      }
      // Save complementary verses to the new table (non-blocking: if the
      // table doesn't exist yet the note itself is still saved successfully).
      if (isComplementaryVerse) {
        const validCvs = complementaryVerses
          .filter((v) => v.book && v.chapter)
          .map((v) => ({
            book: v.book,
            chapter: parseInt(v.chapter, 10),
            verse: v.verse ? parseInt(v.verse, 10) : undefined,
          }))
        try {
          await saveComplementaryVerses(savedNote.id, validCvs)
          const freshCvs = await fetchComplementaryVerses(savedNote.id)
          savedNote = { ...savedNote, complementaryVerses: freshCvs }
        } catch (cvErr) {
          console.warn('[NoteComposer] CV save failed (note was saved):', cvErr)
        }
        if (isEditing) {
          onUpdate?.(savedNote)
        } else {
          onSaved?.(savedNote)
        }
      }
    } catch (err) {
      console.error('[NoteComposer] save failed:', err)
      setSaveError(true)
      setSaveErrorMessage(err instanceof Error ? err.message : 'Could not save your note. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="rounded border"
      style={{ borderColor: `${accent}45`, background: `${accent}07` }}>
      <div className="px-5 py-3 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${accent}20` }}>
        <Avatar name={user.name} color={user.color} initials={user.initials} />
        <span className="text-xs tracking-widest uppercase"
          style={{ color: accent, fontFamily: FONT_SANS, fontWeight: 600 }}>
          {isEditing ? 'editing note' : user.name}
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

        {isComplementaryVerse && (
          <div className="rounded-sm p-3 space-y-3"
            style={{ background: `${C.lavender}08`, border: `1px solid ${C.lavender}25` }}>
            <span className="block text-[10px] tracking-[0.2em] uppercase"
              style={{ color: C.lavender, fontFamily: FONT_SANS, fontWeight: 600 }}>
              Complementary Verse{complementaryVerses.length !== 1 ? 's' : ''} Reference
            </span>
            {complementaryVerses.map((cv, i) => {
              const cvLabel = cv.book && cv.chapter
                ? `${cv.book} ${cv.chapter}${cv.verse ? `:${cv.verse}` : ''}`
                : ''
              return (
                <div key={i} className="space-y-2">
                  {complementaryVerses.length > 1 && (
                    <span className="block text-[10px] tracking-[0.12em] uppercase"
                      style={{ color: `${C.ink}55`, fontFamily: FONT_SANS, fontWeight: 600 }}>
                      Verse {i + 1}
                    </span>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <NoteDropdown
                      label="Book"
                      ariaLabel={`Complementary book ${i + 1}`}
                      value={cv.book}
                      placeholder="Select book"
                      options={getBibleBooks()}
                      onChange={(v) => updateCv(i, 'book', v)}
                      highlight={() => C.lavender}
                    />
                    <NoteDropdown
                      label="Chapter"
                      ariaLabel={`Complementary chapter ${i + 1}`}
                      value={cv.chapter}
                      placeholder="Ch."
                      options={cv.book && getChapterCount(cv.book)
                        ? Array.from({ length: getChapterCount(cv.book)! }, (_, j) => String(j + 1))
                        : []}
                      onChange={(v) => updateCv(i, 'chapter', v)}
                    />
                    <NoteDropdown
                      label="Verse"
                      ariaLabel={`Complementary verse ${i + 1}`}
                      value={cv.verse}
                      placeholder="Verse"
                      options={cv.book && cv.chapter && getVerseCount(cv.book, Number(cv.chapter))
                        ? Array.from({ length: getVerseCount(cv.book, Number(cv.chapter))! }, (_, j) => String(j + 1))
                        : []}
                      onChange={(v) => updateCv(i, 'verse', v)}
                    />
                  </div>
                  {cvLabel && (
                    <p className="text-xs" style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>
                      Will link to: <a
                        href={esvBibleUrl(cv.book, Number(cv.chapter), cv.verse ? Number(cv.verse) : undefined) ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.lavender, textDecoration: 'underline', textDecorationColor: `${C.lavender}40`, fontWeight: 500 }}
                      >{cvLabel}</a>
                    </p>
                  )}
                  {complementaryVerses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCv(i)}
                      className="text-[11px] cursor-pointer"
                      style={{ color: C.rose, fontFamily: FONT_SANS, fontWeight: 600 }}
                    >
                      {'\u00D7'} Remove
                    </button>
                  )}
                </div>
              )
            })}
            <button
              type="button"
              onClick={addCv}
              className="text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                border: `1px dashed ${C.lavender}44`,
                color: C.lavender,
              }}
            >
              + Add another verse
            </button>
          </div>
        )}

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
            Your Note{isComplementaryVerse ? ' (optional)' : ''}
          </span>
          <textarea rows={5} placeholder={isComplementaryVerse ? "Optional commentary on these passages…" : "Write your thought, question, or insight…"}
            value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            className="w-full rounded-sm px-3 py-2 text-sm outline-none resize-none"
            style={{ ...inputStyle, lineHeight: '1.7' }} />
        </label>

        {/* Tag suggestions */}
        <div>
          <span className="block text-[10px] tracking-[0.2em] uppercase mb-1.5"
            style={{ color: `${C.ink}66`, fontFamily: FONT_SANS, fontWeight: 600 }}>
            Suggested tags
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedTags.length === 0 && selectedTags.length === 0 && (
              <span className="text-[11px]" style={{ color: `${C.ink}44`, fontFamily: FONT_SANS }}>
                {draft.title.length + draft.body.length < 10
                  ? 'Start writing to see suggested tags…'
                  : 'No tags matched your note content.'}
              </span>
            )}
            {suggestedTags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTags((prev) => prev.filter((t) => t !== tag))
                    } else if (selectedTags.length < 5) {
                      setSelectedTags((prev) => [...prev, tag])
                    }
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  style={{
                    fontFamily: FONT_SANS,
                    border: isSelected
                      ? `1px solid ${C.goldDeep}`
                      : `1px solid ${C.ink}18`,
                    background: isSelected ? `${C.goldDeep}18` : `${C.ink}06`,
                    color: isSelected ? '#8a6a00' : `${C.ink}88`,
                  }}
                >
                  {tag}{isSelected ? ' \u2713' : ''}
                </button>
              )
            })}
          </div>
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                  style={{
                    fontFamily: FONT_SANS,
                    background: `${C.goldDeep}18`,
                    border: `1px solid ${C.goldDeep}44`,
                    color: '#8a6a00',
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`Remove tag ${tag}`}
                    onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
                    className="ml-0.5 text-[10px] opacity-60 hover:opacity-100 cursor-pointer"
                  >
                    {'\u00D7'}
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Manual tag input */}
        <div className="flex flex-wrap items-center gap-1.5">
          {!showManualInput ? (
            <button
              type="button"
              onClick={() => { setShowManualInput(true); setTimeout(() => tagInputRef.current?.focus(), 50) }}
              className="text-[11px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              style={{
                fontFamily: FONT_SANS,
                border: `1px dashed ${C.ink}22`,
                color: `${C.ink}55`,
              }}
            >
              + Add tag
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <input
                ref={tagInputRef}
                type="text"
                placeholder="Custom tag…"
                value={manualTagInput}
                onChange={(e) => setManualTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const trimmed = manualTagInput.trim()
                    if (trimmed && selectedTags.length < 5 && !selectedTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
                      setSelectedTags((prev) => [...prev, trimmed])
                    }
                    setManualTagInput('')
                    setShowManualInput(false)
                  }
                  if (e.key === 'Escape') {
                    setManualTagInput('')
                    setShowManualInput(false)
                  }
                }}
                onBlur={() => {
                  const trimmed = manualTagInput.trim()
                  if (trimmed && selectedTags.length < 5 && !selectedTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
                    setSelectedTags((prev) => [...prev, trimmed])
                  }
                  setManualTagInput('')
                  setShowManualInput(false)
                }}
                className="rounded-full px-2.5 py-1 text-[11px] outline-none"
                style={{
                  fontFamily: FONT_SANS,
                  border: `1px solid ${C.ink}18`,
                  background: `${C.ink}06`,
                  color: `${C.ink}aa`,
                  width: '120px',
                }}
              />
            </div>
          )}
          {selectedTags.length >= 5 && (
            <span className="text-[10px]" style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>
              Max 5 tags
            </span>
          )}
        </div>

        {saveError && (
          <p className="text-xs" style={{ fontFamily: FONT_SANS, color: C.rose }}>
            {saveErrorMessage || 'Could not save your note. Please try again.'}
          </p>
        )}
        <div className="flex justify-end">
          <Button onClick={() => void saveNote()} variant="solid" size="sm" disabled={saving}>
            {saving ? 'saving…' : isEditing ? 'save changes' : 'save note'}
          </Button>
        </div>
      </div>
    </div>
  )
}
