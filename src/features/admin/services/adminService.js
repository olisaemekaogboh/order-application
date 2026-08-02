import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const adminService = {
  // ===== Dashboard =====
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard')
    return response.data.data
  },

  getSuperAdminDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard/super')
    return response.data.data
  },

  // ===== User Management =====
  getAllUsers: async (params) => {
    const response = await axiosInstance.get('/admin/users', { params })
    return response.data.data
  },

  getUsersByRole: async (role, params) => {
    const response = await axiosInstance.get('/admin/users', { params: { ...params, role } })
    return response.data.data
  },

  updateUserStatus: async (userId, data) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/status`, data)
    return response.data.data
  },

  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/admin/users/${userId}`)
    return response.data
  },

  // ===== Pricing Configuration =====
  // FIXED: All endpoints now use /admin/pricing to match backend
  getPricingConfigs: async () => {
    const response = await axiosInstance.get('/admin/pricing')
    return response.data.data
  },

  createPricingConfig: async (data) => {
    const response = await axiosInstance.post('/admin/pricing', data)
    return response.data.data
  },

  updatePricingConfig: async (id, data) => {
    const response = await axiosInstance.put(`/admin/pricing/${id}`, data)
    return response.data.data
  },

  deletePricingConfig: async (id) => {
    const response = await axiosInstance.delete(`/admin/pricing/${id}`)
    return response.data
  },

  activatePricingConfig: async (id) => {
    const response = await axiosInstance.put(`/admin/pricing/${id}/activate`)
    return response.data
  },

  deactivatePricingConfig: async (id) => {
    const response = await axiosInstance.put(`/admin/pricing/${id}/deactivate`)
    return response.data
  },

  // ===== System Configuration =====
  getSystemConfigs: async () => {
    const response = await axiosInstance.get('/admin/system/configs')
    return response.data.data
  },

  updateSystemConfig: async (key, data) => {
    const response = await axiosInstance.put(`/admin/system/configs/${key}`, data)
    return response.data.data
  },

  // ===== Audit Logs =====
  getAuditLogs: async (params) => {
    const response = await axiosInstance.get('/admin/audit-logs', { params })
    return response.data.data
  },

  getAuditLogsByUser: async (userId, params) => {
    const response = await axiosInstance.get(`/admin/audit-logs/user/${userId}`, { params })
    return response.data.data
  },

  // ===== Dashboard Analytics =====
  getRevenueAnalytics: async (data) => {
    const response = await axiosInstance.post('/admin/dashboard/revenue-analytics', data)
    return response.data.data
  },

  getOrderAnalytics: async (data) => {
    const response = await axiosInstance.post('/admin/dashboard/order-analytics', data)
    return response.data.data
  },

  getDriverAnalytics: async (data) => {
    const response = await axiosInstance.post('/admin/dashboard/driver-analytics', data)
    return response.data.data
  },

  getReviewAnalytics: async () => {
    const response = await axiosInstance.get('/admin/dashboard/reviews')
    return response.data.data
  },

  // ===== Admin Tracking =====
  getAllTracking: async (params) => {
    const response = await axiosInstance.get('/admin/tracking', { params })
    return response.data.data
  },

  // ===== Driver Payment =====
  processDriverPayment: async (driverId, amount) => {
    const response = await axiosInstance.post(`/admin/drivers/${driverId}/payments`, { amount })
    return response.data.data
  },
  // In adminService.js, add these methods:

  // ===== Dispatch Management =====
  getDispatches: async (params) => {
    const response = await axiosInstance.get('/admin/dispatches', { params })
    return response.data.data
  },

  // ===== Fleet Analytics =====
  getFleetAnalytics: async () => {
    const response = await axiosInstance.get('/api/fleet/dashboard')
    return response.data.data
  },

  // ===== Payment Management =====
  getAllPayments: async (params) => {
    const response = await axiosInstance.get('/admin/payments', { params })
    return response.data.data
  },

  // ===== Review Management =====
  getAllReviews: async (params) => {
    const response = await axiosInstance.get('/admin/reviews', { params })
    return response.data.data
  },

  moderateReview: async (id, data) => {
    const response = await axiosInstance.put(`/admin/reviews/${id}/moderate`, data)
    return response.data.data
  },

  // ===== Tracking Management =====
  getAllTracking: async (params) => {
    const response = await axiosInstance.get('/admin/tracking', { params })
    return response.data.data
  },
}
