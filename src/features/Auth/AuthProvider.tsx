import { useMemo, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { authStore } from './authStore'

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = useSyncExternalStore(authStore.subscribe, authStore.getUser)

  const value = useMemo(
    () => ({ user, login: authStore.login, logout: authStore.logout }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
