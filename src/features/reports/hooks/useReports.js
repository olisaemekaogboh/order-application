import { useState, useCallback } from 'react'
import { reportService } from '../services/reportService'
import { toast } from 'react-hot-toast'
import { REPORT_DEFAULTS } from '../constants'

export const useReports = () => {
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState(null)
  const [reports, setReports] = useState([])
  const [currentReport, setCurrentReport] = useState(null)
  const [pagination, setPagination] = useState({
    page: REPORT_DEFAULTS.PAGE,
    size: REPORT_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Fetch All Reports =====
  const fetchReports = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await reportService.getReports({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setReports(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || REPORT_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch reports'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Generate Report =====
  const generateReport = useCallback(
    async (data) => {
      setGenerating(true)
      setError(null)
      try {
        const report = await reportService.generateReport(data)
        setCurrentReport(report)
        // Refresh report list
        await fetchReports()
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
    },
    [fetchReports]
  )

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

  // ===== Download Report =====
  const downloadReport = useCallback(async (id, format = 'pdf') => {
    setExporting(true)
    try {
      const blob = await reportService.downloadReport(id, format)
      // Trigger download
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report_${id}.${format}`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Report downloaded successfully')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to download report'
      toast.error(message)
      throw err
    } finally {
      setExporting(false)
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
