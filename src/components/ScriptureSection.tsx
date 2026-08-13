import { useState, useMemo, useEffect, Fragment } from 'react'
import { ISAIAH_CHAPTERS, PARTS, type BibleVersion, type ChapterData } from '@/data/isaiah'
import { KJV_ISAIAH } from '@/data/kjvIsaiah'
import { getNKJVChapter } from '@/lib/nkjv'
import {
  STUDY_PARTS,
  TOTAL_WEEKS,
  weekKey,
  getStudyPart,
  getStudyWeek,
  weekStatus,
  breakAfterWeeks,
  type StudyWeek,
  type ResourceType,
} from '@/data/studyWeeks'
import Button from '@/components/Button'
import { useUser } from '@/context/UserContext'
import { loadProgress, saveProgress, loadChapters, saveChapters } from '@/lib/storage'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89', plum: '#332a37',
}

const VERSIONS: BibleVersion[] = ['KJV', 'NKJV', 'ESV', 'NIV']

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
        style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: `${color}55` }}>
        BREAK
      </span>
      <div className="flex-1 h-px" style={{ background: `${color}22` }} />
    </div>
  )
}

function ProgressTracker({
  completedWeeks,
  onPartClick,
}: {
  completedWeeks: Set<string>
  onPartClick: (part: 1 | 2 | 3) => void
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

          {/* Per-part progress */}
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
        </div>
      </div>
    </section>
  )
}

