import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
}

const PageHeader = ({ eyebrow, title, description, action }: PageHeaderProps) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      {eyebrow && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-semibold text-plum sm:text-4xl">{title}</h1>
      {description && <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>}
    </div>
    {action}
  </div>
)

export default PageHeader
