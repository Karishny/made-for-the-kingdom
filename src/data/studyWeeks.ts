import { PARTS, ISAIAH_CHAPTERS } from "./isaiah"

export type ResourceType = "video" | "commentary" | "podcast" | "articles"

export interface WeekResource {
  type: ResourceType
  label: string
  placeholder: string
  url?: string
}

export interface StudyWeek {
  number: number
  day: string
  chapterStart: number
  chapterEnd: number
  chapterNumbers: number[]
  resources: WeekResource[]
}

export interface StudyPart {
  part: 1 | 2 | 3
  label: string
  chaptersLabel: string
  color: string
  weeks: StudyWeek[]
}

const WEEKLY_RESOURCES: WeekResource[] = [
  { type: "video", label: "Video", placeholder: "Video resource coming soon" },
  {
    type: "commentary",
    label: "Written Commentary",
    placeholder: "Written commentary coming soon",
  },
  {
    type: "podcast",
    label: "Podcast",
    placeholder: "Podcast resource coming soon",
  },
  {
    type: "articles",
    label: "Articles & Further Reading",
    placeholder: "Additional resources coming soon",
  },
]

const WEEKLY_SCHEDULE: Record<1 | 2 | 3, Array<[number, number]>> = {
  1: [
    [1, 4],
    [5, 7],
    [8, 10],
    [11, 14],
    [15, 18],
    [19, 22],
    [23, 26],
    [27, 29],
    [30, 32],
    [33, 36],
    [37, 39],
  ],
  2: [
    [40, 42],
    [43, 45],
    [46, 48],
    [49, 51],
    [52, 55],
  ],
  3: [
    [56, 59],
    [60, 63],
    [64, 66],
  ],
}

function buildWeeks(part: 1 | 2 | 3, weekStart: number): StudyWeek[] {
  return WEEKLY_SCHEDULE[part].map(([start, end], i) => {
    const weekNumber = weekStart + i
    return {
      number: weekNumber,
      day: "Thursday",
      chapterStart: start,
      chapterEnd: end,
      chapterNumbers: ISAIAH_CHAPTERS.filter((c) => c.number >= start && c.number <= end).map((c) => c.number),
      resources: WEEKLY_RESOURCES.map((r) => {
        const copy = { ...r }
        if (copy.type === "video" && weekNumber === 1) {
          copy.url = "https://www.youtube.com/watch?v=d0A6Uchb1F8&t=369s"
          copy.placeholder = "Watch this week's teaching video"
        }
        return copy
      }),
    }
  })
}

export const STUDY_PARTS: StudyPart[] = (() => {
  let weekOffset = 0
  return PARTS.map((p) => {
    const weeks = buildWeeks(p.part, weekOffset + 1)
    weekOffset += weeks.length
    return {
      part: p.part,
      label: p.label,
      chaptersLabel: p.chapters,
      color: p.color,
      weeks,
    }
  })
})()

export const TOTAL_WEEKS = STUDY_PARTS.reduce((n, p) => n + p.weeks.length, 0)

export function weekKey(part: 1 | 2 | 3, weekNumber: number): string {
  return `${part}-${weekNumber}`
}

export function getStudyPart(part: 1 | 2 | 3): StudyPart {
  return STUDY_PARTS.find((p) => p.part === part)!
}

export function getStudyWeek(part: 1 | 2 | 3, weekNumber: number): StudyWeek {
  return getStudyPart(part).weeks.find((w) => w.number === weekNumber)!
}

export function weekStatus(
  completedWeeks: Set<string>,
  completedChapters: Set<number>,
  part: 1 | 2 | 3,
  weekNumber: number,
): "complete" | "in-progress" | "not-started" {
  if (completedWeeks.has(weekKey(part, weekNumber))) return "complete"
  const week = getStudyWeek(part, weekNumber)
  const anyDone = week.chapterNumbers.some((n) => completedChapters.has(n))
  return anyDone ? "in-progress" : "not-started"
}

// Week numbers (within a part) after which a BREAK separator is shown in the
// part overview. A break follows every 4 study weeks (and never after the last
// week of a part). A break is not a study week — it has no chapters, is not
// counted toward progress, and never appears in the progress tracker.
export function breakAfterWeeks(part: 1 | 2 | 3): Set<number> {
  const weeks = getStudyPart(part).weeks
  const breaks = new Set<number>()
  weeks.forEach((week, i) => {
    const atGroupEnd = (i + 1) % 4 === 0
    const isLast = i === weeks.length - 1
    if (atGroupEnd && !isLast) breaks.add(week.number)
  })
  return breaks
}
