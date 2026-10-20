import type { Report } from '../Schema/reportSchema'

export const dataReport: Report[] = [
  {
    id: 'r-01',
    title: 'Progres halaman dashboard klien',
    category: 'Harian',
    summary:
      'Layout dashboard selesai dan responsif. Sisa integrasi grafik dan filter tanggal.',
    authorId: 'u-1',
    date: '2026-10-19',
    status: 'pending',
  },
  {
    id: 'r-02',
    title: 'Endpoint autentikasi selesai',
    category: 'Proyek',
    summary:
      'Endpoint login, refresh token, dan logout sudah di-deploy ke staging dan lolos uji dasar.',
    authorId: 'u-2',
    date: '2026-10-19',
    status: 'pending',
  },
  {
    id: 'r-03',
    title: 'Revisi desain halaman onboarding',
    category: 'Mingguan',
    summary:
      'Tiga alternatif layout onboarding sudah dibuat. Menunggu masukan dari leader untuk dipilih.',
    authorId: 'u-3',
    date: '2026-10-18',
    status: 'approved',
  },
  {
    id: 'r-04',
    title: 'Regresi bug pada form checkout',
    category: 'Kendala',
    summary:
      'Ditemukan 4 bug regresi di form checkout setelah rilis terakhir. Sudah dibuatkan tiket prioritas tinggi.',
    authorId: 'u-4',
    date: '2026-10-18',
    status: 'revision',
  },
  {
    id: 'r-05',
    title: 'Optimasi query laporan bulanan',
    category: 'Proyek',
    summary:
      'Waktu muat laporan bulanan turun dari 6 detik menjadi 1,2 detik setelah penambahan index.',
    authorId: 'u-2',
    date: '2026-10-17',
    status: 'approved',
  },
  {
    id: 'r-06',
    title: 'Komponen tabel dan pagination',
    category: 'Harian',
    summary:
      'Komponen DataTable generik sudah dibuat dan dipakai di dua halaman. Dokumentasi menyusul.',
    authorId: 'u-1',
    date: '2026-10-17',
    status: 'approved',
  },
  {
    id: 'r-07',
    title: 'Riset pengguna sesi ketiga',
    category: 'Mingguan',
    summary:
      'Sesi riset dengan 5 pengguna selesai. Temuan utama: alur pendaftaran terlalu panjang.',
    authorId: 'u-3',
    date: '2026-10-16',
    status: 'pending',
  },
  {
    id: 'r-08',
    title: 'Skenario uji otomatis modul laporan',
    category: 'Proyek',
    summary:
      '32 skenario uji end-to-end modul laporan selesai ditulis, cakupan naik menjadi 71%.',
    authorId: 'u-4',
    date: '2026-10-16',
    status: 'approved',
  },
  {
    id: 'r-09',
    title: 'Server staging sering timeout',
    category: 'Kendala',
    summary:
      'Staging timeout setiap sore sekitar pukul 16.00. Perlu akses ke log infrastruktur untuk investigasi.',
    authorId: 'u-2',
    date: '2026-10-15',
    status: 'pending',
  },
  {
    id: 'r-10',
    title: 'Integrasi sidebar dan routing',
    category: 'Harian',
    summary:
      'Sidebar sudah terhubung ke routing berbasis role. Admin dan client melihat menu yang berbeda.',
    authorId: 'u-1',
    date: '2026-10-15',
    status: 'approved',
  },
  {
    id: 'r-11',
    title: 'Pembaruan design system',
    category: 'Lainnya',
    summary:
      'Token warna dan tipografi diperbarui mengikuti tema baru. Library komponen Figma ikut disinkronkan.',
    authorId: 'u-3',
    date: '2026-10-14',
    status: 'approved',
  },
  {
    id: 'r-12',
    title: 'Laporan uji performa halaman utama',
    category: 'Mingguan',
    summary:
      'Skor Lighthouse halaman utama naik dari 68 ke 91. Masih ada catatan pada ukuran gambar hero.',
    authorId: 'u-4',
    date: '2026-10-13',
    status: 'revision',
  },
]
