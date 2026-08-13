import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import Button from '@/components/Button'
import MadeFtk from '@/components/MadeFtk'
import { C, FONT_SANS, FONT_SERIF } from '@/theme'

const navLinks = ['Home', 'Study', 'Notes', 'About']

function AuthArea({ onSignIn }: { onSignIn: () => void }) {
  const { user, logout } = useUser()
  if (user) {
    return (
      <div className="flex items-center gap-2.5">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold"
          style={{ background: `${user.color}25`, color: user.color, border: `1.5px solid ${user.color}55`, fontFamily: FONT_SANS }}
        >
          {user.initials}
        </div>
        <span className="text-xs" style={{ color: `${C.ink}77`, fontFamily: FONT_SANS }}>
          {user.name}
        </span>
        <button onClick={logout} className="text-xs" style={{ color: `${C.ink}44`, fontFamily: FONT_SANS }}>
          Sign out
        </button>
      </div>
    )
  }
  return (
    <Button
      size="sm"
      onClick={onSignIn}
      style={{ background: '#454930', color: '#F7F6F2', border: '1px solid #454930' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#763F21'
        e.currentTarget.style.borderColor = '#763F21'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#454930'
        e.currentTarget.style.borderColor = '#454930'
      }}
    >
      sign in
    </Button>
  )
}

export default function SiteHeader({
  activeNav,
  onNav,
  onSignIn,
}: {
  activeNav: string
  onNav: (link: string) => void
  onSignIn: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNav(link: string) {
    onNav(link)
    setMenuOpen(false)
  }

  return (
    <header className="relative z-20">
      <div className="max-w-6xl mx-auto px-6 pt-6 md:pt-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand — top left (logo mark, identical to the About-section Made FTK) */}
          <button
            onClick={() => handleNav('Home')}
            className="text-left transition-opacity hover:opacity-75"
            aria-label="made for the kingdom"
          >
            <MadeFtk />
          </button>

          {/* Desktop: nav + sign in (sign in furthest right) */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontWeight: activeNav === link ? 400 : 300,
                    fontSize: '14px',
                    letterSpacing: '0.16em',
                    textTransform: 'lowercase',
                    color: activeNav === link ? C.goldDeep : `${C.ink}77`,
                    background: 'transparent',
                    borderBottom: activeNav === link ? `1px solid ${C.goldDeep}66` : '1px solid transparent',
                    opacity: activeNav === link ? 1 : 0.85,
                  }}
                >
                  {link}
                </button>
              ))}
            </nav>
            <AuthArea onSignIn={onSignIn} />
          </div>

          {/* Mobile: menu toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-full"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            style={{ color: `${C.ink}77`, border: `1px solid ${C.goldDeep}33`, background: 'transparent' }}
          >
            {menuOpen ? (
              <svg width="15" height="15" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M3 3 L13 13 M13 3 L3 13" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M2 4 H14 M2 8 H14 M2 12 H14" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-5 border-t" style={{ borderColor: `${C.goldDeep}22` }}>
            <nav className="pt-4 flex flex-col items-stretch gap-1">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  className="px-3 py-2.5 text-left transition-all duration-200"
                  style={{
                    fontFamily: FONT_SERIF,
                    fontWeight: activeNav === link ? 400 : 300,
                    fontSize: '15px',
                    letterSpacing: '0.16em',
                    textTransform: 'lowercase',
                    color: activeNav === link ? C.goldDeep : `${C.ink}77`,
                  }}
                >
                  {link}
                </button>
              ))}
            </nav>
            <div className="pt-5 flex justify-center">
              <AuthArea onSignIn={onSignIn} />
            </div>
          </div>
        )}
      </div>

      {/* Hairline under the header — identical on every page */}
      <div
        className="relative h-px w-full mt-6 md:mt-8"
        style={{ background: `linear-gradient(90deg, transparent, ${C.terra}40, ${C.goldDeep}60, ${C.terra}40, transparent)` }}
      />
    </header>
  )
}
