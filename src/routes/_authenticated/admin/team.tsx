import { createFileRoute } from '@tanstack/react-router'
import { AdminTeam } from '../../../features/Admin'

export const Route = createFileRoute('/_authenticated/admin/team')({
  component: AdminTeam,
})
