import React from 'react'
import { formatCurrency } from '@/shared/utils/formatters/currencyFormatter'
import { VEHICLE_TYPES_LABELS } from '../../../vehicles/constants'

export const DriverTable = ({
  drivers = [],
  showActions = false,
  onDelete = null,
  onToggleAvailability = null,
  onVerifyDriver = null, // ✅ New prop for verify action
}) => {
  // Debug: Log drivers data
  console.log('DriverTable received drivers:', drivers)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              License
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Vehicle
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Plate Number
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Verified
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Rating
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Total Deliveries
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Total Earnings
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Available Balance
            </th>
            {showActions && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div className="font-medium">{driver.name}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.email || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.phoneNumber}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.licenseNumber || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {VEHICLE_TYPES_LABELS[driver.vehicleType] || driver.vehicleType || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.vehiclePlateNumber || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    driver.available
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {driver.available ? 'Available' : 'Busy'}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    driver.verified
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {driver.verified ? 'Verified' : 'Unverified'}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  {driver.rating?.toFixed(1) || 'N/A'}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {driver.totalDeliveries || 0}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                {formatCurrency(driver.totalEarnings || 0)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatCurrency(driver.availableBalance || 0)}
              </td>
              {showActions && (
                <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                  {/* ✅ Verify button - only show if not verified */}
                  {!driver.verified && onVerifyDriver && (
                    <button
                      onClick={() => onVerifyDriver(driver.id)}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 text-xs font-medium rounded-md transition-colors"
                    >
                      Verify
                    </button>
                  )}
                  {/* Show badge if already verified */}
                  {driver.verified && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs font-medium rounded-md">
                      ✓ Verified
                    </span>
                  )}
                  <button
                    onClick={() => onToggleAvailability(driver.id, driver.available)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      driver.available
                        ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-300'
                        : 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300'
                    }`}
                  >
                    {driver.available ? 'Set Busy' : 'Set Available'}
                  </button>
                  <button
                    onClick={() => onDelete(driver.id)}
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300 text-xs font-medium rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
          {drivers.length === 0 && (
            <tr>
              <td
                colSpan={showActions ? 13 : 12}
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="text-lg font-medium">No drivers found</span>
                  <span className="text-sm text-gray-400">
                    Register a new driver to get started
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DriverTable