function PartOverview({
  part,
  completedWeeks,
  completedChapters,
  onBack,
  onWeekClick,
}: {
  part: 1 | 2 | 3
  completedWeeks: Set<string>
  completedChapters: Set<number>
  onBack: () => void
  onWeekClick: (weekNumber: number) => void
}) {
  const currentPart = getStudyPart(part)
  const done = currentPart.weeks.filter((w) => completedWeeks.has(weekKey(part, w.number))).length
  const [weeksOpen, setWeeksOpen] = useState(true)
  const breaks = breakAfterWeeks(part)

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden" style={{ borderColor: `${currentPart.color}40` }}>
        <div className="p-6 flex items-center gap-3 flex-wrap"
          style={{ background: `${currentPart.color}10`, borderBottom: `1px solid ${currentPart.color}25` }}>
          <button
            onClick={() => setWeeksOpen((v) => !v)}
      className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 hover:-translate-y-px"
            style={{ width: 34, height: 34, border: `1px solid ${currentPart.color}45`, background: `${currentPart.color}10`, color: currentPart.color }}
            aria-expanded={weeksOpen}
            aria-label={weeksOpen ? 'Collapse weekly sessions' : 'Expand weekly sessions'}
            title={weeksOpen ? 'Collapse weekly sessions' : 'Expand weekly sessions'}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
              style={{ transform: weeksOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
              <path d="M3 6 L8 11 L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </button>
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
          {weeksOpen ? (
            <>
              <p className="text-xs mb-4" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}55`, letterSpacing: '0.1em' }}>
                Weekly study sessions
              </p>
              <div className="space-y-2.5">
                {currentPart.weeks.map((week) => {
                  const status = weekStatus(completedWeeks, completedChapters, part, week.number)
                  return (
                    <Fragment key={week.number}>
                      <button onClick={() => onWeekClick(week.number)}
                        className="w-full flex items-center gap-4 rounded border px-4 py-3 text-left transition-all duration-200 hover:-translate-y-0.5"
                        style={{ borderColor: `${currentPart.color}35`, background: status === 'complete' ? `${currentPart.color}12` : `${currentPart.color}06` }}>
                        <span className="flex-shrink-0 w-11 text-center"
                          style={{ fontFamily: "'Fraunces', serif", color: currentPart.color, fontSize: '1.1rem', fontWeight: 500 }}>
                          {week.number}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block"
                            style={{ color: currentPart.color, fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                            Week {week.number}
                          </span>
                          <span className="block text-xs mt-0.5"
                            style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}77` }}>
                            {week.day} · Isaiah {week.chapterStart}–{week.chapterEnd}
                          </span>
                        </span>
                        <StatusChip status={status} color={currentPart.color} />
                        <span className="text-xs flex-shrink-0"
                          style={{ color: currentPart.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                          →
                        </span>
                      </button>
                      {breaks.has(week.number) && <BreakDivider />}
                    </Fragment>
                  )
                })}
              </div>
              <p className="text-xs mt-5 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}44` }}>
                Select a weekly session to begin. Each week is one Thursday gathering.
              </p>
            </>
          ) : (
            <p className="text-xs italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              {currentPart.weeks.length} weekly sessions are collapsed — click the arrow to expand.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

function ResourceCard({ resource, color }: { resource: StudyWeek['resources'][number]; color: string }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}16`, border: `1px solid ${color}30` }}>
          <ResourceIcon type={resource.type} color={color} />
        </div>
        <span className="text-[10px] tracking-[0.14em] uppercase px-2 py-0.5 rounded-sm"
          style={{
            fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
            color: resource.url ? color : `${C.ink}55`,
            background: resource.url ? `${color}10` : `${C.ink}08`,
            border: `1px solid ${resource.url ? `${color}35` : `${C.ink}18`}`,
          }}>
          {resource.url ? 'Watch now' : 'Coming soon'}
        </span>
      </div>
      <p className="text-xs tracking-[0.18em] uppercase mb-1"
        style={{ color: color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
        {resource.label}
      </p>
      <p className="text-xs italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
        {resource.placeholder}
      </p>
    </>
  )
  if (resource.url) {
    return (
      <a href={resource.url} target="_blank" rel="noopener noreferrer"
        className="block rounded border p-5 transition-all duration-200 hover:-translate-y-0.5"
        style={{ borderColor: `${color}30`, background: `${color}05`, opacity: 0.92 }}>
        {body}
      </a>
    )
  }
  return (
    <div className="rounded border p-5"
      style={{ borderColor: `${color}30`, background: `${color}05`, opacity: 0.92 }}>
      {body}
    </div>
  )
}

function CompleteToggle({ done, color, onToggle }: { done: boolean; color: string; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={done}
      aria-label={done ? 'Mark as not complete' : 'Mark as complete'}
      title={done ? 'Mark as not complete' : 'Mark as complete'}
      className="flex-shrink-0 flex items-center justify-center rounded-sm transition-all duration-150 hover:-translate-y-px"
      style={{
        width: 34,
        height: 34,
        border: `1px solid ${done ? color : `${C.ink}30`}`,
        background: done ? color : 'transparent',
        color: done ? C.bg : 'transparent',
      }}>
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
        style={{ opacity: done ? 1 : 0, transition: 'opacity 0.15s ease' }}>
        <path d="M3 8.5 L6.2 11.7 L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  )
}

function WeekView({
  part,
  weekNumber,
  completedWeeks,
  completedChapters,
  onBack,
  onChapter,
  onToggleCompleteWeek,
  onToggleCompleteChapter,
}: {
  part: 1 | 2 | 3
  weekNumber: number
  completedWeeks: Set<string>
  completedChapters: Set<number>
  onBack: () => void
  onChapter: (n: number) => void
  onToggleCompleteWeek: () => void
  onToggleCompleteChapter: (n: number) => void
}) {
  const currentPart = getStudyPart(part)
  const week: StudyWeek = getStudyWeek(part, weekNumber)
  const isComplete = completedWeeks.has(weekKey(part, weekNumber))

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden" style={{ borderColor: `${currentPart.color}40` }}>
        {/* Header */}
        <div className="p-6 flex items-center gap-4 flex-wrap"
          style={{ background: `${currentPart.color}10`, borderBottom: `1px solid ${currentPart.color}25` }}>
          <Button size="sm" tone={currentPart.color} onClick={onBack}>
            ← part {currentPart.part}
          </Button>
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.2em] uppercase mb-1"
              style={{ color: currentPart.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
              Week {week.number} · {week.day} Session
            </p>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 300, color: C.ink, lineHeight: 1.2 }}>
              Chapters <span style={{ color: currentPart.color, fontStyle: 'italic' }}>{week.chapterStart}–{week.chapterEnd}</span>
            </h3>
            <p className="text-xs mt-1 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
              Part {currentPart.part} — {currentPart.label}
            </p>
          </div>
          <StatusChip status={isComplete ? 'complete' : 'not-started'} color={currentPart.color} />
        </div>

        {/* Chapters in this week */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <div className="flex items-baseline gap-4 mb-4">
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
              Read the Chapters
            </h4>
            <div className="flex-1 h-px" style={{ background: `${C.ink}15` }} />
            <span className="text-xs italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              {week.chapterNumbers.length} chapters · Thursday reading
            </span>
          </div>
          <div className="space-y-2.5">
            {week.chapterNumbers.map((n) => {
              const ch = ISAIAH_CHAPTERS.find((c) => c.number === n)!
              const done = completedChapters.has(n)
              return (
                <div key={n}
                  className="flex items-center gap-3 rounded border px-4 py-3"
                  style={{ borderColor: `${currentPart.color}30`, background: done ? `${currentPart.color}12` : `${currentPart.color}06` }}>
                  <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-sm"
                    style={{ background: `${currentPart.color}20`, color: currentPart.color, fontFamily: "'Fraunces', serif", fontSize: '0.95rem', fontWeight: 500 }}>
                    {n}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: '0.95rem', fontWeight: 400, color: C.ink }}>
                      {ch.title}
                    </p>
                    <p className="text-xs italic mt-0.5"
                      style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
                      {ch.theme}
                    </p>
                  </div>
                  <CompleteToggle
                    done={done}
                    color={currentPart.color}
                    onToggle={() => onToggleCompleteChapter(n)}
                  />
                  <Button size="sm" tone={currentPart.color} onClick={() => onChapter(n)}>
                    read →
                  </Button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Resources */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${currentPart.color}18` }}>
          <div className="flex items-baseline gap-4 mb-4">
            <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 400, color: C.ink }}>
              Weekly Resources
            </h4>
            <div className="flex-1 h-px" style={{ background: `${C.ink}15` }} />
            <span className="text-xs italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
              Choose one to go deeper
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {week.resources.map((r) => (
              <ResourceCard key={r.type} resource={r} color={currentPart.color} />
            ))}
          </div>
        </div>

        {/* Weekly completion */}
        <div className="px-6 py-6">
          <div className="relative rounded border p-6 text-center"
            style={{ borderColor: isComplete ? `${currentPart.color}45` : `${C.terra}35`, background: isComplete ? `${currentPart.color}0d` : `${C.terra}07` }}>
            {!isComplete && <CornerMark className="absolute top-0 left-0" />}
            {!isComplete && <CornerMark className="absolute top-0 right-0 rotate-90" />}
            {!isComplete && <CornerMark className="absolute bottom-0 left-0 -rotate-90" />}
            {!isComplete && <CornerMark className="absolute bottom-0 right-0 rotate-180" />}
            <p className="text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: isComplete ? currentPart.color : C.terra, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
              Weekly Study Progress
            </p>
            {isComplete ? (
              <>
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.25rem', fontWeight: 400, color: C.ink }}>
                  <span style={{ color: currentPart.color }}>✓</span> Week {week.number} Complete
                </p>
                <p className="text-xs mt-2 italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
                  Part {currentPart.part} progress has been updated.
                </p>
                <Button size="sm" onClick={onToggleCompleteWeek} className="mt-5">
                  undo completion
                </Button>
              </>
            ) : (
              <>
                <p className="text-sm italic" style={{ fontFamily: "'Lora', serif", color: `${C.ink}88` }}>
                  "Complete at least one resource to mark this week's study as complete."
                </p>
                <Button variant="solid" onClick={onToggleCompleteWeek} className="mt-5">
                  ✓ i've completed this week's study
                </Button>
              </>
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
  onBack,
  onPrevChapter,
  onNextChapter,
  completedChapters,
  onToggleComplete,
}: {
  part: 1 | 2 | 3
  weekNumber: number
  chapterNumber: number
  onBack: () => void
  onPrevChapter: () => void
  onNextChapter: () => void
  completedChapters: Set<number>
  onToggleComplete: (n: number) => void
}) {
  const [version, setVersion] = useState<BibleVersion>('KJV')
  const [nkjvContent, setNkjvContent] = useState<string | null>(null)
  const currentPart = PARTS.find((p) => p.part === part)!
  const partChapters = ISAIAH_CHAPTERS.filter((c) => c.part === part)
  const partFirst = PART_FIRST[part]
  const partLast = partChapters[partChapters.length - 1].number
  const chapterData = ISAIAH_CHAPTERS.find((c) => c.number === chapterNumber)!

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
      : chapterData.content[version]
  const hasContent = !!content
  const isComplete = completedChapters.has(chapterNumber)

  return (
    <section className="mb-14">
      <div className="rounded border overflow-hidden" style={{ borderColor: `${currentPart.color}40` }}>
        {/* Top bar with back + version */}
        <div className="px-4 py-2 flex items-center justify-between gap-2 flex-wrap"
          style={{ background: `${C.bg}f0`, backdropFilter: 'blur(8px)', borderBottom: `1px solid ${currentPart.color}25` }}>
          <Button size="sm" tone={currentPart.color} onClick={onBack}>
            ← week {weekNumber}
          </Button>
          <VersionToggle version={version} onChange={setVersion} />
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
                {version === 'NKJV' ? 'NKJV requires a licensed source.' : `${version} translation coming soon.`}
              </p>
              <p className="text-xs mt-2" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}44` }}>
                {version === 'NKJV'
                  ? 'Complete NKJV text will appear here once a licensed source is connected.'
                  : 'This translation will be added here.'}
              </p>
            </div>
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

export default function StudySection() {
  const { user } = useUser()
  const userId = user?.id ?? 'guest'
  const [openPart, setOpenPart] = useState<1 | 2 | 3 | null>(null)
  const [openWeek, setOpenWeek] = useState<number | null>(null)
  const [openChapter, setOpenChapter] = useState<number | null>(null)
  const [completedChapters, setCompletedChapters] = useState<Set<number>>(() => loadChapters(userId))
  const [completedWeeks, setCompletedWeeks] = useState<Set<string>>(() => loadProgress(userId))

  useEffect(() => {
    setCompletedWeeks(loadProgress(userId))
    setCompletedChapters(loadChapters(userId))
  }, [userId])

  const currentPart = openPart ?? 1

  const partChapters = useMemo(
    () => ISAIAH_CHAPTERS.filter((c) => c.part === currentPart),
    [currentPart]
  )

  function handlePartClick(part: 1 | 2 | 3) {
    setOpenPart(part)
    setOpenWeek(null)
    setOpenChapter(null)
  }

  function handleWeekClick(weekNumber: number) {
    setOpenWeek(weekNumber)
    setOpenChapter(null)
  }

  function handleContinueWeek(part: 1 | 2 | 3, weekNumber: number) {
    setOpenPart(part)
    setOpenWeek(weekNumber)
    setOpenChapter(null)
  }

  function handleStartStudy() {
    setOpenPart(1)
    setOpenWeek(1)
    setOpenChapter(null)
  }

  function handleChapterClick(n: number) {
    const ch = ISAIAH_CHAPTERS.find((c) => c.number === n)
    if (ch) setOpenPart(ch.part)
    setOpenChapter(n)
  }

  function handleBackToParts() {
    setOpenPart(null)
    setOpenWeek(null)
    setOpenChapter(null)
  }

  function handleToggleCompleteChapter(n: number) {
    const next = new Set(completedChapters)
    if (next.has(n)) next.delete(n)
    else next.add(n)
    saveChapters(userId, next)
    setCompletedChapters(next)
  }

  function handleToggleCompleteWeek(part: 1 | 2 | 3, weekNumber: number) {
    const key = weekKey(part, weekNumber)
    const next = new Set(completedWeeks)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    saveProgress(userId, next)
    setCompletedWeeks(next)
  }

  function handlePrevChapter() {
    if (openChapter === null) return
    const idx = partChapters.findIndex((c) => c.number === openChapter)
    if (idx > 0) setOpenChapter(partChapters[idx - 1].number)
  }

  function handleNextChapter() {
    if (openChapter === null) return
    const idx = partChapters.findIndex((c) => c.number === openChapter)
    if (idx >= 0 && idx < partChapters.length - 1) setOpenChapter(partChapters[idx + 1].number)
  }

  return (
    <div>
      {/* Top: progress tracker (always visible) */}
      <ProgressTracker
        completedWeeks={completedWeeks}
        onPartClick={handlePartClick}
      />

      {/* Where you left off — shown on the study landing before part selection */}
      {openPart === null && (
        <WhereYouLeftOff
          completedWeeks={completedWeeks}
          completedChapters={completedChapters}
          onContinue={handleContinueWeek}
          onStart={handleStartStudy}
        />
      )}

      {/* Breadcrumb / back nav */}
      {(openPart !== null) && (
        <div className="mb-4 flex items-center gap-2 text-xs flex-wrap"
          style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66`, letterSpacing: '0.05em' }}>
          <button onClick={handleBackToParts}
            className="hover:underline"
            style={{ color: C.terra }}>
            Study
          </button>
          {openPart !== null && (
            <>
              <span style={{ color: `${C.ink}33` }}>›</span>
              <span>Part {openPart}</span>
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
          onBack={() => setOpenChapter(null)}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          completedChapters={completedChapters}
          onToggleComplete={handleToggleCompleteChapter}
        />
      ) : openWeek !== null && openPart !== null ? (
        <WeekView
          part={openPart}
          weekNumber={openWeek}
          completedWeeks={completedWeeks}
          completedChapters={completedChapters}
          onBack={() => setOpenWeek(null)}
          onChapter={handleChapterClick}
          onToggleCompleteWeek={() => handleToggleCompleteWeek(openPart, openWeek)}
          onToggleCompleteChapter={handleToggleCompleteChapter}
        />
      ) : openPart !== null ? (
        <PartOverview
          part={openPart}
          completedWeeks={completedWeeks}
          completedChapters={completedChapters}
          onBack={handleBackToParts}
          onWeekClick={handleWeekClick}
        />
      ) : null}
    </div>
  )
}
