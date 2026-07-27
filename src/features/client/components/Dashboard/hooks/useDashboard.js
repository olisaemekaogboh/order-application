import { useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { useClient } from '../../../hooks/useClient'
import { useOrders } from '../../../../orders/hooks/useOrders'

export default function useDashboard() {
  const { profile, getProfile, addresses = [], getAddresses } = useClient()

  const { orders = [], fetchOrders, loading } = useOrders()

  useEffect(() => {
    getProfile()
    getAddresses()
    fetchOrders()
  }, [getProfile, getAddresses, fetchOrders])

  const stats = useMemo(() => {
    const delivered = orders.filter((o) => o.status === 'DELIVERED')

    const active = orders.filter((o) => ['PROCESSING', 'IN_TRANSIT'].includes(o.status))

    const pending = orders.filter((o) => o.status === 'PENDING')

    const cancelled = orders.filter((o) => o.status === 'CANCELLED')

    const totalSpent = orders.reduce((sum, order) => sum + Number(order.totalPrice || 0), 0)

    return {
      totalOrders: orders.length,
      activeOrders: active.length,
      pendingOrders: pending.length,
      deliveredOrders: delivered.length,
      cancelledOrders: cancelled.length,
      totalSpent,
      savedAddresses: addresses.length,
    }
  }, [orders, addresses])

  const monthlyOrders = useMemo(() => {
    const monthMap = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    }

    orders.forEach((order) => {
      if (!order.orderDate) return

      const month = format(new Date(order.orderDate), 'MMM')

      monthMap[month] += 1
    })

    return Object.entries(monthMap).map(([month, count]) => ({
      month,
      orders: count,
    }))
  }, [orders])

  const monthlySpending = useMemo(() => {
    const monthMap = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    }

    orders.forEach((order) => {
      if (!order.orderDate) return

      const month = format(new Date(order.orderDate), 'MMM')

      monthMap[month] += Number(order.totalPrice || 0)
    })

    return Object.entries(monthMap).map(([month, amount]) => ({
      month,
      amount,
    }))
  }, [orders])

  const deliveryStatus = useMemo(
    () => [
      {
        name: 'Delivered',
        value: stats.deliveredOrders,
      },
      {
        name: 'Processing',
        value: stats.activeOrders,
      },
      {
        name: 'Pending',
        value: stats.pendingOrders,
      },
      {
        name: 'Cancelled',
        value: stats.cancelledOrders,
      },
    ],
    [stats]
  )

  return {
    loading,
    profile,
    orders,
    stats,
    monthlyOrders,
    monthlySpending,
    deliveryStatus,
  }
}
