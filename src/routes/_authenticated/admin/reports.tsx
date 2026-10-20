import { createFileRoute } from '@tanstack/react-router'
import { AdminReports } from '../../../features/Admin'

export const Route = createFileRoute('/_authenticated/admin/reports')({
  component: AdminReports,
})
