import { useState, useCallback } from 'react'
import { orderService } from '../services/orderService'
import { toast } from 'react-hot-toast'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)
  const [recentOrders, setRecentOrders] = useState([]) // new state for recent orders
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 })

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
    } finally {
      setLoading(false)
    }
  }, [])

  const getOrder = useCallback(async (id) => {
    setLoading(true)
    try {
      const order = await orderService.getOrderById(id)
      setCurrentOrder(order)
      return order
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch order')
    } finally {
      setLoading(false)
    }
  }, [])

  const createOrder = useCallback(async (data) => {
    setLoading(true)
    try {
      const order = await orderService.createOrder(data)
      toast.success('Order created!')
      return order
    } catch (err) {
      setError(err.message)
      toast.error('Failed to create order')
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== New: Get Recent Orders =====
  const getRecentOrders = useCallback(async (limit = 5) => {
    setLoading(true)
    try {
      const data = await orderService.getRecentOrders(limit)
      setRecentOrders(data || [])
      return data
    } catch (err) {
      setError(err.message)
      toast.error('Failed to fetch recent orders')
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Optional: Order Counts =====
  const getOrderCount = useCallback(async () => {
    try {
      return await orderService.getOrderCount()
    } catch (err) {
      toast.error('Failed to fetch order count')
    }
  }, [])

  const getActiveOrderCount = useCallback(async () => {
    try {
      return await orderService.getActiveOrderCount()
    } catch (err) {
      toast.error('Failed to fetch active order count')
    }
  }, [])

  return {
    orders,
    currentOrder,
    recentOrders, // exposed for components
    loading,
    error,
    pagination,
    fetchOrders,
    getOrder,
    createOrder,
    getRecentOrders, // exposed
    getOrderCount,
    getActiveOrderCount,
  }
}
