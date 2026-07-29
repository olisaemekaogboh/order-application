import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const vehicleService = {
  // Get all vehicles (with filters)
  getVehicles: async (params = {}) => {
    const response = await axiosInstance.get('/vehicles', { params })
    return response.data.data
  },

  // Get vehicle by ID
  getVehicleById: async (id) => {
    const response = await axiosInstance.get(`/vehicles/${id}`)
    return response.data.data
  },

  // Create vehicle
  createVehicle: async (data) => {
    const response = await axiosInstance.post('/vehicles', data)
    return response.data.data
  },

  // Update vehicle
  updateVehicle: async (id, data) => {
    const response = await axiosInstance.put(`/vehicles/${id}`, data)
    return response.data.data
  },

  // Delete vehicle
  deleteVehicle: async (id) => {
    const response = await axiosInstance.delete(`/vehicles/${id}`)
    return response.data
  },

  // Update vehicle status
  updateVehicleStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/vehicles/${id}/status`, null, {
      params: { status },
    })
    return response.data.data
  },

  // Get vehicle by number
  getVehicleByNumber: async (number) => {
    const response = await axiosInstance.get(`/vehicles/number/${number}`)
    return response.data.data
  },
}

export default vehicleService
