import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const reviewService = {
  // ----- CRUD -----
  createReview: async (data) => {
    const response = await axiosInstance.post('/reviews', data)
    return response.data.data
  },

  updateReview: async (reviewId, data) => {
    const response = await axiosInstance.put(`/reviews/${reviewId}`, data)
    return response.data.data
  },

  deleteReview: async (reviewId) => {
    const response = await axiosInstance.delete(`/reviews/${reviewId}`)
    return response.data.data
  },

  getReviewById: async (reviewId) => {
    const response = await axiosInstance.get(`/reviews/${reviewId}`)
    return response.data.data
  },

  // ----- Listing -----
  getReviewsByDriver: async (driverId, params = {}) => {
    const response = await axiosInstance.get(`/reviews/driver/${driverId}`, { params })
    return response.data.data
  },

  getMyReviews: async (params = {}) => {
    const response = await axiosInstance.get('/reviews/customer', { params })
    return response.data.data
  },

  getReviewsByOrder: async (orderId, params = {}) => {
    const response = await axiosInstance.get(`/reviews/order/${orderId}`, { params })
    return response.data.data
  },

  // ----- Moderation (admin) & Reporting -----
  reportReview: async (reviewId, data) => {
    const response = await axiosInstance.post(`/reviews/${reviewId}/report`, data)
    return response.data.data
  },
  // In src/features/reviews/services/reviewService.js
  getAllReviews: async (params = {}) => {
    const response = await axiosInstance.get('/reviews', { params })
    return response.data.data
  },
  moderateReview: async (reviewId, data) => {
    const response = await axiosInstance.put(`/reviews/${reviewId}/moderate`, data)
    return response.data.data
  },
}

export default reviewService
