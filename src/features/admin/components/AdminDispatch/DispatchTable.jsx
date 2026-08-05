import React from 'react'
import Button from '@/shared/components/ui/Button/Button'
import { formatDate } from '@/shared/utils/formatters/dateFormatter'

const STATUS_LABELS = {
  PENDING: 'Pending',
  WAITING_DRIVER_ACCEPTANCE: 'Waiting Driver',
  DRIVER_ACCEPTED: 'Driver Accepted',
  EN_ROUTE_PICKUP: 'En Route Pickup',
  PICKUP_COMPLETED: 'Pickup Completed',
  DELIVERY_IN_PROGRESS: 'Delivery In Progress',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
}

const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  WAITING_DRIVER_ACCEPTANCE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  DRIVER_ACCEPTED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  EN_ROUTE_PICKUP: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  PICKUP_COMPLETED: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  DELIVERY_IN_PROGRESS: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  FAILED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
}

const PRIORITY_LABELS = {
  0: 'Normal',
  1: 'High',
  2: 'Urgent',
}

const PRIORITY_COLORS = {
  0: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  1: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  2: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const DispatchTable = ({ orders = [], dispatches = [], type = 'ready', onAssign }) => {
  const items = type === 'ready' ? orders : dispatches

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Order</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Route</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Status</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Driver</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Vehicle</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Priority</th>

            <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Created</th>

            {type === 'ready' && (
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Action</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => {
            const priority = item.priority ?? 0

            return (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                {/* Order */}
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {item.orderNumber}
                  </div>
                </td>

                {/* Route */}
                <td className="px-4 py-3">
                  {type === 'ready' ? (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <div>{item.pickupLocation}</div>

                      <div className="text-xs text-gray-400">↓</div>

                      <div>{item.deliveryLocation}</div>
                    </div>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      STATUS_COLORS[item.status] ?? STATUS_COLORS.PENDING
                    }`}
                  >
                    {STATUS_LABELS[item.status] ?? item.status}
                  </span>
                </td>

                {/* Driver */}
                <td className="px-4 py-3 text-sm">
                  {item.driverName ? (
                    <span className="text-gray-900 dark:text-white">{item.driverName}</span>
                  ) : (
                    <span className="text-gray-400">Not Assigned</span>
                  )}
                </td>

                {/* Vehicle */}
                <td className="px-4 py-3 text-sm">
                  {item.vehicleNumber ? (
                    <span className="text-gray-900 dark:text-white">{item.vehicleNumber}</span>
                  ) : (
                    <span className="text-gray-400">Not Assigned</span>
                  )}
                </td>

                {/* Priority */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      PRIORITY_COLORS[priority]
                    }`}
                  >
                    {PRIORITY_LABELS[priority]}
                  </span>
                </td>

                {/* Created */}
                <td className="px-4 py-3 text-sm text-gray-500">
                  {item.createdAt ? formatDate(item.createdAt) : '--'}
                </td>

                {/* Action */}
                {type === 'ready' && (
                  <td className="px-4 py-3">
                    <Button size="sm" variant="primary" onClick={() => onAssign(item)}>
                      Assign
                    </Button>
                  </td>
                )}
              </tr>
            )
          })}

          {items.length === 0 && (
            <tr>
              <td
                colSpan={type === 'ready' ? 8 : 7}
                className="py-10 text-center text-gray-500 dark:text-gray-400"
              >
                No {type === 'ready' ? 'orders ready for dispatch' : 'dispatches found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DispatchTable
