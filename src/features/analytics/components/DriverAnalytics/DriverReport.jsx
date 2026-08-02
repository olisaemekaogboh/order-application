import React from 'react'
import { Truck, CheckCircle2, Clock3, Power, Star, Package, Activity, Gauge } from 'lucide-react'

const DriverReport = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No driver analytics available.</p>
      </div>
    )
  }

  const metrics = analytics.performanceMetrics ?? {}

  const cards = [
    {
      title: 'Total Drivers',
      value: analytics.totalDrivers ?? 0,
      icon: Truck,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Available',
      value: analytics.availableDrivers ?? 0,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Busy',
      value: analytics.busyDrivers ?? 0,
      icon: Clock3,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      title: 'Offline',
      value: analytics.offlineDrivers ?? 0,
      icon: Power,
      color: 'text-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      title: 'Average Rating',
      value: Number(analytics.averageRating ?? 0).toFixed(1),
      icon: Star,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      title: 'Deliveries',
      value: analytics.totalDeliveries ?? 0,
      icon: Package,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Availability',
      value: `${Number(metrics.availabilityRate ?? 0).toFixed(1)}%`,
      icon: Activity,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
    {
      title: 'Utilization',
      value: `${Number(metrics.completionRate ?? 0).toFixed(1)}%`,
      icon: Gauge,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className="rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-5 transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
              </div>

              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${card.bg}`}>
                <Icon className={card.color} size={24} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DriverReport
