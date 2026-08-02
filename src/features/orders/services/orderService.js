// features/orders/services/orderService.js
import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const orderService = {
  createOrder: async (orderData) => {
    const response = await axiosInstance.post('/orders', orderData)
    return response.data.data
  },

  getOrderById: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}`)
    return response.data.data
  },

  getUserOrders: async (params = {}) => {
    const response = await axiosInstance.get('/orders/my-orders', { params })
    return response.data.data
  },

  getAllOrders: async (params = {}) => {
    const response = await axiosInstance.get('/orders/all', { params })
    return response.data.data
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await axiosInstance.put(`/orders/${orderId}/status`, { status })
    return response.data.data
  },

  cancelOrder: async (orderId, reason) => {
    const response = await axiosInstance.put(`/orders/${orderId}/cancel`, {
      cancellationReason: reason,
    })
    return response.data.data
  },

  calculatePrice: async (data) => {
    const response = await axiosInstance.post('/orders/calculate-price', data)
    return response.data.data
  },

  trackOrder: async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}/track`)
    return response.data.data
  },

  assignDriver: async (orderId, driverId) => {
    const response = await axiosInstance.put(`/orders/${orderId}/assign-driver`, { driverId })
    return response.data.data
  },

  getOrderCount: async () => {
    const response = await axiosInstance.get('/orders/count')
    return response.data.data
  },

  getActiveOrderCount: async () => {
    const response = await axiosInstance.get('/orders/count-active')
    return response.data.data
  },

  getRecentOrders: async (limit = 5) => {
    const response = await axiosInstance.get('/orders/recent', { params: { limit } })
    return response.data.data
  },

  getOrderByNumber: async (orderNumber) => {
    const response = await axiosInstance.get(`/orders/number/${orderNumber}`)
    return response.data.data
  },

  updatePaymentStatus: async (orderId, paymentStatus) => {
    const response = await axiosInstance.put(`/orders/${orderId}/payment`, { paymentStatus })
    return response.data.data
  },

  updateTrackingInfo: async (orderId, trackingData) => {
    const response = await axiosInstance.put(`/orders/${orderId}/tracking`, trackingData)
    return response.data.data
  },
}

export default orderService
