import React from 'react'
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge'
import { formatDate, formatCurrency } from '@/shared/utils/formatters'
import Button from '@/shared/components/ui/Button/Button'

const OrderTable = ({ orders = [], onAssign }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Order #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Customer
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Total
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {order.orderNumber}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.user?.fullName || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatCurrency(order.totalPrice)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatDate(order.orderDate)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                {order.status === 'PENDING' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onAssign(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Assign
                  </Button>
                )}
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
