import { createFileRoute } from '@tanstack/react-router'
import { ClientCreateReport } from '../../../features/Client'

export const Route = createFileRoute('/_authenticated/client/reports/new')({
  component: ClientCreateReport,
})
