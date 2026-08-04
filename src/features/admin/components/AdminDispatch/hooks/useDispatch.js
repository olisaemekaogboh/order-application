// features/admin/dispatch/hooks/useDispatch.js
import { useState, useCallback } from 'react'
import { dispatchService } from '@/shared/services/dispatchService' // Changed import
import toast from 'react-hot-toast'

export const useDispatch = () => {
  const [loading, setLoading] = useState(false)
  const [dispatches, setDispatches] = useState([])
  const [currentDispatch, setCurrentDispatch] = useState(null)
  const [readyOrders, setReadyOrders] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0,
  })

  /**
   * Fetch all dispatches with pagination
   */
  const fetchDispatches = useCallback(
    async (params = {}) => {
      setLoading(true)
      try {
        const response = await dispatchService.getAllDispatches({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setDispatches(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 10,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (error) {
        console.error('Failed to fetch dispatches:', error)
        toast.error('Failed to load dispatches')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  /**
   * Fetch orders ready for dispatch
   * Note: You'll need to implement this in dispatchService or use orderService
   */
  const fetchReadyOrders = useCallback(async () => {
    setLoading(true)
    try {
      // You can add this method to dispatchService or use orderService
      const { orderService } = await import('@/features/orders/services/orderService')
      const orders = await orderService.getOrdersByStatus('PAYMENT_CONFIRMED')
      setReadyOrders(orders || [])
      return orders
    } catch (error) {
      console.error('Failed to fetch ready orders:', error)
      toast.error('Failed to load ready orders')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get dispatch by ID
   */
  const getDispatch = useCallback(async (id) => {
    setLoading(true)
    try {
      const dispatch = await dispatchService.getDispatchById(id)
      setCurrentDispatch(dispatch)
      return dispatch
    } catch (error) {
      console.error('Failed to fetch dispatch:', error)
      toast.error('Failed to load dispatch details')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Get dispatch by order ID
   */
  const getDispatchByOrder = useCallback(async (orderId) => {
    setLoading(true)
    try {
      const dispatch = await dispatchService.getDispatchByOrder(orderId)
      setCurrentDispatch(dispatch)
      return dispatch
    } catch (error) {
      if (error.response?.status === 404) {
        // No dispatch found - this is okay
        return null
      }
      console.error('Failed to fetch dispatch by order:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Create dispatch (auto mode)
   */
  const createDispatch = useCallback(async (data) => {
    setLoading(true)
    try {
      const result = await dispatchService.createDispatch(data)
      toast.success('Dispatch created successfully')
      return result
    } catch (error) {
      console.error('Failed to create dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to create dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Manual assign dispatch (admin action)
   * Assigns both driver and vehicle
   */
  const manualAssign = useCallback(async (data) => {
    setLoading(true)
    try {
      // First assign driver
      await dispatchService.assignDriver(data.dispatchId, data.driverId)
      // Then assign vehicle
      await dispatchService.assignVehicle(data.dispatchId, data.vehicleId)

      toast.success('Dispatch assigned successfully!')
      return { success: true }
    } catch (error) {
      console.error('Failed to assign dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to assign dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Accept dispatch (driver action)
   */
  const acceptDispatch = useCallback(async (dispatchId) => {
    setLoading(true)
    try {
      const result = await dispatchService.acceptDispatch(dispatchId)
      toast.success('Dispatch accepted!')
      return result
    } catch (error) {
      console.error('Failed to accept dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to accept dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Reject dispatch (driver action)
   */
  const rejectDispatch = useCallback(async (dispatchId, reason) => {
    setLoading(true)
    try {
      const result = await dispatchService.rejectDispatch(dispatchId, reason)
      toast.info('Dispatch rejected')
      return result
    } catch (error) {
      console.error('Failed to reject dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to reject dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Complete dispatch
   */
  const completeDispatch = useCallback(async (dispatchId) => {
    setLoading(true)
    try {
      const result = await dispatchService.completeDispatch(dispatchId)
      toast.success('Dispatch completed!')
      return result
    } catch (error) {
      console.error('Failed to complete dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to complete dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Cancel dispatch
   */
  const cancelDispatch = useCallback(async (dispatchId, reason) => {
    setLoading(true)
    try {
      const result = await dispatchService.cancelDispatch(dispatchId, reason)
      toast.info('Dispatch cancelled')
      return result
    } catch (error) {
      console.error('Failed to cancel dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to cancel dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Reassign dispatch
   */
  const reassignDispatch = useCallback(async (dispatchId) => {
    setLoading(true)
    try {
      const result = await dispatchService.reassignDispatch(dispatchId)
      toast.info('Dispatch reassigned')
      return result
    } catch (error) {
      console.error('Failed to reassign dispatch:', error)
      toast.error(error.response?.data?.message || 'Failed to reassign dispatch')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Fetch analytics
   */
  const fetchAnalytics = useCallback(async () => {
    setLoading(true)
    try {
      const data = await dispatchService.getDispatchAnalytics()
      setAnalytics(data)
      return data
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      toast.error('Failed to load analytics')
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Change page
   */
  const changePage = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }, [])

  return {
    // State
    loading,
    dispatches,
    currentDispatch,
    readyOrders,
    analytics,
    pagination,

    // Actions
    fetchDispatches,
    fetchReadyOrders,
    getDispatch,
    getDispatchByOrder,
    createDispatch,
    manualAssign,
    acceptDispatch,
    rejectDispatch,
    completeDispatch,
    cancelDispatch,
    reassignDispatch,
    fetchAnalytics,
    changePage,
  }
}

export default useDispatch
