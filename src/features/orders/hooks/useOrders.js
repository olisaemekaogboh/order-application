import { useState, useCallback } from 'react'
import { orderService } from '../services/orderService'
import { toast } from 'react-hot-toast'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 })

  // ----- User Orders (client) -----
  const fetchOrders = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const response = await orderService.getUserOrders(params)
      setOrders(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
      })
      return response
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch orders')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Admin: Fetch All Orders -----
  const fetchAllOrders = useCallback(
    async (params = {}) => {
      setLoading(true)
      try {
        const response = await orderService.getAllOrders({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setOrders(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 10,
          total: response.total || 0,
        })
        return response
      } catch (err) {
        setError(err.message)
        toast.error('Failed to fetch orders')
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
    try {
      const order = await orderService.getOrderById(id)
      setCurrentOrder(order)
      return order
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch order')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Create Order -----
  const createOrder = useCallback(async (data) => {
    setLoading(true)
    try {
      const order = await orderService.createOrder(data)
      toast.success('Order created!')
      return order
    } catch (err) {
      setError(err.message)
      toast.error('Failed to create order')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ----- Get Recent Orders -----
  const getRecentOrders = useCallback(async (limit = 5) => {
    setLoading(true)
    try {
      const data = await orderService.getRecentOrders(limit)
      setRecentOrders(data || [])
      return data
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch recent orders')
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
      try {
        await orderService.assignDriver(orderId, driverId)
        // Refresh the list after assignment
        await fetchAllOrders({ page: pagination.page, size: pagination.size })
        toast.success('Driver assigned successfully')
      } catch (err) {
        setError(err.message)
        toast.error('Failed to assign driver')
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
    setPagination({ page: 0, size: 10, total: 0 })
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
    changePage,
    changePageSize,
    reset,
  }
}
