import { dataUser } from '../../lib/Dummy/dataUser'
import type { SessionUser } from '../../lib/Schema/userSchema'

const STORAGE_KEY = 'assist:session'

type Listener = () => void
const listeners = new Set<Listener>()

const read = (): SessionUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

// Snapshot harus stabil (referensi sama) selama data tidak berubah
let current: SessionUser | null = read()

const emit = () => listeners.forEach((l) => l())

/**
 * Store auth di luar React supaya `beforeLoad` milik TanStack Router
 * selalu membaca state terbaru (tidak ketinggalan saat login/logout).
 */
export const authStore = {
  getUser: () => current,
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  login: (email: string, password: string): SessionUser | null => {
    const found = dataUser.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    )
    if (!found) return null
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...session } = found
    current = session
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } catch {
      /* abaikan jika storage tidak tersedia */
    }
    emit()
    return session
  },
  logout: () => {
    current = null
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* abaikan */
    }
    emit()
  },
}

export type AuthStore = typeof authStore
