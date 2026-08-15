import { TOTAL_WEEKS } from '@/data/studyWeeks'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89', plum: '#332a37',
}

export interface StudyInfo {
  id: string
  title: string
  tagline: string
  status: 'active' | 'coming-soon'
}

export const STUDIES: StudyInfo[] = [
  { id: 'isaiah', title: 'Isaiah', tagline: 'An in-depth study through the book of Isaiah', status: 'active' },
  { id: 'acts', title: 'Acts', tagline: 'Study of Acts', status: 'coming-soon' },
  { id: 'revelation', title: 'Revelation', tagline: 'Study of Revelation', status: 'coming-soon' },
  { id: 'ruth', title: 'Ruth', tagline: 'Study of Ruth', status: 'coming-soon' },
  { id: 'esther', title: 'Esther', tagline: 'Study of Esther', status: 'coming-soon' },
]

const COMING_SOON_COLORS: Record<string, string> = {
  acts: C.terra,
  revelation: C.plum,
  ruth: C.mauve,
  esther: C.goldDeep,
}

function CornerMark({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M2 2 L12 2 L2 12" stroke={C.goldDeep} strokeWidth="1.1" fill="none" opacity="0.55" />
      <circle cx="2" cy="2" r="1.3" fill={C.goldDeep} opacity="0.55" />
    </svg>
  )
}

export default function StudyLibrary({ onOpenIsaiah }: { onOpenIsaiah: () => void }) {
  const current = STUDIES.find((s) => s.status === 'active')!
  const comingSoon = STUDIES.filter((s) => s.status !== 'active')

  return (
    <section className="mb-14">
      {/* Library heading */}
      <SectionHeader
        kicker="study library"
        title="select a study"
        accent="to begin"
        color={C.terra}
        dividerColor={C.goldDeep}
        className="mb-10"
      />

      {/* Current study */}
      <div className="mb-12">
        <div className="flex items-baseline gap-4 mb-4">
          <h3 className="text-xs tracking-[0.35em] uppercase"
            style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
            Current Study
          </h3>
          <div className="flex-1 h-px" style={{ background: `${C.goldDeep}33` }} />
        </div>

        <div role="button" tabIndex={0} onClick={onOpenIsaiah}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpenIsaiah() } }}
          className="group relative w-full rounded border p-7 md:p-9 text-left transition-all duration-300 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(148,155,97,0.5)]"
          style={{ borderColor: `${C.goldDeep}45`, background: `linear-gradient(160deg, #F8F6F0 0%, #F3F1EA 55%, #F7F6F2 100%)` }}>
          <CornerMark className="absolute top-0 left-0" />
          <CornerMark className="absolute top-0 right-0 rotate-90" />
          <CornerMark className="absolute bottom-0 left-0 -rotate-90" />
          <CornerMark className="absolute bottom-0 right-0 rotate-180" />

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1 min-w-0">
              <p className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
                Isaiah
              </p>
              <h3 style={{
                fontFamily: "'Fraunces', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 400, color: C.ink, lineHeight: 1.05,
              }}>
                The Book of <span style={{ color: C.terra, fontStyle: 'italic' }}>Isaiah</span>
              </h3>
              <p className="text-sm italic mt-2" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}77` }}>
                An in-depth study through the book of Isaiah
              </p>
              <p className="text-xs mt-3" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}55` }}>
                3 parts · 66 chapters · {TOTAL_WEEKS} weekly sessions
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button size="lg" variant="solid" onClick={(e) => { e.stopPropagation(); onOpenIsaiah() }}>
                start the study →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon studies */}
      <div>
        <div className="flex items-baseline gap-4 mb-4">
          <h3 className="text-xs tracking-[0.3em] uppercase"
            style={{ color: `${C.ink}66`, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
            Coming Soon Studies
          </h3>
          <div className="flex-1 h-px" style={{ background: `${C.ink}15` }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {comingSoon.map((s) => {
            const accent = COMING_SOON_COLORS[s.id] ?? C.olive
            return (
              <div key={s.id}
                className="rounded border p-5"
                style={{ borderColor: `${accent}55`, borderStyle: 'dashed', background: `${accent}05`, opacity: 0.75 }}>
                <span className="text-[10px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: accent }}>
                  Coming Soon
                </span>
                <h4 style={{
                  fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 400,
                  color: accent, marginTop: '10px', marginBottom: '4px',
                }}>
                  {s.title}
                </h4>
                <p className="text-xs italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}66` }}>
                  {s.tagline}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
