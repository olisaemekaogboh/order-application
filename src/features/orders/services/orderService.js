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
    const response = await axiosInstance.put(`/orders/${orderId}/cancel`, null, {
      params: { reason },
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
    return response.data
  },

  getOrderCount: async () => {
    const response = await axiosInstance.get('/orders/my-orders/count')
    return response.data.data
  },

  getActiveOrderCount: async () => {
    const response = await axiosInstance.get('/orders/my-orders/active-count')
    return response.data.data
  },

  getRecentOrders: async (limit = 5) => {
    const response = await axiosInstance.get(`/orders/my-orders/recent?limit=${limit}`)
    return response.data.data
  },
}
