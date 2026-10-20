import { Outlet, useNavigate } from '@tanstack/react-router'
import {
  ClipboardList,
  FilePlus2,
  LayoutDashboard,
  Menu,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import type { NavItem } from '../Sidebar'
import Sidebar from '../Sidebar'
import { useAuth } from '../../Auth/useAuth'

const adminNav: NavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Semua Laporan', to: '/admin/reports', icon: ClipboardList },
  { label: 'Tim', to: '/admin/team', icon: Users },
]

const clientNav: NavItem[] = [
  { label: 'Dashboard', to: '/client', icon: LayoutDashboard, exact: true },
  { label: 'Laporan Saya', to: '/client/reports', icon: ClipboardList, exact: true },
  { label: 'Buat Laporan', to: '/client/reports/new', icon: FilePlus2 },
]

/** Layout halaman setelah login: sidebar + konten. Menu mengikuti role. */
const AppLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  const items = user.role === 'admin' ? adminNav : clientNav

  return (
    <div className="min-h-screen bg-cream lg:flex">
      {/* Sidebar desktop */}
      <div className="sticky top-0 hidden h-screen lg:block">
        <Sidebar items={items} user={user} onLogout={handleLogout} />
      </div>

      {/* Top bar + drawer mobile */}
      <div className="plum-pattern sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:hidden">
        <p className="font-display text-xl font-semibold text-gold">Assist</p>
        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setOpen(true)}
          className="grid size-10 place-items-center rounded-xl text-gold"
        >
          <Menu size={22} />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-72 max-w-[85%]">
            <Sidebar
              items={items}
              user={user}
              onLogout={handleLogout}
              onNavigate={() => setOpen(false)}
            />
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 text-plum-100/70"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
