import { z } from 'zod'

export const roleSchema = z.enum(['admin', 'client'])

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: roleSchema,
  position: z.string(),
})

export type Role = z.infer<typeof roleSchema>
export type User = z.infer<typeof userSchema>

/** User tanpa password — aman disimpan di session */
export type SessionUser = Omit<User, 'password'>
