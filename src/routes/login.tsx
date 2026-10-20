import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginPage from '../features/LoginPage'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    const user = context.auth.getUser()
    if (user) throw redirect({ to: user.role === 'admin' ? '/admin' : '/client' })
  },
  component: LoginPage,
})
