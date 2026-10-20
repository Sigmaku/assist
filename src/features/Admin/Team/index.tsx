import { dataUser } from '../../../lib/Dummy/dataUser'
import type { User } from '../../../lib/Schema/userSchema'
import DataTable from '../../common/DataTable'
import type { DataTableColumn } from '../../common/DataTable'
import PageHeader from '../../common/PageHeader'
import { useReports } from '../../common/ReportProvider/useReports'

const members = dataUser.filter((u) => u.role === 'client')

const AdminTeam = () => {
  const { reports } = useReports()

  const countFor = (id: string, status?: string) =>
    reports.filter((r) => r.authorId === id && (!status || r.status === status)).length

  const columns: DataTableColumn<User>[] = [
    {
      key: 'name',
      header: 'Anggota',
      render: (u) => (
        <div>
          <p className="font-medium text-plum">{u.name}</p>
          <p className="text-xs text-muted">{u.email}</p>
        </div>
      ),
    },
    { key: 'position', header: 'Posisi', render: (u) => u.position },
    { key: 'total', header: 'Total laporan', render: (u) => countFor(u.id) },
    { key: 'approved', header: 'Disetujui', render: (u) => countFor(u.id, 'approved') },
    { key: 'pending', header: 'Menunggu', render: (u) => countFor(u.id, 'pending') },
  ]

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Tim"
        description="Daftar anggota tim beserta kontribusi laporan mereka."
      />
      <DataTable
        ariaLabel="Tabel anggota tim"
        columns={columns}
        data={members}
        searchPlaceholder="Cari nama atau posisi…"
        searchBy={(u) => `${u.name} ${u.position}`}
      />
    </>
  )
}

export default AdminTeam
