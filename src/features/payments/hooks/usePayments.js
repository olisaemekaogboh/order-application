// features/payments/hooks/usePayments.js
import { useState, useCallback } from 'react'
import { paymentService } from '../services/paymentService'
import { toast } from 'react-hot-toast'
import { PAYMENT_DEFAULTS } from '../constants'

export const usePayments = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [payments, setPayments] = useState([])
  const [currentPayment, setCurrentPayment] = useState(null)
  const [statistics, setStatistics] = useState(null)
  const [pagination, setPagination] = useState({
    page: PAYMENT_DEFAULTS.PAGE,
    size: PAYMENT_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Initialize Payment =====
  const initializePayment = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const result = await paymentService.initializePayment(data)
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to initialize payment'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Verify Payment =====
  const verifyPayment = useCallback(async (transactionReference, gatewayReference) => {
    setLoading(true)
    setError(null)
    try {
      const result = await paymentService.verifyPayment({
        transactionReference: transactionReference,
        gatewayReference: gatewayReference || transactionReference,
      })

      if (result.successful) {
        toast.success('Payment verified successfully!')
      } else {
        toast.error(result.message || 'Payment verification failed')
      }
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Payment verification failed'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Payment by Order =====
  const getPaymentByOrder = useCallback(async (orderId) => {
    setLoading(true)
    setError(null)
    try {
      const payment = await paymentService.getPaymentByOrder(orderId)
      setCurrentPayment(payment)
      return payment
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch payment'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Payment by Reference =====
  const getPaymentByReference = useCallback(async (reference) => {
    setLoading(true)
    setError(null)
    try {
      const payment = await paymentService.getPaymentByReference(reference)
      setCurrentPayment(payment)
      return payment
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch payment'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get User Payment History =====
  const getUserPayments = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await paymentService.getUserPayments({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setPayments(response.content || [])
        setPagination({
          page: response.pageNumber || response.page || 0,
          size: response.pageSize || response.size || PAYMENT_DEFAULTS.SIZE,
          total: response.totalElements || response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch payment history'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Get Payment Statistics (Admin only) =====
  const getPaymentStatistics = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const stats = await paymentService.getPaymentStatistics()
      setStatistics(stats)
      return stats
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch payment statistics'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Refund Payment =====
  const refundPayment = useCallback(
    async (data) => {
      setLoading(true)
      setError(null)
      try {
        const result = await paymentService.refundPayment(data)
        if (currentPayment?.id === data.paymentId) {
          setCurrentPayment(result)
        }
        toast.success('Payment refunded successfully')
        return result
      } catch (err) {
        const message = err.response?.data?.message || 'Refund failed'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentPayment]
  )

  // ===== Cancel Payment =====
  const cancelPayment = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const result = await paymentService.cancelPayment(data)
      toast.success('Payment cancelled successfully')
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to cancel payment'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Change Page =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Clear Current Payment =====
  const clearCurrentPayment = useCallback(() => {
    setCurrentPayment(null)
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setPayments([])
    setCurrentPayment(null)
    setStatistics(null)
    setError(null)
    setPagination({
      page: PAYMENT_DEFAULTS.PAGE,
      size: PAYMENT_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    error,
    payments,
    currentPayment,
    statistics,
    pagination,

    // Actions
    initializePayment,
    verifyPayment,
    getPaymentByOrder,
    getPaymentByReference,
    getUserPayments,
    getPaymentStatistics,
    refundPayment,
    cancelPayment,
    changePage,
    changePageSize,
    clearCurrentPayment,
    reset,
  }
}
