import { useState } from 'react'
import bgTexture from '@/imports/AZ-ej8JgBC5z5VG54lgeNQ-AZ-ej8JgkwWI5MObcABD5w.jpg'
import { useUser } from '@/context/UserContext'
import LoginModal from '@/components/LoginModal'
import ScriptureSection from '@/components/ScriptureSection'
import NotesSection from '@/components/NotesSection'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
  rose: '#a84c5c', mauve: '#c57c89', plum: '#332a37',
}

const studies = [
  {
    id: 'isaiah',
    title: 'The Book of Isaiah',
    subtitle: 'Prophet of Redemption & the Holy One of Israel',
    verse: '"Do not fear, for I have redeemed you; I have called you by name, you are mine."',
    ref: '— Isaiah 43:1',
    chapters: 66, sessions: 12,
    tag: 'Old Testament · Prophecy',
    accent: C.terra, accentLight: '#a85b3112', border: C.terra,
    description: "A deep journey through one of the richest prophetic books in Scripture — exploring judgment, comfort, the Servant Songs, and the promised restoration of God's people.",
  },
]

const PARTS = [
  { part: 1, label: 'Warning of Judgement', chapters: '1–39', schedule: '2–4 chapters / week', color: C.terra },
  { part: 2, label: 'Comfort and Hope',     chapters: '40–55', schedule: '2–4 chapters / week', color: C.olive },
  { part: 3, label: 'Future Restoration',   chapters: '56–66', schedule: '2–4 chapters / week', color: C.goldDeep },
]

const navLinks = ['Studies', 'Scripture', 'Notes', 'About']

function OrnamentalDivider({ color = C.goldDeep }: { color?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: `${color}44` }} />
      <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
        <path
          d="M8 18 C9 15 11 12 14 11 C17 10 20 11 21 13 C22 15 20 17 18 17
             C16 17 15 15 16 14 C17 13 19 14 19 15
             M21 13 C24 11 28 10 31 11 C34 12 36 14 35 17
             M35 17 C34 19 32 20 30 19 C28 18 28 16 30 16 C31 16 32 17 31 18
             M21 13 C21 16 20 19 18 21 C16 23 14 24 13 27 C12 29 13 31 15 30 C16 29 15 27 14 28
             M21 13 C22 16 23 19 25 21 C27 23 29 22 30 20
             M30 20 C31 19 32 19 33 20 C34 21 33 22 32 21"
          stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"
        />
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

