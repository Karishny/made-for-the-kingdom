import { PARTS, ISAIAH_CHAPTERS } from "./isaiah"

export type ResourceType = "video" | "commentary" | "podcast" | "articles"

export interface VideoResource {
  title: string
  url: string
}

export interface PodcastResource {
  title: string
  url: string
}

export interface WeekResource {
  type: ResourceType
  label: string
  placeholder: string
  url?: string
  videos?: VideoResource[]
  podcasts?: PodcastResource[]
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
  accents: string[]
  weeks: StudyWeek[]
}

// Per-week resource completion, keyed by weekKey (e.g. "1-3"). Completing ANY
// ONE resource in a week completes that week. Stored per user (private).
export type CompletedResources = Record<string, ResourceType[]>

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
          copy.videos = [
            {
              title: "Let's Reason Together | Isaiah 1–5 | Gary Hamrick",
              url: "https://youtu.be/bcOzM-XShus?si=syP2N4aX9W4fHDgC",
            },
            {
              title: "Book of Isaiah Summary: A Complete Animated Overview (Part 1)",
              url: "https://youtu.be/d0A6Uchb1F8?si=RLLH8riBRfiw04qu",
            },
            {
              title: "Is Holiness Just Moral Perfection? (The Bible's Bigger Idea)",
              url: "https://youtu.be/l9vn5UvsHvM?si=_PWYXtY2NzWSkeMj",
            },
          ]
          copy.placeholder = "Watch this week's teaching video"
        }
        if (copy.type === "podcast" && weekNumber === 1) {
          copy.podcasts = [
            {
              title: "The Cosmic Mount Zion in Isaiah",
              url: "https://bibleproject.com/podcasts/cosmic-mount-zion-isaiah/",
            },
            {
              title: "The Tribulation Will Kill Billions, But You Won't Be There",
              url: "https://open.spotify.com/episode/3wu6s9YAg8QswDXRvT2cdl?si=BA5ZNa_qT2OCDbbw1GpjCQ",
            },
          ]
          copy.placeholder = "Listen to this week's podcast episodes"
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
      accents: p.accents,
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
  if (isWeekComplete(completedWeeks, {}, part, weekNumber)) return "complete"
  const week = getStudyWeek(part, weekNumber)
  const anyDone = week.chapterNumbers.some((n) => completedChapters.has(n))
  return anyDone ? "in-progress" : "not-started"
}

// A week is complete when it is in the completedWeeks set OR any of its weekly
// resources has been completed (engaging with any one resource completes it).
export function isWeekComplete(
  completedWeeks: Set<string>,
  completedResources: CompletedResources,
  part: 1 | 2 | 3,
  weekNumber: number,
): boolean {
  const key = weekKey(part, weekNumber)
  if (completedWeeks.has(key)) return true
  return (completedResources[key]?.length ?? 0) > 0
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

// The complete Isaiah Study Journey as one ordered list of weeks (Part 1 → 2 →
// 3). Week numbers are globally unique, but this ordered list is what lets the
// Previous/Next week navigation flow continuously across part boundaries while
// keeping the visual Part 1 / Part 2 / Part 3 structure untouched.
const STUDY_WEEK_ORDER: Array<{ part: 1 | 2 | 3; week: number }> = STUDY_PARTS.flatMap((p) =>
  p.weeks.map((w) => ({ part: p.part, week: w.number })),
)

// The week immediately before (part, weekNumber) in the journey, or null at the
// very first week of Part 1. Crosses part boundaries (e.g. Part 2 Week 1 →
// Part 1 Week 11).
export function getPrevWeek(part: 1 | 2 | 3, weekNumber: number): { part: 1 | 2 | 3; week: number } | null {
  const idx = STUDY_WEEK_ORDER.findIndex((w) => w.part === part && w.week === weekNumber)
  return idx > 0 ? STUDY_WEEK_ORDER[idx - 1] : null
}

// The week immediately after (part, weekNumber) in the journey, or null at the
// very last week of Part 3. Crosses part boundaries (e.g. Part 1 Week 11 →
// Part 2 Week 12).
export function getNextWeek(part: 1 | 2 | 3, weekNumber: number): { part: 1 | 2 | 3; week: number } | null {
  const idx = STUDY_WEEK_ORDER.findIndex((w) => w.part === part && w.week === weekNumber)
  return idx >= 0 && idx < STUDY_WEEK_ORDER.length - 1 ? STUDY_WEEK_ORDER[idx + 1] : null
}
