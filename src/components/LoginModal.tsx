import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import Button from '@/components/Button'

const C = {
  bg: '#F7F6F2', ink: '#2e2d2a', terra: '#a85b31', terraDark: '#763f21',
  goldDeep: '#cfac29', lavender: '#927f9b', olive: '#949b61',
}

interface Props {
  onClose: () => void
}

export default function LoginModal({ onClose }: Props) {
  const { login } = useUser()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    login(name.trim())
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(46,45,42,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded border p-8"
        style={{ background: C.bg, borderColor: `${C.goldDeep}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner marks */}
        {(['tl','tr','bl','br'] as const).map((pos) => (
          <svg key={pos} width="24" height="24" viewBox="0 0 24 24" fill="none"
            className="absolute"
            style={{
              top: pos.startsWith('t') ? 0 : 'auto',
              bottom: pos.startsWith('b') ? 0 : 'auto',
              left: pos.endsWith('l') ? 0 : 'auto',
              right: pos.endsWith('r') ? 0 : 'auto',
              transform: pos === 'tr' ? 'rotate(90deg)' : pos === 'br' ? 'rotate(180deg)' : pos === 'bl' ? 'rotate(-90deg)' : undefined,
            }}
          >
            <path d="M2 2 L9 2 L2 9" stroke={C.goldDeep} strokeWidth="1" fill="none" opacity="0.5" />
            <circle cx="2" cy="2" r="1" fill={C.goldDeep} opacity="0.5" />
          </svg>
        ))}

        <p className="text-xs tracking-[0.3em] uppercase text-center mb-2"
          style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
          made for the kingdom
        </p>
        <h2 className="text-center mb-1" style={{ fontFamily: "'Fraunces', serif", fontSize: '1.4rem', fontWeight: 400, color: C.ink }}>
          Welcome
        </h2>
        <p className="text-xs text-center mb-6 italic"
          style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}77` }}>
          Enter your name to add notes & highlights
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            autoFocus
            onChange={(e) => { setName(e.target.value); setError('') }}
            className="w-full px-4 py-2.5 rounded-sm text-sm outline-none"
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              background: `${C.ink}08`,
              border: `1px solid ${error ? C.terra : C.ink + '25'}`,
              color: C.ink,
            }}
          />
          {error && (
            <p className="text-xs" style={{ color: C.terra, fontFamily: "'Source Sans 3', sans-serif" }}>{error}</p>
          )}
          <Button
            type="submit"
            variant="solid"
            size="md"
            full
            style={{ borderRadius: '1.75rem' }}
          >
            enter the study
          </Button>
        </form>
      </div>
    </div>
  )
}
