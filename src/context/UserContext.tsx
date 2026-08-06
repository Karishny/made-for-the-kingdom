import { createContext, useContext, useState, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  color: string
  initials: string
}

interface UserContextType {
  user: User | null
  login: (name: string) => void
  logout: () => void
}

const AVATAR_COLORS = ['#a85b31', '#949b61', '#cfac29', '#927f9b', '#a84c5c', '#454930', '#c57c89', '#763f21']

function colorForName(name: string): string {
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function initialsFor(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

const UserContext = createContext<UserContextType>({ user: null, login: () => {}, logout: () => {} })

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('mftk_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  function login(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = `${trimmed.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`
    const newUser: User = { id, name: trimmed, color: colorForName(trimmed), initials: initialsFor(trimmed) }
    localStorage.setItem('mftk_user', JSON.stringify(newUser))
    setUser(newUser)
  }

  function logout() {
    localStorage.removeItem('mftk_user')
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
