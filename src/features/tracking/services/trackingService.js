import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const trackingService = {
  trackOrder: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}/track`)
    return unwrap(response)
  },

  getTrackingHistory: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}/tracking-history`)
    return unwrap(response)
  },

  getDriverLocation: async (driverId) => {
    const response = await axiosInstance.get(`/drivers/${driverId}/location`)
    return unwrap(response)
  },

  getEstimatedArrival: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}/eta`)
    return unwrap(response)
  },

  subscribeTracking: async (orderId) => {
    const response = await axiosInstance.post(`/orders/${orderId}/subscribe`)
    return unwrap(response)
  },

  unsubscribeTracking: async (orderId) => {
    const response = await axiosInstance.delete(`/orders/${orderId}/subscribe`)
    return unwrap(response)
  },
}

export default trackingService
