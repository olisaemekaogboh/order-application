// features/tracking/services/trackingService.js

import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const trackingService = {
  /*
   * ===========================
   * Tracking Session
   * ===========================
   */

  startTracking: async (payload) => {
    const response = await axiosInstance.post('/tracking/start', payload)
    return unwrap(response)
  },

  completeTracking: async (payload) => {
    const response = await axiosInstance.post('/tracking/complete', payload)
    return unwrap(response)
  },

  cancelTracking: async (payload) => {
    const response = await axiosInstance.post('/tracking/cancel', payload)
    return unwrap(response)
  },

  /*
   * ===========================
   * Status
   * ===========================
   */

  updateStatus: async ({
    trackingId,
    status,
    description = '',
    latitude = null,
    longitude = null,
  }) => {
    const response = await axiosInstance.put('/tracking/status', {
      trackingId,
      status,
      description,
      latitude,
      longitude,
    })

    return unwrap(response)
  },

  /*
   * ===========================
   * Location
   * ===========================
   */

  updateLocation: async (trackingId, latitude, longitude, accuracy = null) => {
    const response = await axiosInstance.post('/tracking/location', {
      trackingId,
      latitude,
      longitude,
      accuracy,
    })

    return unwrap(response)
  },

  /*
   * ===========================
   * Queries
   * ===========================
   */

  getTrackingById: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/${trackingId}`)
    return unwrap(response)
  },

  getTrackingByOrder: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/tracking/order/${orderId}`)
      return unwrap(response)
    } catch (error) {
      if (error.response?.status === 404) {
        return null
      }

      throw error
    }
  },

  getLiveTracking: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/live/${trackingId}`)
    return unwrap(response)
  },

  getTimeline: async (trackingId) => {
    const response = await axiosInstance.get(`/tracking/timeline/${trackingId}`)
    return unwrap(response)
  },

  /*
   * ===========================
   * Driver
   * ===========================
   */

  getAssignedTracking: async (params = {}) => {
    const response = await axiosInstance.get('/driver/tracking/assigned', { params })

    return unwrap(response)
  },

  updateDriverLocation: async (payload) => {
    const response = await axiosInstance.post('/driver/tracking/location', payload)

    return unwrap(response)
  },

  updateDriverStatus: async (payload) => {
    const response = await axiosInstance.put('/driver/tracking/status', payload)

    return unwrap(response)
  },
}

export default trackingService
