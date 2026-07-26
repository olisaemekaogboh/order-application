import React, { useState, useEffect } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import RevenueChart from '@/features/analytics/components/RevenueChart/RevenueChart'
import StatsCards from '@/shared/components/dashboard/widgets/StatsCards/StatsCards'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'

const SuperAdminDashboard = () => {
  const { getSuperDashboardStats, stats, loading } = useAdmin()

  useEffect(() => {
    getSuperDashboardStats()
  }, [])

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Full system overview</p>
      </div>

      {stats && <StatsCards stats={stats} />}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart />
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Revenue</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                ₦{stats?.totalRevenue?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Orders</span>
              <span className="font-bold">{stats?.totalOrders || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Users</span>
              <span className="font-bold">{stats?.totalUsers || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Active Drivers</span>
              <span className="font-bold">{stats?.availableDrivers || 0}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SuperAdminDashboard
