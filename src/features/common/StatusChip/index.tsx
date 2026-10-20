import { Chip } from '@heroui/react'
import type { ReportStatus } from '../../../lib/Schema/reportSchema'

const statusMap: Record<ReportStatus, { label: string; color: 'warning' | 'success' | 'danger' }> = {
  pending: { label: 'Menunggu review', color: 'warning' },
  approved: { label: 'Disetujui', color: 'success' },
  revision: { label: 'Perlu revisi', color: 'danger' },
}

const StatusChip = ({ status }: { status: ReportStatus }) => {
  const { label, color } = statusMap[status]
  return (
    <Chip color={color} variant="soft" size="sm" className="whitespace-nowrap">
      {label}
    </Chip>
  )
}

export default StatusChip
