import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { adminService } from '../../services/adminService'
import { useOrders } from '../../../orders/hooks/useOrders'

import RevenueChart from '../../../analytics/components/RevenueChart/RevenueChart'
import OrderStatusChart from '../../../analytics/components/OrderStatusChart/OrderStatusChart'
import DriverPerformanceChart from '../../../analytics/components/DriverAnalytics/DriverPerformanceChart'
import ReviewChart from '../../../analytics/components/ReviewChart/ReviewChart'

import RecentOrders from '@/shared/components/dashboard/widgets/RecentOrders/RecentOrders'
import QuickActions from '@/shared/components/dashboard/widgets/QuickActions/QuickActions'
import StatsCards from '@/shared/components/dashboard/widgets/StatsCards/StatsCards'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

import { ADMIN_ROUTES } from '../../constants'

import {
  Package,
  Truck,
  Users,
  DollarSign,
  BarChart3,
  MapPinned,
  Bell,
  Settings,
  FileText,
  Star,
  CreditCard,
  Car,
  Route,
  Boxes,
} from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [revenueAnalytics, setRevenueAnalytics] = useState(null)
  const [orderAnalytics, setOrderAnalytics] = useState(null)
  const [driverAnalytics, setDriverAnalytics] = useState(null)
  const [reviewAnalytics, setReviewAnalytics] = useState(null)

  const { getRecentOrders, recentOrders, loading: ordersLoading } = useOrders()

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true)

      const today = new Date()
      const start = new Date()
      start.setDate(today.getDate() - 30)

      const request = {
        startDate: start.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      }

      const [dashboard, revenue, orders, drivers, reviews] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRevenueAnalytics(request),
        adminService.getOrderAnalytics(request),
        adminService.getDriverAnalytics(request),
        adminService.getReviewAnalytics(),
      ])

      setStats(dashboard)
      setRevenueAnalytics(revenue)
      setOrderAnalytics(orders)
      setDriverAnalytics(drivers)
      setReviewAnalytics(reviews)

      await getRecentOrders(5)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [getRecentOrders])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const quickActions = [
    {
      id: 'orders',
      label: 'Orders',
      icon: <Package size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.ORDERS),
      color: 'bg-blue-600',
    },
    {
      id: 'driverAnalytics',
      label: 'Driver Analytics',
      icon: <Truck size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.DRIVER_ANALYTICS),
      color: 'bg-green-600',
    },
    {
      id: 'fleet',
      label: 'Fleet',
      icon: <Boxes size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.FLEET),
      color: 'bg-cyan-600',
    },
    {
      id: 'vehicles',
      label: 'Vehicles',
      icon: <Car size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.VEHICLES),
      color: 'bg-indigo-600',
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <Users size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.CUSTOMERS),
      color: 'bg-pink-600',
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <CreditCard size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.PAYMENTS),
      color: 'bg-emerald-600',
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: <DollarSign size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.REVENUE),
      color: 'bg-purple-600',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.ANALYTICS),
      color: 'bg-violet-600',
    },
    {
      id: 'tracking',
      label: 'Tracking',
      icon: <MapPinned size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.TRACKING),
      color: 'bg-orange-600',
    },
    {
      id: 'dispatch',
      label: 'Dispatch',
      icon: <Route size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.DISPATCH),
      color: 'bg-red-600',
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: <Star size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.REVIEWS),
      color: 'bg-yellow-500',
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <FileText size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.REPORTS),
      color: 'bg-gray-700',
    },
    {
      id: 'pricing',
      label: 'Pricing',
      icon: <Settings size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.PRICING),
      color: 'bg-amber-600',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell size={30} />,
      onClick: () => navigate(ADMIN_ROUTES.NOTIFICATIONS),
      color: 'bg-teal-600',
    },
  ]

  if (loading || ordersLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Logistics Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor orders, revenue, drivers and customer reviews.
          </p>
        </div>
        <button
          onClick={fetchDashboard}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          Refresh Dashboard
        </button>
      </div>

      {/* Global KPI Cards */}
      <StatsCards
        stats={stats}
        revenue={revenueAnalytics}
        drivers={driverAnalytics}
        reviews={reviewAnalytics}
      />

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Analytics Widgets - 2×2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChart analytics={revenueAnalytics} />
        <OrderStatusChart analytics={orderAnalytics} />
        <DriverPerformanceChart analytics={driverAnalytics} />
        <ReviewChart analytics={reviewAnalytics} />
      </div>

      {/* Recent Orders - only once */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  )
}

export default AdminDashboard
