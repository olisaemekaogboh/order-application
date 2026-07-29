import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const trackingService = {
  // ----- Public/User endpoints (from TrackingController) -----

  /**
   * Start tracking for an order
   * @param {Object} data - { orderId, startLocation? }
   */
  startTracking: async (data) => {
    const response = await axiosInstance.post('/tracking/start', data)
    return unwrap(response)
  },

  /**
   * Update location (driver)
   * @param {Object} data - { trackingId, latitude, longitude, address? }
   */
  updateLocation: async (data) => {
    const response = await axiosInstance.post('/tracking/location', data)
    return unwrap(response)
  },

  /**
   * Update tracking status (driver)
   * @param {Object} data - { trackingId, status, note? }
   */
  updateStatus: async (data) => {
    const response = await axiosInstance.put('/tracking/status', data)
    return unwrap(response)
  },

  /**
   * Complete tracking
   * @param {Object} data - { trackingId, completionNote? }
   */
  completeTracking: async (data) => {
    const response = await axiosInstance.post('/tracking/complete', data)
    return unwrap(response)
  },

  /**
   * Cancel tracking
   * @param {Object} data - { trackingId, reason }
   */
  cancelTracking: async (data) => {
    const response = await axiosInstance.post('/tracking/cancel', data)
    return unwrap(response)
  },

  /**
   * Get tracking session by ID
   */
  getTrackingById: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/${trackingId}`)
    return unwrap(response)
  },

  /**
   * Get live tracking data (real-time)
   */
  getLiveTracking: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/live/${trackingId}`)
    return unwrap(response)
  },

  /**
   * Get tracking timeline
   */
  getTimeline: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/timeline/${trackingId}`)
    return unwrap(response)
  },

  /**
   * Get all tracking sessions for current user (paginated)
   */
  getUserTracking: async (params = {}) => {
    const response = await axiosInstance.get('/tracking/user', { params })
    return unwrap(response)
  },

  // ----- Driver-specific endpoints (from DriverTrackingController) -----

  /**
   * Update location for assigned tracking (driver)
   * @param {Object} data - { trackingId, latitude, longitude, address? }
   */
  updateLocationDriver: async (data) => {
    const response = await axiosInstance.post('/api/driver/tracking/location', data)
    return unwrap(response)
  },

  /**
   * Update tracking status (driver)
   * @param {Object} data - { trackingId, status, note? }
   */
  updateStatusDriver: async (data) => {
    const response = await axiosInstance.put('/api/driver/tracking/status', data)
    return unwrap(response)
  },

  /**
   * Get assigned tracking sessions for current driver
   */
  getAssignedTracking: async (params = {}) => {
    const response = await axiosInstance.get('/api/driver/tracking/assigned', { params })
    return unwrap(response)
  },

  // ----- Convenience aliases (backward compatibility) -----

  trackOrder: async (orderId) => {
    // This is from orders endpoint; keep for compatibility
    const response = await axiosInstance.get(`/orders/${orderId}/track`)
    return unwrap(response)
  },

  getTrackingHistory: async (orderId) => {
    // Not directly in backend; could be timeline by order
    // We'll redirect to getTimeline if we have trackingId
    console.warn('getTrackingHistory is deprecated; use getTimeline(trackingId)')
    return null
  },

  getDriverLocation: async (driverId) => {
    // Not a direct endpoint; use getLiveTracking with trackingId
    console.warn('getDriverLocation is not directly supported; use getLiveTracking')
    return null
  },

  getEstimatedArrival: async (orderId) => {
    // Not a direct endpoint; could be from tracking session
    console.warn('getEstimatedArrival is not directly supported; use getLiveTracking')
    return null
  },

  subscribeTracking: async (orderId) => {
    // Not implemented; use WebSocket for real-time
    console.warn('subscribeTracking not implemented; use WebSocket')
    return null
  },

  unsubscribeTracking: async (orderId) => {
    console.warn('unsubscribeTracking not implemented')
    return null
  },
}

export default trackingService
