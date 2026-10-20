import { createFileRoute } from '@tanstack/react-router'
import { AdminDashboard } from '../../../features/Admin'

export const Route = createFileRoute('/_authenticated/admin/')({
  component: AdminDashboard,
})
