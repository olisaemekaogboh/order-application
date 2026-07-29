import { useEffect, useState, useMemo } from 'react'
import { useClient } from '../../../hooks/useClient'
import { orderService } from '../../../../orders/services/orderService'
import { paymentService } from '../../../../payments/services/paymentService'
import { notificationService } from '../../../../notifications/services/notificationService'
import { reviewService } from '../../../../reviews/services/reviewService'

export default function useDashboard() {
  const { profile, getProfile, addresses = [], getAddresses } = useClient()
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalPayments: 0,
    totalSpent: 0,
    savedAddresses: 0,
    unreadNotifications: 0,
    totalReviews: 0,
    averageRating: 0,
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [recentPayments, setRecentPayments] = useState([])
  const [monthlyOrders, setMonthlyOrders] = useState([])
  const [monthlySpending, setMonthlySpending] = useState([])
  const [deliveryStatus, setDeliveryStatus] = useState([])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // 1. Profile & addresses
      await getProfile()
      await getAddresses()

      // 2. Orders – with fallback
      let orders = []
      let totalOrders = 0
      try {
        const ordersResponse = await orderService.getUserOrders({ page: 0, size: 100 })
        orders = ordersResponse.content || []
        totalOrders = ordersResponse.total || 0
      } catch (err) {
        console.warn('Failed to fetch orders:', err)
      }

      // 3. Payments – with fallback
      let payments = []
      let totalPayments = 0
      try {
        const paymentsResponse = await paymentService.getUserPayments({ page: 0, size: 100 })
        payments = paymentsResponse.content || []
        totalPayments = paymentsResponse.total || 0
      } catch (err) {
        console.warn('Failed to fetch payments:', err)
      }

      // 4. Unread notifications – with fallback
      let unreadCount = 0
      try {
        unreadCount = (await notificationService.getUnreadCount()) || 0
      } catch (err) {
        console.warn('Failed to fetch notifications:', err)
      }

      // 5. Reviews – with fallback
      let totalReviews = 0
      try {
        const reviewsResponse = await reviewService.getMyReviews({ page: 0, size: 1 })
        totalReviews = reviewsResponse.total || 0
      } catch (err) {
        console.warn('Failed to fetch reviews:', err)
      }

      // 6. Compute stats
      const delivered = orders.filter((o) => o.status === 'DELIVERED').length
      const cancelled = orders.filter((o) => o.status === 'CANCELLED').length
      const active = orders.filter((o) => ['PROCESSING', 'IN_TRANSIT'].includes(o.status)).length

      // Total spent = sum of paid payments
      const totalSpent = payments
        .filter((p) => p.status === 'PAID')
        .reduce((sum, p) => sum + Number(p.amount || 0), 0)

      // 7. Monthly breakdown from orders
      const monthMap = {}
      const spendMap = {}
      orders.forEach((order) => {
        if (!order.orderDate) return
        const month = new Date(order.orderDate).toLocaleString('default', { month: 'short' })
        monthMap[month] = (monthMap[month] || 0) + 1
        spendMap[month] = (spendMap[month] || 0) + Number(order.totalPrice || 0)
      })
      const allMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      const monthlyOrdersData = allMonths.map((m) => ({ month: m, orders: monthMap[m] || 0 }))
      const monthlySpendingData = allMonths.map((m) => ({ month: m, amount: spendMap[m] || 0 }))

      // 8. Delivery status pie
      const statusData = [
        { name: 'Delivered', value: delivered },
        { name: 'Processing', value: active },
        { name: 'Pending', value: orders.filter((o) => o.status === 'PENDING').length },
        { name: 'Cancelled', value: cancelled },
      ]

      // 9. Recent orders & payments
      setRecentOrders(orders.slice(0, 5))
      setRecentPayments(payments.slice(0, 5))

      // 10. Set stats
      setStats({
        totalOrders,
        activeOrders: active,
        deliveredOrders: delivered,
        cancelledOrders: cancelled,
        totalPayments,
        totalSpent,
        savedAddresses: addresses.length,
        unreadNotifications: unreadCount,
        totalReviews,
        averageRating: 0,
      })

      setMonthlyOrders(monthlyOrdersData)
      setMonthlySpending(monthlySpendingData)
      setDeliveryStatus(statusData)
    } catch (error) {
      console.error('Dashboard data fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return {
    loading,
    profile,
    orders: recentOrders,
    payments: recentPayments,
    stats,
    monthlyOrders,
    monthlySpending,
    deliveryStatus,
  }
}
