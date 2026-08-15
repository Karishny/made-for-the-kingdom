import { P, FONT_SERIF } from '@/theme'
import type { CSSProperties } from 'react'

// The homepage "made for the kingdom" hero heading — single source of truth so
// every surface carrying the brand wordmark renders it identically (Fraunces,
// weight 300, tight tracking, muted ink with the italic gold "kingdom").
export default function MadeForTheKingdom({
  fontSize = 'clamp(2.4rem, 6.5vw, 5.6rem)',
  tag: Tag = 'h1',
  className,
  style,
}: {
  fontSize?: string | number
  tag?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
  style?: CSSProperties
}) {
  return (
    <Tag
      className={className}
      style={{
        fontFamily: FONT_SERIF,
        fontSize,
        fontWeight: 300,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        color: P.titleMuted,
        ...style,
      }}
    >
      made for the{" "}
      <span style={{ color: P.gold, fontStyle: 'italic' }}>kingdom</span>
    </Tag>
  )
}
