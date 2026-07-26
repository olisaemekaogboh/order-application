import React from 'react'
import { formatCurrency } from '@/shared/utils/formatters/currencyFormatter'

const RevenueReport = ({ report }) => {
  if (!report) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">No data available</div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(report.totalRevenue)}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {report.totalOrders}
          </p>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Average Order Value</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatCurrency(report.averageOrderValue)}
          </p>
        </div>
      </div>
      {report.revenueByState && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 dark:text-white">Revenue by State</h4>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(report.revenueByState).map(([state, amount]) => (
              <div
                key={state}
                className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
              >
                <span>{state}</span>
                <span className="font-medium">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RevenueReport
