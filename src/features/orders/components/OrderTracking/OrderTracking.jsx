// OrderTracking.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import { usePayments } from '../../../payments/hooks/usePayments'
import OrderTrackingMap from '@/features/tracking/components/OrderTrackingMap/OrderTrackingMap'
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import { formatDate, formatCurrency } from '@/shared/utils/formatters'
import Button from '@/shared/components/ui/Button/Button'
import toast from 'react-hot-toast'

const OrderTracking = () => {
  const { id } = useParams()
  const { getOrder, currentOrder, loading } = useOrders()
  const { getPaymentByOrder, currentPayment, initializePayment } = usePayments()
  const [paymentLoading, setPaymentLoading] = useState(false)

  useEffect(() => {
    if (id) {
      getOrder(id)
      getPaymentByOrder(id)
    }
  }, [id])

  const handlePayment = async () => {
    setPaymentLoading(true)
    try {
      const result = await initializePayment({
        orderId: currentOrder.id,
        amount: currentOrder.totalPrice,
        paymentMethod: 'PAYSTACK',
        currency: currentOrder.currency || 'NGN',
      })

      if (result.authorizationUrl) {
        window.location.href = result.authorizationUrl
      } else {
        toast.info('Payment initialized. Please complete the payment.')
      }
    } catch (error) {
      console.error('Payment failed:', error)
      toast.error(error.response?.data?.message || 'Payment initialization failed')
    } finally {
      setPaymentLoading(false)
    }
  }

  const getPaymentStatusBadge = (status) => {
    const statusMap = {
      PAID: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      FAILED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      REFUNDED: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      CANCELLED: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    }
    return statusMap[status] || statusMap.PENDING
  }

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

  const paymentStatus = currentPayment?.status || currentOrder?.paymentStatus || 'PENDING'
  const isPaymentPending = paymentStatus === 'PENDING'

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
              <span className="text-gray-500 dark:text-gray-400">Payment</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(paymentStatus)}`}
              >
                {paymentStatus}
              </span>
            </div>
            {currentPayment?.transactionReference && (
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Transaction Ref</span>
                <span className="font-mono text-xs">{currentPayment.transactionReference}</span>
              </div>
            )}
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

            {/* Payment Button - Show only if payment is pending */}
            {isPaymentPending && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={handlePayment}
                  disabled={paymentLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {paymentLoading ? 'Processing...' : 'Pay Now'}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  You will be redirected to complete the payment
                </p>
              </div>
            )}
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
