import { createContext } from 'react'
import type { SessionUser } from '../../lib/Schema/userSchema'

export interface AuthContextValue {
  user: SessionUser | null
  login: (email: string, password: string) => SessionUser | null
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
