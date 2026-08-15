import { useState } from "react"
import { useUser } from "@/context/UserContext"
import Button from "@/components/Button"
import MadeForTheKingdom from "@/components/MadeForTheKingdom"

const C = {
  bg: "#F7F6F2",
  ink: "#2e2d2a",
  terra: "#a85b31",
  terraDark: "#763f21",
  goldDeep: "#cfac29",
  lavender: "#927f9b",
  olive: "#949b61",
}

interface Props {
  onClose: () => void
}

export default function LoginModal({ onClose }: Props) {
  const { login } = useUser()
  const [mode, setMode] = useState<"in" | "up">("in")
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [notice, setNotice] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setError("")
    setNotice("")
    if (mode === "up" && !displayName.trim()) {
      setError("Please enter your username.")
      return
    }
    if (!email.trim() || !password) {
      setError("Please enter your email and password.")
      return
    }
    setBusy(true)
    const result = await login(mode, email, password, displayName)
    setBusy(false)
    if (!result.ok) {
      setError(result.message || "Could not sign in.")
      return
    }
    if (result.message) {
      setNotice(result.message)
      return
    }
    onClose()
  }

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value)
    setError("")
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
    setError("")
  }

  const inputStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    background: `${C.ink}08`,
    border: `1px solid ${error ? C.terra : `${C.ink}25`}`,
    color: C.ink,
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto"
      style={{ background: "rgba(46,45,42,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded border p-8 my-8"
        style={{ background: C.bg, borderColor: `${C.goldDeep}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner marks */}
        {(["tl", "tr", "bl", "br"] as const).map((pos) => (
          <svg
            key={pos}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute"
            style={{
              top: pos.startsWith("t") ? 0 : "auto",
              bottom: pos.startsWith("b") ? 0 : "auto",
              left: pos.endsWith("l") ? 0 : "auto",
              right: pos.endsWith("r") ? 0 : "auto",
              transform:
                pos === "tr"
                  ? "rotate(90deg)"
                  : pos === "br"
                    ? "rotate(180deg)"
                    : pos === "bl"
                      ? "rotate(-90deg)"
                      : undefined,
            }}
          >
            <path
              d="M2 2 L9 2 L2 9"
              stroke={C.goldDeep}
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
            <circle cx="2" cy="2" r="1" fill={C.goldDeep} opacity="0.5" />
          </svg>
        ))}

        <MadeForTheKingdom
          className="text-center"
          fontSize="clamp(1.5rem, 6.5vw, 2.1rem)"
          style={{ margin: "0 auto 0.75rem" }}
        />
        <h2
          className="text-center mb-1"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "1.4rem",
            fontWeight: 400,
            color: C.ink,
          }}
        >
          {mode === "up" ? "Create your account" : "Welcome"}
        </h2>
        <p
          className="text-xs text-center mb-6 italic"
          style={{ fontFamily: "'Fraunces', serif", color: `${C.ink}77` }}
        >
          {mode === "up"
            ? "Join the study to add notes & highlights"
            : "Sign in to add notes & highlights"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "up" && (
            <div>
              <span
                className="block text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{
                  color: `${C.ink}66`,
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 600,
                }}
              >
                Username / Display name
              </span>
              <input
                type="text"
                required
                placeholder="How your name appears on notes"
                value={displayName}
                onChange={handleUsername}
                className="w-full px-4 py-2.5 rounded-sm text-sm outline-none"
                style={inputStyle}
              />
            </div>
          )}
          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{
                color: `${C.ink}66`,
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 600,
              }}
            >
              Email
            </span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              className="w-full px-4 py-2.5 rounded-sm text-sm outline-none"
              style={inputStyle}
            />
          </div>
          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase mb-1"
              style={{
                color: `${C.ink}66`,
                fontFamily: "'Source Sans 3', sans-serif",
                fontWeight: 600,
              }}
            >
              Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder={
                  mode === "up" ? "Choose a password" : "Your password"
                }
                value={password}
                onChange={handlePassword}
                className="w-full px-4 pr-12 py-2.5 rounded-sm text-sm outline-none"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute right-0.5 top-0 h-full flex items-center justify-center w-10 rounded-sm cursor-pointer transition-colors duration-150"
                style={{ color: showPassword ? C.terra : `${C.ink}50` }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2 12 C4.5 6.5 8 5 12 5 C16 5 19.5 6.5 22 12 C19.5 17.5 16 19 12 19 C8 19 4.5 17.5 2 12 Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4 4 L20 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M2 12 C4.5 6.5 8 5 12 5 C16 5 19.5 6.5 22 12 C19.5 17.5 16 19 12 19 C8 19 4.5 17.5 2 12 Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              className="text-xs"
              style={{
                color: C.terra,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {error}
            </p>
          )}
          {notice && (
            <p
              className="text-xs"
              style={{
                color: C.olive,
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {notice}
            </p>
          )}

          <Button
            type="submit"
            variant="solid"
            size="md"
            full
            disabled={busy}
            style={{ borderRadius: "1.75rem" }}
          >
            {busy
              ? "please wait…"
              : mode === "up"
                ? "create account"
                : "enter the study"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode((m) => (m === "up" ? "in" : "up"))
            setError("")
            setNotice("")
          }}
          className="block mx-auto mt-5 text-xs cursor-pointer underline-offset-2 hover:underline"
          style={{
            fontFamily: "'Source Sans 3', sans-serif",
            color: `${C.ink}66`,
          }}
        >
          {mode === "up"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  )
}
