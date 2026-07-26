import { useState, useCallback } from 'react'
import { revenueService } from '../services/revenueService'
import { toast } from 'react-hot-toast'
import { REPORT_PERIODS, CHART_DEFAULTS } from '../constants'

export const useAnalytics = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reportData, setReportData] = useState(null)
  const [dailyData, setDailyData] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [monthlyData, setMonthlyData] = useState([])
  const [yearlyData, setYearlyData] = useState([])
  const [period, setPeriod] = useState(CHART_DEFAULTS.PERIOD)

  // ===== Generate Revenue Report =====
  const generateReport = useCallback(
    async (params) => {
      setLoading(true)
      setError(null)
      try {
        const data = await revenueService.getRevenueReport({
          period: params.period || period,
          startDate: params.startDate,
          endDate: params.endDate,
          currency: params.currency || CHART_DEFAULTS.CURRENCY,
          includeBreakdown: params.includeBreakdown !== false,
        })
        setReportData(data)
        return data
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to generate report'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [period]
  )

  // ===== Get Daily Revenue =====
  const getDailyRevenue = useCallback(async (date) => {
    setLoading(true)
    try {
      const data = await revenueService.getDailyRevenue(date)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch daily revenue'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Daily Revenue Range =====
  const getDailyRevenueRange = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getDailyRevenueRange(startDate, endDate)
      setDailyData(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch daily revenue range'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Weekly Revenue =====
  const getWeeklyRevenue = useCallback(async (date) => {
    setLoading(true)
    try {
      const data = await revenueService.getWeeklyRevenue(date)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch weekly revenue'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Weekly Revenue Range =====
  const getWeeklyRevenueRange = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getWeeklyRevenueRange(startDate, endDate)
      setWeeklyData(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch weekly revenue range'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Monthly Revenue =====
  const getMonthlyRevenue = useCallback(async (year, month) => {
    setLoading(true)
    try {
      const data = await revenueService.getMonthlyRevenue(year, month)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch monthly revenue'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Monthly Revenue Range =====
  const getMonthlyRevenueRange = useCallback(async (startYear, startMonth, endYear, endMonth) => {
    setLoading(true)
    try {
      const data = await revenueService.getMonthlyRevenueRange(
        startYear,
        startMonth,
        endYear,
        endMonth
      )
      setMonthlyData(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch monthly revenue range'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Yearly Revenue =====
  const getYearlyRevenue = useCallback(async (year) => {
    setLoading(true)
    try {
      const data = await revenueService.getYearlyRevenue(year)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch yearly revenue'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Yearly Revenue Range =====
  const getYearlyRevenueRange = useCallback(async (startYear, endYear) => {
    setLoading(true)
    try {
      const data = await revenueService.getYearlyRevenueRange(startYear, endYear)
      setYearlyData(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch yearly revenue range'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Revenue by State =====
  const getRevenueByState = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getRevenueByState(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch revenue by state'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Revenue by Vehicle Type =====
  const getRevenueByVehicle = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getRevenueByVehicleType(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch revenue by vehicle'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Total Revenue =====
  const getTotalRevenue = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getTotalRevenue(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch total revenue'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Total Orders =====
  const getTotalOrders = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getTotalOrders(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch total orders'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Average Order Value =====
  const getAverageOrderValue = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getAverageOrderValue(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch average order value'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Commission =====
  const getTotalCommission = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getTotalCommission(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch commission'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Driver Payout =====
  const getDriverPayout = useCallback(async (startDate, endDate) => {
    setLoading(true)
    try {
      const data = await revenueService.getTotalDriverPayout(startDate, endDate)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch driver payout'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Change Period =====
  const changePeriod = useCallback((newPeriod) => {
    setPeriod(newPeriod)
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setReportData(null)
    setDailyData([])
    setWeeklyData([])
    setMonthlyData([])
    setYearlyData([])
    setError(null)
  }, [])

  return {
    // State
    loading,
    error,
    reportData,
    dailyData,
    weeklyData,
    monthlyData,
    yearlyData,
    period,

    // Actions
    generateReport,
    getDailyRevenue,
    getDailyRevenueRange,
    getWeeklyRevenue,
    getWeeklyRevenueRange,
    getMonthlyRevenue,
    getMonthlyRevenueRange,
    getYearlyRevenue,
    getYearlyRevenueRange,
    getRevenueByState,
    getRevenueByVehicle,
    getTotalRevenue,
    getTotalOrders,
    getAverageOrderValue,
    getTotalCommission,
    getDriverPayout,
    changePeriod,
    reset,
  }
}
