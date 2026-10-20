import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { dataReport } from '../../../lib/Dummy/dataReport'
import type { Report, ReportFormValues, ReportStatus } from '../../../lib/Schema/reportSchema'
import { reportFormSchema } from '../../../lib/Schema/reportSchema'
import { ReportContext } from './ReportContext'

const STORAGE_KEY = 'assist:reports'

const load = (): Report[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Report[]) : dataReport
  } catch {
    return dataReport
  }
}

/**
 * State laporan untuk seluruh aplikasi. Disimpan di localStorage supaya
 * laporan baru tidak hilang saat refresh (prototype — belum ada backend).
 */
const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports))
    } catch {
      /* abaikan */
    }
  }, [reports])

  const addReport = useCallback((authorId: string, values: ReportFormValues) => {
    const parsed = reportFormSchema.parse(values)
    const report: Report = {
      id: `r-${Date.now()}`,
      authorId,
      date: new Date().toISOString().slice(0, 10),
      status: 'pending',
      ...parsed,
    }
    setReports((prev) => [report, ...prev])
    return report
  }, [])

  const updateStatus = useCallback((id: string, status: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }, [])

  const value = useMemo(
    () => ({ reports, addReport, updateStatus }),
    [reports, addReport, updateStatus],
  )

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
}

export default ReportProvider
