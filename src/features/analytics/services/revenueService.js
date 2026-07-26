import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const revenueService = {
  getRevenueReport: async (params) => {
    const response = await axiosInstance.get('/reports/revenue', { params })
    return response.data.data
  },
  getDailyRevenue: async (date) => {
    const response = await axiosInstance.get('/reports/daily', { params: { date } })
    return response.data.data
  },
  getDailyRevenueRange: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/daily-range', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getWeeklyRevenue: async (date) => {
    const response = await axiosInstance.get('/reports/weekly', { params: { date } })
    return response.data.data
  },
  getWeeklyRevenueRange: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/weekly-range', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getMonthlyRevenue: async (year, month) => {
    const response = await axiosInstance.get('/reports/monthly', {
      params: { year, month },
    })
    return response.data.data
  },
  getMonthlyRevenueRange: async (startYear, startMonth, endYear, endMonth) => {
    const response = await axiosInstance.get('/reports/monthly-range', {
      params: { startYear, startMonth, endYear, endMonth },
    })
    return response.data.data
  },
  getYearlyRevenue: async (year) => {
    const response = await axiosInstance.get('/reports/yearly', { params: { year } })
    return response.data.data
  },
  getYearlyRevenueRange: async (startYear, endYear) => {
    const response = await axiosInstance.get('/reports/yearly-range', {
      params: { startYear, endYear },
    })
    return response.data.data
  },
  getRevenueByState: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/by-state', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getRevenueByVehicleType: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/by-vehicle', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getTotalRevenue: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/total-revenue', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getTotalOrders: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/total-orders', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getAverageOrderValue: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/aov', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getTotalCommission: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/commission', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
  getTotalDriverPayout: async (startDate, endDate) => {
    const response = await axiosInstance.get('/reports/driver-payout', {
      params: { startDate, endDate },
    })
    return response.data.data
  },
}

export default revenueService
