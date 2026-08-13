import type { ReactNode } from 'react'

const INK = '#2e2d2a'
const OLIVE = '#949b61'
const TERRA = '#a85b31'
const GOLD = '#cfac29'

export function OrnamentalDivider({ color = GOLD }: { color?: string }) {
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

const SIZES = {
  sm: '1.3rem',
  md: 'clamp(1.6rem, 3vw, 2.2rem)',
  lg: 'clamp(2rem, 4vw, 2.8rem)',
}

interface SectionHeaderProps {
  kicker?: ReactNode
  title: ReactNode
  accent?: ReactNode
  sub?: ReactNode
  color?: string
  align?: 'left' | 'center'
  size?: 'sm' | 'md' | 'lg'
  divider?: boolean
  dividerColor?: string
  className?: string
}

export default function SectionHeader({
  kicker,
  title,
  accent,
  sub,
  color = TERRA,
  align = 'center',
  size = 'md',
  divider = true,
  dividerColor,
  className = '',
}: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      {kicker && (
        <p className="text-xs tracking-[0.35em] uppercase mb-3"
          style={{ color: OLIVE, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 500 }}>
          {kicker}
        </p>
      )}
      <h2 style={{
        fontFamily: "'Fraunces', serif",
        fontSize: SIZES[size],
        fontWeight: 300,
        color: '#656562',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      }}>
        {title}
        {accent !== undefined && accent !== '' && (
          <em style={{ color, fontStyle: 'italic' }}> {accent}</em>
        )}
      </h2>
      {sub && (
        <p className="text-sm italic mt-2"
          style={{ fontFamily: "'Fraunces', serif", color: `${INK}66` }}>
          {sub}
        </p>
      )}
      {divider && (
        <div className={`mt-5 overflow-hidden ${centered ? 'max-w-xs mx-auto' : ''}`}>
          <OrnamentalDivider color={dividerColor ?? color} />
        </div>
      )}
    </div>
  )
}
