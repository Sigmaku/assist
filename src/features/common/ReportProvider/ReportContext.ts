import { createContext } from 'react'
import type { Report, ReportFormValues, ReportStatus } from '../../../lib/Schema/reportSchema'

export interface ReportContextValue {
  reports: Report[]
  addReport: (authorId: string, values: ReportFormValues) => Report
  updateStatus: (id: string, status: ReportStatus) => void
}

export const ReportContext = createContext<ReportContextValue | null>(null)
