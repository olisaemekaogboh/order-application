import React, { useState, useEffect } from 'react'
import { useClient } from '../../hooks/useClient'
import { useAuth } from '../../../auth/hooks/useAuth'
import { useOrders } from '../../../orders/hooks/useOrders'
import StatsCards from '@/shared/components/dashboard/widgets/StatsCards/StatsCards'
import RecentOrders from '@/shared/components/dashboard/widgets/RecentOrders/RecentOrders'
import QuickActions from '@/shared/components/dashboard/widgets/QuickActions/QuickActions'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { useNavigate } from 'react-router-dom'
import { CLIENT_ROUTES } from '../../constants'

const ClientDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { getProfile, profile, loading } = useClient()
  const { recentOrders, getRecentOrders, loading: ordersLoading } = useOrders()

  useEffect(() => {
    getProfile()
    getRecentOrders(5)
  }, [])

  const quickActions = [
    {
      id: 'create-order',
      label: 'Create Order',
      icon: '📦',
      onClick: () => navigate(CLIENT_ROUTES.CREATE_ORDER),
      color: 'bg-blue-500',
    },
    {
      id: 'track-orders',
      label: 'Track Orders',
      icon: '📍',
      onClick: () => navigate(CLIENT_ROUTES.ORDERS),
      color: 'bg-green-500',
    },
    {
      id: 'manage-addresses',
      label: 'Manage Addresses',
      icon: '🏠',
      onClick: () => navigate(CLIENT_ROUTES.ADDRESSES),
      color: 'bg-purple-500',
    },
    {
      id: 'view-profile',
      label: 'View Profile',
      icon: '👤',
      onClick: () => navigate(CLIENT_ROUTES.PROFILE),
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

  const stats = {
    totalOrders: 25,
    activeOrders: 3,
    deliveredOrders: 20,
    totalSpent: 45000,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.firstName || 'User'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Here's an overview of your logistics activities
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="mt-8">
        <QuickActions actions={quickActions} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        {ordersLoading ? (
          <div className="flex justify-center py-4">
            <Spinner size="sm" />
          </div>
        ) : (
          <RecentOrders orders={recentOrders || []} />
        )}
      </div>
    </div>
  )
}

export default ClientDashboard
