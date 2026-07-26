import React from 'react'
import { formatCurrency } from '@/shared/utils/formatters/currencyFormatter'

export const DriverTable = ({ drivers = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Vehicle
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Rating
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Earnings
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.name}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.phoneNumber}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.vehicleType}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    driver.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {driver.available ? 'Available' : 'Busy'}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.rating?.toFixed(1) || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatCurrency(driver.totalEarnings || 0)}
              </td>
            </tr>
          ))}
          {drivers.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                No drivers
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DriverTable
