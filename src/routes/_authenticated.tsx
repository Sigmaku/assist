import { createFileRoute, redirect } from '@tanstack/react-router'
import AppLayout from '../features/common/AppLayout'

// Layout pembungkus semua halaman yang butuh login
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.auth.getUser()) throw redirect({ to: '/login' })
  },
  component: AppLayout,
})
