import { createFileRoute } from '@tanstack/react-router'
import { ClientMyReports } from '../../../features/Client'

export const Route = createFileRoute('/_authenticated/client/reports/')({
  component: ClientMyReports,
})
