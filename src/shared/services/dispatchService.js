import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const dispatchService = {
  // ============================================================
  // GET ALL DISPATCHES
  // GET /dispatch
  // ============================================================
  getAllDispatches: async (params = {}) => {
    const response = await axiosInstance.get('/dispatch', { params })
    return response.data.data
  },

  // ============================================================
  // GET DISPATCH BY ID
  // GET /dispatch/{dispatchId}
  // ============================================================
  getDispatchById: async (dispatchId) => {
    const response = await axiosInstance.get(`/dispatch/${dispatchId}`)
    return response.data.data
  },

  // ============================================================
  // GET DISPATCH BY ORDER
  // GET /dispatch/order/{orderId}
  // ============================================================
  getDispatchByOrder: async (orderId) => {
    const response = await axiosInstance.get(`/dispatch/order/${orderId}`)
    return response.data.data
  },

  // ============================================================
  // GET DISPATCHES BY DRIVER
  // GET /dispatch/driver/{driverId}
  // ============================================================
  getDispatchesByDriver: async (driverId, params = {}) => {
    const response = await axiosInstance.get(`/dispatch/driver/${driverId}`, { params })
    return response.data.data
  },

  // ============================================================
  // GET DISPATCHES BY VEHICLE
  // GET /dispatch/vehicle/{vehicleId}
  // ============================================================
  getDispatchesByVehicle: async (vehicleId, params = {}) => {
    const response = await axiosInstance.get(`/dispatch/vehicle/${vehicleId}`, { params })
    return response.data.data
  },

  // ============================================================
  // GET DISPATCH ANALYTICS
  // GET /dispatch/analytics
  // ============================================================
  getDispatchAnalytics: async () => {
    const response = await axiosInstance.get('/dispatch/analytics')
    return response.data.data
  },

  // ============================================================
  // GET ORDERS READY FOR DISPATCH
  // GET /dispatch/ready-orders
  // ============================================================
  getReadyOrders: async () => {
    const response = await axiosInstance.get('/dispatch/ready-orders')
    return response.data.data
  },

  // ============================================================
  // CREATE DISPATCH
  // POST /dispatch
  // ============================================================
  createDispatch: async (data) => {
    const response = await axiosInstance.post('/dispatch', data)
    return response.data.data
  },

  // ============================================================
  // MANUAL ASSIGN
  // POST /dispatch/manual-assign
  // ============================================================
  manualAssign: async (data) => {
    const response = await axiosInstance.post('/dispatch/manual-assign', data)
    return response.data.data
  },

  // ============================================================
  // ASSIGN DRIVER
  // POST /dispatch/{dispatchId}/assign-driver
  // ============================================================
  assignDriver: async (dispatchId, driverId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-driver`, { driverId })
    return response.data.data
  },

  // ============================================================
  // ASSIGN VEHICLE
  // POST /dispatch/{dispatchId}/assign-vehicle
  // ============================================================
  assignVehicle: async (dispatchId, vehicleId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/assign-vehicle`, {
      vehicleId,
    })
    return response.data.data
  },

  // ============================================================
  // DRIVER ACCEPT
  // POST /dispatch/{dispatchId}/accept
  // ============================================================
  acceptDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/accept`)
    return response.data.data
  },

  // ============================================================
  // DRIVER REJECT
  // POST /dispatch/{dispatchId}/reject?reason=...
  // ============================================================
  rejectDispatch: async (dispatchId, reason = 'Rejected by driver') => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reject`, null, {
      params: { reason },
    })
    return response.data.data
  },

  // ============================================================
  // REASSIGN
  // POST /dispatch/{dispatchId}/reassign
  // ============================================================
  reassignDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/reassign`)
    return response.data.data
  },

  // ============================================================
  // CANCEL
  // POST /dispatch/{dispatchId}/cancel
  // ============================================================
  cancelDispatch: async (dispatchId, reason) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/cancel`, { reason })
    return response.data.data
  },

  // ============================================================
  // COMPLETE
  // POST /dispatch/{dispatchId}/complete
  // ============================================================
  completeDispatch: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/complete`)
    return response.data.data
  },

  // ============================================================
  // CURRENT DRIVER DISPATCHES
  // GET /dispatch/me
  // ============================================================
  getMyDispatches: async (params = {}) => {
    const response = await axiosInstance.get('/dispatch/me', { params })
    return response.data.data
  },

  // ============================================================
  // DRIVER WORKFLOW - PUT ENDPOINTS
  // ============================================================

  // PUT /dispatch/{dispatchId}/start-trip
  startTrip: async (dispatchId) => {
    const response = await axiosInstance.put(`/dispatch/${dispatchId}/start-trip`)
    return response.data.data
  },

  // PUT /dispatch/{dispatchId}/pickup-completed
  pickupCompleted: async (dispatchId) => {
    const response = await axiosInstance.put(`/dispatch/${dispatchId}/pickup-completed`)
    return response.data.data
  },

  // PUT /dispatch/{dispatchId}/start-delivery
  startDelivery: async (dispatchId) => {
    const response = await axiosInstance.put(`/dispatch/${dispatchId}/start-delivery`)
    return response.data.data
  },

  // POST /dispatch/{dispatchId}/complete
  completeDelivery: async (dispatchId) => {
    const response = await axiosInstance.post(`/dispatch/${dispatchId}/complete`)
    return response.data.data
  },
}

export default dispatchService
