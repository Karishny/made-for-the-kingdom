import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  loadSession,
  saveSession,
  clearSession,
  registerUser,
  adoptLegacyProgress,
  normalizeAccountId,
} from '@/lib/storage'

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

const UserContext = createContext<UserContextType>({ user: null, login: () => {}, logout: () => {} })

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = loadSession()
    if (!stored) return null
    return { id: stored.id, name: stored.name, color: stored.color, initials: stored.initials }
  })

  function login(name: string) {
    const trimmed = name.trim()
    if (!trimmed || !normalizeAccountId(trimmed)) return
    const stored = registerUser(trimmed)
    adoptLegacyProgress(stored.id)
    saveSession(stored)
    setUser({ id: stored.id, name: stored.name, color: stored.color, initials: stored.initials })
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
