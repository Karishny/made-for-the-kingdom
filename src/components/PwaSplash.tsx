import { useEffect, useState } from "react"
import MadeFtk from "@/components/MadeFtk"
import { C, P, FONT_SERIF, FONT_SANS } from "@/theme"

// Branded opening cover for Home Screen launches only (display-mode: standalone).
// Normal browser visits are unaffected. It shows the wordmark for a calm moment,
// then fades out so the app is revealed. Minimal, warm, and consistent with the
// site's paper-and-ink language — no motion beyond a gentle fade.
function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(display-mode: standalone)").matches) return true
  // iOS Safari < 16.4 exposes the standalone mode through this non-standard flag.
  const nav = window.navigator as unknown as { standalone?: boolean }
  return nav.standalone === true
}

export default function PwaSplash() {
  const standalone = isStandalone()
  const [state, setState] = useState<"in" | "out" | "gone">("in")

  useEffect(() => {
    if (!standalone) return
    const fade = window.setTimeout(() => setState("out"), 1200)
    const remove = window.setTimeout(() => setState("gone"), 1850)
    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(remove)
    }
  }, [standalone])

  if (!standalone || state === "gone") return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 text-center select-none"
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(180deg, #F7F4EC 0%, #F2EDE1 45%, #EDE7D8 100%)",
        opacity: state === "out" ? 0 : 1,
        transition: "opacity 600ms ease-out",
      }}
    >
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontSize: "clamp(2.2rem, 9vw, 3.6rem)",
          fontWeight: 300,
          color: P.titleMuted,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        made for the{" "}
        <span style={{ color: P.gold, fontStyle: "italic" }}>kingdom</span>
      </h1>
      <div
        className="mt-7"
        style={{ width: 180, height: 1.5, background: "rgba(207,172,41,0.45)" }}
      />
      <div className="mt-7">
        <MadeFtk />
      </div>
      <p
        className="mt-16 text-xs italic px-6"
        style={{ color: `${C.ink}55`, fontFamily: FONT_SANS }}
      >
        "Thy kingdom come, thy will be done." — Matthew 6:10
      </p>
    </div>
  )
}
