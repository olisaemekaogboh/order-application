import React from 'react'
import { Link } from 'react-router-dom'
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge'

const OrderCard = ({ order }) => {
  return (
    <Link to={`/client/order-tracking/${order.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">#{order.orderNumber}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {order.pickupLocation} → {order.deliveryLocation}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <OrderStatusBadge status={order.status} />
            <p className="mt-1 font-bold text-gray-900 dark:text-white">
              ₦{order.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OrderCard
