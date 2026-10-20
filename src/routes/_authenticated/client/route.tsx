import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

// Guard: hanya role client
export const Route = createFileRoute('/_authenticated/client')({
  beforeLoad: ({ context }) => {
    if (context.auth.getUser()?.role !== 'client') throw redirect({ to: '/admin' })
  },
  component: () => <Outlet />,
})
