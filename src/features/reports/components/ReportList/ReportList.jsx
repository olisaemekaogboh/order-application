import React, { useEffect } from 'react'
import { useReports } from '../../hooks/useReports'
import Badge from '@/shared/components/ui/Badge/Badge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Button from '@/shared/components/ui/Button/Button'
import { Download, Trash2, Eye } from 'lucide-react'
import { REPORT_STATUSES } from '../../constants'
import { getReportTypeLabel, getReportTypeIcon } from '../../utils'
import { formatFileSize } from '@/shared/utils/formatters'
import { formatReportDate } from '../../utils'

export const ReportList = ({ onViewReport }) => {
  const {
    reports,
    loading,
    pagination,
    fetchReports,
    downloadReport,
    deleteReport,
    exporting,
    changePage,
  } = useReports()

  useEffect(() => {
    fetchReports()
  }, [pagination.page])

  const handleDownload = async (id, format) => {
    await downloadReport(id, format)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this report?')) {
      await deleteReport(id)
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      [REPORT_STATUSES.PENDING]: 'warning',
      [REPORT_STATUSES.PROCESSING]: 'info',
      [REPORT_STATUSES.COMPLETED]: 'success',
      [REPORT_STATUSES.FAILED]: 'danger',
    }
    return variants[status] || 'default'
  }

  if (loading && reports.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" />
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <EmptyState
        icon="📄"
        title="No Reports"
        description="Generate your first report to get started."
      />
    )
  }

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
                    <Badge variant={getStatusBadge(report.status)}>{report.status}</Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {formatFileSize(report.fileSize)}
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
                          onClick={() => handleDownload(report.id, report.format || 'pdf')}
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
                        onClick={() => handleDelete(report.id)}
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

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {pagination.page * pagination.size + 1} to{' '}
          {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
          {pagination.total} reports
        </div>
        <Pagination
          currentPage={pagination.page + 1}
          totalPages={pagination.totalPages}
          onPageChange={(page) => changePage(page - 1)}
        />
      </div>
    </div>
  )
}

export default ReportList
