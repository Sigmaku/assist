import { LogOut } from 'lucide-react'
import type { LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import Button from '../../../components/Button'
import type { SessionUser } from '../../../lib/Schema/userSchema'
import SidebarButton from './SidebarButton'

export interface NavItem {
  label: string
  to: LinkProps['to']
  icon: LucideIcon
  exact?: boolean
}

interface SidebarProps {
  items: NavItem[]
  user: SessionUser
  onLogout: () => void
  onNavigate?: () => void
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const Sidebar = ({ items, user, onLogout, onNavigate }: SidebarProps) => (
  <aside className="plum-pattern flex h-full w-72 flex-col px-5 py-7 text-plum-100">
    <div className="mb-10 flex items-center gap-3 px-1.5">
      <span className="grid size-10 place-items-center rounded-xl bg-gold font-display text-xl font-bold text-plum">
        A
      </span>
      <div>
        <p className="font-display text-xl font-semibold leading-none text-gold">Assist</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-plum-100/50">
          Laporan Tim
        </p>
      </div>
    </div>

    <p className="mb-2 px-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-plum-100/40">
      {user.role === 'admin' ? 'Admin' : 'Menu'}
    </p>
    <nav className="flex flex-1 flex-col gap-1">
      {items.map((item) => (
        <SidebarButton key={item.label} {...item} onClick={onNavigate} />
      ))}
    </nav>

    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3.5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/20 text-sm font-semibold text-gold">
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{user.name}</p>
          <p className="truncate text-xs text-plum-100/60">{user.position}</p>
        </div>
      </div>
      <Button
        tone="ghost"
        fullWidth
        size="sm"
        className="mt-3 !text-plum-100/80 hover:!text-gold"
        onPress={onLogout}
      >
        <LogOut size={15} />
        Keluar
      </Button>
    </div>
  </aside>
)

export default Sidebar
