import { z } from 'zod'

export const REPORT_CATEGORIES = [
  'Harian',
  'Mingguan',
  'Proyek',
  'Kendala',
  'Lainnya',
] as const

export const REPORT_STATUSES = ['pending', 'approved', 'revision'] as const

export const reportCategorySchema = z.enum(REPORT_CATEGORIES)
export const reportStatusSchema = z.enum(REPORT_STATUSES)

/** Skema data laporan lengkap (yang tersimpan) */
export const reportSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: reportCategorySchema,
  summary: z.string(),
  authorId: z.string(),
  date: z.string(), // ISO date (YYYY-MM-DD)
  status: reportStatusSchema,
})

/** Skema form buat laporan baru (yang diisi client) */
export const reportFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Judul wajib diisi')
    .min(5, 'Judul minimal 5 karakter')
    .max(80, 'Judul maksimal 80 karakter'),
  category: z
    .string()
    .min(1, 'Pilih kategori laporan')
    .pipe(reportCategorySchema),
  summary: z
    .string()
    .min(1, 'Isi laporan wajib diisi')
    .min(20, 'Isi laporan minimal 20 karakter'),
})

export type ReportCategory = z.infer<typeof reportCategorySchema>
export type ReportStatus = z.infer<typeof reportStatusSchema>
export type Report = z.infer<typeof reportSchema>
export type ReportFormValues = z.input<typeof reportFormSchema>
