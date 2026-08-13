import type { ButtonHTMLAttributes } from 'react'
import { BTN, C, FONT_SERIF } from '@/theme'

type Variant = 'outline' | 'solid'
type Size = 'sm' | 'md' | 'lg'

const SIZES: Record<Size, { height: string; fontSize: string; padding: string; letterSpacing: string }> = {
  sm: { height: '2.1rem', fontSize: '0.78rem', padding: '0 1.2rem', letterSpacing: '0.14em' },
  md: { height: '2.6rem', fontSize: '0.9rem', padding: '0 1.5rem', letterSpacing: '0.12em' },
  lg: { height: '3rem', fontSize: '1rem', padding: '0 2rem', letterSpacing: '0.12em' },
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  /** Border/ink tint (e.g. a part colour) while keeping the shared pill style. */
  tone?: string
  full?: boolean
}

export default function Button({
  variant = 'outline',
  size = 'md',
  tone,
  full = false,
  className = '',
  style,
  ...rest
}: ButtonProps) {
  const s = SIZES[size]
  const solid = variant === 'solid'
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full select-none transition-all duration-200 ${
        solid ? 'hover:bg-[#3A3E26]' : 'hover:bg-[rgba(217,211,191,0.8)]'
      } hover:scale-[0.975] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgba(148,155,97,0.5)] ${
        full ? 'w-full' : ''
      } ${className}`}
      style={{
        fontFamily: FONT_SERIF,
        fontWeight: 300,
        textTransform: 'lowercase',
        letterSpacing: s.letterSpacing,
        height: s.height,
        fontSize: s.fontSize,
        padding: s.padding,
        color: solid ? '#F7F6F2' : BTN.text,
        background: solid ? C.oliveDark : 'transparent',
        border: `1px solid ${tone ?? (solid ? C.oliveDark : BTN.border)}`,
        borderRadius: BTN.radius,
        ...style,
      }}
      {...rest}
    />
  )
}
