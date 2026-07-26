import React, { useState } from 'react'
import { OrderContext } from './OrderContext'
import { orderService } from '../../../features/orders/services/orderService'

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 })

  const createOrder = async (data) => {
    setLoading(true)
    try {
      const order = await orderService.createOrder(data)
      setCurrentOrder(order)
      return order
    } finally {
      setLoading(false)
    }
  }

  const getOrderById = async (id) => {
    setLoading(true)
    try {
      const order = await orderService.getOrderById(id)
      setCurrentOrder(order)
      return order
    } finally {
      setLoading(false)
    }
  }

  const getUserOrders = async (params = {}) => {
    setLoading(true)
    try {
      const response = await orderService.getUserOrders(params)
      setOrders(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.totalElements || 0,
      })
      return response
    } finally {
      setLoading(false)
    }
  }

  const cancelOrder = async (id, reason) => {
    setLoading(true)
    try {
      const order = await orderService.cancelOrder(id, reason)
      setCurrentOrder(order)
      return order
    } finally {
      setLoading(false)
    }
  }

  const clearCurrentOrder = () => {
    setCurrentOrder(null)
  }

  const value = {
    currentOrder,
    orders,
    loading,
    pagination,
    createOrder,
    getOrderById,
    getUserOrders,
    cancelOrder,
    clearCurrentOrder,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export default OrderProvider
