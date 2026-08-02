// features/orders/components/OrderDetailsModal/OrderDetailsModal.jsx
import React from 'react'
import Modal from '@/shared/components/ui/Modal/Modal'
import { Card, CardContent } from '@/shared/components/ui/Card/Card'
import OrderStatusBadge from '../OrderStatusBadge/OrderStatusBadge'
import { formatDate, formatCurrency } from '@/shared/utils/formatters'

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!order) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Order #{order.orderNumber}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <Card>
            <CardContent className="space-y-3 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Order Details</h3>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Payment</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'PAID'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.paymentStatus || 'PENDING'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Pickup</span>
                <span className="text-right">{order.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Delivery</span>
                <span className="text-right">{order.deliveryLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Distance</span>
                <span>{order.distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Vehicle</span>
                <span>{order.vehicleType || order.driver?.vehicleType || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(order.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Ordered</span>
                <span>{formatDate(order.orderDate || order.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer & Driver Info */}
          <Card>
            <CardContent className="space-y-3 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Customer Information</h3>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Name</span>
                <span>
                  {order.user?.fullName || order.user?.firstName || order.customerName || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Email</span>
                <span>{order.user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Phone</span>
                <span>{order.user?.phoneNumber || 'N/A'}</span>
              </div>

              {order.driver && (
                <>
                  <hr className="my-3 border-gray-200 dark:border-gray-700" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Driver Information
                  </h3>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Name</span>
                    <span>{order.driver.name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Phone</span>
                    <span>{order.driver.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Vehicle</span>
                    <span>{order.driver.vehicleType || 'N/A'}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Price Breakdown */}
        {order.basePrice && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Price Breakdown</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Base Price</span>
                  <span>{formatCurrency(order.basePrice)}</span>
                </div>
                {order.weightSurcharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Weight Surcharge</span>
                    <span>{formatCurrency(order.weightSurcharge)}</span>
                  </div>
                )}
                {order.volumeSurcharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Volume Surcharge</span>
                    <span>{formatCurrency(order.volumeSurcharge)}</span>
                  </div>
                )}
                {order.expressSurcharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Express Surcharge</span>
                    <span>{formatCurrency(order.expressSurcharge)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span className="text-green-600 dark:text-green-400">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Modal>
  )
}

export default OrderDetailsModal
