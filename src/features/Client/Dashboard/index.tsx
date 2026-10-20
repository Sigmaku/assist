import { Link } from '@tanstack/react-router'
import { CheckCircle2, ClipboardList, Clock, FilePlus2 } from 'lucide-react'
import { useMemo } from 'react'
import Button from '../../../components/Button'
import Card, { StatCard } from '../../../components/Card'
import PageHeader from '../../common/PageHeader'
import { useReports } from '../../common/ReportProvider/useReports'
import StatusChip from '../../common/StatusChip'
import { useAuth } from '../../Auth/useAuth'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const ClientDashboard = () => {
  const { user } = useAuth()
  const { reports } = useReports()

  const mine = useMemo(() => reports.filter((r) => r.authorId === user?.id), [reports, user])
  const pending = mine.filter((r) => r.status === 'pending').length
  const approved = mine.filter((r) => r.status === 'approved').length

  return (
    <>
      <PageHeader
        eyebrow={user?.position}
        title={`Halo, ${user?.name.split(' ')[0]}`}
        description="Ringkasan laporan yang sudah kamu kirim ke leader."
        action={
          <Link to="/client/reports/new">
            <Button tone="gold">
              <FilePlus2 size={16} /> Buat laporan
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard highlight label="Laporan saya" value={mine.length} icon={ClipboardList} hint="Total yang dikirim" />
        <StatCard label="Menunggu review" value={pending} icon={Clock} hint="Belum ditinjau leader" />
        <StatCard label="Disetujui" value={approved} icon={CheckCircle2} hint="Sudah ditinjau" />
      </div>

      <Card className="mt-8" title="Laporan terakhir" description="3 laporan terbaru kamu">
        {mine.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted">
            Kamu belum membuat laporan. Mulai dengan tombol “Buat laporan”.
          </p>
        ) : (
          <ul className="divide-y divide-separator">
            {mine.slice(0, 3).map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="truncate font-medium text-plum">{r.title}</p>
                  <p className="text-xs text-muted">
                    {r.category} · {formatDate(r.date)}
                  </p>
                </div>
                <StatusChip status={r.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}

export default ClientDashboard
