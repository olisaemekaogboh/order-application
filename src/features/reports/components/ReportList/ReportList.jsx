import React, { useState } from 'react'
import { useReports } from '../../hooks/useReports'
import Badge from '@/shared/components/ui/Badge/Badge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Button from '@/shared/components/ui/Button/Button'
import { Download, Trash2, Eye, RefreshCw, FileText } from 'lucide-react'
import { REPORT_STATUSES } from '../../constants'
import { getReportTypeLabel, getReportTypeIcon } from '../../utils'
import { formatFileSize } from '@/shared/utils/formatters'
import { formatReportDate } from '../../utils'

export const ReportList = ({ onViewReport, currentReport, filters, onRegenerate }) => {
  const { reports, loading, downloadReport, deleteReport, exporting } = useReports()

  const [selectedReport, setSelectedReport] = useState(currentReport)

  // If no reports and no current report, show empty state
  if (!loading && reports.length === 0 && !currentReport) {
    return (
      <EmptyState
        icon="📄"
        title="No Reports Generated"
        description="Generate a report using the form above to get started."
        action={
          <Button onClick={onRegenerate}>
            <FileText size={16} className="mr-2" />
            Generate Report
          </Button>
        }
      />
    )
  }

  // Show current generated report
  if (currentReport) {
    return (
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getReportTypeIcon(currentReport.type || 'REVENUE')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getReportTypeLabel(currentReport.type || 'REVENUE')}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currentReport.period || 'Custom Range'}
                  </p>
                </div>
              </div>
              <Badge variant="success">Generated</Badge>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentReport.totalRevenue
                    ? `₦${currentReport.totalRevenue.toLocaleString()}`
                    : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentReport.totalOrders || 0}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentReport.averageOrderValue
                    ? `₦${currentReport.averageOrderValue.toLocaleString()}`
                    : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Avg Order Value</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentReport.revenueGrowth
                    ? `${currentReport.revenueGrowth.toFixed(1)}%`
                    : 'N/A'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Revenue Growth</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={() =>
                  downloadReport(currentReport.id || 'report', filters?.format || 'pdf')
                }
                disabled={exporting}
              >
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadReport(currentReport.id || 'report', 'excel')}
                disabled={exporting}
              >
                <Download size={16} className="mr-2" />
                Download Excel
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadReport(currentReport.id || 'report', 'csv')}
                disabled={exporting}
              >
                <Download size={16} className="mr-2" />
                Download CSV
              </Button>
              <Button size="sm" variant="ghost" onClick={onRegenerate}>
                <RefreshCw size={16} className="mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state
  if (loading && reports.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    )
  }

  // Show list of reports if any exist
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Report
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Generated
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getReportTypeIcon(report.type)}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {getReportTypeLabel(report.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {report.period || 'N/A'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Badge variant={report.status === 'COMPLETED' ? 'success' : 'warning'}>
                      {report.status || 'PENDING'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {formatFileSize(report.fileSize || 0)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {formatReportDate(report.createdAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewReport?.(report.id)}
                        title="View"
                      >
                        <Eye size={16} />
                      </Button>
                      {report.status === 'COMPLETED' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => downloadReport(report.id, report.format || 'pdf')}
                          disabled={exporting}
                          title="Download"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Download size={16} />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          if (window.confirm('Delete this report?')) {
                            deleteReport(report.id)
                          }
                        }}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReportList
