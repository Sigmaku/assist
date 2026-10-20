import { Check, RotateCcw } from 'lucide-react'
import Button from '../../../components/Button'
import { dataUser } from '../../../lib/Dummy/dataUser'
import type { Report } from '../../../lib/Schema/reportSchema'
import DataTable from '../../common/DataTable'
import type { DataTableColumn } from '../../common/DataTable'
import PageHeader from '../../common/PageHeader'
import { useReports } from '../../common/ReportProvider/useReports'
import StatusChip from '../../common/StatusChip'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

const authorName = (id: string) => dataUser.find((u) => u.id === id)?.name ?? '—'

const AdminReports = () => {
  const { reports, updateStatus } = useReports()

  const columns: DataTableColumn<Report>[] = [
    {
      key: 'title',
      header: 'Laporan',
      render: (r) => (
        <div className="min-w-56 max-w-sm">
          <p className="font-medium text-plum">{r.title}</p>
          <p className="line-clamp-1 text-xs text-muted">{r.summary}</p>
        </div>
      ),
    },
    { key: 'author', header: 'Pelapor', className: 'whitespace-nowrap', render: (r) => authorName(r.authorId) },
    { key: 'category', header: 'Kategori', render: (r) => r.category },
    { key: 'date', header: 'Tanggal', className: 'whitespace-nowrap', render: (r) => formatDate(r.date) },
    { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    {
      key: 'action',
      header: 'Aksi',
      render: (r) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            tone="gold"
            isDisabled={r.status === 'approved'}
            onPress={() => updateStatus(r.id, 'approved')}
          >
            <Check size={14} /> Setujui
          </Button>
          <Button
            size="sm"
            tone="outline"
            isDisabled={r.status === 'revision'}
            onPress={() => updateStatus(r.id, 'revision')}
          >
            <RotateCcw size={14} /> Revisi
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Semua Laporan"
        description="Tinjau laporan anggota tim, lalu setujui atau minta revisi."
      />
      <DataTable
        ariaLabel="Tabel semua laporan"
        columns={columns}
        data={reports}
        searchPlaceholder="Cari judul atau pelapor…"
        searchBy={(r) => `${r.title} ${authorName(r.authorId)} ${r.category}`}
      />
    </>
  )
}

export default AdminReports
