import { useState, useCallback } from 'react'
import { reviewService } from '../services/reviewService'
import { toast } from 'react-hot-toast'

export const useReviews = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [currentReview, setCurrentReview] = useState(null)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 })

  // ----- Fetch my reviews -----
  const fetchMyReviews = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await reviewService.getMyReviews({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setReviews(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 10,
          total: response.total || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch reviews'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ----- Fetch reviews by driver -----
  const fetchReviewsByDriver = useCallback(async (driverId, params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await reviewService.getReviewsByDriver(driverId, params)
      setReviews(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
      })
      return response
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch driver reviews'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Get single review -----
  const getReview = useCallback(async (reviewId) => {
    setLoading(true)
    setError(null)
    try {
      const review = await reviewService.getReviewById(reviewId)
      setCurrentReview(review)
      return review
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch review'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Create review -----
  const createReview = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const newReview = await reviewService.createReview(data)
      toast.success('Review submitted successfully')
      return newReview
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to submit review'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Update review -----
  const updateReview = useCallback(async (reviewId, data) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await reviewService.updateReview(reviewId, data)
      setCurrentReview(updated)
      toast.success('Review updated successfully')
      return updated
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update review'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Delete review -----
  const deleteReview = useCallback(async (reviewId) => {
    setLoading(true)
    setError(null)
    try {
      await reviewService.deleteReview(reviewId)
      setReviews((prev) => prev.filter((r) => r.id !== reviewId))
      toast.success('Review deleted')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete review'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Report review -----
  const reportReview = useCallback(async (reviewId, data) => {
    setLoading(true)
    setError(null)
    try {
      const result = await reviewService.reportReview(reviewId, data)
      toast.success('Review reported successfully')
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to report review'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Pagination helpers -----
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  return {
    loading,
    error,
    reviews,
    currentReview,
    pagination,
    fetchMyReviews,
    fetchReviewsByDriver,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    reportReview,
    changePage,
    changePageSize,
  }
}
