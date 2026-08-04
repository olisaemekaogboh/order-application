// DispatchTable.jsx - Updated with correct statuses
import React from 'react'
import Button from '@/shared/components/ui/Button/Button'
import { formatDate } from '@/shared/utils/formatters/dateFormatter'

const DISPATCH_STATUS_LABELS = {
  PENDING: 'Pending',
  WAITING_DRIVER_ACCEPTANCE: 'Waiting for Driver',
  DRIVER_ACCEPTED: 'Driver Accepted',
  EN_ROUTE_PICKUP: 'En Route to Pickup',
  PICKUP_COMPLETED: 'Pickup Completed',
  DELIVERY_IN_PROGRESS: 'Delivery In Progress',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
}

const DISPATCH_STATUS_COLORS = {
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

const DispatchTable = ({ orders = [], dispatches = [], type = 'ready', onAssign }) => {
  const items = type === 'ready' ? orders : dispatches

  const getStatusLabel = (status) => {
    return DISPATCH_STATUS_LABELS[status] || status || 'Unknown'
  }

  const getStatusColor = (status) => {
    return DISPATCH_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityLabel = (priority) => {
    if (priority === 2) return 'Urgent'
    if (priority === 1) return 'High'
    return 'Normal'
  }

  const getPriorityColor = (priority) => {
    if (priority === 2) return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    if (priority === 1)
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              {type === 'ready' ? 'Order #' : 'Dispatch ID'}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Pickup → Delivery
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Driver
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Vehicle
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Created
            </th>
            {type === 'ready' && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => {
            const isOrder = type === 'ready'
            const order = isOrder ? item : item.order
            const dispatch = isOrder ? null : item

            return (
              <tr
                key={isOrder ? item.id : item.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {isOrder ? item.orderNumber : item.id?.slice(0, 8)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="max-w-xs truncate">
                    {order?.pickupLocation || 'N/A'} → {order?.deliveryLocation || 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(isOrder ? item.status : item.status)}`}
                  >
                    {isOrder ? item.status : getStatusLabel(item.status)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {isOrder ? item.driver?.name || 'Not Assigned' : item.driverName || 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {isOrder ? item.vehicleNumber || 'N/A' : item.vehicleNumber || 'N/A'}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority || 0)}`}
                  >
                    {getPriorityLabel(item.priority || 0)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(item.createdAt || item.createdDate)}
                </td>
                {type === 'ready' && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Button size="sm" variant="primary" onClick={() => onAssign && onAssign(item)}>
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
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No {type === 'ready' ? 'orders ready for dispatch' : 'active dispatches'} found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DispatchTable
