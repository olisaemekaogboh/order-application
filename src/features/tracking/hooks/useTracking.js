import { useState, useCallback } from 'react'
import trackingService from '../services/trackingService'
import { toast } from 'react-hot-toast'
import { TRACKING_API } from '../constants'
import { useWebSocket } from '@/shared/hooks/useWebSocket'

export const useTracking = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null)
  const [trackingHistory, setTrackingHistory] = useState([])
  const { subscribe, unsubscribe } = useWebSocket()

  // ===== Track Order =====
  const trackOrder = useCallback(async (orderId) => {
    setLoading(true)
    setError(null)
    try {
      const data = await trackingService.trackOrder(orderId)
      setTrackingData(data)
      // Extract tracking history if available
      if (data?.trackingHistory) {
        setTrackingHistory(data.trackingHistory)
      }
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to track order'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Driver Location =====
  const getDriverLocation = useCallback(async (driverId) => {
    setLoading(true)
    try {
      const location = await trackingService.getDriverLocation(driverId)
      setDriverLocation(location)
      return location
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch driver location'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Driver Location (for drivers) =====
  const updateDriverLocation = useCallback(async (driverId, latitude, longitude, location) => {
    setLoading(true)
    try {
      await trackingService.updateLocationDriver(driverId, latitude, longitude, location)
      setDriverLocation({ latitude, longitude, location })
      toast.success('Location updated')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update location'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Subscribe to Real-time Updates (WebSocket) =====
  const subscribeToTracking = useCallback(
    (trackingId, onLocationUpdate, onStatusUpdate) => {
      if (!trackingId) {
        console.warn('Cannot subscribe to tracking: No tracking ID provided')
        return () => {}
      }

      // Subscribe to tracking updates
      const topics = [`/topic/tracking/${trackingId}`, `/user/${trackingId}/queue/tracking`]

      let subscriptions = []

      topics.forEach((topic) => {
        const sub = subscribe(topic, (message) => {
          try {
            const data = JSON.parse(message.body)

            // Check if it's a location update
            if (data.latitude && data.longitude) {
              setDriverLocation({
                latitude: data.latitude,
                longitude: data.longitude,
                location: data.location || '',
              })
              if (onLocationUpdate) {
                onLocationUpdate(data)
              }
            }

            // Check if it's a status update
            if (data.status) {
              setTrackingData((prev) => ({ ...prev, ...data }))
              if (onStatusUpdate) {
                onStatusUpdate(data)
              }
            }
          } catch (e) {
            console.error('Failed to parse WebSocket message:', e)
          }
        })

        subscriptions.push(sub)
      })

      // Return cleanup function
      return () => {
        subscriptions.forEach((sub) => {
          try {
            unsubscribe(sub)
          } catch (e) {
            console.error('Failed to unsubscribe:', e)
          }
        })
      }
    },
    [subscribe, unsubscribe]
  )

  // ===== Clear Tracking Data =====
  const clearTracking = useCallback(() => {
    setTrackingData(null)
    setTrackingHistory([])
    setDriverLocation(null)
    setError(null)
  }, [])

  return {
    loading,
    error,
    trackingData,
    trackingHistory,
    driverLocation,
    trackOrder,
    getDriverLocation,
    updateDriverLocation,
    subscribeToTracking,
    clearTracking,
  }
}
