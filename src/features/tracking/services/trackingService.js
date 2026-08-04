import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const trackingService = {
  // ===== Public/User endpoints (from TrackingController) =====
  // Base path: /api/tracking

  /**
   * Start tracking for an order
   * POST /api/tracking/start
   */
  startTracking: async (data) => {
    const response = await axiosInstance.post('/tracking/start', data)
    return unwrap(response)
  },

  /**
   * Update location (driver)
   * POST /api/tracking/location
   */
  updateLocation: async (data) => {
    const response = await axiosInstance.post('/tracking/location', data)
    return unwrap(response)
  },

  /**
   * Update tracking status
   * PUT /api/tracking/status
   */
  updateStatus: async (data) => {
    const response = await axiosInstance.put('/tracking/status', data)
    return unwrap(response)
  },

  /**
   * Complete tracking
   * POST /api/tracking/complete
   */
  completeTracking: async (data) => {
    const response = await axiosInstance.post('/tracking/complete', data)
    return unwrap(response)
  },

  /**
   * Cancel tracking
   * POST /api/tracking/cancel
   */
  cancelTracking: async (data) => {
    const response = await axiosInstance.post('/tracking/cancel', data)
    return unwrap(response)
  },

  /**
   * Get tracking session by ID
   * GET /api/tracking/{trackingId}
   */
  getTrackingById: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/${trackingId}`)
    return unwrap(response)
  },

  /**
   * Get tracking by order ID
   * GET /api/tracking/order/{orderId}
   */
  getTrackingByOrder: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/tracking/order/${orderId}`)
      return unwrap(response)
    } catch (error) {
      // If no tracking found, return null instead of throwing
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  /**
   * Get live tracking data (real-time)
   * GET /api/tracking/live/{trackingId}
   */
  getLiveTracking: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/live/${trackingId}`)
    return unwrap(response)
  },

  /**
   * Get tracking timeline
   * GET /api/tracking/timeline/{trackingId}
   */
  getTimeline: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/timeline/${trackingId}`)
    return unwrap(response)
  },

  /**
   * Get all tracking sessions for current user (paginated)
   * GET /api/tracking/user?page=0&size=20
   */
  getUserTracking: async (params = {}) => {
    const response = await axiosInstance.get('/tracking/user', { params })
    return unwrap(response)
  },

  // ===== Driver-specific endpoints (from DriverTrackingController) =====
  // Base path: /api/driver/tracking

  /**
   * Update location for assigned tracking (driver)
   * POST /api/driver/tracking/location
   */
  updateLocationDriver: async (data) => {
    const response = await axiosInstance.post('/driver/tracking/location', data)
    return unwrap(response)
  },

  /**
   * Update tracking status (driver)
   * PUT /api/driver/tracking/status
   */
  updateStatusDriver: async (data) => {
    const response = await axiosInstance.put('/driver/tracking/status', data)
    return unwrap(response)
  },

  /**
   * Get assigned tracking sessions for current driver
   * GET /api/driver/tracking/assigned?page=0&size=20
   */
  getAssignedTracking: async (params = {}) => {
    const response = await axiosInstance.get('/driver/tracking/assigned', { params })
    return unwrap(response)
  },

  // ===== Order tracking (from OrderController) =====

  /**
   * Track order by order ID (from order endpoint)
   * GET /api/orders/{orderId}/track
   */
  trackOrder: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}/track`)
      return unwrap(response)
    } catch (error) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  // ===== Driver location (from DriverController) =====

  /**
   * Get driver location by driver ID
   * GET /api/drivers/{driverId}/location
   */
  getDriverLocation: async (driverId) => {
    try {
      const response = await axiosInstance.get(`/drivers/${driverId}/location`)
      return unwrap(response)
    } catch (error) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
  },

  // ===== Convenience methods =====

  /**
   * Get tracking history for an order
   * First gets tracking by order, then gets timeline
   */
  getTrackingHistory: async (orderId) => {
    try {
      const tracking = await trackingService.getTrackingByOrder(orderId)
      if (tracking && tracking.id) {
        const timeline = await trackingService.getTimeline(tracking.id)
        return timeline
      }
      return null
    } catch (error) {
      console.warn('Failed to get tracking history:', error)
      return null
    }
  },

  /**
   * Get estimated arrival for an order
   */
  getEstimatedArrival: async (orderId) => {
    try {
      const tracking = await trackingService.getTrackingByOrder(orderId)
      if (tracking && tracking.id) {
        const live = await trackingService.getLiveTracking(tracking.id)
        return live?.estimatedArrival || null
      }
      return null
    } catch (error) {
      console.warn('Failed to get estimated arrival:', error)
      return null
    }
  },
}

export default trackingService
