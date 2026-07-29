import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'
import { useOrders } from '../../../orders/hooks/useOrders'
import RevenueChart from '../../../analytics/components/RevenueChart/RevenueChart'
import RecentOrders from '@/shared/components/dashboard/widgets/RecentOrders/RecentOrders'
import QuickActions from '@/shared/components/dashboard/widgets/QuickActions/QuickActions'
import StatsCards from '@/shared/components/dashboard/widgets/StatsCards/StatsCards'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { ADMIN_ROUTES } from '../../constants'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { getDashboardStats, stats, loading } = useAdmin()
  const { getRecentOrders, recentOrders, loading: ordersLoading } = useOrders()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDashboardStats()
        await getRecentOrders(5)
      } catch (error) {
        toast.error('Failed to load dashboard data')
      }
    }
    fetchData()
  }, [getDashboardStats, getRecentOrders])

  const quickActions = [
    {
      id: 'view-orders',
      label: 'View All Orders',
      onClick: () => navigate(ADMIN_ROUTES.ORDERS),
      color: 'bg-blue-500',
    },
    {
      id: 'manage-drivers',
      label: 'Manage Drivers',
      onClick: () => navigate(ADMIN_ROUTES.DRIVERS),
      color: 'bg-green-500',
    },
    {
      id: 'view-revenue',
      label: 'Revenue Analytics',
      onClick: () => navigate(ADMIN_ROUTES.REVENUE),
      color: 'bg-purple-500',
    },
    {
      id: 'manage-pricing',
      label: 'Pricing Settings',
      onClick: () => navigate(ADMIN_ROUTES.PRICING),
      color: 'bg-yellow-500',
    },
  ]

  if (loading || ordersLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Overview of your logistics platform</p>
      </div>

      {stats && <StatsCards stats={stats} />}

      <div className="mt-8">
        <QuickActions actions={quickActions} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Orders
          </h2>
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
