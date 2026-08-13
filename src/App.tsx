import { useState } from 'react'
import LoginModal from '@/components/LoginModal'
import NotesSection from '@/components/NotesSection'
import StudySection from '@/components/ScriptureSection'
import StudyLibrary from '@/components/StudyLibrary'
import SiteHeader from '@/components/SiteHeader'
import SiteBackdrop from '@/components/SiteBackdrop'
import Button from '@/components/Button'
import MadeFtk from '@/components/MadeFtk'
import { OrnamentalDivider } from '@/components/SectionHeader'
import { C, P, FONT_SERIF, FONT_SANS } from '@/theme'

export default function App() {
  const [activeNav, setActiveNav] = useState('Home')
  const [studyView, setStudyView] = useState<'library' | 'isaiah'>('library')
  const [showLogin, setShowLogin] = useState(false)

  function handleNav(link: string) {
    setActiveNav(link)
    if (link === 'Study') setStudyView('library')
  }

  function handleStartStudy() {
    setStudyView('isaiah')
    setActiveNav('Study')
  }

  const isWideMain = activeNav === 'Home' || (activeNav === 'Study' && studyView === 'library')
  const isHome = activeNav === 'Home'

  return (
    <div className="relative min-h-screen" style={{ color: C.ink, backgroundColor: C.bg }}>
      {!isHome && <SiteBackdrop />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* ─── Shared header — identical on every page ─── */}
      <SiteHeader activeNav={activeNav} onNav={handleNav} onSignIn={() => setShowLogin(true)} />

      {/* ─── Home hero (content below the header) ─── */}
      {isHome && (
        <section className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-4 md:pb-8 text-center">
          <h1 style={{
            fontFamily: FONT_SERIF,
            fontSize: 'clamp(2.4rem, 6.5vw, 5.6rem)',
            fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.2,
            color: P.titleMuted, maxWidth: 'min(60vw, 1100px)', margin: '0 auto',
          }}>
            made for the{' '}
            <span style={{ color: P.gold, fontStyle: 'italic' }}>kingdom</span>
          </h1>

          <div className="mt-14 md:mt-20 mx-auto max-w-4xl lg:max-w-5xl">
            <p className="text-[16px] md:text-[18px]" style={{ fontFamily: FONT_SANS, fontWeight: 300, color: P.support, lineHeight: 2 }}>
              We were all created with purpose, called to grow in the gifts God has given us, and reminded that the greatest masterpiece has always been His story.
            </p>
            <p className="text-[16px] md:text-[18px] mt-4" style={{ fontFamily: FONT_SANS, fontWeight: 300, color: P.support, lineHeight: 2 }}>
              May everything you create become an act of worship, every gift be used to glorify Him, and every step point back to the One who created it all.
            </p>
          </div>

          <div className="mt-12 md:mt-16 mb-12 md:mb-16 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="md"
              onClick={handleStartStudy}
              style={{ background: '#F7F6F2', color: '#C9B050', border: '1px solid #A85B31' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201, 176, 80, 0.20)'
                e.currentTarget.style.borderColor = '#C9B050'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F7F6F2'
                e.currentTarget.style.borderColor = '#A85B31'
              }}
            >
              start study
            </Button>
          </div>

          <div className="text-center">
            <MadeFtk />
          </div>
        </section>
      )}

      {/* ─── Main ─── */}
      {!isHome && (
        <main className={`mx-auto px-6 py-12 md:py-16 ${isWideMain ? 'max-w-6xl' : 'max-w-4xl'}`}>

        {/* ══ STUDY ══ */}
        {activeNav === 'Study' && (
          <div className="relative">
            {studyView === 'library' ? (
              <StudyLibrary onOpenIsaiah={() => setStudyView('isaiah')} />
            ) : (
              <>
                <div className="mb-4">
                  <Button size="sm" onClick={() => setStudyView('library')}>
                    ← study library
                  </Button>
                </div>
                <StudySection />
              </>
            )}
          </div>
        )}

        {/* ══ NOTES ══ */}
        {activeNav === 'Notes' && (
          <NotesSection onOpenLogin={() => setShowLogin(true)} />
        )}

        {/* ══ ABOUT ══ */}
        {activeNav === 'About' && (
          <section className="max-w-xl mx-auto">
            <p className="text-sm leading-relaxed mb-4 md:text-justify"
              style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.8' }}>
              <em style={{ fontFamily: FONT_SERIF }}>made for the kingdom</em>&nbsp;&nbsp; is a project that God placed on my heart. I believe that we are all part of <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>one body of Christ</em>, just as Scripture teaches us, and that God has given each of us different gifts, talents, and creativity to use for <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>His glory</em>. This is my way of bringing little pieces of <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>His Kingdom</em> to earth.
            </p>
            <p className="text-sm leading-relaxed mb-4 md:text-justify"
              style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.8' }}>
              When I started to see myself the way God sees me, I began to notice the <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>dreams, ideas, and creativity</em> He had placed inside of me. At first, some of these ideas felt small, silly, or even impossible, but I just couldn't let them go. The name <em style={{ fontFamily: FONT_SERIF }}>made for the kingdom</em> was something God placed on my heart through a dream, and it reminded me that this was never just my idea, it was His.
            </p>
            <p className="text-sm leading-relaxed mb-4 md:text-justify"
              style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.8' }}>
              This project is for Him. My desire is to create a platform where we, as His disciples, can learn His Word, become the people He has called us to be, <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>grow closer to Jesus</em>, and glorify God through the unique gifts and creativity He has given us.
            </p>
            <p className="text-sm leading-relaxed mb-4 md:text-justify"
              style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.8' }}>
              My hope is that <em style={{ fontFamily: FONT_SERIF }}>made for the kingdom</em> becomes a place where we can <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>create, encourage, and inspire</em> one another to use our gifts boldly, creating little glimpses of <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>His Kingdom</em> here on earth until the day He comes.
            </p>
            <p className="text-sm leading-relaxed"
              style={{ fontFamily: FONT_SANS, color: `${C.ink}bb`, lineHeight: '1.8' }}>
              We were created with <em style={{ fontFamily: FONT_SERIF, color: C.ink }}>purpose, creativity, and a calling</em> to bring glory to Him.
            </p>
            <p className="mt-10 text-center">
              <MadeFtk />
            </p>
          </section>
        )}
      </main>
      )}

      {/* ─── Home divider above the footer (same cross divider as the Study section) ─── */}
      {isHome && (
        <div className="mt-16 md:mt-20 overflow-hidden max-w-xs mx-auto">
          <OrnamentalDivider color={C.goldDeep} />
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer id="site-footer" className={`py-7 text-center ${isHome ? '' : 'border-t mt-14'}`} style={{ borderColor: `${C.goldDeep}22` }}>
        <p className="text-xs tracking-[0.3em] uppercase"
          style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}>
          · made for the{' '}
          <span style={{ color: C.terra }}>kingdom</span>
          {' '}·
        </p>
        <p className="text-xs mt-1.5 italic"
          style={{ color: `${C.ink}44`, fontFamily: "'Lora', serif" }}>
          "Thy kingdom come, thy will be done." — Matthew 6:10
        </p>
      </footer>
    </div>
  )
}
