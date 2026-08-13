import { C, FONT_SERIF } from '@/theme'

// Reusable "Made FTK" signature mark — identical styling in the top-left header
// logo and the About section (em-dash + lowercase "madeftk", Fraunces italic).
export default function MadeFtk({ className = '' }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: FONT_SERIF,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: `${C.ink}77`,
      }}
    >
      — <span style={{ color: `${C.ink}bb` }}>madeftk</span>
    </span>
  )
}
