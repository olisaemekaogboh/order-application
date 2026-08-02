import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const reportService = {
  // ===== GENERATE REPORTS =====

  // Generic generate report method
  generateReport: async (data) => {
    const { type, ...filters } = data

    // Map report type to the correct endpoint
    const endpoints = {
      REVENUE: '/reports/revenue',
      ORDERS: '/reports/orders',
      DRIVERS: '/reports/drivers',
      CUSTOMERS: '/reports/customers',
      DELIVERY: '/reports/delivery',
      DASHBOARD: '/reports/dashboard',
    }

    const endpoint = endpoints[type] || endpoints.REVENUE
    const response = await axiosInstance.post(endpoint, filters)
    return response.data.data
  },

  // Revenue Report - POST
  generateRevenueReport: async (data) => {
    const response = await axiosInstance.post('/reports/revenue', data)
    return response.data.data
  },

  // Order Report - POST
  generateOrderReport: async (data) => {
    const response = await axiosInstance.post('/reports/orders', data)
    return response.data.data
  },

  // Driver Report - POST
  generateDriverReport: async (data) => {
    const response = await axiosInstance.post('/reports/drivers', data)
    return response.data.data
  },

  // Customer Report - POST
  generateCustomerReport: async (data) => {
    const response = await axiosInstance.post('/reports/customers', data)
    return response.data.data
  },

  // Delivery Performance Report - POST
  generateDeliveryReport: async (data) => {
    const response = await axiosInstance.post('/reports/delivery', data)
    return response.data.data
  },

  // Dashboard Analytics - GET
  getDashboardAnalytics: async () => {
    const response = await axiosInstance.get('/reports/dashboard')
    return response.data.data
  },

  // ===== GET REPORTS =====

  getReportById: async (id) => {
    const response = await axiosInstance.get(`/reports/${id}`)
    return response.data.data
  },

  deleteReport: async (id) => {
    const response = await axiosInstance.delete(`/reports/${id}`)
    return response.data
  },

  // ===== DOWNLOAD REPORTS =====

  downloadReport: async (id, format = 'pdf') => {
    const response = await axiosInstance.get(`/reports/${id}/download`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  exportReport: async (filters, format = 'pdf') => {
    const response = await axiosInstance.post('/reports/export', filters, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // ===== REVENUE DOWNLOADS =====

  downloadRevenuePdf: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/revenue/pdf', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading revenue PDF:', error)
      throw error
    }
  },

  downloadRevenueExcel: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/revenue/excel', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading revenue Excel:', error)
      throw error
    }
  },

  downloadRevenueCsv: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/revenue/csv', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading revenue CSV:', error)
      throw error
    }
  },

  // ===== ORDER DOWNLOADS =====

  downloadOrdersPdf: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/orders/pdf', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading orders PDF:', error)
      throw error
    }
  },

  downloadOrdersExcel: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/orders/excel', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading orders Excel:', error)
      throw error
    }
  },

  downloadOrdersCsv: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/orders/csv', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading orders CSV:', error)
      throw error
    }
  },

  // ===== DRIVER DOWNLOADS =====

  downloadDriversPdf: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/drivers/pdf', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading drivers PDF:', error)
      throw error
    }
  },

  downloadDriversExcel: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/drivers/excel', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading drivers Excel:', error)
      throw error
    }
  },

  downloadDriversCsv: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/drivers/csv', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading drivers CSV:', error)
      throw error
    }
  },

  // ===== CUSTOMER DOWNLOADS =====

  downloadCustomersPdf: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/customers/pdf', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading customers PDF:', error)
      throw error
    }
  },

  downloadCustomersExcel: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/customers/excel', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading customers Excel:', error)
      throw error
    }
  },

  downloadCustomersCsv: async (data) => {
    try {
      const response = await axiosInstance.post('/reports/customers/csv', data, {
        responseType: 'blob',
      })
      return response.data
    } catch (error) {
      console.error('Error downloading customers CSV:', error)
      throw error
    }
  },

  // ===== SCHEDULE REPORTS =====

  scheduleReport: async (data) => {
    const response = await axiosInstance.post('/reports/schedule', data)
    return response.data.data
  },

  cancelSchedule: async (id) => {
    const response = await axiosInstance.delete(`/reports/schedule/${id}`)
    return response.data
  },
}

export default reportService
