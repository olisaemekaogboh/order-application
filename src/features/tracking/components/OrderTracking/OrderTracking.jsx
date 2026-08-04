import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { orderService } from '../../../orders/services/orderService'
import { trackingService } from '../services/trackingService'
import { useTracking } from '../hooks/useTracking'
import OrderStatusBadge from '../../../features/orders/OrderStatusBadge/OrderStatusBadge'
import OrderTrackingMap from './OrderTrackingMap'
import toast from 'react-hot-toast'
import {
  TRACKING_STATUSES,
  TRACKING_STATUSES_LABELS,
  TRACKING_STATUSES_ICONS,
  TRACKING_STATUSES_COLORS,
} from '../constants'

const OrderTracking = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [trackingData, setTrackingData] = useState(null)
  const [trackingEvents, setTrackingEvents] = useState([])
  const [driverLocation, setDriverLocation] = useState(null)
  const [isTrackingActive, setIsTrackingActive] = useState(false)
  const [progress, setProgress] = useState(0)

  const {
    trackOrder,
    getDriverLocation,
    subscribeToTracking,
    clearTracking,
    loading: trackingLoading,
  } = useTracking()

  // Fetch order and tracking data
  const fetchOrder = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch order details
      const orderData = await orderService.getOrderById(id)
      setOrder(orderData)

      // Try to get tracking data via the trackOrder endpoint
      try {
        const tracking = await trackingService.trackOrder(id)
        if (tracking) {
          setTrackingData(tracking)
          setIsTrackingActive(true)

          // Get tracking timeline if trackingId exists
          if (tracking.trackingId) {
            try {
              const timeline = await trackingService.getTimeline(tracking.trackingId)
              setTrackingEvents(timeline?.events || [])
            } catch (e) {
              console.log('No timeline events yet')
            }

            // Get driver location if available
            try {
              const location = await getDriverLocation(tracking.trackingId)
              if (location) {
                setDriverLocation(location)
              }
            } catch (e) {
              console.log('Driver location not available')
            }
          }

          // Calculate progress based on status
          const statusOrder = ['CREATED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED']
          const currentIndex = statusOrder.indexOf(tracking.trackingStatus || tracking.status)
          if (currentIndex !== -1) {
            setProgress((currentIndex / (statusOrder.length - 1)) * 100)
          }
        }
      } catch (e) {
        console.log('No active tracking session for this order')
        setIsTrackingActive(false)
      }
    } catch (error) {
      toast.error('Failed to load order details')
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [id, getDriverLocation])

  useEffect(() => {
    fetchOrder()
    return () => {
      clearTracking()
    }
  }, [fetchOrder, clearTracking])

  // Subscribe to real-time updates when tracking is active
  useEffect(() => {
    if (isTrackingActive && trackingData?.trackingId) {
      const unsubscribe = subscribeToTracking(
        trackingData.trackingId,
        (location) => {
          setDriverLocation(location)
          toast.success('Driver location updated')
        },
        (statusUpdate) => {
          setTrackingData((prev) => ({ ...prev, ...statusUpdate }))
          toast.info(`Status updated: ${TRACKING_STATUSES_LABELS[statusUpdate.status]}`)
          const statusOrder = ['CREATED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED']
          const currentIndex = statusOrder.indexOf(statusUpdate.status)
          if (currentIndex !== -1) {
            setProgress((currentIndex / (statusOrder.length - 1)) * 100)
          }
        }
      )

      return () => {
        if (unsubscribe) unsubscribe()
      }
    }
  }, [isTrackingActive, trackingData, subscribeToTracking])

  const handleRefresh = () => {
    fetchOrder()
    toast.success('Refreshed tracking data')
  }

  if (loading || trackingLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!order) {
    return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Order not found</div>
  }

  // Get status label and icon - use trackingData if available, fallback to order
  const status = trackingData?.trackingStatus || trackingData?.status || order.status
  const statusLabel = TRACKING_STATUSES_LABELS[status] || status
  const statusIcon = TRACKING_STATUSES_ICONS[status] || '📦'
  const statusColorClass = TRACKING_STATUSES_COLORS[status] || 'bg-gray-100 text-gray-800'

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Order #{order.orderNumber}
        </h1>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Order Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{statusIcon}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColorClass}`}>
                {statusLabel}
              </span>
              {isTrackingActive && (
                <span className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Live Tracking Active
                </span>
              )}
            </div>

            <div className="mt-3 space-y-1">
              <p>
                <span className="font-medium text-gray-600 dark:text-gray-400">Pickup:</span>{' '}
                {order.pickupLocation}
              </p>
              <p>
                <span className="font-medium text-gray-600 dark:text-gray-400">Delivery:</span>{' '}
                {order.deliveryLocation}
              </p>
              <p>
                <span className="font-medium text-gray-600 dark:text-gray-400">Distance:</span>{' '}
                {order.distanceKm?.toFixed(1)} km
              </p>
              <p>
                <span className="font-medium text-gray-600 dark:text-gray-400">Total:</span> ₦
                {order.totalPrice?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            <p>Ordered: {new Date(order.createdAt || order.orderDate).toLocaleDateString()}</p>
            {order.deliveryDate && (
              <p>Delivered: {new Date(order.deliveryDate).toLocaleDateString()}</p>
            )}
            {trackingData?.estimatedArrival && (
              <p className="text-blue-600 dark:text-blue-400 font-medium">
                ETA: {new Date(trackingData.estimatedArrival).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span>Order Placed</span>
          <span>In Transit</span>
          <span>Delivered</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Map */}
      <div className="mb-6">
        <OrderTrackingMap
          pickup={{ address: order.pickupLocation }}
          delivery={{ address: order.deliveryLocation }}
          currentLocation={driverLocation}
          status={trackingData?.trackingStatus || trackingData?.status || order.status}
        />
      </div>

      {/* Driver Info */}
      {(trackingData?.driverName || order.driverName) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Driver Information</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-xl font-bold">
              {(trackingData?.driverName || order.driverName)?.charAt(0) || 'D'}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {trackingData?.driverName || order.driverName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {trackingData?.driverPhone || order.driverPhone}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Vehicle: {trackingData?.driverVehicle || order.driverVehicle || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Timeline */}
      {trackingEvents.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tracking Timeline</h3>
          <div className="relative">
            {trackingEvents.map((event, index) => (
              <div key={index} className="flex gap-4 mb-4 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                  {index < trackingEvents.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.description || event.eventType}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTracking
