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

export interface CommentaryResource {
  title: string
  description?: string
  url: string
  source?: string
}

export interface FurtherStudyResource {
  title: string
  description?: string
  url: string
  source?: string
}

export interface WeekResource {
  type: ResourceType
  label: string
  placeholder: string
  url?: string
  videos?: VideoResource[]
  podcasts?: PodcastResource[]
  commentaries?: CommentaryResource[]
  furtherStudy?: FurtherStudyResource[]
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
    label: "Further Study",
    placeholder: "Explore further study resources",
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
              title: "Don't Miss the Point of God's Anger in the Bible",
              url: "https://youtu.be/TeQ1nq_YJD0?si=CBc-wvznFkW7fX-s",
            },
          ]
          copy.placeholder = "Watch this week's teaching video"
        }
        if (copy.type === "video" && weekNumber === 2) {
          copy.videos = [
            {
              title: "Is Holiness Just Moral Perfection? (The Bible's Bigger Idea)",
              url: "https://youtu.be/l9vn5UvsHvM?si=_PWYXtY2NzWSkeMj",
            },
            {
              title: "God's Calling  |  Isaiah 6  |  Gary Hamrick",
              url: "https://youtu.be/lIAqT3t6Gr4?si=lSV04BU9X8KpDvWp",
            },
            {
              title: 'Isaiah 4\u20136 \u2014 \u201CI saw the Lord, high and lifted up.\u201D',
              url: "https://youtu.be/jMkYbPN3l08?si=h78tzXgP1cxIo3c2",
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
            {
              title: "37. Isaiah the Prophet",
              url: "https://open.spotify.com/episode/1nQeSrJ491AGEHZnAYKJtt?si=wLZsqE95Trm9LOF00N1Qcw",
            },
          ]
          copy.placeholder = "Listen to this week's podcast episodes"
        }
        if (copy.type === "podcast" && weekNumber === 2) {
          copy.podcasts = [
            {
              title: "Isaiah 5\u20136:7 \u2014 A Nation Ripe for Judgment",
              url: "https://enduringword.com/sermons/isaiah/isaiah-5-67-a-nation-ripe-for-judgment/",
            },
          ]
          copy.placeholder = "Listen to this week's podcast episodes"
        }
        if (copy.type === "commentary" && weekNumber === 1) {
          copy.commentaries = [
            {
              title: "Isaiah 1–5 Commentary",
              description: "A verse-by-verse exploration of Isaiah's opening judgment oracles.",
              url: "https://www.blueletterbible.org/comm/mhc/isa/isa-001.cfm",
              source: "Matthew Henry",
            },
            {
              title: "The Book of Isaiah",
              description: "Historical and theological overview of the entire prophetic book.",
              url: "https://www.biblegateway.com/resources/commentaries/isaiah/",
              source: "Bible Gateway",
            },
          ]
          copy.placeholder = "Read this week's written commentary"
        }
        if (copy.type === "commentary" && weekNumber === 2) {
          copy.commentaries = [
            {
              title: "Isaiah 6 — Holy, Holy, Holy",
              description: "An exploration of Isaiah's vision of the Lord in the temple.",
              url: "https://enduringword.com/bible-commentary/isaiah-6/",
              source: "David Guzik",
            },
            {
              title: "The Prophetic Messenger and His Message",
              description: "Isaiah 6:1\u20139:21 \u2014 A study guide exploring Isaiah\u2019s prophetic calling, judgment, hope, and restoration.",
              url: "https://yalebiblestudy.org/wp-content/uploads/2019/09/2-Isaiah-The-Prophetic-Messenger-Study-Guide.pdf",
              source: "Yale Bible Study",
            },
            {
              title: "Isaiah: Immanuel",
              description: "A Yale Bible Study guide exploring the Immanuel motif in Isaiah.",
              url: "https://yalebiblestudy.org/wp-content/uploads/2020/07/Isaiah-Immanuel.pdf",
              source: "Yale Bible Study",
            },
          ]
          copy.placeholder = "Read this week's written commentary"
        }
        if (copy.type === "commentary" && weekNumber >= 3 && weekNumber <= 6) {
          copy.commentaries = [
            {
              title: "Isaiah Commentary",
              description: "Verse-level notes with historical context and application.",
              url: "https://enduringword.com/bible-commentary/isaiah-12/",
              source: "Enduring Word",
            },
          ]
          copy.placeholder = "Read this week's written commentary"
        }
        if (copy.type === "commentary" && weekNumber >= 7 && weekNumber <= 10) {
          copy.commentaries = [
            {
              title: "Isaiah 40–55 Commentary",
              description: "Exploring the servant songs and the promise of restoration.",
              url: "https://www.blueletterbible.org/comm/mhc/isa/isa-040.cfm",
              source: "Matthew Henry",
            },
          ]
          copy.placeholder = "Read this week's written commentary"
        }
        if (copy.type === "commentary" && weekNumber >= 11) {
          copy.commentaries = [
            {
              title: "Isaiah 56–66 Commentary",
              description: "The final vision of renewal and the new heavens and new earth.",
              url: "https://enduringword.com/bible-commentary/isaiah-65/",
              source: "Enduring Word",
            },
          ]
          copy.placeholder = "Read this week's written commentary"
        }
        if (copy.type === "articles") {
          copy.furtherStudy = [
            {
              title: "Jesus In All Of Isaiah",
              description: "A video series exploring Jesus throughout the book of Isaiah.",
              url: "https://www.bible.com/videos/collections/1661-jesus-in-all-of-isaiah",
              source: "Spoken Gospel",
            },
            {
              title: "Isaiah \u2014 BibleTalk",
              description: "An online study resource walking through the book of Isaiah.",
              url: "https://bibletalk.tv/isaiah",
              source: "BibleTalk",
            },
          ]
          copy.placeholder = "Explore curated study resources"
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
  // Global break points: after weeks 4, 8, 12, 16 (no break after 19)
  const globalBreaks = new Set([4, 8, 12, 16])
  weeks.forEach((week) => {
    if (globalBreaks.has(week.number)) breaks.add(week.number)
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