export default function App() {
  const { user, logout } = useUser()
  const [activeNav, setActiveNav] = useState('Studies')
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg, color: C.ink }}>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* ─── Hero Header ─── */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgTexture})` }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${C.bg}88 0%, ${C.bg}cc 60%, ${C.bg} 100%)` }} />
        <div className="relative h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${C.terra}66, ${C.goldDeep}99, ${C.terra}66, transparent)` }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-12 text-center">
          {/* User indicator */}
          <div className="absolute top-4 right-6 flex items-center gap-2">
            {user ? (
              <>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: `${user.color}25`, color: user.color, border: `1.5px solid ${user.color}55`, fontFamily: "'Source Sans 3', sans-serif" }}>
                  {user.initials}
                </div>
                <span className="text-xs" style={{ color: `${C.ink}77`, fontFamily: "'Source Sans 3', sans-serif" }}>
                  {user.name}
                </span>
                <button onClick={logout} className="text-xs"
                  style={{ color: `${C.ink}44`, fontFamily: "'Source Sans 3', sans-serif" }}>
                  Sign out
                </button>
              </>
            ) : (
              <button onClick={() => setShowLogin(true)}
                className="text-xs px-3 py-1 rounded-sm transition-all duration-150"
                style={{ fontFamily: "'Source Sans 3', sans-serif", color: C.terra, border: `1px solid ${C.terra}40`, background: `${C.terra}08` }}>
                sign in
              </button>
            )}
          </div>

          <p className="text-xs uppercase mb-5"
            style={{ color: C.ink, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500, letterSpacing: '3px', paddingTop: '6px', paddingBottom: '6px' }}>
            Created for His Glory
          </p>

          <h1 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(2rem, 6vw, 3.6rem)', fontWeight: 400,
            letterSpacing: '3px', lineHeight: 1.1, color: C.ink,
          }}>
            made for the{' '}
            <span style={{ color: C.terra, fontStyle: 'italic' }}>kingdom</span>
          </h1>

          <div className="mt-5 mb-5 max-w-xs mx-auto">
            <OrnamentalDivider color={C.goldDeep} />
          </div>

          <p className="text-sm tracking-[0.22em] uppercase"
            style={{ color: C.lavender, fontFamily: "'Source Sans 3', sans-serif" }}>
            Rooted in the Word
          </p>

          <nav className="flex justify-center gap-1 mt-8">
            {navLinks.map((link) => (
              <button key={link} onClick={() => setActiveNav(link)}
                className="px-4 py-1.5 transition-all duration-200"
                style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontWeight: activeNav === link ? 600 : 400,
                  fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: activeNav === link ? C.terra : `${C.ink}88`,
                  background: activeNav === link ? `${C.terra}0e` : 'transparent',
                  borderBottom: activeNav === link ? `1.5px solid ${C.terra}` : '1.5px solid transparent',
                }}>
                {link}
              </button>
            ))}
          </nav>
        </div>

        <div className="relative h-px w-full" style={{ background: `${C.goldDeep}30` }} />
      </header>

      {/* ─── Main ─── */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">

        {/* ══ STUDIES ══ */}
        {activeNav === 'Studies' && (
          <>
            {/* Featured hero card */}
            <section className="mb-14">
              <div className="relative rounded overflow-hidden border" style={{ borderColor: `${C.terra}35` }}>
                <CornerMark className="absolute top-0 left-0 z-10" />
                <CornerMark className="absolute top-0 right-0 z-10 rotate-90" />
                <CornerMark className="absolute bottom-0 left-0 z-10 -rotate-90" />
                <CornerMark className="absolute bottom-0 right-0 z-10 rotate-180" />
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden" style={{ minHeight: '200px' }}>
                    <div className="absolute inset-0 bg-center bg-cover"
                      style={{ backgroundImage: `url(${bgTexture})`, backgroundPosition: 'center 30%' }} />
                    <div className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${C.bg}44, ${C.terra}22)` }} />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs tracking-[0.3em] uppercase px-2 py-1 rounded-sm"
                        style={{ background: `${C.bg}cc`, color: C.terra, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, border: `1px solid ${C.terra}30` }}>
                        Now Studying
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-3 p-8 flex flex-col justify-center"
                    style={{ borderLeft: `1px solid ${C.terra}20` }}>
                    <p className="text-xs tracking-[0.3em] uppercase mb-2"
                      style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
                      Old Testament · Prophecy
                    </p>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 400, lineHeight: 1.2, color: C.ink, marginBottom: '4px' }}>
                      The Book of{' '}
                      <span style={{ color: C.terra, fontStyle: 'italic' }}>Isaiah</span>
                    </h2>
                    <p className="text-sm italic mb-4"
                      style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}77`, fontWeight: 300 }}>
                      Prophet of Redemption & the Holy One of Israel
                    </p>
                    <OrnamentalDivider color={C.terra} />
                    <blockquote className="mt-4 text-sm leading-relaxed italic pl-3"
                      style={{ fontFamily: "'Lora', serif", color: `${C.ink}bb`, borderLeft: `2px solid ${C.goldDeep}55` }}>
                      "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder."
                      <footer className="not-italic text-xs tracking-widest mt-1.5"
                        style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif" }}>
                        — Isaiah 9:6
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </section>

            {/* Study structure — 3 parts */}
            <section className="mb-14">
              <div className="flex items-baseline gap-4 mb-6">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 400, color: C.ink }}>
                  Study Plan
                </h3>
                <div className="flex-1 h-px" style={{ background: `${C.ink}18` }} />
                <span className="text-xs italic" style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}55` }}>
                  3 parts · 66 chapters
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {PARTS.map((p) => (
                  <div key={p.part}
                    className="rounded border p-5 transition-all duration-200"
                    style={{ borderColor: `${p.color}40`, background: `${p.color}07` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                      <span className="text-xs tracking-[0.2em] uppercase"
                        style={{ color: p.color, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                        Part {p.part}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '1rem', fontWeight: 400, color: C.ink, marginBottom: '4px' }}>
                      {p.label}
                    </h4>
                    <p className="text-xs mb-3"
                      style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66` }}>
                      Chapters {p.chapters}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <circle cx="5" cy="5" r="4" fill="none" stroke={p.color} strokeWidth="1" opacity="0.7" />
                        <path d="M5 2.5 L5 5 L7 6.5" stroke={p.color} strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                      </svg>
                      <span className="text-xs"
                        style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}77` }}>
                        {p.schedule}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active study card */}
            <section className="mb-14">
              <div className="flex items-baseline gap-4 mb-6">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 400, color: C.ink }}>
                  Active Studies
                </h3>
                <div className="flex-1 h-px" style={{ background: `${C.ink}18` }} />
              </div>
              <div className="space-y-3">
                {studies.map((study) => (
                  <article key={study.id}
                    className="relative rounded border cursor-pointer transition-all duration-300 overflow-hidden"
                    style={{
                      borderColor: expandedStudy === study.id ? study.border : `${study.border}38`,
                      background: expandedStudy === study.id ? study.accentLight : `${study.accentLight}70`,
                    }}
                    onClick={() => setExpandedStudy(expandedStudy === study.id ? null : study.id)}>
                    <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: study.accent }} />
                    <div className="pl-5 pr-5 py-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center"
                          style={{ background: `${study.accent}15`, border: `1px solid ${study.accent}30` }}>
                          <span style={{ fontFamily: "'Fraunces', serif", color: study.accent, fontSize: '1.1rem' }}>✦</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div>
                              <span className="text-xs tracking-[0.25em] uppercase"
                                style={{ color: C.olive, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
                                {study.tag}
                              </span>
                              <h4 className="mt-0.5"
                                style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem', fontWeight: 400, color: C.ink }}>
                                {study.title}
                              </h4>
                              <p className="text-sm mt-0.5 italic"
                                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, color: `${C.ink}77` }}>
                                {study.subtitle}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 text-xs flex-shrink-0">
                              <div className="text-center">
                                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, color: study.accent, fontSize: '1rem' }}>
                                  {study.chapters}
                                </div>
                                <div style={{ color: `${C.ink}66`, fontFamily: "'Source Sans 3', sans-serif" }}>chapters</div>
                              </div>
                              <div className="w-px h-7" style={{ background: `${study.accent}38` }} />
                              <div className="text-center">
                                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, color: C.goldDeep, fontSize: '1rem' }}>
                                  {study.sessions}
                                </div>
                                <div style={{ color: `${C.ink}66`, fontFamily: "'Source Sans 3', sans-serif" }}>sessions</div>
                              </div>
                            </div>
                          </div>
                          {expandedStudy === study.id && (
                            <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${study.accent}22` }}>
                              <p className="text-sm leading-relaxed mb-4"
                                style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb` }}>
                                {study.description}
                              </p>
                              <blockquote className="text-sm italic leading-relaxed mb-4 pl-3"
                                style={{ fontFamily: "'Lora', serif", color: `${C.ink}aa`, borderLeft: `2px solid ${C.goldDeep}55` }}>
                                {study.verse}
                                <footer className="not-italic text-xs mt-1 tracking-widest"
                                  style={{ color: study.accent, fontFamily: "'Source Sans 3', sans-serif" }}>
                                  {study.ref}
                                </footer>
                              </blockquote>
                              <button
                                className="px-5 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-200"
                                style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600, color: C.bg, background: study.accent, borderRadius: '2px' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.terraDark }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = study.accent }}
                                onClick={(e) => { e.stopPropagation(); setActiveNav('Scripture') }}>
                                Begin Study →
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-4 bottom-4 text-xs transition-transform duration-200"
                      style={{ color: `${study.accent}77`, transform: expandedStudy === study.id ? 'rotate(180deg)' : 'none' }}>
                      ▾
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Coming soon */}
            <section className="mb-14">
              <div className="flex items-baseline gap-4 mb-5">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 400, color: C.ink }}>
                  More Studies Coming
                </h3>
                <div className="flex-1 h-px" style={{ background: `${C.ink}18` }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { title: 'Psalms', ref: '150 chapters', color: C.olive },
                  { title: 'Romans', ref: 'New Testament', color: C.lavender },
                  { title: 'Genesis', ref: 'The Beginning', color: C.goldDeep },
                  { title: 'Revelation', ref: 'The Unveiling', color: C.rose },
                ].map((item) => (
                  <div key={item.title} className="p-4 rounded border text-center opacity-55"
                    style={{ borderColor: `${item.color}38`, background: `${item.color}07` }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', color: item.color, marginBottom: '4px' }}>
                      {item.title}
                    </div>
                    <div className="text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}66`, letterSpacing: '0.08em' }}>
                      {item.ref}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Daily verse */}
            <section>
              <div className="relative rounded border py-9 px-8 text-center overflow-hidden"
                style={{ borderColor: `${C.goldDeep}30`, background: `${C.goldDeep}07` }}>
                <div className="absolute inset-0 bg-center bg-cover opacity-5"
                  style={{ backgroundImage: `url(${bgTexture})` }} />
                <CornerMark className="absolute top-0 left-0" />
                <CornerMark className="absolute top-0 right-0 rotate-90" />
                <CornerMark className="absolute bottom-0 left-0 -rotate-90" />
                <CornerMark className="absolute bottom-0 right-0 rotate-180" />
                <p className="relative text-xs tracking-[0.35em] uppercase mb-5"
                  style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
                  A Word for Today
                </p>
                <blockquote className="relative text-base md:text-lg italic leading-relaxed max-w-xl mx-auto mb-4"
                  style={{ fontFamily: "'Lora', serif", color: C.ink }}>
                  "The grass withers, the flower fades, but the word of our God will stand forever."
                </blockquote>
                <div className="max-w-xs mx-auto mb-3">
                  <OrnamentalDivider color={C.goldDeep} />
                </div>
                <footer className="relative text-xs tracking-[0.3em] uppercase"
                  style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif" }}>
                  Isaiah 40:8
                </footer>
              </div>
            </section>
          </>
        )}

        {/* ══ SCRIPTURE ══ */}
        {activeNav === 'Scripture' && <ScriptureSection />}

        {/* ══ NOTES ══ */}
        {activeNav === 'Notes' && (
          <NotesSection onOpenLogin={() => setShowLogin(true)} />
        )}

        {/* ══ ABOUT ══ */}
        {activeNav === 'About' && (
          <section className="max-w-xl mx-auto py-6">
            <div className="mb-8"><OrnamentalDivider color={C.goldDeep} /></div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.4rem', fontWeight: 400, color: C.ink, marginBottom: '16px' }}>
              About made for the kingdom
            </h3>
            <p className="text-sm leading-relaxed mb-4"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb`, lineHeight: '1.8', textAlign: 'justify' }}>
              <em style={{ fontFamily: "'Fraunces', serif" }}>made for the kingdom</em>&nbsp;&nbsp;is a project that God placed on my heart. I believe that we are all part of one body of Christ, just as Scripture teaches, and that God has given each of us different gifts, talents, and creativity to use for His glory. When I started to see myself the way God sees me, I began to notice the dreams, ideas, and creativity He had placed inside of me. At first, some of these ideas felt small, silly, or impossible, but I just couldn't let them go. The name "Made for the Kingdom" was even something God placed on my heart through a dream, and it reminded me that this was never just my idea — it was His.
            </p>
            <p className="text-sm leading-relaxed mb-4"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb`, lineHeight: '1.8', textAlign: 'justify' }}>
              This project is for Him. My desire is to create a platform where we, as His disciples, can glorify God through the unique gifts and creativity He has given us. We were all created differently, and I believe every creation made with a heart for God can reflect a piece of His Kingdom.
            </p>
            <p className="text-sm leading-relaxed mb-4"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb`, lineHeight: '1.8', textAlign: 'justify' }}>
              My hope is that Made for the Kingdom becomes a place where we can create, encourage, and inspire one another to use our gifts boldly, creating little glimpses of His Kingdom here on earth until the day He comes.
            </p>
            <p className="text-sm leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif", color: `${C.ink}bb`, lineHeight: '1.8', textAlign: 'justify' }}>
              Because we were not created by accident. We were created with purpose, creativity, and a calling to bring glory to Him.
            </p>
            <div className="mt-8"><OrnamentalDivider color={C.terra} /></div>
            <blockquote className="mt-6 text-base italic text-center"
              style={{ fontFamily: "'Lora', serif", color: `${C.ink}99` }}>
              "Thy kingdom come, thy will be done."
              <footer className="not-italic text-xs tracking-widest mt-2 block"
                style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif" }}>
                Matthew 6:10
              </footer>
            </blockquote>
          </section>
        )}
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t mt-14 py-7 text-center" style={{ borderColor: `${C.goldDeep}22` }}>
        <div className="h-0.5 w-full mb-6"
          style={{ background: `linear-gradient(90deg, transparent, ${C.terra}44, ${C.goldDeep}66, ${C.terra}44, transparent)` }} />
        <p className="text-xs tracking-[0.3em] uppercase"
          style={{ color: `${C.ink}55`, fontFamily: "'Source Sans 3', sans-serif" }}>
          Made for the{' '}
          <span style={{ color: C.terra }}>Kingdom</span>
          {' '}· Personal Study
        </p>
        <p className="text-xs mt-1.5 italic"
          style={{ color: `${C.ink}44`, fontFamily: "'Lora', serif" }}>
          "Thy kingdom come, thy will be done." — Matthew 6:10
        </p>
      </footer>
    </div>
  )
}
