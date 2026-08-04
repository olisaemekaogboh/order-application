import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const dispatchService = {
  // ===== GET all dispatches (with filters) =====
  // GET /dispatch (base URL already includes /api)
  getAllDispatches: async (params = {}) => {
    console.log('Making API call to /dispatch with params:', params)
    try {
      const response = await axiosInstance.get('/dispatch', { params })
      console.log('API response status:', response.status)
      console.log('API response data:', response.data)
      return response.data.data
    } catch (error) {
      console.error('API call failed:', error)
      console.error('Error config:', error.config)
      console.error('Error response:', error.response)
      throw error
    }
  },

  // ===== GET dispatch by ID =====
  // GET /dispatch/{dispatchId}
  getDispatchById: async (id) => {
    const response = await axiosInstance.get(`/dispatch/${id}`)
    return response.data.data
  },

  // ===== GET dispatch by order ID =====
  // GET /dispatch/order/{orderId}
  getDispatchByOrder: async (orderId) => {
    const response = await axiosInstance.get(`/dispatch/order/${orderId}`)
    return response.data.data
  },

  // ===== GET dispatches by driver =====
  // GET /dispatch/driver/{driverId}?page=0&size=20
  getDispatchesByDriver: async (driverId, params = {}) => {
    const response = await axiosInstance.get(`/dispatch/driver/${driverId}`, { params })
    return response.data.data
  },

  // ===== GET dispatches by vehicle =====
  // GET /dispatch/vehicle/{vehicleId}?page=0&size=20
  getDispatchesByVehicle: async (vehicleId, params = {}) => {
    const response = await axiosInstance.get(`/dispatch/vehicle/${vehicleId}`, { params })
    return response.data.data
  },

  // ===== GET dispatch analytics =====
  // GET /dispatch/analytics
  getDispatchAnalytics: async () => {
    const response = await axiosInstance.get('/dispatch/analytics')
    return response.data.data
  },

  // ===== GET orders ready for dispatch =====
  // GET /dispatch/ready-orders
  getReadyOrders: async () => {
    const response = await axiosInstance.get('/dispatch/ready-orders')
    return response.data.data
  },

  // ===== CREATE dispatch =====
  // POST /dispatch
  createDispatch: async (data) => {
    const response = await axiosInstance.post('/dispatch', data)
    return response.data.data
  },

  // ===== MANUAL ASSIGN dispatch =====
  // POST /dispatch/manual-assign
  manualAssign: async (data) => {
    const response = await axiosInstance.post('/dispatch/manual-assign', data)
    return response.data.data
  },

  // ===== ASSIGN driver to dispatch =====
  // POST /dispatch/{dispatchId}/assign-driver
  assignDriver: async (dispatchId, driverId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-driver`, { driverId })
    return response.data.data
  },

  // ===== ASSIGN vehicle to dispatch =====
  // POST /dispatch/{dispatchId}/assign-vehicle
  assignVehicle: async (dispatchId, vehicleId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-vehicle`, {
      vehicleId,
    })
    return response.data.data
  },

  // ===== ACCEPT dispatch (driver) =====
  // POST /dispatch/{dispatchId}/accept
  acceptDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/accept`)
    return response.data.data
  },

  // ===== REJECT dispatch =====
  // POST /dispatch/{dispatchId}/reject?reason=xxx
  rejectDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reject`, null, {
      params: { reason },
    })
    return response.data.data
  },

  // ===== REASSIGN dispatch =====
  // POST /dispatch/{dispatchId}/reassign
  reassignDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reassign`)
    return response.data.data
  },

  // ===== CANCEL dispatch =====
  // POST /dispatch/{dispatchId}/cancel
  cancelDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/cancel`, { reason })
    return response.data.data
  },

  // ===== COMPLETE dispatch =====
  // POST /dispatch/{dispatchId}/complete
  completeDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/complete`)
    return response.data.data
  },
}

export default dispatchService
