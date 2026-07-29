import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const dispatchService = {
  // Get all dispatches (with filters)
  getAllDispatches: async (params = {}) => {
    const response = await axiosInstance.get('/dispatch', { params })
    return response.data.data
  },

  // Get dispatch by ID
  getDispatchById: async (id) => {
    const response = await axiosInstance.get(`/dispatch/${id}`)
    return response.data.data
  },

  // Create dispatch
  createDispatch: async (data) => {
    const response = await axiosInstance.post('/dispatch', data)
    return response.data.data
  },

  // Assign driver
  assignDriver: async (dispatchId, driverId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-driver`, { driverId })
    return response.data.data
  },

  // Assign vehicle
  assignVehicle: async (dispatchId, vehicleId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-vehicle`, {
      vehicleId,
    })
    return response.data.data
  },

  // Accept dispatch (driver)
  acceptDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/accept`)
    return response.data.data
  },

  // Reject dispatch
  rejectDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reject`, null, {
      params: { reason },
    })
    return response.data.data
  },

  // Reassign
  reassignDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reassign`)
    return response.data.data
  },

  // Cancel dispatch
  cancelDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/cancel`, null, {
      params: { reason },
    })
    return response.data.data
  },

  // Complete dispatch
  completeDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/complete`)
    return response.data.data
  },

  // Get dispatch analytics
  getDispatchAnalytics: async () => {
    const response = await axiosInstance.get('/dispatch/analytics')
    return response.data.data
  },
}

export default dispatchService
