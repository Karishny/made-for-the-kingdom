import { useState, useEffect, useCallback } from 'react'
import { ISAIAH_CHAPTERS, PARTS, ISAIAH_VERSE_COUNTS, BIBLEHUB_VERSION, type BibleVersion, type ChapterData } from '@/data/isaiah'
import { useUser } from '@/context/UserContext'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  plum: '#332a37', rose: '#a84c5c',
}

const VERSIONS: BibleVersion[] = ['KJV', 'NKJV', 'ESV', 'NIV']

interface Highlight { verseRef: string; chapterNum: number; color: string; userId: string }

function loadHighlights(userId: string): Highlight[] {
  try { return JSON.parse(localStorage.getItem(`mftk_hl_${userId}`) ?? '[]') } catch { return [] }
}
function saveHighlights(userId: string, data: Highlight[]) {
  localStorage.setItem(`mftk_hl_${userId}`, JSON.stringify(data))
}

const HIGHLIGHT_COLORS = [
  { label: 'Gold',     value: '#cfac2960' },
  { label: 'Terra',    value: '#a85b3160' },
  { label: 'Olive',    value: '#949b6160' },
  { label: 'Lavender', value: '#927f9b60' },
  { label: 'Rose',     value: '#a84c5c60' },
]

// ── Translation badge ─────────────────────────────────────────────────────────
function VersionBadge({ version }: { version: BibleVersion }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold tracking-widest"
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        color: C.terra,
        background: `${C.terra}12`,
        border: `1px solid ${C.terra}35`,
      }}
    >
      {version}
    </span>
  )
}

// ── Version toggle ────────────────────────────────────────────────────────────
function VersionToggle({ version, onChange }: { version: BibleVersion; onChange: (v: BibleVersion) => void }) {
  return (
    <div className="inline-flex rounded-sm overflow-hidden border" style={{ borderColor: `${C.terra}35` }}>
      {VERSIONS.map((v) => (
        <button key={v} onClick={() => onChange(v)}
          className="px-3 py-1.5 text-xs transition-all duration-150"
          style={{
            fontFamily: "'Source Sans 3', sans-serif", fontWeight: v === version ? 600 : 400,
            letterSpacing: '0.08em', color: v === version ? C.bg : `${C.ink}88`,
            background: v === version ? C.terra : 'transparent',
            borderRight: v !== 'NIV' ? `1px solid ${C.terra}30` : undefined,
          }}>
          {v}
        </button>
      ))}
    </div>
  )
}

// ── Full chapter reader (KJV fetched; others → key verses + BibleHub link) ───
interface FetchedVerse { verse: number; text: string }

