import { CheckCircle2, ClipboardList, Clock, RotateCcw } from 'lucide-react'
import { useMemo } from 'react'
import Card, { StatCard } from '../../../components/Card'
import { dataUser } from '../../../lib/Dummy/dataUser'
import PageHeader from '../../common/PageHeader'
import { useReports } from '../../common/ReportProvider/useReports'
import StatusChip from '../../common/StatusChip'
import { useAuth } from '../../Auth/useAuth'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const AdminDashboard = () => {
  const { user } = useAuth()
  const { reports } = useReports()

  const stats = useMemo(
    () => ({
      total: reports.length,
      pending: reports.filter((r) => r.status === 'pending').length,
      approved: reports.filter((r) => r.status === 'approved').length,
      revision: reports.filter((r) => r.status === 'revision').length,
    }),
    [reports],
  )

  const latest = reports.slice(0, 5)
  const authorName = (id: string) => dataUser.find((u) => u.id === id)?.name ?? '—'

  return (
    <>
      <PageHeader
        eyebrow="Ringkasan"
        title={`Halo, ${user?.name.split(' ')[0]}`}
        description="Gambaran terbaru laporan dari seluruh anggota tim."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard highlight label="Total laporan" value={stats.total} icon={ClipboardList} hint="Dari semua anggota tim" />
        <StatCard label="Menunggu review" value={stats.pending} icon={Clock} hint="Perlu ditinjau" />
        <StatCard label="Disetujui" value={stats.approved} icon={CheckCircle2} hint="Sudah selesai ditinjau" />
        <StatCard label="Perlu revisi" value={stats.revision} icon={RotateCcw} hint="Dikembalikan ke anggota" />
      </div>

      <Card className="mt-8" title="Laporan terbaru" description="5 laporan yang baru masuk">
        <ul className="divide-y divide-separator">
          {latest.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <div className="min-w-0">
                <p className="truncate font-medium text-plum">{r.title}</p>
                <p className="text-xs text-muted">
                  {authorName(r.authorId)} · {r.category} · {formatDate(r.date)}
                </p>
              </div>
              <StatusChip status={r.status} />
            </li>
          ))}
        </ul>
      </Card>
    </>
  )
}

export default AdminDashboard
