import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import Button from '@/components/Button'
import MadeFtk from '@/components/MadeFtk'
import { C, FONT_SANS, FONT_SERIF } from '@/theme'

const navLinks = ['Home', 'Study', 'Notes', 'About', 'Explore']

const navActiveColors: Record<string, string> = {
  Home: C.terra,
  Study: C.olive,
  Notes: C.lavender,
  About: C.goldDeep,
  Explore: C.rose,
}

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
        <EditableName />
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

// Mobile-only auth display for the drop-down menu: a small circular avatar
// with just the user's first initial — no full name. The desktop AuthArea
// above is intentionally untouched.
function MobileAuthArea({ onSignIn }: { onSignIn: () => void }) {
  const { user, logout } = useUser()
  if (!user) {
    return (
      <div className="flex justify-end pr-4">
        <Button
          size="sm"
          onClick={onSignIn}
          style={{ background: C.olive, color: '#F7F6F2', border: `1px solid ${C.olive}` }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.oliveDark
            e.currentTarget.style.borderColor = C.oliveDark
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.olive
            e.currentTarget.style.borderColor = C.olive
          }}
        >
          sign in
        </Button>
      </div>
    )
  }
  const initial = (user.name.trim()[0] ?? '?').toUpperCase()
  return (
    <div className="flex flex-col items-end gap-2 pr-4">
      <div className="flex items-center gap-3">
        <button
          onClick={logout}
          className="text-sm hover:opacity-70 transition-opacity duration-200"
          style={{ fontFamily: FONT_SANS, color: C.oliveDark, letterSpacing: '0.08em' }}
        >
          sign out
        </button>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{ background: `${user.color}25`, color: user.color, border: `1.5px solid ${user.color}55`, fontFamily: FONT_SANS }}
          aria-label={`signed in as ${user.name}`}
        >
          {initial}
        </span>
      </div>
      <EditableName />
    </div>
  )
}

// Inline username editor shown when signed in. Clicking the pencil swaps the
// display name for a small input; saving updates the profile, the auth
// metadata, and the author fields on the user's existing notes (see
// UserContext.updateProfile).
function EditableName() {
  const { user, updateProfile } = useUser()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState("")
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState("")

  if (!user) return null

  if (!editing) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-xs" style={{ color: `${C.ink}77`, fontFamily: FONT_SANS }}>
          {user.name}
        </span>
        <button
          type="button"
          onClick={() => {
            setValue(user.name)
            setErr("")
            setEditing(true)
          }}
          className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
          aria-label="Edit username"
          title="Edit username"
        >
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M11.5 1.5 L14.5 4.5 L5 14 L1 15 L2 11 Z" />
          </svg>
        </button>
      </span>
    )
  }

  async function save() {
    if (busy) return
    setErr("")
    setBusy(true)
    const res = await updateProfile(value)
    setBusy(false)
    if (!res.ok) {
      setErr(res.message || "Could not update your username.")
      return
    }
    setEditing(false)
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <input
        autoFocus
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setErr("")
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") void save()
          if (e.key === "Escape") setEditing(false)
        }}
        className="w-28 px-2 py-1 rounded-sm text-xs outline-none"
        style={{
          background: `${C.ink}08`,
          border: `1px solid ${err ? C.terra : `${C.ink}25`}`,
          color: C.ink,
          fontFamily: FONT_SANS,
        }}
        placeholder="Username"
      />
      <button
        type="button"
        onClick={() => void save()}
        disabled={busy}
        className="text-xs cursor-pointer hover:opacity-70 transition-opacity duration-200 disabled:opacity-50"
        style={{ color: C.oliveDark, fontFamily: FONT_SANS }}
      >
        {busy ? "saving…" : "save"}
      </button>
      <button
        type="button"
        onClick={() => setEditing(false)}
        className="text-xs cursor-pointer hover:opacity-70 transition-opacity duration-200"
        style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}
      >
        cancel
      </button>
    </span>
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
          <div className="md:hidden mt-4 pb-6 border-t" style={{ borderColor: `${C.goldDeep}22` }}>
            <nav className="pt-4 flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const isActive = activeNav === link
                const activeColor = navActiveColors[link] ?? C.oliveDark
                return (
                  <button
                    key={link}
                    onClick={() => handleNav(link)}
                    className="pr-4 pl-6 py-2.5 text-right rounded transition-colors duration-200 hover:bg-[rgba(148,155,97,0.10)]"
                    style={{
                      fontFamily: FONT_SERIF,
                      fontWeight: isActive ? 500 : 400,
                      fontSize: '16px',
                      letterSpacing: '0.16em',
                      textTransform: 'lowercase',
                      color: isActive ? activeColor : C.oliveDark,
                    }}
                  >
                    {link}
                  </button>
                )
              })}
            </nav>
            <div className="h-px my-4" style={{ background: `${C.goldDeep}1a` }} />
            <MobileAuthArea onSignIn={onSignIn} />
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
