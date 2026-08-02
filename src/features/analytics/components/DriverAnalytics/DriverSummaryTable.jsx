import React from 'react'
import { Truck, CheckCircle2, Clock3, Power, Package, Star, Activity, Gauge } from 'lucide-react'

const DriverSummaryTable = ({ analytics }) => {
  if (!analytics) return null

  const metrics = analytics.performanceMetrics ?? {}

  const rows = [
    {
      icon: Truck,
      label: 'Total Drivers',
      value: analytics.totalDrivers ?? 0,
    },
    {
      icon: CheckCircle2,
      label: 'Available Drivers',
      value: analytics.availableDrivers ?? 0,
    },
    {
      icon: Clock3,
      label: 'Busy Drivers',
      value: analytics.busyDrivers ?? 0,
    },
    {
      icon: Power,
      label: 'Offline Drivers',
      value: analytics.offlineDrivers ?? 0,
    },
    {
      icon: Package,
      label: 'Total Deliveries',
      value: analytics.totalDeliveries ?? 0,
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: Number(analytics.averageRating ?? 0).toFixed(1),
    },
    {
      icon: Activity,
      label: 'Availability Rate',
      value: `${Number(metrics.availabilityRate ?? 0).toFixed(1)}%`,
    },
    {
      icon: Gauge,
      label: 'Utilization Rate',
      value: `${Number(metrics.completionRate ?? 0).toFixed(1)}%`,
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Driver Performance Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Fleet statistics and operational metrics.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <tbody>
            {rows.map((row) => {
              const Icon = row.icon

              return (
                <tr
                  key={row.label}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-none"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Icon size={18} className="text-blue-600" />

                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {row.label}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right text-lg font-bold text-gray-900 dark:text-white">
                    {row.value}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DriverSummaryTable
