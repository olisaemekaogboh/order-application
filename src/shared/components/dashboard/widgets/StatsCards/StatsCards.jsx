import React from 'react'

const StatsCards = ({ stats, revenue, drivers, reviews }) => {
  const cards = [
    {
      label: 'Total Orders',
      value: stats?.totalOrders ?? 0,
      border: 'border-blue-500',
    },
    {
      label: 'Pending Orders',
      value: stats?.pendingOrders ?? 0,
      border: 'border-yellow-500',
    },
    {
      label: 'Delivered Orders',
      value: stats?.deliveredOrders ?? 0,
      border: 'border-green-500',
    },
    {
      label: 'Total Revenue',
      value: revenue?.formattedTotalRevenue ?? `₦${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      border: 'border-purple-500',
    },
    {
      label: 'Total Drivers',
      value: drivers?.totalDrivers ?? 0,
      border: 'border-indigo-500',
    },
    {
      label: 'Available Drivers',
      value: drivers?.availableDrivers ?? 0,
      border: 'border-emerald-500',
    },
    {
      label: 'Total Reviews',
      value: reviews?.totalReviews ?? 0,
      border: 'border-pink-500',
    },
    {
      label: 'Average Rating',
      value: reviews?.averageRating != null ? reviews.averageRating.toFixed(1) : '0.0',
      border: 'border-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border-l-4 ${card.border} p-6 transition-shadow hover:shadow-lg`}
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.label}</p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{card.value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
