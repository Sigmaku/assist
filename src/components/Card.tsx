import { Card as HeroCard } from '@heroui/react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  description?: string
  action?: ReactNode
  children?: ReactNode
  className?: string
}

/** Card dasar: border tipis, sudut besar, bayangan lembut */
const Card = ({ title, description, action, children, className = '' }: CardProps) => (
  <HeroCard
    className={`rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(60,21,59,0.04),0_8px_24px_-12px_rgba(60,21,59,0.12)] ${className}`}
  >
    {(title || action) && (
      <HeroCard.Header className="flex-row items-start justify-between gap-4">
        <div>
          {title && <HeroCard.Title className="font-display text-lg">{title}</HeroCard.Title>}
          {description && (
            <HeroCard.Description className="text-muted">{description}</HeroCard.Description>
          )}
        </div>
        {action}
      </HeroCard.Header>
    )}
    {children && <HeroCard.Content>{children}</HeroCard.Content>}
  </HeroCard>
)

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  hint?: string
  /** highlight = kartu plum dengan teks emas */
  highlight?: boolean
}

export const StatCard = ({ label, value, icon: Icon, hint, highlight }: StatCardProps) => (
  <HeroCard
    className={
      highlight
        ? 'rounded-2xl border border-plum bg-plum text-gold shadow-[0_12px_32px_-12px_rgba(60,21,59,0.55)]'
        : 'rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(60,21,59,0.04),0_8px_24px_-12px_rgba(60,21,59,0.12)]'
    }
  >
    <HeroCard.Content className="gap-4">
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${highlight ? 'text-gold/80' : 'text-muted'}`}>
          {label}
        </span>
        <span
          className={`grid size-9 place-items-center rounded-xl ${
            highlight ? 'bg-gold/15 text-gold' : 'bg-gold-100 text-plum'
          }`}
        >
          <Icon size={18} />
        </span>
      </div>
      <div>
        <p className="font-display text-4xl font-semibold leading-none">{value}</p>
        {hint && (
          <p className={`mt-2 text-xs ${highlight ? 'text-gold/70' : 'text-muted'}`}>{hint}</p>
        )}
      </div>
    </HeroCard.Content>
  </HeroCard>
)

export default Card
