import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const reviewService = {
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

  getAllReviews: async (params = {}) => {
    const cleanParams = {}

    if (params.page !== undefined) cleanParams.page = params.page
    if (params.size !== undefined) cleanParams.size = params.size
    if (params.sortBy) cleanParams.sortBy = params.sortBy
    if (params.sortDirection) cleanParams.sortDirection = params.sortDirection

    const validStatuses = ['ACTIVE', 'EDITED', 'DELETED', 'HIDDEN']
    if (params.status && validStatuses.includes(params.status)) {
      cleanParams.status = params.status
    }

    const validModerationStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'FLAGGED']
    if (params.moderationStatus && validModerationStatuses.includes(params.moderationStatus)) {
      cleanParams.moderationStatus = params.moderationStatus
    }

    try {
      const response = await axiosInstance.get('/reviews', { params: cleanParams })
      let data = response.data
      if (data.data) {
        return data.data
      }
      return data
    } catch (error) {
      console.error('Error in getAllReviews:', error)
      throw error
    }
  },

  moderateReview: async (reviewId, data) => {
    const response = await axiosInstance.put(`/reviews/${reviewId}/moderate`, data)
    return response.data.data
  },

  reportReview: async (reviewId, data) => {
    const response = await axiosInstance.post(`/reviews/${reviewId}/report`, data)
    return response.data.data
  },
}

export default reviewService
