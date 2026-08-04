// features/drivers/services/driverService.js
import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const driverService = {
  // ============================================
  // ADMIN ENDPOINTS (for admin users)
  // ============================================

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

  verifyDriverAdmin: async (id) => {
    const response = await axiosInstance.put(`/admin/drivers/${id}/verify`)
    return response.data.data
  },

  // ============================================
  // PUBLIC/DRIVER ENDPOINTS (for driver users)
  // ============================================

  registerDriver: async (data) => {
    const response = await axiosInstance.post('/drivers', data)
    return response.data.data
  },

  // ✅ FIXED: Get available drivers with pagination
  getAvailableDrivers: async (page = 0, size = 20) => {
    const response = await axiosInstance.get('/drivers/available', {
      params: { page, size },
    })
    // Return the content array directly or the whole response
    return response.data.data?.content || response.data.data || []
  },

  // ✅ FIXED: Get available drivers for assignment (returns List<DriverDTO>)
  getAvailableDriversForAssignment: async (vehicleType = null) => {
    const params = vehicleType ? { vehicleType } : {}
    const response = await axiosInstance.get('/drivers/available/assignment', { params })
    return response.data.data || []
  },

  // ✅ Get all drivers
  getAllDrivers: async (page = 0, size = 20, sortBy = 'createdAt', sortDirection = 'DESC') => {
    const response = await axiosInstance.get('/drivers', {
      params: { page, size, sortBy, sortDirection },
    })
    return response.data.data
  },

  getDriverById: async (id) => {
    const response = await axiosInstance.get(`/drivers/${id}`)
    return response.data.data
  },

  getDriverByEmail: async (email) => {
    const response = await axiosInstance.get(`/drivers/email/${email}`)
    return response.data.data
  },

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

  deleteDriver: async (id) => {
    const response = await axiosInstance.delete(`/drivers/${id}`)
    return response.data
  },
}

export default driverService
