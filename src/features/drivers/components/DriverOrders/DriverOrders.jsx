import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import { orderService } from '../../../orders/services/orderService'
import OrderList from '../../../orders/components/OrderList/OrderList'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'

const DriverOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getUserOrders({ driverId: user.id })
        setOrders(response.content || [])
      } catch (error) {
        console.error('Failed to load orders', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user.id])

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  if (orders.length === 0) return <EmptyState icon="📦" title="No orders assigned" />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <OrderList orders={orders} />
    </div>
  )
}

export default DriverOrders
