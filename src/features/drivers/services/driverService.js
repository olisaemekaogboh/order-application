import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const driverService = {
  // ============================================
  // ADMIN ENDPOINTS (for admin users)
  // ============================================

  // ✅ Add this missing method
  registerDriverAdmin: async (data) => {
    const response = await axiosInstance.post('/admin/drivers', data)
    return response.data.data
  },

  getAllDriversAdmin: async (params = {}) => {
    const response = await axiosInstance.get('/admin/drivers', { params })
    return response.data.data
  },

  getDriverByIdAdmin: async (id) => {
    const response = await axiosInstance.get(`/admin/drivers/${id}`)
    return response.data.data
  },

  updateDriverAdmin: async (id, data) => {
    const response = await axiosInstance.put(`/admin/drivers/${id}`, data)
    return response.data.data
  },

  deleteDriverAdmin: async (id) => {
    const response = await axiosInstance.delete(`/admin/drivers/${id}`)
    return response.data
  },

  updateDriverAvailabilityAdmin: async (id, available) => {
    const response = await axiosInstance.put(
      `/admin/drivers/${id}/availability?available=${available}`
    )
    return response.data
  },

  processDriverPaymentAdmin: async (id, amount) => {
    const response = await axiosInstance.post(`/admin/drivers/${id}/payments?amount=${amount}`)
    return response.data
  },

  getDriverStatsAdmin: async () => {
    const response = await axiosInstance.get('/admin/drivers/stats')
    return response.data.data
  },

  getDriverEarningsAdmin: async (id) => {
    const response = await axiosInstance.get(`/admin/drivers/${id}/earnings`)
    return response.data.data
  },

  getDriverEarningsPaginatedAdmin: async (id, page = 0, size = 10) => {
    const response = await axiosInstance.get(`/admin/drivers/${id}/earnings/paginated`, {
      params: { page, size },
    })
    return response.data.data
  },

  getTotalEarningsAdmin: async (id) => {
    const response = await axiosInstance.get(`/admin/drivers/${id}/earnings/total`)
    return response.data.data
  },

  getUnpaidEarningsAdmin: async (id) => {
    const response = await axiosInstance.get(`/admin/drivers/${id}/earnings/unpaid`)
    return response.data.data
  },

  // ============================================
  // PUBLIC/DRIVER ENDPOINTS (for driver users)
  // ============================================

  registerDriver: async (data) => {
    const response = await axiosInstance.post('/drivers', data)
    return response.data.data
  },

  getAvailableDrivers: async (params = {}) => {
    const response = await axiosInstance.get('/drivers/available', { params })
    return response.data.data
  },

  // These are for DRIVER users only (not admins)
  updateMyAvailability: async (available) => {
    const response = await axiosInstance.put('/drivers/me/availability', { available })
    return response.data
  },

  updateMyLocation: async (latitude, longitude, location) => {
    const response = await axiosInstance.put('/drivers/me/location', {
      latitude,
      longitude,
      location,
    })
    return response.data
  },

  getMyEarnings: async () => {
    const response = await axiosInstance.get('/drivers/me/earnings')
    return response.data.data
  },

  getMyProfile: async () => {
    const response = await axiosInstance.get('/drivers/me')
    return response.data.data
  },

  updateMyProfile: async (data) => {
    const response = await axiosInstance.put('/drivers/me', data)
    return response.data.data
  },
  // In driverService.js, add to ADMIN ENDPOINTS section
  verifyDriverAdmin: async (id) => {
    const response = await axiosInstance.put(`/admin/drivers/${id}/verify`)
    return response.data.data
  },
}
