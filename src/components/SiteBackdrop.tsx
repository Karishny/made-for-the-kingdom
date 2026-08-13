import { paperNoise } from '@/theme'

// Soft beige / ivory backdrop with slow organic wave lines, inspired by the
// "respiration visuelle" background reference — calm, minimal, tactile.

function Wave({
  d, color, opacity, top, height,
}: {
  d: string
  color: string
  opacity: number
  top: number
  height: number
}) {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute left-0 w-full"
      style={{ top, height }}
    >
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity={opacity} />
    </svg>
  )
}

export default function SiteBackdrop() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ background: 'linear-gradient(180deg, #F7F4EC 0%, #F2EDE1 45%, #EDE7D8 100%)' }}
    >
      {/* Warm luminous glow at the top */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: '62vh',
          background: 'radial-gradient(90% 70% at 50% 0%, rgba(255,251,240,0.92), rgba(255,251,240,0) 70%)',
        }}
      />

      {/* Organic wave lines */}
      <Wave d="M-40 130 C 220 60, 460 200, 720 150 S 1180 55, 1480 120" color="#D9CCB6" opacity={0.5} top={80} height={320} />
      <Wave d="M-40 210 C 240 140, 480 285, 740 235 S 1200 150, 1480 210" color="#CEC0A6" opacity={0.36} top={300} height={320} />
      <Wave d="M-40 95 C 260 150, 520 45, 780 95 S 1220 175, 1480 105" color="#E2D8C4" opacity={0.42} top={540} height={320} />
      <Wave d="M-40 170 C 200 110, 500 250, 760 200 S 1200 130, 1480 180" color="#D4C6AE" opacity={0.3} top={820} height={320} />

      {/* Tactile paper grain */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: paperNoise, backgroundSize: '240px 240px', opacity: 0.05 }}
      />
    </div>
  )
}
