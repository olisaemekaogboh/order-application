import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const dispatchService = {
  // ===== GET all dispatches (with filters) =====
  // GET /api/dispatch
  getAllDispatches: async (params = {}) => {
    const response = await axiosInstance.get('/dispatch', { params })
    return response.data.data
  },

  // ===== GET dispatch by ID =====
  // GET /api/dispatch/{dispatchId}
  getDispatchById: async (id) => {
    const response = await axiosInstance.get(`/dispatch/${id}`)
    return response.data.data
  },

  // ===== GET dispatch by order ID =====
  // GET /api/dispatch/order/{orderId}
  getDispatchByOrder: async (orderId) => {
    const response = await axiosInstance.get(`/dispatch/order/${orderId}`)
    return response.data.data
  },

  // ===== GET dispatches by driver =====
  // GET /api/dispatch/driver/{driverId}?page=0&size=20
  getDispatchesByDriver: async (driverId, params = {}) => {
    const response = await axiosInstance.get(`/dispatch/driver/${driverId}`, { params })
    return response.data.data
  },

  // ===== GET dispatches by vehicle =====
  // GET /api/dispatch/vehicle/{vehicleId}?page=0&size=20
  getDispatchesByVehicle: async (vehicleId, params = {}) => {
    const response = await axiosInstance.get(`/dispatch/vehicle/${vehicleId}`, { params })
    return response.data.data
  },

  // ===== GET dispatch analytics =====
  // GET /api/dispatch/analytics
  getDispatchAnalytics: async () => {
    const response = await axiosInstance.get('/dispatch/analytics')
    return response.data.data
  },

  // ===== CREATE dispatch =====
  // POST /api/dispatch
  createDispatch: async (data) => {
    const response = await axiosInstance.post('/dispatch', data)
    return response.data.data
  },

  // ===== ASSIGN driver to dispatch =====
  // POST /api/dispatch/{dispatchId}/assign-driver
  assignDriver: async (dispatchId, driverId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-driver`, { driverId })
    return response.data.data
  },

  // ===== ASSIGN vehicle to dispatch =====
  // POST /api/dispatch/{dispatchId}/assign-vehicle
  assignVehicle: async (dispatchId, vehicleId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-vehicle`, {
      vehicleId,
    })
    return response.data.data
  },

  // ===== ACCEPT dispatch (driver) =====
  // POST /api/dispatch/{dispatchId}/accept
  acceptDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/accept`)
    return response.data.data
  },

  // ===== REJECT dispatch =====
  // POST /api/dispatch/{dispatchId}/reject?reason=xxx
  rejectDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reject`, null, {
      params: { reason },
    })
    return response.data.data
  },

  // ===== REASSIGN dispatch =====
  // POST /api/dispatch/{dispatchId}/reassign
  reassignDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reassign`)
    return response.data.data
  },

  // ===== CANCEL dispatch =====
  // POST /api/dispatch/{dispatchId}/cancel?reason=xxx
  cancelDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/cancel`, null, {
      params: { reason },
    })
    return response.data.data
  },

  // ===== COMPLETE dispatch =====
  // POST /api/dispatch/{dispatchId}/complete
  completeDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/complete`)
    return response.data.data
  },
}

export default dispatchService
