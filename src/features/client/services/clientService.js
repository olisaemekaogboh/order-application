import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const clientService = {
  /**
   * Dashboard
   */
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/users/dashboard')
    return unwrap(response)
  },

  getDashboardSummary: async () => {
    const response = await axiosInstance.get('/users/dashboard/summary')
    return unwrap(response)
  },

  /**
   * Profile
   */
  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile')
    return unwrap(response)
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put('/users/profile', data)
    return unwrap(response)
  },

  /**
   * Dashboard widgets
   */
  getRecentOrders: async (limit = 5) => {
    const response = await axiosInstance.get('/orders/my-orders/recent', {
      params: { limit },
    })

    return unwrap(response)
  },

  getOrderStatistics: async () => {
    const response = await axiosInstance.get('/orders/my-orders/statistics')
    return unwrap(response)
  },

  getUnreadNotificationCount: async () => {
    const response = await axiosInstance.get('/notifications/count/unread')
    return unwrap(response)
  },

  getNotifications: async (limit = 5) => {
    const response = await axiosInstance.get('/notifications', {
      params: {
        page: 0,
        size: limit,
      },
    })

    return unwrap(response)
  },
}

export default clientService
