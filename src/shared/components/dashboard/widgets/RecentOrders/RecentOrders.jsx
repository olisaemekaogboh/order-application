import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrderStatusBadge from '@/features/orders/components/OrderStatusBadge/OrderStatusBadge'
import { formatDistanceToNow } from 'date-fns'

const RecentOrders = ({ orders = [] }) => {
  const navigate = useNavigate()

  const handleViewOrder = (orderId) => {
    navigate(`/client/order-tracking/${orderId}`)
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No orders yet</p>
          <button
            onClick={() => navigate('/client/create-order')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Order
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        <button
          onClick={() => navigate('/client/order-history')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View All →
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => handleViewOrder(order.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      #{order.orderNumber}
                    </span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {order.pickupLocation} → {order.deliveryLocation}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(order.orderDate), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ₦{order.totalPrice?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.paymentStatus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentOrders
