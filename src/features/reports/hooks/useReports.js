import { useState, useCallback } from 'react'
import { reportService } from '../services/reportService'
import { toast } from 'react-hot-toast'
import { REPORT_DEFAULTS } from '../constants'

export const useReports = () => {
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState(null)
  const [reports, setReports] = useState([])
  const [currentReport, setCurrentReport] = useState(null)
  const [pagination, setPagination] = useState({
    page: REPORT_DEFAULTS.PAGE,
    size: REPORT_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Fetch All Reports - DISABLED =====
  const fetchReports = useCallback(async (params = {}) => {
    console.info('Reports list endpoint not available - reports are generated on-demand')
    setReports([])
    setPagination({
      page: 0,
      size: REPORT_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
    return { content: [], total: 0 }
  }, [])

  // ===== Generate Report =====
  const generateReport = useCallback(async (data) => {
    setGenerating(true)
    setError(null)
    try {
      const { type, ...filters } = data

      let report
      switch (type) {
        case 'REVENUE':
          report = await reportService.generateRevenueReport(filters)
          break
        case 'ORDERS':
          report = await reportService.generateOrderReport(filters)
          break
        case 'DRIVERS':
          report = await reportService.generateDriverReport(filters)
          break
        case 'CUSTOMERS':
          report = await reportService.generateCustomerReport(filters)
          break
        case 'DELIVERY':
          report = await reportService.generateDeliveryReport(filters)
          break
        default:
          throw new Error(`Unknown report type: ${type}`)
      }

      setCurrentReport(report)
      toast.success('Report generated successfully')
      return report
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to generate report'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setGenerating(false)
    }
  }, [])

  // In useReports.js - update the downloadReport method
  const downloadReport = useCallback(async (reportType, filters, format = 'pdf') => {
    setDownloading(true)
    try {
      let blob
      const formatLower = format.toLowerCase()

      // Map report type to the correct download endpoint
      switch (reportType) {
        case 'REVENUE':
          if (formatLower === 'pdf') {
            blob = await reportService.downloadRevenuePdf(filters)
          } else if (formatLower === 'excel') {
            blob = await reportService.downloadRevenueExcel(filters)
          } else {
            blob = await reportService.downloadRevenueCsv(filters)
          }
          break
        case 'ORDERS':
          if (formatLower === 'pdf') {
            blob = await reportService.downloadOrdersPdf(filters)
          } else if (formatLower === 'excel') {
            blob = await reportService.downloadOrdersExcel(filters)
          } else {
            blob = await reportService.downloadOrdersCsv(filters)
          }
          break
        case 'DRIVERS':
          if (formatLower === 'pdf') {
            blob = await reportService.downloadDriversPdf(filters)
          } else if (formatLower === 'excel') {
            blob = await reportService.downloadDriversExcel(filters)
          } else {
            blob = await reportService.downloadDriversCsv(filters)
          }
          break
        case 'CUSTOMERS':
          if (formatLower === 'pdf') {
            blob = await reportService.downloadCustomersPdf(filters)
          } else if (formatLower === 'excel') {
            blob = await reportService.downloadCustomersExcel(filters)
          } else {
            blob = await reportService.downloadCustomersCsv(filters)
          }
          break
        default:
          throw new Error(`Download not available for report type: ${reportType}`)
      }

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const extension = formatLower === 'excel' ? 'xlsx' : formatLower
      link.download = `${reportType.toLowerCase()}_report.${extension}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast.success('Report downloaded successfully')
    } catch (err) {
      console.error('Download error:', err)
      const message = err.response?.data?.message || 'Failed to download report'
      toast.error(message)
      throw err
    } finally {
      setDownloading(false)
    }
  }, [])

  // ===== Get Report by ID =====
  const getReport = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const report = await reportService.getReportById(id)
      setCurrentReport(report)
      return report
    } catch (err) {
      const message = err.response?.data?.message || 'Report not found'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Export Report =====
  const exportReport = useCallback(async (filters, format = 'pdf') => {
    setExporting(true)
    try {
      const blob = await reportService.exportReport(filters, format)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report_export.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Report exported successfully')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to export report'
      toast.error(message)
      throw err
    } finally {
      setExporting(false)
    }
  }, [])

  // ===== Delete Report =====
  const deleteReport = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await reportService.deleteReport(id)
        setReports((prev) => prev.filter((r) => r.id !== id))
        if (currentReport?.id === id) {
          setCurrentReport(null)
        }
        toast.success('Report deleted')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete report'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentReport]
  )

  // ===== Schedule Report =====
  const scheduleReport = useCallback(async (data) => {
    setLoading(true)
    try {
      const result = await reportService.scheduleReport(data)
      toast.success('Report scheduled successfully')
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to schedule report'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Cancel Schedule =====
  const cancelSchedule = useCallback(async (id) => {
    setLoading(true)
    try {
      await reportService.cancelSchedule(id)
      toast.success('Schedule cancelled')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to cancel schedule'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Change Page =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setReports([])
    setCurrentReport(null)
    setError(null)
    setPagination({
      page: REPORT_DEFAULTS.PAGE,
      size: REPORT_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    generating,
    exporting,
    downloading,
    error,
    reports,
    currentReport,
    pagination,

    // Actions
    fetchReports,
    generateReport,
    getReport,
    downloadReport,
    exportReport,
    deleteReport,
    scheduleReport,
    cancelSchedule,
    changePage,
    changePageSize,
    reset,
  }
}
