import React, { useState, useEffect } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import { useOrders } from '../../../orders/hooks/useOrders'
import RevenueChart from '../../../analytics/components/RevenueChart/RevenueChart'
import RecentOrders from '@/shared/components/dashboard/widgets/RecentOrders/RecentOrders'
import QuickActions from '@/shared/components/dashboard/widgets/QuickActions/QuickActions'
import StatsCards from '@/shared/components/dashboard/widgets/StatsCards/StatsCards'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { useNavigate } from 'react-router-dom'
import { ADMIN_ROUTES } from '../../constants'
import toast from 'react-hot-toast'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { getDashboardStats, stats, loading } = useAdmin()
  const { getRecentOrders, recentOrders } = useOrders()

  useEffect(() => {
    getDashboardStats()
    getRecentOrders(5)
  }, [])

  const quickActions = [
    {
      id: 'view-orders',
      label: 'View All Orders',
      icon: '📋',
      onClick: () => navigate(ADMIN_ROUTES.ORDERS),
      color: 'bg-blue-500',
    },
    {
      id: 'manage-drivers',
      label: 'Manage Drivers',
      icon: '🚚',
      onClick: () => navigate(ADMIN_ROUTES.DRIVERS),
      color: 'bg-green-500',
    },
    {
      id: 'view-revenue',
      label: 'Revenue Analytics',
      icon: '💰',
      onClick: () => navigate(ADMIN_ROUTES.REVENUE),
      color: 'bg-purple-500',
    },
    {
      id: 'manage-pricing',
      label: 'Pricing Settings',
      icon: '⚙️',
      onClick: () => navigate(ADMIN_ROUTES.PRICING),
      color: 'bg-yellow-500',
    },
  ]

  if (loading) {
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
