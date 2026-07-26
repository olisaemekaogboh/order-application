import React from 'react'

const StatsCards = ({ stats }) => {
  const cards = [
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: '📦',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      label: 'Active Orders',
      value: stats?.activeOrders || 0,
      icon: '🔄',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      label: 'Delivered',
      value: stats?.deliveredOrders || 0,
      icon: '✅',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    },
    {
      label: 'Total Revenue',
      value: `₦${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: '💰',
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
          </div>
          <div className={`${card.color} p-3 rounded-full text-2xl`}>{card.icon}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
