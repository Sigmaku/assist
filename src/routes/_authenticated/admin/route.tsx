import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

// Guard: hanya role admin
export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: ({ context }) => {
    if (context.auth.getUser()?.role !== 'admin') throw redirect({ to: '/client' })
  },
  component: () => <Outlet />,
})