function ChapterReader({
  chapter, version, onVersionChange, onBack, onViewKeyVerses, highlights, onHighlight,
}: {
  chapter: ChapterData
  version: BibleVersion
  onVersionChange: (v: BibleVersion) => void
  onBack: () => void
  onViewKeyVerses: () => void
  highlights: Highlight[]
  onHighlight: (ref: string, chNum: number, color: string) => void
}) {
  const [verses, setVerses] = useState<FetchedVerse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pickerVerse, setPickerVerse] = useState<string | null>(null)

  const partInfo = PARTS.find((p) => p.part === chapter.part)!
  const hlMap = new Map(highlights.map((h) => [h.verseRef, h.color]))
  const biblehubUrl = `https://biblehub.com/${BIBLEHUB_VERSION[version]}/isaiah/${chapter.number}.htm`
  const verseCount = ISAIAH_VERSE_COUNTS[chapter.number - 1]

  const fetchKJV = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(
        `https://bible-api.com/Isaiah+${chapter.number}:1-${verseCount}?translation=kjv`
      )
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setVerses(
        (data.verses as Array<{ verse: number; text: string }>).map((v) => ({
          verse: v.verse,
          text: v.text.trim(),
        }))
      )
    } catch {
      setError('Could not load chapter. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }, [chapter.number, verseCount])

  useEffect(() => {
    if (version === 'KJV') fetchKJV()
    else setVerses([])
  }, [version, chapter.number, fetchKJV])

  const verseRef = (v: number) => `Isaiah ${chapter.number}:${v}`

  return (
    <div>
      {/* Reader header */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs transition-all duration-150"
          style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}
        >
          ← Chapters
        </button>
        <div className="w-px h-4" style={{ background: `${C.ink}25` }} />
        <span className="text-xs tracking-widest uppercase"
          style={{ color: partInfo.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
          Part {chapter.part} · Ch. {chapter.number}
        </span>
        <div className="flex-1" />
        <VersionToggle version={version} onChange={onVersionChange} />
      </div>

      {/* Chapter title */}
      <div className="mb-6 pb-5" style={{ borderBottom: `1px solid ${partInfo.color}25` }}>
        <p className="text-xs tracking-[0.25em] uppercase mb-1"
          style={{ color: partInfo.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
          Isaiah · Chapter {chapter.number}
        </p>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 400, color: C.ink }}>
          {chapter.title}
        </h2>
        <p className="text-sm italic mt-1"
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, color: `${C.ink}77` }}>
          {chapter.theme}
        </p>
      </div>

      {/* KJV full text */}
      {version === 'KJV' && (
        <div>
          {loading && (
            <div className="py-16 text-center">
              <p className="text-sm italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
                Loading chapter…
              </p>
            </div>
          )}
          {error && (
            <div className="py-8 text-center">
              <p className="text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif", color: C.terra }}>{error}</p>
              <button onClick={fetchKJV}
                className="mt-3 px-4 py-1.5 text-xs rounded-sm"
                style={{ background: `${C.terra}15`, color: C.terra, border: `1px solid ${C.terra}40`, fontFamily: "'Source Sans 3', sans-serif" }}>
                Retry
              </button>
            </div>
          )}
          {!loading && !error && verses.length > 0 && (
            <div className="space-y-1">
              {verses.map(({ verse, text }) => {
                const ref = verseRef(verse)
                const isHighlighted = hlMap.has(ref)
                const hlColor = hlMap.get(ref)
                return (
                  <div key={verse}
                    className="group flex gap-3 px-3 py-1.5 rounded-sm transition-all duration-100"
                    style={{ background: isHighlighted ? hlColor : 'transparent' }}
                  >
                    {/* Verse number */}
                    <span className="flex-shrink-0 text-xs mt-0.5 w-6 text-right select-none"
                      style={{ color: `${partInfo.color}88`, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                      {verse}
                    </span>
                    {/* Verse text */}
                    <span className="text-sm leading-relaxed flex-1"
                      style={{ fontFamily: "'Lora', serif", color: C.ink, lineHeight: '1.85' }}>
                      {text}
                    </span>
                    {/* Highlight button (appears on hover) */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-start pt-0.5">
                      <button
                        className="text-xs px-1.5 py-0.5 rounded-sm"
                        style={{
                          color: isHighlighted ? partInfo.color : `${C.ink}44`,
                          background: isHighlighted ? `${partInfo.color}15` : `${C.ink}08`,
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                        onClick={() => setPickerVerse(pickerVerse === ref ? null : ref)}
                      >
                        ✦
                      </button>
                    </div>
                    {/* Colour picker inline */}
                    {pickerVerse === ref && (
                      <div className="absolute right-4 flex items-center gap-1.5 bg-white shadow-sm rounded-sm px-2 py-1.5 z-10"
                        style={{ border: `1px solid ${C.ink}18` }}>
                        {HIGHLIGHT_COLORS.map((hc) => (
                          <button key={hc.value}
                            className="w-5 h-5 rounded-full border-2 hover:scale-110 transition-transform"
                            style={{ background: hc.value, borderColor: hc.value.replace('60', 'cc') }}
                            title={hc.label}
                            onClick={() => { onHighlight(ref, chapter.number, hc.value); setPickerVerse(null) }}
                          />
                        ))}
                        {isHighlighted && (
                          <button className="text-xs ml-1"
                            style={{ color: C.rose, fontFamily: "'Source Sans 3', sans-serif" }}
                            onClick={() => { onHighlight(ref, chapter.number, 'remove'); setPickerVerse(null) }}>
                            ✕
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
          {/* Translation credit */}
          {!loading && verses.length > 0 && (
            <p className="mt-6 text-xs text-center"
              style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>
              King James Version · Public Domain
            </p>
          )}
        </div>
      )}

      {/* Non-KJV: key verses + BibleHub link */}
      {version !== 'KJV' && (
        <div>
          <div className="rounded border px-5 py-4 mb-5 flex items-start gap-3"
            style={{ borderColor: `${C.goldDeep}35`, background: `${C.goldDeep}08` }}>
            <span className="text-sm" style={{ color: C.goldDeep }}>✦</span>
            <div>
              <p className="text-sm leading-relaxed"
                style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}88`, lineHeight: '1.7' }}>
                Full chapter text for <strong>{version}</strong> is available on BibleHub. Key verses from this chapter are shown below.
              </p>
              <a
                href={biblehubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 text-xs rounded-sm transition-all duration-150"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: C.bg, background: C.terra, textDecoration: 'none',
                }}>
                Read Isaiah {chapter.number} in {version} →
              </a>
            </div>
          </div>

          {/* Key verses */}
          <div className="space-y-4">
            {chapter.keyVerses.length === 0 ? (
              <p className="text-sm italic text-center py-6"
                style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
                No key verses stored for this chapter yet.
              </p>
            ) : (
              chapter.keyVerses.map((kv) => {
                const text = kv.texts[version] ?? kv.texts['ESV'] ?? kv.texts['KJV'] ?? ''
                const isHighlighted = hlMap.has(kv.ref)
                const hlColor = hlMap.get(kv.ref)
                const usedVersion: BibleVersion = kv.texts[version] ? version : (kv.texts['ESV'] ? 'ESV' : 'KJV')
                return (
                  <div key={kv.ref}
                    className="rounded-sm px-4 py-3 transition-all duration-150"
                    style={{
                      background: isHighlighted ? hlColor : `${partInfo.color}06`,
                      border: `1px solid ${isHighlighted ? partInfo.color + '50' : partInfo.color + '18'}`,
                    }}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: partInfo.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                        {kv.ref}
                      </p>
                      <VersionBadge version={usedVersion} />
                    </div>
                    <p className="text-sm leading-relaxed italic"
                      style={{ fontFamily: "'Lora', serif", color: C.ink, lineHeight: '1.85' }}>
                      {text}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        className="text-xs px-2 py-0.5 rounded-sm transition-all duration-100"
                        style={{
                          color: isHighlighted ? partInfo.color : `${C.ink}44`,
                          border: `1px solid ${isHighlighted ? partInfo.color + '50' : C.ink + '18'}`,
                          background: isHighlighted ? `${partInfo.color}12` : 'transparent',
                          fontFamily: "'Source Sans 3', sans-serif",
                        }}
                        onClick={() => setPickerVerse(pickerVerse === kv.ref ? null : kv.ref)}>
                        {isHighlighted ? '✦ Highlighted' : '+ Highlight'}
                      </button>
                      {isHighlighted && (
                        <button className="text-xs" style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}
                          onClick={() => onHighlight(kv.ref, chapter.number, 'remove')}>
                          Remove
                        </button>
                      )}
                    </div>
                    {pickerVerse === kv.ref && (
                      <div className="flex items-center gap-2 mt-2">
                        {HIGHLIGHT_COLORS.map((hc) => (
                          <button key={hc.value}
                            className="w-5 h-5 rounded-full border-2 hover:scale-110 transition-transform"
                            style={{ background: hc.value, borderColor: hc.value.replace('60', 'cc') }}
                            title={hc.label}
                            onClick={() => { onHighlight(kv.ref, chapter.number, hc.value); setPickerVerse(null) }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Bottom: Key Verses button + navigation */}
      <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${partInfo.color}25` }}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={onViewKeyVerses}
            className="px-5 py-2 text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-150"
            style={{
              fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
              color: partInfo.color, border: `1px solid ${partInfo.color}50`,
              background: `${partInfo.color}0a`,
            }}>
            ✦ View Key Verses for Chapter {chapter.number}
          </button>

          {/* Chapter navigation */}
          <div className="flex items-center gap-2 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            <span style={{ color: `${C.ink}55` }}>Isaiah</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Chapter card (list view) ──────────────────────────────────────────────────
function ChapterCard({
  chapter, version, highlights, onHighlight, isOpen, onClick, onReadChapter,
}: {
  chapter: ChapterData
  version: BibleVersion
  highlights: Highlight[]
  onHighlight: (ref: string, chNum: number, color: string) => void
  isOpen: boolean
  onClick: () => void
  onReadChapter: () => void
}) {
  const partInfo = PARTS.find((p) => p.part === chapter.part)!
  const [pickerVerse, setPickerVerse] = useState<string | null>(null)
  const hlMap = new Map(highlights.map((h) => [h.verseRef, h.color]))

  return (
    <div className="rounded border overflow-hidden transition-all duration-200"
      style={{
        borderColor: isOpen ? partInfo.color : `${partInfo.color}35`,
        background: isOpen ? `${partInfo.color}08` : `${partInfo.color}04`,
      }}>
      <button className="w-full flex items-center gap-3 px-4 py-3 text-left" onClick={onClick}>
        <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm"
          style={{ background: `${partInfo.color}18`, color: partInfo.color, fontFamily: "'Fraunces', serif", fontSize: '0.9rem', fontWeight: 500 }}>
          {chapter.number}
        </span>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: '0.95rem', fontWeight: 400, color: C.ink }}>
            {chapter.title}
          </p>
          <p className="text-xs mt-0.5 truncate"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}>
            {chapter.theme}
          </p>
        </div>
        <span className="text-xs flex-shrink-0 transition-transform duration-200"
          style={{ color: `${partInfo.color}77`, transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-5 pt-2 space-y-4" style={{ borderTop: `1px solid ${partInfo.color}20` }}>
          {chapter.keyVerses.length === 0 ? (
            <p className="text-sm italic text-center py-4"
              style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              No key verses stored yet.
            </p>
          ) : (
            chapter.keyVerses.map((kv) => {
              const text = kv.texts[version] ?? kv.texts['ESV'] ?? kv.texts['KJV'] ?? ''
              const isHighlighted = hlMap.has(kv.ref)
              const hlColor = hlMap.get(kv.ref)
              const usedVersion: BibleVersion = kv.texts[version] ? version : (kv.texts['ESV'] ? 'ESV' : 'KJV')
              return (
                <div key={kv.ref}
                  className="rounded-sm px-4 py-3 transition-all duration-150"
                  style={{
                    background: isHighlighted ? hlColor : `${partInfo.color}06`,
                    border: `1px solid ${isHighlighted ? partInfo.color + '50' : partInfo.color + '18'}`,
                  }}>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs tracking-[0.2em] uppercase"
                      style={{ color: partInfo.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                      {kv.ref}
                    </p>
                    <VersionBadge version={usedVersion} />
                  </div>
                  <p className="text-sm leading-relaxed italic"
                    style={{ fontFamily: "'Lora', serif", color: C.ink, lineHeight: '1.85' }}>
                    {text}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="text-xs px-2 py-0.5 rounded-sm transition-all duration-100"
                      style={{
                        color: isHighlighted ? partInfo.color : `${C.ink}44`,
                        border: `1px solid ${isHighlighted ? partInfo.color + '50' : C.ink + '18'}`,
                        background: isHighlighted ? `${partInfo.color}12` : 'transparent',
                        fontFamily: "'Source Sans 3', sans-serif",
                      }}
                      onClick={() => setPickerVerse(pickerVerse === kv.ref ? null : kv.ref)}>
                      {isHighlighted ? '✦ Highlighted' : '+ Highlight'}
                    </button>
                    {isHighlighted && (
                      <button className="text-xs" style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}
                        onClick={() => onHighlight(kv.ref, chapter.number, 'remove')}>
                        Remove
                      </button>
                    )}
                  </div>
                  {pickerVerse === kv.ref && (
                    <div className="flex items-center gap-2 mt-2">
                      {HIGHLIGHT_COLORS.map((hc) => (
                        <button key={hc.value}
                          className="w-5 h-5 rounded-full border-2 hover:scale-110 transition-transform"
                          style={{ background: hc.value, borderColor: hc.value.replace('60', 'cc') }}
                          title={hc.label}
                          onClick={() => { onHighlight(kv.ref, chapter.number, hc.value); setPickerVerse(null) }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}

          {/* Read full chapter button */}
          <div className="pt-2" style={{ borderTop: `1px solid ${partInfo.color}18` }}>
            <button
              onClick={(e) => { e.stopPropagation(); onReadChapter() }}
              className="w-full py-2.5 text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-150 flex items-center justify-center gap-2"
              style={{
                fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
                color: C.bg, background: partInfo.color,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}>
              Read Full Chapter {chapter.number} →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main ScriptureSection ─────────────────────────────────────────────────────
export default function ScriptureSection() {
  const { user } = useUser()
  const [version, setVersion] = useState<BibleVersion>('KJV')
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1)
  const [openChapter, setOpenChapter] = useState<number | null>(null)
  const [readerChapter, setReaderChapter] = useState<number | null>(null)
  const [highlights, setHighlights] = useState<Highlight[]>(() =>
    user ? loadHighlights(user.id) : []
  )

  useEffect(() => {
    if (user) setHighlights(loadHighlights(user.id))
  }, [user])

  function handleHighlight(ref: string, chNum: number, color: string) {
    if (!user) return
    let updated: Highlight[]
    if (color === 'remove') {
      updated = highlights.filter((h) => h.verseRef !== ref)
    } else {
      const existing = highlights.find((h) => h.verseRef === ref)
      updated = existing
        ? highlights.map((h) => h.verseRef === ref ? { ...h, color } : h)
        : [...highlights, { verseRef: ref, chapterNum: chNum, color, userId: user.id }]
    }
    setHighlights(updated)
    saveHighlights(user.id, updated)
  }

  const currentPart = PARTS.find((p) => p.part === activePart)!
  const partChapters = ISAIAH_CHAPTERS.filter((c) => c.part === activePart)
  const readerChapterData = readerChapter ? ISAIAH_CHAPTERS.find((c) => c.number === readerChapter) : null

  // ── Chapter reader view ──
  if (readerChapterData) {
    const prev = readerChapterData.number > 1
      ? ISAIAH_CHAPTERS.find((c) => c.number === readerChapterData.number - 1)
      : null
    const next = readerChapterData.number < 66
      ? ISAIAH_CHAPTERS.find((c) => c.number === readerChapterData.number + 1)
      : null

    return (
      <section className="mb-14">
        <div className="relative">
          <ChapterReader
            chapter={readerChapterData}
            version={version}
            onVersionChange={setVersion}
            onBack={() => setReaderChapter(null)}
            onViewKeyVerses={() => {
              setReaderChapter(null)
              setActivePart(readerChapterData.part as 1 | 2 | 3)
              setOpenChapter(readerChapterData.number)
              // scroll to chapter list
              setTimeout(() => {
                document.getElementById(`chapter-${readerChapterData.number}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }, 100)
            }}
            highlights={highlights.filter((h) => h.chapterNum === readerChapterData.number)}
            onHighlight={handleHighlight}
          />

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between mt-8 pt-5"
            style={{ borderTop: `1px solid ${currentPart.color}25` }}>
            {prev ? (
              <button
                onClick={() => setReaderChapter(prev.number)}
                className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-all duration-150"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: C.terra, background: `${C.terra}0a`, border: `1px solid ${C.terra}30`,
                }}>
                ← Ch. {prev.number}: {prev.title}
              </button>
            ) : <div />}
            <span className="text-xs" style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>
              {readerChapterData.number} / 66
            </span>
            {next ? (
              <button
                onClick={() => setReaderChapter(next.number)}
                className="flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-all duration-150"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: C.terra, background: `${C.terra}0a`, border: `1px solid ${C.terra}30`,
                }}>
                Ch. {next.number}: {next.title} →
              </button>
            ) : <div />}
          </div>
        </div>
      </section>
    )
  }

  // ── Chapter list view ──
  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6 flex-wrap">
        <div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 400, color: C.ink }}>
            Scripture
          </h3>
          <p className="text-xs mt-0.5 italic"
            style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
            The Book of Isaiah · 66 Chapters
          </p>
        </div>
        <div className="flex-1 h-px mt-4" style={{ background: `${C.ink}18` }} />
        <VersionToggle version={version} onChange={setVersion} />
      </div>

      {/* Part tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {PARTS.map((p) => (
          <button key={p.part}
            onClick={() => { setActivePart(p.part); setOpenChapter(null) }}
            className="rounded border py-3 px-3 text-left transition-all duration-200"
            style={{
              borderColor: activePart === p.part ? p.color : `${p.color}35`,
              background: activePart === p.part ? `${p.color}12` : `${p.color}05`,
            }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-1"
              style={{ color: p.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
              Part {p.part}
            </p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: '0.85rem', fontWeight: 400, color: C.ink, lineHeight: 1.3 }}>
              {p.label}
            </p>
            <p className="text-xs mt-1"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}>
              Ch. {p.chapters} · {p.schedule}
            </p>
          </button>
        ))}
      </div>

      {/* Part bar */}
      <div className="flex items-center gap-3 mb-4 px-3 py-2 rounded-sm"
        style={{ background: `${currentPart.color}10`, border: `1px solid ${currentPart.color}30` }}>
        <div className="w-1 h-4 rounded-full" style={{ background: currentPart.color }} />
        <p className="text-xs flex-1"
          style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}88` }}>
          <span style={{ color: currentPart.color, fontWeight: 600 }}>Part {currentPart.part}:</span>
          {' '}{currentPart.label} · Chapters {currentPart.chapters} · {currentPart.schedule}
        </p>
        {!user && (
          <p className="text-xs italic"
            style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
            Log in to highlight verses
          </p>
        )}
      </div>

      {/* Chapter list */}
      <div className="space-y-2">
        {partChapters.map((chapter) => (
          <div key={chapter.number} id={`chapter-${chapter.number}`}>
            <ChapterCard
              chapter={chapter}
              version={version}
              highlights={highlights.filter((h) => h.chapterNum === chapter.number)}
              onHighlight={handleHighlight}
              isOpen={openChapter === chapter.number}
              onClick={() => setOpenChapter(openChapter === chapter.number ? null : chapter.number)}
              onReadChapter={() => {
                setReaderChapter(chapter.number)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
