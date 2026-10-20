import { createFileRoute, redirect } from '@tanstack/react-router'

// "/" hanya mengarahkan: belum login -> /login, sudah login -> sesuai role
export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    const user = context.auth.getUser()
    if (!user) throw redirect({ to: '/login' })
    throw redirect({ to: user.role === 'admin' ? '/admin' : '/client' })
  },
})
