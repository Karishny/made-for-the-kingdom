import { useState, useMemo, useEffect, Fragment, useRef } from 'react'
import { ISAIAH_CHAPTERS, PARTS, type BibleVersion, type ChapterData } from '@/data/isaiah'
import { KJV_ISAIAH } from '@/data/kjvIsaiah'
import { getNKJVChapter } from '@/lib/nkjv'
import { getChapterTranslationLink } from '@/data/chapterLinks'
import {
  STUDY_PARTS,
  TOTAL_WEEKS,
  weekKey,
  getStudyPart,
  getStudyWeek,
  weekStatus,
  isWeekComplete,
  breakAfterWeeks,
  getPrevWeek,
  getNextWeek,
  type StudyWeek,
  type ResourceType,
  type VideoResource,
  type CompletedResources,
} from '@/data/studyWeeks'
import Button from '@/components/Button'
import NoteComposer from '@/components/NoteComposer'
import { useUser, type User } from '@/context/UserContext'
import { loadProgress, saveProgress, loadChapters, saveChapters, loadResources, saveResources, loadDiscussionDone, saveDiscussionDone } from '@/lib/storage'
import { createNote, listNotes, type StudyNote } from '@/lib/notesApi'
import { getDiscussionQuestions } from '@/data/discussionQuestions'
import type { AppRoute } from '@/lib/router'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89', plum: '#332a37',
}

const VERSIONS: BibleVersion[] = ['KJV', 'NKJV', 'ESV', 'NIV']

const VERSION_LABELS: Record<BibleVersion, string> = {
  KJV: 'King James Version',
  NKJV: 'New King James Version',
  ESV: 'English Standard Version',
  NIV: 'New International Version',
}

const PART_FIRST: Record<1 | 2 | 3, number> = { 1: 1, 2: 40, 3: 56 }

function OrnamentalDivider({ color = C.goldDeep }: { color?: string }) {
  return (
    <div className="flex items-center" style={{ margin: '2px -64px', paddingBottom: '1px' }}>
      <div className="flex-1 h-px" style={{ background: `${color}44` }} />
      <svg width="22" height="26" viewBox="0 0 32 38" fill="none" style={{ flexShrink: 0, opacity: 0.88 }}>
        <path d="M16.2 2 C15.4 6 16.8 10 15.6 14 C14.8 17 16.4 21 15.8 26 C15.3 30 16.2 33 15.9 36"
          stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M3 14 C7 13 11 14.6 16 14 C21 13.4 25 14.8 29 14"
          stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M14 2.5 C15 1.2 17 1.2 18 2.5" stroke={color} strokeWidth="1.0" strokeLinecap="round" fill="none" />
        <path d="M14 35.5 C15 36.8 17 36.8 18 35.5" stroke={color} strokeWidth="1.0" strokeLinecap="round" fill="none" />
        <path d="M3 12 C1.6 13 1.6 15 3 16" stroke={color} strokeWidth="1.0" strokeLinecap="round" fill="none" />
        <path d="M29 12 C30.4 13 30.4 15 29 16" stroke={color} strokeWidth="1.0" strokeLinecap="round" fill="none" />
      </svg>
      <div className="flex-1 h-px" style={{ background: `${color}44` }} />
    </div>
  )
}

function CornerMark({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M2 2 L12 2 L2 12" stroke={C.goldDeep} strokeWidth="1.1" fill="none" opacity="0.55" />
      <circle cx="2" cy="2" r="1.3" fill={C.goldDeep} opacity="0.55" />
    </svg>
  )
}

function VersionToggle({ version, onChange, links }: { version: BibleVersion; onChange: (v: BibleVersion) => void; links?: Partial<Record<BibleVersion, string>> }) {
  return (
    <div className="inline-flex rounded-sm overflow-hidden border" style={{ borderColor: `${C.terra}35` }}>
      {VERSIONS.map((v) => {
        const active = v === version
        const style = {
          fontFamily: "'Source Sans 3', sans-serif", fontWeight: active ? 600 : 400,
          letterSpacing: '0.08em', color: active ? C.bg : `${C.ink}88`,
          background: active ? C.terra : 'transparent',
          borderRight: v !== 'NIV' ? `1px solid ${C.terra}30` : undefined,
        }
        const onlineOnly = v === 'ESV' || v === 'NIV'
        if (onlineOnly && links?.[v]) {
          return (
            <a key={v} href={links[v]} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs transition-all duration-150 inline-flex items-center gap-1"
              style={{ ...style, textDecoration: 'none', cursor: 'pointer' }}>
              {v}
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.7 }}>
                <path d="M2 6 L6 2 M2.5 2 H6 V5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </a>
          )
        }
        return (
          <button key={v} onClick={() => onChange(v)}
            className="px-3 py-1.5 text-xs transition-all duration-150"
            style={style}>
            {v}
          </button>
        )
      })}
    </div>
  )
}

function ChapterNav({
  chapter, partFirst, partLast, onPrev, onNext, color,
}: {
  chapter: ChapterData; partFirst: number; partLast: number
  onPrev: () => void; onNext: () => void; color: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        onClick={onPrev}
        disabled={chapter.number <= partFirst}
        className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs transition-all duration-150 disabled:opacity-20"
        style={{ fontFamily: "'Source Sans 3', sans-serif", color, border: `1px solid ${color}40`, background: `${color}08` }}>
        ← Chapter {chapter.number - 1 >= partFirst ? chapter.number - 1 : ''}
      </button>
      <span className="text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}55` }}>
        Isaiah {chapter.number}
      </span>
      <button
        onClick={onNext}
        disabled={chapter.number >= partLast}
        className="flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs transition-all duration-150 disabled:opacity-20"
        style={{ fontFamily: "'Source Sans 3', sans-serif", color, border: `1px solid ${color}40`, background: `${color}08` }}>
        Chapter {chapter.number + 1 <= partLast ? chapter.number + 1 : ''} →
      </button>
    </div>
  )
}

function ResourceIcon({ type, color }: { type: ResourceType; color: string }) {
  const common = { stroke: color, strokeWidth: 1.3, fill: 'none' } as const
  switch (type) {
    case 'video':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" {...common} />
          <path d="M10 8.8 L15.2 12 L10 15.2 Z" fill={color} stroke="none" />
        </svg>
      )
    case 'commentary':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M12 6 C10 4.5 7 4.5 4.5 5 V19 C7 18.5 10 18.5 12 20 C14 18.5 17 18.5 19.5 19 V5 C17 4.5 14 4.5 12 6 Z" {...common} />
          <path d="M12 6 V20" stroke={color} strokeWidth="1.1" fill="none" />
        </svg>
      )
    case 'podcast':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M5 16 v-3 a7 7 0 0 1 14 0 v3" {...common} />
          <rect x="3.5" y="15" width="3.5" height="5" rx="1.2" stroke={color} strokeWidth="1.2" fill="none" />
          <rect x="17" y="15" width="3.5" height="5" rx="1.2" stroke={color} strokeWidth="1.2" fill="none" />
        </svg>
      )
    case 'articles':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path d="M6 3 H15 L19 7 V21 H6 Z" {...common} />
          <path d="M15 3 V7 H19" stroke={color} strokeWidth="1.2" fill="none" />
          <path d="M9 12 H15 M9 15.5 H15 M9 9 H11.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" fill="none" />
        </svg>
      )
  }
}

type WeekStatus = 'complete' | 'in-progress' | 'not-started'

