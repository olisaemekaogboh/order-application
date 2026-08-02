// features/orders/components/OrderTable/OrderTable.jsx
import React from 'react'
import { Eye, UserCheck, UserX, Truck, Clock, CheckCircle, XCircle } from 'lucide-react'
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge'
import { formatDate, formatCurrency } from '@/shared/utils/formatters'
import Button from '@/shared/components/ui/Button/Button'

const OrderTable = ({ orders = [], onAssign, onViewDetails, onCancel, onUpdateStatus }) => {
  const getPaymentStatusBadge = (status) => {
    const configs = {
      PAID: {
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        label: 'Paid',
      },
      PENDING: {
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        label: 'Pending',
      },
      FAILED: {
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        label: 'Failed',
      },
      REFUNDED: {
        className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
        label: 'Refunded',
      },
      CANCELLED: {
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
        label: 'Cancelled',
      },
    }
    const config = configs[status] || configs.PENDING
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const getPriorityBadge = (priority) => {
    const configs = {
      URGENT: {
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        label: 'Urgent',
      },
      HIGH: {
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
        label: 'High',
      },
      MEDIUM: {
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        label: 'Medium',
      },
      LOW: {
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        label: 'Low',
      },
    }
    const config = configs[priority] || configs.MEDIUM
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    )
  }

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
              Driver
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Pickup
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Delivery
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Distance
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Vehicle
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Priority
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Total
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
              Payment
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
            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {order.orderNumber || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.user?.fullName || order.user?.firstName || order.customerName || 'N/A'}
                <div className="text-xs text-gray-400">
                  {order.user?.email || order.customerEmail || ''}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.driver?.name || order.driverName || 'Not Assigned'}
                <div className="text-xs text-gray-400">{order.driver?.email || ''}</div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.pickupLocation
                  ? order.pickupLocation.length > 20
                    ? order.pickupLocation.slice(0, 20) + '...'
                    : order.pickupLocation
                  : 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.deliveryLocation
                  ? order.deliveryLocation.length > 20
                    ? order.deliveryLocation.slice(0, 20) + '...'
                    : order.deliveryLocation
                  : 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.distanceKm ? `${order.distanceKm} km` : 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {order.vehicleType || order.driver?.vehicleType || 'N/A'}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                {getPriorityBadge(order.priority)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                {formatCurrency(order.totalPrice)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                {getPaymentStatusBadge(order.paymentStatus)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {formatDate(order.orderDate || order.createdAt)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center gap-1 flex-wrap">
                  {/* View Details */}
                  {onViewDetails && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails(order)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </Button>
                  )}

                  {/* Assign Driver */}
                  {order.status === 'PENDING' && onAssign && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onAssign(order)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Assign Driver"
                    >
                      <UserCheck size={16} />
                    </Button>
                  )}

                  {/* Mark as Picked Up */}
                  {order.status === 'ASSIGNED' && onUpdateStatus && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onUpdateStatus(order.id, 'PICKED_UP')}
                      className="text-purple-600 hover:text-purple-800 p-1"
                      title="Mark as Picked Up"
                    >
                      <Truck size={16} />
                    </Button>
                  )}

                  {/* Mark as In Transit */}
                  {order.status === 'PICKED_UP' && onUpdateStatus && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onUpdateStatus(order.id, 'IN_TRANSIT')}
                      className="text-indigo-600 hover:text-indigo-800 p-1"
                      title="Mark as In Transit"
                    >
                      <Clock size={16} />
                    </Button>
                  )}

                  {/* Mark as Delivered */}
                  {order.status === 'IN_TRANSIT' && onUpdateStatus && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onUpdateStatus(order.id, 'DELIVERED')}
                      className="text-green-600 hover:text-green-800 p-1"
                      title="Mark as Delivered"
                    >
                      <CheckCircle size={16} />
                    </Button>
                  )}

                  {/* Cancel Order */}
                  {!['DELIVERED', 'CANCELLED'].includes(order.status) && onCancel && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onCancel(order.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Cancel Order"
                    >
                      <XCircle size={16} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="13" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-4xl">📋</span>
                  <span>No orders found</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderTable
