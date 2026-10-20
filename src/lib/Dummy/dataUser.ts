import type { User } from '../Schema/userSchema'

/**
 * Data dummy user.
 * Catatan: ini HANYA untuk prototype. Di produksi, password tidak boleh
 * disimpan / dicek di frontend — pindahkan ke backend.
 */
export const dataUser: User[] = [
  {
    id: 'u-admin',
    name: 'Dan Wahjat',
    email: 'admin@assist.id',
    password: 'admin123',
    role: 'admin',
    position: 'Team Leader',
  },
  {
    id: 'u-1',
    name: 'Rina Safitri',
    email: 'rina@assist.id',
    password: 'client123',
    role: 'client',
    position: 'Frontend Developer',
  },
  {
    id: 'u-2',
    name: 'Bagas Pratama',
    email: 'bagas@assist.id',
    password: 'client123',
    role: 'client',
    position: 'Backend Developer',
  },
  {
    id: 'u-3',
    name: 'Maya Anggraini',
    email: 'maya@assist.id',
    password: 'client123',
    role: 'client',
    position: 'UI/UX Designer',
  },
  {
    id: 'u-4',
    name: 'Fajar Nugroho',
    email: 'fajar@assist.id',
    password: 'client123',
    role: 'client',
    position: 'QA Engineer',
  },
]