function StatusChip({ status, color }: { status: WeekStatus; color: string }) {
  const config: Record<WeekStatus, { label: string; fg: string; bg: string; border: string }> = {
    complete: { label: 'Complete', fg: color, bg: `${color}18`, border: `${color}35` },
    'in-progress': { label: 'In progress', fg: C.goldDeep, bg: `${C.goldDeep}12`, border: `${C.goldDeep}30` },
    'not-started': { label: 'Not started', fg: `${C.ink}66`, bg: `${C.ink}06`, border: `${C.ink}20` },
  }
  const chip = config[status]
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[10px] tracking-[0.14em] uppercase"
      style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: chip.fg, background: chip.bg, border: `1px solid ${chip.border}` }}>
      {status === 'complete' && <span style={{ fontWeight: 700 }}>✓</span>}
      {chip.label}
    </span>
  )
}

function BreakDivider({ color = C.ink }: { color?: string }) {
  return (
    <div className="flex items-center gap-4 px-2 py-1.5" role="separator" aria-label="break">
      <div className="flex-1 h-px" style={{ background: `${color}22` }} />
      <span className="text-[10px] tracking-[0.3em] uppercase"
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: `${color}55` }}>
        BREAK
      </span>
      <div className="flex-1 h-px" style={{ background: `${color}22` }} />
    </div>
  )
}

