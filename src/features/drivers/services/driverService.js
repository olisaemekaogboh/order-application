import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const driverService = {
  getAllDrivers: async (params = {}) => {
    const response = await axiosInstance.get('/drivers', { params })
    return response.data.data
  },
  registerDriver: async (data) => {
    const response = await axiosInstance.post('/drivers', data)
    return response.data.data
  },
  updateDriver: async (id, data) => {
    const response = await axiosInstance.put(`/drivers/${id}`, data)
    return response.data.data
  },
  deleteDriver: async (id) => {
    const response = await axiosInstance.delete(`/drivers/${id}`)
    return response.data
  },
  getDriverById: async (id) => {
    const response = await axiosInstance.get(`/drivers/${id}`)
    return response.data.data
  },
  getAvailableDrivers: async (params = {}) => {
    const response = await axiosInstance.get('/drivers/available', { params })
    return response.data.data
  },
  updateAvailability: async (id, available) => {
    const response = await axiosInstance.put(`/drivers/${id}/availability?available=${available}`)
    return response.data
  },
  updateLocation: async (id, latitude, longitude, location) => {
    const response = await axiosInstance.put(`/drivers/${id}/location`, {
      latitude,
      longitude,
      location,
    })
    return response.data
  },
  getDriverEarnings: async (id) => {
    const response = await axiosInstance.get(`/drivers/${id}/earnings`)
    return response.data.data
  },
  processPayment: async (id, amount) => {
    const response = await axiosInstance.post(`/drivers/${id}/payments?amount=${amount}`)
    return response.data
  },

  getDriverOrders: async (driverId, params) => {
    const response = await axiosInstance.get(`/orders/driver`, { params }) // or use /orders/driver?driverId
    return response.data.data
  },

  getDriverEarnings: async (driverId, params) => {
    const response = await axiosInstance.get(`/drivers/${driverId}/earnings`, { params })
    return response.data.data
  },

  getDriverProfile: async (driverId) => {
    const response = await axiosInstance.get(`/drivers/${driverId}`)
    return response.data.data
  },

  updateDriverProfile: async (driverId, data) => {
    const response = await axiosInstance.put(`/drivers/${driverId}`, data)
    return response.data.data
  },
}
