import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import OrderTrackingMap from '@/features/tracking/components/OrderTrackingMap/OrderTrackingMap'
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import { formatDate, formatCurrency } from '@/shared/utils/formatters'

const OrderTracking = () => {
  const { id } = useParams()
  const { getOrder, currentOrder, loading } = useOrders()

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!currentOrder) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Order not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Order #{currentOrder.orderNumber}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <OrderStatusBadge status={currentOrder.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Pickup</span>
              <span className="text-right">{currentOrder.pickupLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Delivery</span>
              <span className="text-right">{currentOrder.deliveryLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Distance</span>
              <span>{currentOrder.distanceKm} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatCurrency(currentOrder.totalPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Ordered</span>
              <span>{formatDate(currentOrder.orderDate)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        {currentOrder.driver && (
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Name</span>
                <span>{currentOrder.driver.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Phone</span>
                <span>{currentOrder.driver.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Vehicle</span>
                <span>{currentOrder.driver.vehicleType}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Map */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTrackingMap
              pickup={currentOrder.pickupLocation}
              delivery={currentOrder.deliveryLocation}
              driverLocation={currentOrder.driver?.currentLocation}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrderTracking
