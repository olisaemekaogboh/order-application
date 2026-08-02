// features/orders/hooks/useOrders.js
import { useState, useCallback } from 'react'
import { orderService } from '../services/orderService'
import toast from 'react-hot-toast'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0,
  })

  // ----- User Orders (client) -----
  const fetchOrders = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await orderService.getUserOrders({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })

        // Handle different response structures
        const content = response.content || response.data?.content || []
        const pageNumber = response.pageNumber || response.page || response.data?.pageNumber || 0
        const pageSize = response.pageSize || response.size || response.data?.pageSize || 10
        const total = response.totalElements || response.total || response.data?.totalElements || 0
        const totalPages = response.totalPages || response.data?.totalPages || 0

        setOrders(content)
        setPagination({
          page: pageNumber,
          size: pageSize,
          total: total,
          totalPages: totalPages,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch orders'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ----- Admin: Fetch All Orders -----
  const fetchAllOrders = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await orderService.getAllOrders({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })

        console.log('Fetch all orders response:', response) // Debug log

        // Handle different response structures
        const content = response.content || response.data?.content || []
        const pageNumber = response.pageNumber || response.page || response.data?.pageNumber || 0
        const pageSize = response.pageSize || response.size || response.data?.pageSize || 10
        const total = response.totalElements || response.total || response.data?.totalElements || 0
        const totalPages = response.totalPages || response.data?.totalPages || 0

        console.log('Parsed pagination:', { pageNumber, pageSize, total, totalPages }) // Debug log

        setOrders(content)
        setPagination({
          page: pageNumber,
          size: pageSize,
          total: total,
          totalPages: totalPages,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch orders'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ----- Get Single Order -----
  const getOrder = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const order = await orderService.getOrderById(id)
      setCurrentOrder(order)
      return order
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch order'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Create Order -----
  const createOrder = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const order = await orderService.createOrder(data)
      toast.success('Order created successfully!')
      return order
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create order'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Get Recent Orders -----
  const getRecentOrders = useCallback(async (limit = 5) => {
    setLoading(true)
    setError(null)
    try {
      const data = await orderService.getRecentOrders(limit)
      setRecentOrders(data || [])
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch recent orders'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Order Counts -----
  const getOrderCount = useCallback(async () => {
    try {
      return await orderService.getOrderCount()
    } catch (err) {
      toast.error('Failed to fetch order count')
      throw err
    }
  }, [])

  const getActiveOrderCount = useCallback(async () => {
    try {
      return await orderService.getActiveOrderCount()
    } catch (err) {
      toast.error('Failed to fetch active order count')
      throw err
    }
  }, [])

  // ----- Assign Driver (Admin) -----
  const assignDriver = useCallback(
    async (orderId, driverId) => {
      setLoading(true)
      setError(null)
      try {
        await orderService.assignDriver(orderId, driverId)
        toast.success('Driver assigned successfully')
        await fetchAllOrders({ page: pagination.page, size: pagination.size })
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to assign driver'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchAllOrders, pagination.page, pagination.size]
  )

  // ----- Update Order Status -----
  const updateOrderStatus = useCallback(
    async (orderId, status) => {
      setLoading(true)
      setError(null)
      try {
        await orderService.updateOrderStatus(orderId, status)
        toast.success(`Order status updated to ${status}`)
        await fetchAllOrders({ page: pagination.page, size: pagination.size })
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update order status'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchAllOrders, pagination.page, pagination.size]
  )

  // ----- Cancel Order -----
  const cancelOrder = useCallback(
    async (orderId, reason) => {
      if (!window.confirm('Are you sure you want to cancel this order?')) return

      setLoading(true)
      setError(null)
      try {
        await orderService.cancelOrder(orderId, reason || 'Cancelled by admin')
        toast.success('Order cancelled successfully')
        await fetchAllOrders({ page: pagination.page, size: pagination.size })
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to cancel order'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [fetchAllOrders, pagination.page, pagination.size]
  )

  // ----- Pagination helpers -----
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ----- Reset -----
  const reset = useCallback(() => {
    setOrders([])
    setCurrentOrder(null)
    setRecentOrders([])
    setError(null)
    setPagination({ page: 0, size: 10, total: 0, totalPages: 0 })
  }, [])

  return {
    // State
    orders,
    currentOrder,
    recentOrders,
    loading,
    error,
    pagination,

    // Actions
    fetchOrders,
    fetchAllOrders,
    getOrder,
    createOrder,
    getRecentOrders,
    getOrderCount,
    getActiveOrderCount,
    assignDriver,
    updateOrderStatus,
    cancelOrder,
    changePage,
    changePageSize,
    reset,
  }
}
