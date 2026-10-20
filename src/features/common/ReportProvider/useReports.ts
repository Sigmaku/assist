import { useContext } from 'react'
import { ReportContext } from './ReportContext'

export const useReports = () => {
  const ctx = useContext(ReportContext)
  if (!ctx) throw new Error('useReports harus dipakai di dalam <ReportProvider>')
  return ctx
}