function ProgressTracker({
  completedWeeks,
}: {
  completedWeeks: Set<string>
}) {
  const completed = STUDY_PARTS.reduce(
    (n, p) => n + p.weeks.filter((w) => completedWeeks.has(weekKey(p.part, w.number))).length,
    0
  )
  const overallPct = TOTAL_WEEKS === 0 ? 0 : (completed / TOTAL_WEEKS) * 100

  return (
    <section className="mb-8">
      <div className="relative rounded border overflow-hidden" style={{ borderColor: `${C.terra}30`, background: `${C.terra}06` }}>
        <CornerMark className="absolute top-0 left-0" />
        <CornerMark className="absolute top-0 right-0 rotate-90" />
        <CornerMark className="absolute bottom-0 left-0 -rotate-90" />
        <CornerMark className="absolute bottom-0 right-0 rotate-180" />
        <div className="p-6 md:p-8">
          <div className="flex items-baseline justify-between flex-wrap gap-3 mb-1">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-1"
                style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
                Study Progress
              </p>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.35rem', fontWeight: 300, color: C.ink }}>
                isaiah <span style={{ color: C.terra, fontStyle: 'italic' }}>study journey</span>
              </h3>
            </div>
            <div className="text-right">
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.6rem', fontWeight: 500, color: C.terra, lineHeight: 1 }}>
                Week {completed}<span style={{ color: `${C.ink}55`, fontSize: '1rem' }}> / {TOTAL_WEEKS}</span>
              </div>
              <p className="text-xs mt-1" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66`, letterSpacing: '0.1em' }}>
                weekly sessions complete
              </p>
            </div>
          </div>

          <div className="my-5 max-w-xs mx-auto">
            <OrnamentalDivider color={C.terra} />
          </div>

          {/* Overall progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66`, letterSpacing: '0.08em' }}>
                Isaiah Study Journey
              </span>
              <span className="text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif", color: C.terra, fontWeight: 600 }}>
                {Math.round(overallPct)}%
              </span>
            </div>
            <div className="h-2 rounded-sm overflow-hidden" style={{ background: `${C.ink}10` }}>
              <div className="h-full transition-all duration-500"
                style={{ width: `${overallPct}%`, background: `linear-gradient(90deg, ${C.terra}, ${C.goldDeep})` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Part 1 / Part 2 / Part 3 progress cards shown on the study landing, beneath
// the Study Progress header and the Where-You-Left-Off action block.
function PartProgressCards({
  completedWeeks,
  onPartClick,
}: {
  completedWeeks: Set<string>
  onPartClick: (part: 1 | 2 | 3) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {STUDY_PARTS.map((p) => {
        const total = p.weeks.length
        const done = p.weeks.filter((w) => completedWeeks.has(weekKey(p.part, w.number))).length
        const partPct = total === 0 ? 0 : (done / total) * 100
        const allDone = total > 0 && done === total
        return (
          <button key={p.part} onClick={() => onPartClick(p.part)}
            className="rounded border p-4 text-left transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: `${p.color}40`,
              background: allDone ? `${p.color}14` : `${p.color}07`,
            }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
              <span className="text-xs tracking-[0.2em] uppercase"
                style={{ color: p.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                Part {p.part}
              </span>
              {allDone && (
                <span className="text-[10px] tracking-[0.15em] uppercase ml-auto px-1.5 py-0.5 rounded-sm"
                  style={{ color: p.color, background: `${p.color}18`, border: `1px solid ${p.color}30`, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                  Complete
                </span>
              )}
            </div>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: '0.95rem', fontWeight: 400, color: C.ink, marginBottom: '6px' }}>
              {p.label}
            </p>
            <p className="text-xs mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}>
              {done} / {total} weeks · Isaiah {p.chaptersLabel}
            </p>
            <div className="h-1.5 rounded-sm overflow-hidden" style={{ background: `${p.color}14` }}>
              <div className="h-full transition-all duration-500"
                style={{ width: `${partPct}%`, background: p.color }} />
            </div>
          </button>
        )
      })}
    </div>
  )
}

// Horizontal row of week tiles used on the part overview and inside a week.
// Scrolls sideways on mobile; wraps into rows on desktop. Shows break
// separators between week groups and a subtle status on each tile.
function WeekStrip({
  part,
  activeWeek,
  completedWeeks,
  completedChapters,
  completedResources,
  onSelect,
}: {
  part: 1 | 2 | 3
  activeWeek: number | null
  completedWeeks: Set<string>
  completedChapters: Set<number>
  completedResources: CompletedResources
  onSelect: (weekNumber: number) => void
}) {
  const currentPart = getStudyPart(part)
  const breaks = breakAfterWeeks(part)

  return (
    <div className="overflow-x-auto -mx-1 px-1" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
      <div className="flex items-center gap-2.5 md:flex-wrap w-max md:w-full">
        {currentPart.weeks.map((week) => {
          const status = weekStatus(completedWeeks, completedChapters, part, week.number)
          const active = activeWeek === week.number
          const complete = status === 'complete'
          return (
            <Fragment key={week.number}>
              {breaks.has(week.number) && (
                <>
                  <div className="hidden md:flex flex-shrink-0 items-center gap-2 px-1.5">
                    <div className="h-px w-5" style={{ background: `${C.ink}22` }} />
                    <span className="text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}44`, fontWeight: 400 }}>
                      break
                    </span>
                    <div className="h-px w-5" style={{ background: `${C.ink}22` }} />
                  </div>
                  <div className="md:hidden flex-shrink-0 flex flex-col items-center justify-center rounded border px-2.5 py-2"
                    style={{ borderColor: `${C.ink}22`, background: `${C.ink}06` }}>
                    <span className="text-[9px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}44`, fontWeight: 400 }}>
                      break
                    </span>
                  </div>
                </>
              )}
              <button
                onClick={() => onSelect(week.number)}
                aria-current={active ? 'step' : undefined}
                className="flex-shrink-0 flex flex-col items-center justify-center rounded border px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  minWidth: 104,
                  borderColor: active ? currentPart.color : `${currentPart.color}35`,
                  background: active ? `${currentPart.color}20` : complete ? `${currentPart.color}10` : `${currentPart.color}05`,
                }}>
                <span style={{
                  fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.2,
                  color: active ? currentPart.color : complete ? currentPart.color : C.ink,
                }}>
                  {complete && <span style={{ marginRight: 4 }}>✓</span>}
                  {week.number}
                </span>
                <span className="text-[9px] tracking-[0.14em] uppercase mt-0.5"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}55` }}>
                  {status === 'in-progress' ? 'in progress' : `Isaiah ${week.chapterStart}–${week.chapterEnd}`}
                </span>
              </button>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

// Tiny status mark used on desktop week cards: a filled check for complete
// weeks, a small dot for in-progress, and a faint ring otherwise.
function StatusMark({ status, color }: { status: 'complete' | 'in-progress' | 'not-started'; color: string }) {
  if (status === 'complete') {
    return (
      <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: color, color: C.bg }}>
        <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
          <path d="M3 8.5 L6.2 11.7 L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    )
  }
  if (status === 'in-progress') {
    return <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: `${color}99` }} />
  }
  return <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ border: `1px solid ${C.ink}2b` }} />
}

// Desktop-only week navigation for the part overview. Shows four weeks at a
// time in a tidy two-column grid with small previous/next controls, so long
// parts never feel crowded. Parts with five or fewer weeks are shown all at
// once. Break weeks appear as small cream cross markers in the flow.
function WeekGrid({
  part,
  activeWeek,
  completedWeeks,
  completedChapters,
  completedResources,
  onSelect,
}: {
  part: 1 | 2 | 3
  activeWeek: number | null
  completedWeeks: Set<string>
  completedChapters: Set<number>
  completedResources: CompletedResources
  onSelect: (weekNumber: number) => void
}) {
  const currentPart = getStudyPart(part)
  const breaks = breakAfterWeeks(part)
  const [page, setPage] = useState(0)

  useEffect(() => setPage(0), [part])

  const weeks = currentPart.weeks
  const paginate = weeks.length > 5

  const pages: Array<Array<{ kind: 'week' | 'break'; week?: StudyWeek }>> = []
  if (paginate) {
    for (let i = 0; i < weeks.length; i += 4) {
      const slice = weeks.slice(i, i + 4)
      const items: Array<{ kind: 'week' | 'break'; week?: StudyWeek }> = slice.map((week) => ({ kind: 'week', week }))
      const last = slice[slice.length - 1]
      if (breaks.has(last.number)) items.push({ kind: 'break' as const })
      pages.push(items)
    }
  } else {
    const items: Array<{ kind: 'week' | 'break'; week?: StudyWeek }> = []
    weeks.forEach((week) => {
      items.push({ kind: 'week', week })
      if (breaks.has(week.number)) items.push({ kind: 'break' })
    })
    pages.push(items)
  }

  const pageItems = pages[Math.min(page, pages.length - 1)] ?? []

  return (
    <div>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2.5">
        {pageItems.map((item, idx) =>
          item.kind === 'break' ? (
            <div key={`break-${idx}`}
              className="w-full flex items-center justify-center rounded border border-dashed px-4 py-2"
              style={{ borderColor: `${C.ink}28`, background: C.bg }}>
              <span className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, color: `${C.ink}60` }}>
                break
              </span>
            </div>
          ) : (
            <button
              key={item.week!.number}
              onClick={() => onSelect(item.week!.number)}
              aria-current={activeWeek === item.week!.number ? 'step' : undefined}
              className="rounded border px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5"
              style={{
                width: 'calc(50% - 0.3125rem)',
                borderColor: activeWeek === item.week!.number ? currentPart.color : `${currentPart.color}42`,
                background: activeWeek === item.week!.number ? `${currentPart.color}14` : C.bg,
              }}>
              <span className="flex items-center justify-between gap-2">
                <span className="text-[10px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: currentPart.color }}>
                  Week {item.week!.number}
                </span>
                <StatusMark
                  status={weekStatus(completedWeeks, completedChapters, part, item.week!.number)}
                  color={currentPart.color}
                />
              </span>
              <span className="block text-[13px] italic mt-1.5"
                style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}77` }}>
                Isaiah {item.week!.chapterStart}–{item.week!.chapterEnd}
              </span>
            </button>
          ),
        )}
      </div>

      {pages.length > 1 && (
        <div className="flex items-center justify-center gap-5 mt-5">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous weeks"
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-20 hover:-translate-y-px"
            style={{ width: 30, height: 30, border: `1px solid ${currentPart.color}40`, color: currentPart.color, background: `${currentPart.color}08` }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="text-[10px] tracking-[0.25em] uppercase tabular-nums"
            style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: `${C.ink}55` }}>
            {page + 1} / {pages.length}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={page === pages.length - 1}
            aria-label="Next weeks"
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-20 hover:-translate-y-px"
            style={{ width: 30, height: 30, border: `1px solid ${currentPart.color}40`, color: currentPart.color, background: `${currentPart.color}08` }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}

function PartOverview({
  part,
  completedWeeks,
  completedChapters,
  completedResources,
  onBack,
  onWeekClick,
}: {
  part: 1 | 2 | 3
  completedWeeks: Set<string>
  completedChapters: Set<number>
  completedResources: CompletedResources
  onBack: () => void
  onWeekClick: (weekNumber: number) => void
}) {
  const currentPart = getStudyPart(part)
  const done = currentPart.weeks.filter((w) => completedWeeks.has(weekKey(part, w.number))).length

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden" style={{ borderColor: `${currentPart.color}40` }}>
        <div className="p-6 flex items-center gap-3 flex-wrap"
          style={{ background: `${currentPart.color}10`, borderBottom: `1px solid ${currentPart.color}25` }}>
          <Button size="sm" tone={currentPart.color} onClick={onBack}>
            ← all parts
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: currentPart.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
              Part {currentPart.part} · Isaiah
            </p>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.4rem', fontWeight: 300, color: C.ink, lineHeight: 1.2 }}>
              {currentPart.label}
            </h3>
            <p className="text-xs mt-1 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
              Chapters {currentPart.chaptersLabel} · {currentPart.weeks.length} weekly sessions · {done} complete
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <p className="text-xs mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}55`, letterSpacing: '0.1em' }}>
            Weekly study sessions
          </p>
          <div className="md:hidden">
            <WeekStrip
              part={part}
              activeWeek={null}
              completedWeeks={completedWeeks}
              completedChapters={completedChapters}
              completedResources={completedResources}
              onSelect={onWeekClick}
            />
          </div>
          <div className="hidden md:block">
            <WeekGrid
              part={part}
              activeWeek={null}
              completedWeeks={completedWeeks}
              completedChapters={completedChapters}
              completedResources={completedResources}
              onSelect={onWeekClick}
            />
          </div>
          <p className="text-xs mt-5 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}44` }}>
            Select a weekly session to open its study resources. Each week is one Thursday gathering.
          </p>
        </div>
      </div>
    </section>
  )
}

function youtubeThumb(url: string): string {
  const m = url.match(/(?:youtu\.be\/|watch\?v=)([A-Za-z0-9_-]{11})/)
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : ''
}

function VideoCard({ video, color }: { video: VideoResource; color: string }) {
  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer"
      aria-label={`Watch ${video.title}`}
      className="group flex-shrink-0 w-[240px] snap-start rounded-sm border overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{ borderColor: `${color}30`, background: `${color}05`, opacity: 0.95 }}>
      <div className="relative aspect-video overflow-hidden" style={{ background: `${color}10` }}>
        {youtubeThumb(video.url) ? (
          <img src={youtubeThumb(video.url)} alt="" loading="lazy"
            className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.92 }} />
        ) : null}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
            style={{ background: 'rgba(247,246,242,0.92)', color, boxShadow: '0 1px 8px rgba(46,45,42,0.18)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5 V18.5 L18 12 Z" fill="currentColor" />
            </svg>
          </span>
        </span>
      </div>
      <p className="text-xs leading-snug p-3" style={{ fontFamily: "'Fraunces', serif", color: C.ink, fontWeight: 400 }}>
        {video.title}
      </p>
    </a>
  )
}

