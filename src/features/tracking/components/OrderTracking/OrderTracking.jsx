import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { orderService } from '../../../orders/services/orderService'
import OrderStatusBadge from '../../../features/orders/OrderStatusBadge/OrderStatusBadge'
import toast from 'react-hot-toast'
// import "./OrderTracking.css";

const OrderTracking = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const data = await orderService.getOrderById(id)
      setOrder(data)
    } catch (error) {
      toast.error('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!order) {
    return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Order not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Order #{order.orderNumber}
      </h1>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <OrderStatusBadge status={order.status} />
            </p>
            <p className="mt-2">
              <span className="font-medium">Pickup:</span> {order.pickupLocation}
            </p>
            <p>
              <span className="font-medium">Delivery:</span> {order.deliveryLocation}
            </p>
            <p className="mt-2">
              <span className="font-medium">Distance:</span> {order.distanceKm} km
            </p>
            <p>
              <span className="font-medium">Total:</span> ₦{order.totalPrice?.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ordered: {new Date(order.orderDate).toLocaleDateString()}
            </p>
            {order.deliveryDate && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Delivered: {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        {order.driver && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="font-medium">Driver: {order.driver.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Phone: {order.driver.phoneNumber}
            </p>
          </div>
        )}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="font-semibold">Tracking Timeline</h3>
          {/* You can add a timeline component here */}
        </div>
      </div>
    </div>
  )
}

export default OrderTracking
