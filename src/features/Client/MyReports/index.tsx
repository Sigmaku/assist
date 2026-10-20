import { Link } from '@tanstack/react-router'
import { FilePlus2 } from 'lucide-react'
import { useMemo } from 'react'
import Button from '../../../components/Button'
import type { Report } from '../../../lib/Schema/reportSchema'
import DataTable from '../../common/DataTable'
import type { DataTableColumn } from '../../common/DataTable'
import PageHeader from '../../common/PageHeader'
import { useReports } from '../../common/ReportProvider/useReports'
import StatusChip from '../../common/StatusChip'
import { useAuth } from '../../Auth/useAuth'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const columns: DataTableColumn<Report>[] = [
  {
    key: 'title',
    header: 'Laporan',
    render: (r) => (
      <div className="min-w-56 max-w-md">
        <p className="font-medium text-plum">{r.title}</p>
        <p className="line-clamp-1 text-xs text-muted">{r.summary}</p>
      </div>
    ),
  },
  { key: 'category', header: 'Kategori', render: (r) => r.category },
  { key: 'date', header: 'Tanggal', className: 'whitespace-nowrap', render: (r) => formatDate(r.date) },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

const MyReports = () => {
  const { user } = useAuth()
  const { reports } = useReports()
  const mine = useMemo(() => reports.filter((r) => r.authorId === user?.id), [reports, user])

  return (
    <>
      <PageHeader
        eyebrow="Client"
        title="Laporan Saya"
        description="Semua laporan yang pernah kamu kirim beserta statusnya."
        action={
          <Link to="/client/reports/new">
            <Button tone="gold">
              <FilePlus2 size={16} /> Buat laporan
            </Button>
          </Link>
        }
      />
      <DataTable
        ariaLabel="Tabel laporan saya"
        columns={columns}
        data={mine}
        searchPlaceholder="Cari judul laporan…"
        searchBy={(r) => `${r.title} ${r.category}`}
        emptyText="Kamu belum membuat laporan"
      />
    </>
  )
}

export default MyReports
