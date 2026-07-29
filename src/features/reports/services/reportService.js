import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const reportService = {
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

  // Dashboard Analytics - GET (this one is GET in backend)
  getDashboardAnalytics: async () => {
    const response = await axiosInstance.get('/reports/dashboard')
    return response.data.data
  },

  // Download endpoints (POST)
  downloadRevenuePdf: async (data) => {
    const response = await axiosInstance.post('/reports/revenue/pdf', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadRevenueExcel: async (data) => {
    const response = await axiosInstance.post('/reports/revenue/excel', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadRevenueCsv: async (data) => {
    const response = await axiosInstance.post('/reports/revenue/csv', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadOrdersPdf: async (data) => {
    const response = await axiosInstance.post('/reports/orders/pdf', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadOrdersExcel: async (data) => {
    const response = await axiosInstance.post('/reports/orders/excel', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadOrdersCsv: async (data) => {
    const response = await axiosInstance.post('/reports/orders/csv', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadDriversPdf: async (data) => {
    const response = await axiosInstance.post('/reports/drivers/pdf', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadDriversExcel: async (data) => {
    const response = await axiosInstance.post('/reports/drivers/excel', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadDriversCsv: async (data) => {
    const response = await axiosInstance.post('/reports/drivers/csv', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadCustomersPdf: async (data) => {
    const response = await axiosInstance.post('/reports/customers/pdf', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadCustomersExcel: async (data) => {
    const response = await axiosInstance.post('/reports/customers/excel', data, {
      responseType: 'blob',
    })
    return response.data
  },

  downloadCustomersCsv: async (data) => {
    const response = await axiosInstance.post('/reports/customers/csv', data, {
      responseType: 'blob',
    })
    return response.data
  },
}
