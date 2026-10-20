import { createFileRoute } from '@tanstack/react-router'
import { ClientDashboard } from '../../../features/Client'

export const Route = createFileRoute('/_authenticated/client/')({
  component: ClientDashboard,
})
