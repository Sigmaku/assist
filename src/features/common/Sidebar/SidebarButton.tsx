import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

interface SidebarButtonProps {
  to: LinkProps['to']
  label: string
  icon: LucideIcon
  /** true = hanya aktif jika path persis sama (untuk menu Dashboard) */
  exact?: boolean
  onClick?: () => void
}

const SidebarButton = ({ to, label, icon: Icon, exact, onClick }: SidebarButtonProps) => (
  <Link
    to={to}
    onClick={onClick}
    activeOptions={{ exact }}
    className="group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-plum-100/70 outline-none transition-colors hover:bg-white/5 hover:text-gold focus-visible:ring-2 focus-visible:ring-gold/60"
    activeProps={{
      className: 'bg-gold/12 !text-gold shadow-[inset_2px_0_0_0_var(--color-gold)]',
    }}
  >
    <Icon size={18} className="shrink-0" />
    <span>{label}</span>
  </Link>
)

export default SidebarButton
