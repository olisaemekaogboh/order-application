import { useMemo } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../../auth/hooks/useAuth'
import useDashboard from './hooks/useDashboard'

import DashboardSkeleton from './DashboardSkeleton'

import StatCard from './components/StatCard'
import OrderTrendChart from './components/OrderTrendChart'
import DeliveryStatusChart from './components/DeliveryStatusChart'
import SpendingChart from './components/SpendingChart'
import RecentOrdersTable from './components/RecentOrdersTable'
import QuickActions from './components/QuickActions'

import { CLIENT_ROUTES } from '../../constants'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { loading, profile, orders, stats, monthlyOrders, monthlySpending, deliveryStatus } =
    useDashboard()

  const today = format(new Date(), 'EEEE, MMMM dd, yyyy')

  const statCards = useMemo(
    () => [
      {
        title: 'Total Orders',
        value: stats.totalOrders,
        subtitle: 'All shipments',
        color: 'blue',
      },
      {
        title: 'Active Orders',
        value: stats.activeOrders,
        subtitle: 'Currently processing',
        color: 'amber',
      },
      {
        title: 'Delivered',
        value: stats.deliveredOrders,
        subtitle: 'Completed deliveries',
        color: 'green',
      },
      {
        title: 'Total Spent',
        value: stats.totalSpent,
        subtitle: 'Lifetime spending',
        color: 'purple',
      },
      {
        title: 'Payments',
        value: stats.totalPayments,
        subtitle: 'Total transactions',
        color: 'indigo',
      },
      {
        title: 'Addresses',
        value: stats.savedAddresses,
        subtitle: 'Saved locations',
        color: 'slate',
      },
      {
        title: 'Notifications',
        value: stats.unreadNotifications,
        subtitle: 'Unread messages',
        color: 'red',
      },
      {
        title: 'Reviews',
        value: stats.totalReviews,
        subtitle: 'Reviews written',
        color: 'emerald',
      },
      {
        title: 'Cancelled',
        value: stats.cancelledOrders,
        subtitle: 'Cancelled orders',
        color: 'red',
      },
    ],
    [stats]
  )

  const actions = [
    {
      id: 'create',
      label: 'Create Order',
      description: 'Create a new shipment request.',
      onClick: () => navigate(CLIENT_ROUTES.CREATE_ORDER),
    },
    {
      id: 'orders',
      label: 'My Orders',
      description: 'Track and manage your shipments.',
      onClick: () => navigate(CLIENT_ROUTES.ORDERS),
    },
    {
      id: 'addresses',
      label: 'Addresses',
      description: 'Manage pickup and delivery addresses.',
      onClick: () => navigate(CLIENT_ROUTES.ADDRESSES),
    },
    {
      id: 'profile',
      label: 'Profile',
      description: 'Update your personal information.',
      onClick: () => navigate(CLIENT_ROUTES.PROFILE),
    },
    {
      id: 'reviews',
      label: 'My Reviews',
      description: 'View and manage your reviews.',
      onClick: () => navigate(CLIENT_ROUTES.REVIEWS),
    },
    {
      id: 'payments',
      label: 'Payments',
      description: 'View your payment history.',
      onClick: () => navigate(CLIENT_ROUTES.PAYMENTS),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'View your notifications.',
      onClick: () => navigate(CLIENT_ROUTES.NOTIFICATIONS),
    },
  ]

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, {profile?.firstName || user?.firstName || 'Client'}
          </h1>
          <p className="mt-2 text-slate-500">Here's what's happening with your logistics today.</p>
        </div>
        <div className="mt-4 lg:mt-0 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Today</p>
          <p className="font-semibold text-slate-900 dark:text-white">{today}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <OrderTrendChart data={monthlyOrders} loading={loading} />
        </div>
        <DeliveryStatusChart data={deliveryStatus} loading={loading} />
      </div>

      <SpendingChart data={monthlySpending} loading={loading} />

      <RecentOrdersTable orders={orders.slice(0, 5)} loading={loading} />

      <QuickActions actions={actions} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Total Spending</h3>
          <p className="mt-6 text-4xl font-bold text-blue-600">
            {new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
              maximumFractionDigits: 0,
            }).format(stats.totalSpent)}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Total amount paid across all completed and active shipments.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Success Rate</h3>
          <p className="mt-6 text-4xl font-bold text-emerald-600">
            {stats.totalOrders > 0
              ? Math.round((stats.deliveredOrders / stats.totalOrders) * 100)
              : 0}
            %
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Percentage of orders successfully delivered.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Unread Notifications
          </h3>
          <p className="mt-6 text-4xl font-bold text-violet-600">{stats.unreadNotifications}</p>
          <p className="mt-3 text-sm text-slate-500">Stay updated with the latest alerts.</p>
        </div>
      </div>
    </div>
  )
}
