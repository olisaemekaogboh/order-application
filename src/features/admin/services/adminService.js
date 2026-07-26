import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const adminService = {
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard')
    return response.data.data
  },
  getSuperAdminDashboardStats: async () => {
    const response = await axiosInstance.get('/admin/dashboard/super')
    return response.data.data
  },
  getAllUsers: async (params) => {
    const response = await axiosInstance.get('/admin/users', { params })
    return response.data.data
  },
  enableUser: async (userId) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/enable`)
    return response.data
  },
  disableUser: async (userId) => {
    const response = await axiosInstance.put(`/admin/users/${userId}/disable`)
    return response.data
  },
  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/admin/users/${userId}`)
    return response.data
  },
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
  getAuditLogs: async (params) => {
    const response = await axiosInstance.get('/admin/audit-logs', { params })
    return response.data.data
  },
  getRecentOrders: async (limit) => {
    const response = await axiosInstance.get('/admin/orders/recent', {
      params: { limit },
    })
    return response.data.data
  },
  // Add these methods to adminService.js
  getUsersByRole: async (role, params) => {
    const response = await axiosInstance.get(`/admin/users/role/${role}`, { params })
    return response.data.data
  },
  getSystemConfigs: async () => {
    const response = await axiosInstance.get('/admin/system/configs')
    return response.data.data
  },
  updateSystemConfig: async (key, value) => {
    const response = await axiosInstance.put(`/admin/system/configs?key=${key}&value=${value}`)
    return response.data.data
  },
}
