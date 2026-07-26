import { useState, useCallback } from 'react'
import { orderService } from '../../../orders/services/orderService'
import { driverService } from '../../drivers/services/driverService'
import { toast } from 'react-hot-toast'
import { TRACKING_API } from '../constants'

export const useTracking = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const [driverLocation, setDriverLocation] = useState(null)
  const [trackingHistory, setTrackingHistory] = useState([])

  // ===== Track Order =====
  const trackOrder = useCallback(async (orderId) => {
    setLoading(true)
    setError(null)
    try {
      // Use the order tracking endpoint
      const data = await orderService.trackOrder(orderId)
      setTrackingData(data)
      // Extract tracking history if available
      if (data.trackingHistory) {
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
      // You might need a dedicated endpoint; using driver update for now
      // In practice, you'd have a separate endpoint for getting driver location
      const driver = await driverService.getDriverById(driverId)
      const location = {
        latitude: driver.currentLatitude,
        longitude: driver.currentLongitude,
        location: driver.currentLocation,
      }
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
      await driverService.updateLocation(driverId, latitude, longitude, location)
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
  const subscribeToTracking = useCallback((orderId, onLocationUpdate, onStatusUpdate) => {
    // This would be handled via WebSocket; you can use the existing WebSocketService
    // We'll expose an empty function here; the actual implementation would be in the component using useSocket
    // For now, just return a cleanup function
    return () => {
      // Unsubscribe logic
    }
  }, [])

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
