import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { AuthUser, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

export interface User {
  id: string
  name: string
  color: string
  initials: string
}

export interface LoginResult {
  ok: boolean
  message?: string
}

interface UserContextType {
  user: User | null
  login: (
    mode: "in" | "up",
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<LoginResult>
  logout: () => void
  updateProfile: (name: string) => Promise<LoginResult>
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => ({ ok: false, message: "Sign-in is not available." }),
  logout: () => {},
  updateProfile: async () => ({ ok: false, message: "Profile updates are not available." }),
})

const AVATAR_COLORS = [
  "#a85b31",
  "#949b61",
  "#cfac29",
  "#927f9b",
  "#a84c5c",
  "#454930",
  "#c57c89",
  "#763f21",
]

function colorForName(name: string): string {
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function initialsFor(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

// A calm display name from an email's local part ("anna.k" -> "Anna K").
function nameFromEmail(email: string): string {
  const local = (email.split("@")[0] ?? "").replace(/[._-]+/g, " ").trim()
  if (!local) return "Friend"
  return local
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

// Builds the app-facing User from the auth identity, preferring the display
// name the person chose over the email-derived one, and guarantees a profiles
// row exists so community notes can show the display name without exposing the
// email address.
async function syncUserFromAuth(authUser: AuthUser) {
  const email = authUser.email ?? ""
  const meta = (authUser.user_metadata ?? {}) as Record<string, unknown>
  const metaName =
    typeof meta.display_name === "string" && meta.display_name.trim()
      ? meta.display_name.trim()
      : ""

  let name = metaName || nameFromEmail(email)
  let color =
    typeof meta.color === "string" && meta.color
      ? meta.color
      : colorForName(name)
  let initials =
    typeof meta.initials === "string" && meta.initials
      ? meta.initials
      : initialsFor(name)

  if (supabase) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, color, initials")
      .eq("id", authUser.id)
      .maybeSingle()
    if (profile?.display_name) {
      name = profile.display_name
      color = profile.color || color
      initials = profile.initials || initials
    }
    // Keep a profiles row in sync so the display name survives across devices.
    await supabase
      .from("profiles")
      .upsert({ id: authUser.id, display_name: name, color, initials }, {
        onConflict: "id",
      })
  }

  return { id: authUser.id, name, color, initials }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!supabase) return
    let active = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active || !session?.user) return
      void syncUserFromAuth(session.user).then((u) => {
        if (active) setUser(u)
      })
    })

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event: string, session: Session | null) => {
        if (!active) return
        if (session?.user) {
          void syncUserFromAuth(session.user).then((u) => {
            if (active) setUser(u)
          })
        } else {
          setUser(null)
        }
      },
    )

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  async function login(
    mode: "in" | "up",
    email: string,
    password: string,
    displayName?: string,
  ): Promise<LoginResult> {
    if (!supabase)
      return { ok: false, message: "Sign-in is not configured yet." }
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !password)
      return { ok: false, message: "Please enter your email and password." }

    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      })
      if (error) return { ok: false, message: error.message }
      return { ok: true }
    }

    const chosenName = displayName?.trim()
    if (!chosenName) return { ok: false, message: "Please enter your username." }
    const color = colorForName(chosenName)
    const initials = initialsFor(chosenName)
    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: { display_name: chosenName, color, initials },
      },
    })
    if (error) return { ok: false, message: error.message }
    if (data.session?.user) {
      // Email confirmation is off — the session exists immediately.
      await syncUserFromAuth(data.session.user)
      return { ok: true }
    }
    // Email confirmation is on — the user must confirm before signing in.
    return {
      ok: true,
      message: "Check your email to confirm your account, then sign in.",
    }
  }

  async function updateProfile(name: string): Promise<LoginResult> {
    const displayName = name.trim()
    if (!displayName) return { ok: false, message: "Please enter your username." }
    if (!supabase || !user) return { ok: false, message: "You must be signed in first." }
    const color = colorForName(displayName)
    const initials = initialsFor(displayName)

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: displayName, color, initials }, {
        onConflict: "id",
      })
    if (error) return { ok: false, message: error.message }

    // Keep the auth metadata in sync so the name survives across devices.
    await supabase.auth.updateUser({
      data: { display_name: displayName, color, initials },
    })

    // Keep the denormalised author fields on the user's existing notes in sync
    // so community notes show the current username, not a stale one. Realtime
    // events from these updates also refresh open notes lists automatically.
    await supabase
      .from("notes")
      .update({ author_name: displayName, author_color: color, author_initials: initials })
      .eq("user_id", user.id)

    setUser((prev) => (prev ? { ...prev, name: displayName, color, initials } : prev))
    return { ok: true }
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