function CarouselArrow({ color, dir, onClick }: { color: string; dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      aria-label={dir === 'left' ? 'Previous videos' : 'Next videos'}
      className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-105"
      style={{ width: 26, height: 26, border: `1px solid ${color}40`, color, background: `${color}08` }}>
      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        {dir === 'left'
          ? <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    </button>
  )
}

function ResourceCard({ resource, color, done, onToggle }: { resource: StudyWeek['resources'][number]; color: string; done: boolean; onToggle: () => void }) {
  const scroller = useRef<HTMLDivElement>(null)
  const videos = resource.type === 'video' && resource.videos && resource.videos.length > 0 ? resource.videos : null
  const scrollBy = (n: number) => scroller.current?.scrollBy({ left: n, behavior: 'smooth' })
  const body = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}16`, border: `1px solid ${color}30` }}>
          <ResourceIcon type={resource.type} color={color} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm ${videos ? 'hidden md:inline-block' : ''}`}
            style={{
              fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
              color: done ? C.bg : ((resource.url || videos) ? color : `${C.ink}55`),
              background: done ? color : ((resource.url || videos) ? `${color}10` : `${C.ink}08`),
              border: `1px solid ${done ? color : ((resource.url || videos) ? `${color}35` : `${C.ink}18`)}`,
            }}>
            {done ? 'Done' : ((resource.url || videos) ? 'Watch now' : 'Coming soon')}
          </span>
          <CompleteToggle done={done} color={color} onToggle={onToggle} circle />
        </div>
      </div>
      {videos ? (
        <div className="flex items-center justify-between gap-3 mb-1">
          <p className="text-xs tracking-[0.18em] uppercase"
            style={{ color: color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
            {resource.label}
          </p>
          {videos.length > 1 && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <CarouselArrow color={color} dir="left" onClick={() => scrollBy(-260)} />
              <CarouselArrow color={color} dir="right" onClick={() => scrollBy(260)} />
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs tracking-[0.18em] uppercase mb-1"
          style={{ color: color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
          {resource.label}
        </p>
      )}
      <p className={`text-xs italic ${videos ? 'mb-3' : ''}`} style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
        {resource.placeholder}
      </p>
      {videos && (
        <div ref={scroller}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}>
          {videos.map((v) => (
            <VideoCard key={v.url} video={v} color={color} />
          ))}
        </div>
      )}
    </>
  )
  if (resource.url && !videos) {
    return (
      <a href={resource.url} target="_blank" rel="noopener noreferrer"
        className="block rounded border p-5 transition-all duration-200 hover:-translate-y-0.5"
        style={{ borderColor: `${color}30`, background: done ? `${color}12` : `${color}05`, opacity: 0.95 }}>
        {body}
      </a>
    )
  }
  return (
    <div className="rounded border p-5"
      style={{ borderColor: `${color}30`, background: done ? `${color}12` : `${color}05`, opacity: 0.95 }}>
      {body}
    </div>
  )
}

function CompleteToggle({ done, color, onToggle, circle = false }: { done: boolean; color: string; onToggle: () => void; circle?: boolean }) {
  // The visible mark stays small and quiet — a status indicator rather than a
  // button — while the surrounding button keeps a comfortable tap target.
  return (
    <button
      onClick={onToggle}
      aria-pressed={done}
      aria-label={done ? 'Mark as not complete' : 'Mark as complete'}
      title={done ? 'Mark as not complete' : 'Mark as complete'}
      className="flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-150 hover:bg-black/5"
      style={{ width: 36, height: 36 }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 15,
          height: 15,
          borderRadius: circle ? '50%' : '3px',
          border: `1.5px solid ${done ? color : `${color}50`}`,
          background: done ? color : 'transparent',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true"
          style={{
            opacity: done ? 1 : 0,
            transform: done ? 'scale(1)' : 'scale(0.4)',
            transition: 'opacity 0.18s ease, transform 0.18s ease',
          }}>
          <path d="M3 8.5 L6.2 11.7 L13 4.5" stroke={C.bg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </span>
    </button>
  )
}

function WeekView({
  part,
  weekNumber,
  completedWeeks,
  completedChapters,
  completedResources,
  discussionDone,
  onBack,
  onChapter,
  onToggleResource,
  onToggleCompleteChapter,
  onToggleDiscussion,
  user,
  onOpenLogin,
  onViewNotes,
  onPrevWeek,
  onNextWeek,
  onSelectWeek,
}: {
  part: 1 | 2 | 3
  weekNumber: number
  completedWeeks: Set<string>
  completedChapters: Set<number>
  completedResources: CompletedResources
  discussionDone: Set<string>
  onBack: () => void
  onChapter: (n: number) => void
  onToggleResource: (type: ResourceType) => void
  onToggleCompleteChapter: (n: number) => void
  onToggleDiscussion: () => void
  user: User | null
  onOpenLogin: () => void
  onViewNotes: () => void
  onPrevWeek: () => void
  onNextWeek: () => void
  onSelectWeek: (weekNumber: number) => void
}) {
  const currentPart = getStudyPart(part)
  const week: StudyWeek = getStudyWeek(part, weekNumber)
  const partWeeks = currentPart.weeks
  const canPrevWeek = getPrevWeek(part, weekNumber) !== null
  const canNextWeek = getNextWeek(part, weekNumber) !== null
  const status = weekStatus(completedWeeks, completedChapters, part, weekNumber)
  const isComplete = status === 'complete'
  const doneResources = completedResources[weekKey(part, weekNumber)] ?? []
  const weekIdx = partWeeks.findIndex((w) => w.number === weekNumber)
  const accent = currentPart.accents[weekIdx % currentPart.accents.length]
  const questions = getDiscussionQuestions(weekNumber)
  const discussionKeyValue = weekKey(part, weekNumber)
  const discussionIsDone = discussionDone.has(discussionKeyValue)
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteSaved, setNoteSaved] = useState(false)
  const noteScripture = `Isaiah ${week.chapterStart}–${week.chapterEnd}`

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden" style={{ borderColor: `${currentPart.color}40` }}>
        {/* Header */}
        <div className="p-6 flex items-center gap-4 flex-wrap justify-between sm:justify-start"
          style={{ background: `${currentPart.color}10`, borderBottom: `1px solid ${currentPart.color}25` }}>
          <Button size="sm" tone={currentPart.color} onClick={onBack} className="order-1 sm:order-none">
            ← part {currentPart.part}
          </Button>
          <div className="flex-1 min-w-0 order-3 basis-full sm:order-none sm:basis-auto">
            <p className="text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: currentPart.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
              Week {week.number} · {week.day} Session
            </p>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 300, color: C.ink, lineHeight: 1.2 }}>
              Week <span style={{ color: currentPart.color, fontStyle: 'italic' }}>{week.number}</span>
              <span style={{ fontSize: '1.05rem', color: `${C.ink}66` }}> — Isaiah {week.chapterStart}–{week.chapterEnd}</span>
            </h3>
            <p className="text-xs mt-1 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
              Part {currentPart.part} — {currentPart.label}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={onPrevWeek}
              disabled={!canPrevWeek}
              aria-label="Previous week"
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-20 hover:-translate-y-px"
              style={{ width: 30, height: 30, border: `1px solid ${currentPart.color}40`, color: currentPart.color, background: `${currentPart.color}08` }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              onClick={onNextWeek}
              disabled={!canNextWeek}
              aria-label="Next week"
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-20 hover:-translate-y-px"
              style={{ width: 30, height: 30, border: `1px solid ${currentPart.color}40`, color: currentPart.color, background: `${currentPart.color}08` }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="flex-shrink-0 order-2 sm:order-none">
            <StatusChip status={status} color={currentPart.color} />
          </div>
        </div>

        {/* Week selector + previous / next — mobile only; desktop keeps focus on the week */}
        <div className="md:hidden px-6 py-4 flex items-center gap-3"
          style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <button
            onClick={onPrevWeek}
            disabled={!canPrevWeek}
            aria-label="Previous week"
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-20 hover:-translate-y-px"
            style={{ width: 30, height: 30, border: `1px solid ${currentPart.color}40`, color: currentPart.color, background: `${currentPart.color}08` }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <div className="flex-1 min-w-0">
            <WeekStrip
              part={part}
              activeWeek={weekNumber}
              completedWeeks={completedWeeks}
              completedChapters={completedChapters}
              completedResources={completedResources}
              onSelect={onSelectWeek}
            />
          </div>
          <button
            onClick={onNextWeek}
            disabled={!canNextWeek}
            aria-label="Next week"
            className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 disabled:opacity-20 hover:-translate-y-px"
            style={{ width: 30, height: 30, border: `1px solid ${currentPart.color}40`, color: currentPart.color, background: `${currentPart.color}08` }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {/* Weekly Resources — primary */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <div className="flex items-baseline gap-4 mb-4 flex-wrap">
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', fontWeight: 400, color: C.ink }}>
              Weekly Resources
            </h4>
            <div className="flex-1 h-px" style={{ background: `${C.ink}15` }} />
            <span className="text-xs italic basis-full sm:basis-auto" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              Complete any one to mark this week complete
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {week.resources.map((r) => (
              <ResourceCard
                key={r.type}
                resource={r}
                color={currentPart.color}
                done={doneResources.includes(r.type)}
                onToggle={() => onToggleResource(r.type)}
              />
            ))}
          </div>
        </div>

        {/* Discussion Questions — reflect on the week before reading */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <div className="flex items-baseline gap-4 mb-4 flex-wrap">
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
              Discussion Questions
            </h4>
            <div className="flex-1 h-px" style={{ background: `${C.ink}15` }} />
            <span className="text-xs italic basis-full sm:basis-auto" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              Isaiah {week.chapterStart}–{week.chapterEnd}
            </span>
          </div>
          <ol className="space-y-3">
            {questions.map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px]"
                  style={{
                    background: `${accent}16`, color: accent, border: `1px solid ${accent}38`,
                    fontFamily: "'Fraunces', serif", fontWeight: 500,
                  }}>
                  {i + 1}
                </span>
                <p className="text-sm pt-0.5" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb`, lineHeight: '1.7' }}>
                  {q.question}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex items-center justify-end">
            <button
              onClick={onToggleDiscussion}
              aria-pressed={discussionIsDone}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs transition-all duration-150"
              style={{
                fontFamily: "'Source Sans 3', sans-serif", letterSpacing: '0.08em',
                color: discussionIsDone ? accent : `${C.ink}66`,
                border: `1px solid ${discussionIsDone ? accent : `${C.ink}25`}`,
                background: discussionIsDone ? `${accent}12` : 'transparent',
              }}>
              {discussionIsDone ? (
                <>
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5 L6.2 11.7 L13 4.5" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  discussion complete
                </>
              ) : (
                'mark discussion done'
              )}
            </button>
          </div>
        </div>

        {/* Study Notes — a small bridge between discussion and reading */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <div className="rounded border px-5 py-4 flex items-center gap-4 flex-wrap"
            style={{ borderColor: `${accent}40`, background: `${accent}05` }}>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.22em] uppercase mb-1"
                style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: accent }}>
                study notes · Isaiah {week.chapterStart}–{week.chapterEnd}
              </p>
              <p className="text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}88`, lineHeight: '1.6' }}>
                Have a thought, question, verse, or insight from this week's reading? Share it with the group.
              </p>
            </div>
            <div className="w-full sm:w-auto flex flex-wrap items-center gap-2 flex-shrink-0">
              <Button size="sm" tone={accent} onClick={() => setNoteOpen(true)}>
                + add a note
              </Button>
              <Button size="sm" onClick={onViewNotes}>
                view notes
              </Button>
            </div>
          </div>

          {noteOpen && (
            <div className="mt-4">
              {user ? (
                <NoteComposer
                  user={user}
                  accent={accent}
                  studies={['Isaiah']}
                  initialDraft={{ study: 'Isaiah', part, week: weekNumber, scripture: noteScripture }}
                  onCancel={() => setNoteOpen(false)}
                  onSaved={() => {
                    setNoteOpen(false)
                    setNoteSaved(true)
                    window.setTimeout(() => setNoteSaved(false), 2800)
                  }}
                />
              ) : (
                <div className="rounded border px-5 py-4 text-center"
                  style={{ borderColor: `${accent}40`, background: `${accent}05` }}>
                  <p className="text-sm mb-3" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}77` }}>
                    Log in to add a note to this week's study.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Button size="sm" tone={accent} onClick={onOpenLogin}>
                      log in
                    </Button>
                    <Button size="sm" onClick={() => setNoteOpen(false)}>
                      cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!noteOpen && noteSaved && (
            <div className="note-fade-in mt-4 rounded border px-5 py-3"
              style={{ borderColor: `${accent}40`, background: `${accent}05` }}>
              <p className="text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif", color: accent }}>
                ✓ note saved — it's now in the group notes.
              </p>
            </div>
          )}
        </div>

        {/* Read the Chapters — secondary */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <div className="flex items-baseline gap-4 mb-4 flex-wrap">
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
              Read the Chapters
            </h4>
            <div className="flex-1 h-px" style={{ background: `${C.ink}15` }} />
            <span className="text-xs italic basis-full sm:basis-auto" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              {week.chapterNumbers.length} chapters · optional
            </span>
          </div>
          <div className="space-y-2.5">
            {week.chapterNumbers.map((n) => {
              const ch = ISAIAH_CHAPTERS.find((c) => c.number === n)!
              const done = completedChapters.has(n)
              return (
                <div key={n}
                  className="flex flex-wrap items-center gap-3 justify-between sm:justify-start rounded border px-4 py-3"
                  style={{ borderColor: `${currentPart.color}30`, background: done ? `${currentPart.color}12` : `${currentPart.color}06` }}>
                  <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-sm order-1 sm:order-none"
                    style={{ background: `${currentPart.color}20`, color: currentPart.color, fontFamily: "'Fraunces', serif", fontSize: '0.95rem', fontWeight: 500 }}>
                    {n}
                  </span>
                  <div className="flex-1 min-w-0 order-3 basis-full sm:order-none sm:basis-auto">
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: '0.95rem', fontWeight: 400, color: C.ink }}>
                      {ch.title}
                    </p>
                    <p className="text-xs italic mt-0.5"
                      style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
                      {ch.theme}
                    </p>
                  </div>
                  <div className="flex-shrink-0 order-2 sm:order-none">
                    <CompleteToggle
                      done={done}
                      color={currentPart.color}
                      onToggle={() => onToggleCompleteChapter(n)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-1 flex-shrink-0 max-w-full order-4 sm:order-none">
                    {VERSIONS.map((v) => {
                      const href = getChapterTranslationLink(n)?.translations[v]
                      if (!href) return null
                      return (
                        <a key={v} href={href} target="_blank" rel="noopener noreferrer"
                          aria-label={`Open Isaiah ${n} in ${VERSION_LABELS[v]}`}
                          className="inline-flex items-center justify-center select-none rounded-full transition-all duration-200 hover:bg-[rgba(217,211,191,0.8)] hover:scale-[0.975] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(148,155,97,0.5)]"
                          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, letterSpacing: '0.1em', height: '2rem', fontSize: '0.7rem', padding: '0 0.4rem', color: '#6B6967', background: 'transparent', border: `1px solid ${currentPart.color}55`, borderRadius: '1.75rem' }}>
                          {v}
                        </a>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Weekly progress — subtle */}
        <div className="px-6 py-6">
          <div className="rounded border px-6 py-4 text-center"
            style={{ borderColor: isComplete ? `${currentPart.color}40` : `${C.ink}18`, background: isComplete ? `${currentPart.color}0d` : 'transparent' }}>
            {isComplete ? (
              <>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', fontWeight: 400, color: C.ink }}>
                  <span style={{ color: currentPart.color }}>✓</span> Week {week.number} complete
                </p>
                <p className="text-xs mt-1.5 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
                  {doneResources.length > 0
                    ? `${doneResources.length} ${doneResources.length === 1 ? 'resource' : 'resources'} complete · Part ${currentPart.part} progress updated.`
                    : `Part ${currentPart.part} progress updated.`}
                </p>
              </>
            ) : (
              <p className="text-sm italic" style={{ fontFamily: "'Lora', serif", color: `${C.ink}77` }}>
                Complete any one resource above to mark this week's study as complete.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChapterView({
  part,
  weekNumber,
  chapterNumber,
  version,
  onBack,
  onPrevChapter,
  onNextChapter,
  completedChapters,
  onToggleComplete,
  onOpenLogin,
  onVersionChange,
}: {
  part: 1 | 2 | 3
  weekNumber: number
  chapterNumber: number
  version: BibleVersion
  onBack: () => void
  onPrevChapter: () => void
  onNextChapter: () => void
  completedChapters: Set<number>
  onToggleComplete: (n: number) => void
  onOpenLogin?: () => void
  onVersionChange: (v: BibleVersion) => void
}) {
  const { user } = useUser()
  const [nkjvContent, setNkjvContent] = useState<string | null>(null)
  const [chapterNotes, setChapterNotes] = useState<StudyNote[]>([])
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteBody, setNoteBody] = useState('')
  const [noteError, setNoteError] = useState(false)
  const currentPart = PARTS.find((p) => p.part === part)!
  const partChapters = ISAIAH_CHAPTERS.filter((c) => c.part === part)
  const partFirst = PART_FIRST[part]
  const partLast = partChapters[partChapters.length - 1].number
  const chapterData = ISAIAH_CHAPTERS.find((c) => c.number === chapterNumber)!

  useEffect(() => {
    let cancelled = false
    listNotes()
      .then((list) => {
        if (!cancelled) setChapterNotes(list.filter((n) => n.chapter === chapterNumber))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [chapterNumber])

  useEffect(() => {
    let cancelled = false
    if (version === 'NKJV') {
      getNKJVChapter(chapterNumber).then((text) => {
        if (!cancelled) setNkjvContent(text)
      })
    } else {
      setNkjvContent(null)
    }
    return () => {
      cancelled = true
    }
  }, [version, chapterNumber])

  const content = version === 'KJV'
    ? KJV_ISAIAH[chapterNumber]
    : version === 'NKJV'
      ? nkjvContent
      : version === 'ESV'
        ? null
        : chapterData.content[version]
  const hasContent = !!content
  const isComplete = completedChapters.has(chapterNumber)
  const translationLink = getChapterTranslationLink(chapterNumber)
  const versionHref = translationLink?.translations[version]

  async function submitChapterNote() {
    if (!user || !noteBody.trim()) return
    setNoteError(false)
    try {
      const created = await createNote({
        authorId: user.id,
        authorName: user.name,
        authorColor: user.color,
        authorInitials: user.initials,
        study: 'Isaiah',
        part,
        week: weekNumber,
        chapter: chapterNumber,
        scripture: `Isaiah ${chapterNumber}`,
        title: noteTitle.trim() || 'Untitled Note',
        body: noteBody.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        tag: 'Study Note',
      })
      setChapterNotes((prev) => [created, ...prev])
      setNoteTitle('')
      setNoteBody('')
      setNoteOpen(false)
    } catch {
      setNoteError(true)
    }
  }

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden" style={{ borderColor: `${currentPart.color}40` }}>
        {/* Top bar with back + version */}
        <div className="px-4 py-2 flex items-center justify-between gap-2 flex-wrap"
          style={{ background: `${C.bg}f0`, backdropFilter: 'blur(8px)', borderBottom: `1px solid ${currentPart.color}25` }}>
          <Button size="sm" tone={currentPart.color} onClick={onBack}>
            ← week {weekNumber}
          </Button>
          <VersionToggle version={version} onChange={onVersionChange} links={translationLink?.translations} />
        </div>

        {/* Chapter title bar */}
        <div className="px-6 py-4 flex items-center gap-4"
          style={{ background: `${currentPart.color}10`, borderBottom: `1px solid ${currentPart.color}25` }}>
          <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-sm"
            style={{ background: `${currentPart.color}20`, color: currentPart.color, fontFamily: "'Fraunces', serif", fontSize: '1rem', fontWeight: 500 }}>
            {chapterData.number}
          </span>
          <div className="flex-1 min-w-0">
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
              {chapterData.title}
            </p>
            <p className="text-xs italic mt-0.5"
              style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
              {chapterData.theme}
            </p>
          </div>
          <span className="text-xs flex-shrink-0 px-2 py-1 rounded-sm"
            style={{ fontFamily: "'Source Sans 3', sans-serif", color: currentPart.color, background: `${currentPart.color}15`, border: `1px solid ${currentPart.color}30`, letterSpacing: '0.08em' }}>
            {version}
          </span>
        </div>

        {/* Chapter text */}
        <div className="px-6 py-8 min-h-48">
          {hasContent ? (
            <div className="space-y-2">
              {content!.split('\n').map((line, i) => {
                if (!line.trim()) return null
                const verseMatch = line.match(/^(\d+)\s?(.*)$/)
                if (verseMatch) {
                  return (
                    <p key={i} className="text-sm"
                      style={{ fontFamily: "'Lora', serif", color: C.ink, lineHeight: '1.9', fontStyle: 'italic', textAlign: 'justify' }}>
                      <strong style={{ fontStyle: 'normal', fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.7rem', color: '#763f21', marginRight: '4px', fontWeight: 700 }}>
                        {verseMatch[1]}
                      </strong>
                      <span style={{ color: C.ink }}>{verseMatch[2]}</span>
                    </p>
                  )
                }
                return (
                  <p key={i} className="text-xs tracking-[0.18em] uppercase pt-3 pb-1"
                    style={{ fontFamily: "'Source Sans 3', sans-serif", color: currentPart.color, fontWeight: 600, fontStyle: 'normal' }}>
                    {line.trim()}
                  </p>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 rounded border"
              style={{ borderColor: `${C.ink}15`, borderStyle: 'dashed' }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: `${C.ink}55`, fontSize: '1rem' }}>
                {version === 'NKJV' ? 'NKJV requires a licensed source.' : version === 'ESV' ? 'Read this chapter on the official ESV website.' : `${version} translation coming soon.`}
              </p>
              {versionHref ? (
                <a href={versionHref} target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm transition-all duration-150 hover:-translate-y-px"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, letterSpacing: '0.08em', color: C.bg, background: currentPart.color }}>
                  Open Isaiah {chapterNumber} in {version}
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ opacity: 0.85 }}>
                    <path d="M2 6 L6 2 M2.5 2 H6 V5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                </a>
              ) : (
                <p className="text-xs mt-2" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}44` }}>
                  {version === 'NKJV' ? 'Complete NKJV text will appear here once a licensed source is connected.' : 'This translation will be added here.'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Community notes for this chapter */}
        <div className="px-6 py-6" style={{ borderTop: `1px solid ${currentPart.color}20` }}>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-1"
                style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
                community notes
              </p>
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
                shared by the group on <span style={{ color: currentPart.color, fontStyle: 'italic' }}>Isaiah {chapterNumber}</span>
              </h4>
            </div>
            {user ? (
              <Button size="sm" tone={currentPart.color} onClick={() => setNoteOpen((o) => !o)}>
                {noteOpen ? 'cancel' : '+ add note'}
              </Button>
            ) : (
              <Button size="sm" tone={currentPart.color} onClick={() => onOpenLogin?.()}>
                log in to add a note
              </Button>
            )}
          </div>

          {noteOpen && user && (
            <div className="rounded border mb-4 overflow-hidden"
              style={{ borderColor: `${currentPart.color}40`, background: `${currentPart.color}06` }}>
              <div className="p-4 space-y-3">
                <input type="text" placeholder="Note title (optional)"
                  value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full rounded-sm px-3 py-2 text-sm outline-none"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", background: C.bg, border: `1px solid ${C.ink}25`, color: C.ink }} />
                <textarea rows={3} placeholder="What did you notice in this passage?"
                  value={noteBody} onChange={(e) => setNoteBody(e.target.value)}
                  className="w-full rounded-sm px-3 py-2 text-sm outline-none resize-none"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", lineHeight: '1.7', background: C.bg, border: `1px solid ${C.ink}25`, color: C.ink }} />
                {noteError && (
                  <p className="text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif", color: C.rose }}>
                    Could not save your note. Please try again.
                  </p>
                )}
                <div className="flex justify-end">
                  <Button size="sm" variant="solid" tone={currentPart.color} onClick={() => void submitChapterNote()}>
                    save note
                  </Button>
                </div>
              </div>
            </div>
          )}

          {chapterNotes.length > 0 ? (
            <div className="space-y-2">
              {chapterNotes.map((n) => (
                <div key={n.id} className="rounded border px-4 py-3"
                  style={{ borderColor: `${n.authorColor}30`, background: `${n.authorColor}05` }}>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-semibold"
                      style={{ color: n.authorColor, fontFamily: "'Source Sans 3', sans-serif" }}>
                      {n.authorName}
                    </span>
                    {n.authorId === user?.id && (
                      <span className="text-[10px] tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-sm"
                        style={{ color: '#fff', background: n.authorColor, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                        you
                      </span>
                    )}
                    <span className="text-xs" style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>·</span>
                    <span className="text-xs" style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>
                      {n.date}
                    </span>
                  </div>
                  {n.title !== 'Untitled Note' && (
                    <p className="text-sm mb-0.5" style={{ fontFamily: "'Fraunces', serif", color: C.ink }}>
                      {n.title}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}88`, lineHeight: '1.7' }}>
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm italic"
              style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              No shared notes on this chapter yet. Be the first to add one.
            </p>
          )}
        </div>

        {/* Mark complete + nav */}
        <div className="px-6 py-4" style={{ borderTop: `1px solid ${currentPart.color}20` }}>
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2.5">
              <CompleteToggle
                done={isComplete}
                color={currentPart.color}
                onToggle={() => onToggleComplete(chapterNumber)}
              />
              <span className="text-xs"
                style={{ fontFamily: "'Source Sans 3', sans-serif", color: isComplete ? currentPart.color : `${C.ink}55`, letterSpacing: '0.06em' }}>
                {isComplete ? 'Completed' : 'Mark complete'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}>
              Isaiah {chapterNumber} of {partLast}
            </div>
          </div>
          <ChapterNav
            chapter={chapterData}
            partFirst={partFirst}
            partLast={partLast}
            onPrev={onPrevChapter}
            onNext={onNextChapter}
            color={currentPart.color}
          />
        </div>
      </div>
    </section>
  )
}

function WhereYouLeftOff({
  completedWeeks,
  completedChapters,
  onContinue,
  onStart,
}: {
  completedWeeks: Set<string>
  completedChapters: Set<number>
  onContinue: (part: 1 | 2 | 3, weekNumber: number) => void
  onStart: () => void
}) {
  let targetWeek: StudyWeek | null = null
  let targetPart: 1 | 2 | 3 = 1
  let completedCount = 0

  for (const p of STUDY_PARTS) {
    for (const w of p.weeks) {
      if (completedWeeks.has(weekKey(p.part, w.number))) completedCount++
    }
  }

  const firstTime = completedCount === 0 && completedChapters.size === 0

  // Returning users: the next available week, i.e. the first week (in order) not
  // yet marked complete. This keeps users in their current week until they
  // actually complete it, then moves them to the following week.
  if (!firstTime && completedCount > 0) {
    outer: for (const p of STUDY_PARTS) {
      for (const w of p.weeks) {
        if (!completedWeeks.has(weekKey(p.part, w.number))) {
          targetWeek = w
          targetPart = p.part
          break outer
        }
      }
    }
  }

  // No completed weeks but chapters read — pick up where those chapters sit.
  if (!targetWeek && completedChapters.size > 0) {
    const maxChapter = Math.max(...completedChapters)
    for (const p of STUDY_PARTS) {
      const w = p.weeks.find((x) => maxChapter >= x.chapterStart && maxChapter <= x.chapterEnd)
      if (w) {
        targetWeek = w
        targetPart = p.part
        break
      }
    }
  }

  // New users start at Week 1; if every week is complete, return to the final
  // week for review.
  if (!targetWeek) {
    if (firstTime) {
      targetWeek = STUDY_PARTS[0].weeks[0]
      targetPart = STUDY_PARTS[0].part
    } else {
      const lastPart = STUDY_PARTS[STUDY_PARTS.length - 1]
      targetWeek = lastPart.weeks[lastPart.weeks.length - 1]
      targetPart = lastPart.part
    }
  }

  const pct = Math.round((completedCount / TOTAL_WEEKS) * 100)
  const color = getStudyPart(targetPart).color

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden"
        style={{ borderColor: `${color}40`, background: `${color}06` }}>
        <div className="p-6 md:p-7">
          <p className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
            {firstTime ? 'Ready to begin' : 'Continue where you left off'}
          </p>

          {firstTime ? (
            <>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.35rem', fontWeight: 300, color: C.ink, lineHeight: 1.2 }}>
                start the <span style={{ color: color, fontStyle: 'italic' }}>study</span>
              </h3>
              <div className="mt-5">
                <Button size="md" tone={color} onClick={onStart}>
                  start the study →
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 300, color: C.ink, lineHeight: 1.2 }}>
                    Week <span style={{ color: color, fontStyle: 'italic' }}>{targetWeek.number}</span>
                  </h3>
                  <p className="text-xs mt-1"
                    style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}>
                    Isaiah {targetWeek.chapterStart}–{targetWeek.chapterEnd} · {targetWeek.day}
                  </p>
                </div>
                <div className="text-right">
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.3rem', fontWeight: 500, color: color, lineHeight: 1 }}>
                    {pct}%
                  </div>
                  <p className="text-xs mt-1" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}55`, letterSpacing: '0.08em' }}>
                    complete
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <Button size="md" tone={color} onClick={() => onContinue(targetPart, targetWeek.number)}>
                  continue study →
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default function StudySection({
  part,
  week,
  chapter,
  version,
  onOpenLogin,
  onNavigate,
}: {
  part?: number
  week?: number
  chapter?: number
  version?: BibleVersion
  onOpenLogin?: () => void
  onNavigate: (route: AppRoute) => void
}) {
  const { user } = useUser()
  const userId = user?.id ?? 'guest'
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(() => loadChapters(userId))
  const [completedWeeks, setCompletedWeeks] = useState<Set<string>>(() => loadProgress(userId))
  const [completedResources, setCompletedResources] = useState<CompletedResources>(() => loadResources(userId) as CompletedResources)
  const [discussionDone, setDiscussionDone] = useState<Set<string>>(() => loadDiscussionDone(userId))

  useEffect(() => {
    setCompletedWeeks(loadProgress(userId))
    setCompletedChapters(loadChapters(userId))
    setCompletedResources(loadResources(userId) as CompletedResources)
    setDiscussionDone(loadDiscussionDone(userId))
  }, [userId])

  // The current location comes from the URL. Sanitize it against the real study
  // data so direct links or stale URLs never render an out-of-range week/chapter.
  const chapterInfo = chapter !== undefined ? ISAIAH_CHAPTERS.find((c) => c.number === chapter) : undefined
  const openChapter: number | null = chapterInfo ? chapterInfo.number : null

  let openPart: 1 | 2 | 3 | null = null
  if (openChapter !== null) {
    openPart = chapterInfo!.part
  } else if (part !== undefined && part >= 1 && part <= 3) {
    openPart = part as 1 | 2 | 3
  }

  let openWeek: number | null = null
  if (openPart !== null) {
    const partWeeks = getStudyPart(openPart).weeks
    if (week !== undefined && partWeeks.some((w) => w.number === week)) {
      openWeek = week
    } else if (openChapter !== null) {
      openWeek = partWeeks.find((w) => openChapter >= w.chapterStart && openChapter <= w.chapterEnd)?.number ?? null
    }
  }

  const currentPart = openPart ?? 1

  const activeVersion: BibleVersion =
    version === 'KJV' || version === 'NKJV' || version === 'ESV' || version === 'NIV' ? version : 'KJV'

  const partChapters = useMemo(
    () => ISAIAH_CHAPTERS.filter((c) => c.part === currentPart),
    [currentPart]
  )

  function go(nextPart?: number, nextWeek?: number, nextChapter?: number, nextVersion?: BibleVersion) {
    onNavigate({ page: 'study', view: 'isaiah', part: nextPart, week: nextWeek, chapter: nextChapter, version: nextChapter ? nextVersion : undefined })
  }

  function handlePartClick(partNum: 1 | 2 | 3) {
    go(partNum)
  }

  function handleWeekClick(weekNumber: number) {
    go(currentPart, weekNumber)
  }

  function handleContinueWeek(partNum: 1 | 2 | 3, weekNumber: number) {
    go(partNum, weekNumber)
  }

  function handleStartStudy() {
    go(1, 1)
  }

  function handleChapterClick(n: number) {
    const ch = ISAIAH_CHAPTERS.find((c) => c.number === n)
    if (!ch) return
    const chWeek = getStudyPart(ch.part).weeks.find((w) => n >= w.chapterStart && n <= w.chapterEnd)?.number
    go(ch.part, chWeek, n)
  }

  function handleBackToParts() {
    go()
  }

  function handleToggleCompleteChapter(n: number) {
    const next = new Set(completedChapters)
    if (next.has(n)) next.delete(n)
    else next.add(n)
    saveChapters(userId, next)
    setCompletedChapters(next)
  }

  function handleToggleResource(partNum: 1 | 2 | 3, weekNumber: number, type: ResourceType) {
    const key = weekKey(partNum, weekNumber)
    const current = completedResources[key] ?? []
    const next = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type]
    const nextResources: CompletedResources = { ...completedResources }
    if (next.length > 0) nextResources[key] = next
    else delete nextResources[key]

    const nextWeeks = new Set(completedWeeks)
    if (next.length > 0) nextWeeks.add(key)
    else nextWeeks.delete(key)

    saveResources(userId, nextResources)
    saveProgress(userId, nextWeeks)
    setCompletedResources(nextResources)
    setCompletedWeeks(nextWeeks)
  }

  function handleToggleDiscussion(partNum: 1 | 2 | 3, weekNumber: number) {
    const key = weekKey(partNum, weekNumber)
    const next = new Set(discussionDone)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    saveDiscussionDone(userId, next)
    setDiscussionDone(next)
  }

  function handlePrevWeek() {
    if (openPart === null || openWeek === null) return
    const prev = getPrevWeek(openPart, openWeek)
    if (prev) go(prev.part, prev.week)
  }

  function handleNextWeek() {
    if (openPart === null || openWeek === null) return
    const next = getNextWeek(openPart, openWeek)
    if (next) go(next.part, next.week)
  }

  function handlePrevChapter() {
    if (openChapter === null) return
    const idx = partChapters.findIndex((c) => c.number === openChapter)
    if (idx > 0) go(currentPart, openWeek ?? 1, partChapters[idx - 1].number, activeVersion)
  }

  function handleNextChapter() {
    if (openChapter === null) return
    const idx = partChapters.findIndex((c) => c.number === openChapter)
    if (idx >= 0 && idx < partChapters.length - 1) go(currentPart, openWeek ?? 1, partChapters[idx + 1].number, activeVersion)
  }

  function handleVersionChange(v: BibleVersion) {
    if (openChapter === null || openPart === null) return
    go(openPart, openWeek ?? 1, openChapter, v)
  }

  return (
    <div>
      {/* Landing: Where-you-left-off / Ready-to-begin action block (study landing only) */}
      {openPart === null && (
        <WhereYouLeftOff
          completedWeeks={completedWeeks}
          completedChapters={completedChapters}
          onContinue={handleContinueWeek}
          onStart={handleStartStudy}
        />
      )}

      {/* Study Progress tracker (always visible, except hidden on mobile inside a week) */}
      <div className={openWeek !== null ? 'hidden md:block' : undefined}>
        <ProgressTracker
          completedWeeks={completedWeeks}
        />
      </div>

      {/* Landing: then the part cards */}
      {openPart === null && (
        <PartProgressCards
          completedWeeks={completedWeeks}
          onPartClick={handlePartClick}
        />
      )}

      {/* Breadcrumb / back nav */}
      {(openPart !== null) && (
        <div className="mb-4 flex items-center gap-2 text-xs flex-wrap"
          style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66`, letterSpacing: '0.05em' }}>
          <button onClick={handleBackToParts}
            className="hover:underline transition-all duration-150"
            style={{ color: C.terra }}>
            Study
          </button>
          {openPart !== null && (
            <>
              <span style={{ color: `${C.ink}33` }}>›</span>
              <button onClick={() => handlePartClick(openPart)}
                className="hover:underline transition-all duration-150"
                style={{ color: `${C.ink}77` }}>
                Part {openPart}
              </button>
            </>
          )}
          {openWeek !== null && openPart !== null && (
            <>
              <span style={{ color: `${C.ink}33` }}>›</span>
              <span>Week {openWeek}</span>
            </>
          )}
          {openChapter !== null && (
            <>
              <span style={{ color: `${C.ink}33` }}>›</span>
              <span>Isaiah {openChapter}</span>
            </>
          )}
        </div>
      )}

      {/* Content depending on depth */}
      {openChapter !== null && openPart !== null ? (
        <ChapterView
          part={openPart}
          weekNumber={openWeek ?? 1}
          chapterNumber={openChapter}
          version={activeVersion}
          onBack={() => go(currentPart, openWeek ?? 1)}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          completedChapters={completedChapters}
          onToggleComplete={handleToggleCompleteChapter}
          onOpenLogin={onOpenLogin}
          onVersionChange={handleVersionChange}
        />
      ) : openWeek !== null && openPart !== null ? (
        <WeekView
          part={openPart}
          weekNumber={openWeek}
          completedWeeks={completedWeeks}
          completedChapters={completedChapters}
          completedResources={completedResources}
          discussionDone={discussionDone}
          onBack={() => go(currentPart)}
          onChapter={handleChapterClick}
          onToggleResource={(type) => handleToggleResource(openPart, openWeek, type)}
          onToggleCompleteChapter={handleToggleCompleteChapter}
          onToggleDiscussion={() => handleToggleDiscussion(openPart, openWeek)}
          user={user}
          onOpenLogin={() => onOpenLogin?.()}
          onViewNotes={() => onNavigate({ page: 'notes' })}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onSelectWeek={handleWeekClick}
        />
      ) : openPart !== null ? (
        <PartOverview
          part={openPart}
          completedWeeks={completedWeeks}
          completedChapters={completedChapters}
          completedResources={completedResources}
          onBack={handleBackToParts}
          onWeekClick={handleWeekClick}
        />
      ) : null}
    </div>
  )
}
