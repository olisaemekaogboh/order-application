import React from 'react'
import OrderCard from '../OrderCard/OrderCard'

const OrderList = ({ orders = [] }) => {
  if (orders.length === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400 py-8">No orders found</div>
  }
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  )
}

export default OrderList
