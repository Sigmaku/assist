import { Input, Pagination, Table, TextField } from '@heroui/react'
import { ChevronLeft, ChevronRight, Inbox, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'

/** Jumlah baris per halaman — sengaja fix 5 */
const PAGE_SIZE = 5

export interface DataTableColumn<T> {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn<T>[]
  data: T[]
  ariaLabel: string
  /** Jika diisi, muncul kolom pencarian. Return teks yang dicari per baris. */
  searchBy?: (row: T) => string
  searchPlaceholder?: string
  emptyText?: string
}

const buildPages = (current: number, total: number): (number | 'ellipsis-l' | 'ellipsis-r')[] => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, 4, 'ellipsis-r', total]
  if (current >= total - 2) return [1, 'ellipsis-l', total - 3, total - 2, total - 1, total]
  return [1, 'ellipsis-l', current - 1, current, current + 1, 'ellipsis-r', total]
}

function DataTable<T extends { id: string }>({
  columns,
  data,
  ariaLabel,
  searchBy,
  searchPlaceholder = 'Cari…',
  emptyText = 'Belum ada data',
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || !searchBy) return data
    return data.filter((row) => searchBy(row).toLowerCase().includes(q))
  }, [data, query, searchBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const rows = filtered.slice(start, start + PAGE_SIZE)

  return (
    <div className="flex flex-col gap-4">
      {searchBy && (
        <TextField
          aria-label="Cari data"
          value={query}
          onChange={(v) => {
            setQuery(v)
            setPage(1)
          }}
          className="max-w-xs"
        >
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input placeholder={searchPlaceholder} className="w-full pl-9" />
          </div>
        </TextField>
      )}

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label={ariaLabel}>
            <Table.Header>
              {columns.map((col, i) => (
                <Table.Column key={col.key} id={col.key} isRowHeader={i === 0}>
                  {col.header}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body
              renderEmptyState={() => (
                <div className="flex flex-col items-center gap-2 py-10 text-muted">
                  <Inbox size={28} />
                  <span className="text-sm">{emptyText}</span>
                </div>
              )}
            >
              {rows.map((row) => (
                <Table.Row key={row.id} id={row.id}>
                  {columns.map((col) => (
                    <Table.Cell key={col.key} className={col.className}>
                      {col.render(row)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <Pagination size="sm" className="w-full">
            <Pagination.Summary>
              {filtered.length === 0
                ? '0 data'
                : `${start + 1}–${start + rows.length} dari ${filtered.length}`}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage === 1}
                  onPress={() => setPage(currentPage - 1)}
                >
                  <Pagination.PreviousIcon>
                    <ChevronLeft size={16} />
                  </Pagination.PreviousIcon>
                  <span>Sebelumnya</span>
                </Pagination.Previous>
              </Pagination.Item>
              {buildPages(currentPage, totalPages).map((p) =>
                typeof p === 'number' ? (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === currentPage}
                      aria-label={`Halaman ${p}`}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage === totalPages}
                  onPress={() => setPage(currentPage + 1)}
                >
                  <span>Berikutnya</span>
                  <Pagination.NextIcon>
                    <ChevronRight size={16} />
                  </Pagination.NextIcon>
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  )
}

export default DataTable
