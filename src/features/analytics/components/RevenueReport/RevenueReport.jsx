import React from 'react'
import { formatCurrency } from '@/shared/utils/formatters/currencyFormatter'

const RevenueReport = ({ report }) => {
  if (!report) {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No revenue data available.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Summary</h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Financial overview for the selected period.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {report.formattedTotalRevenue ?? formatCurrency(report.totalRevenue ?? 0)}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Average Daily Revenue</p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {formatCurrency(report.averageDailyRevenue ?? 0)}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>

          <p
            className={`mt-2 text-2xl font-bold ${
              (report.growthPercentage ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {(report.growthPercentage ?? 0).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>

          <p className="mt-2 text-2xl font-bold text-indigo-600">{report.currency ?? 'NGN'}</p>
        </div>
      </div>

      {report.revenueByPeriod?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Revenue by Period
          </h4>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Period</th>

                  <th className="px-4 py-3 text-right text-sm font-semibold">Revenue</th>
                </tr>
              </thead>

              <tbody>
                {report.revenueByPeriod.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3">{item.period}</td>

                    <td className="px-4 py-3 text-right font-semibold text-green-600">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default RevenueReport
