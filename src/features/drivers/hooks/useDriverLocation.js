// features/drivers/hooks/useDriverLocation.js
import { useState, useEffect, useRef, useCallback } from 'react'

const TERMINAL_STATUSES = ['DELIVERED', 'FAILED', 'CANCELLED']

export const useDriverLocation = (currentDispatch, onLocationUpdate) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    lastUpdated: null,
  })
  const [isTracking, setIsTracking] = useState(false)
  const watchIdRef = useRef(null)

  const hasActiveDispatch = currentDispatch && !TERMINAL_STATUSES.includes(currentDispatch.status)

  const startTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }

    if (!navigator.geolocation) {
      console.warn('Geolocation not supported')
      return
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude

        setLocation({
          latitude: lat,
          longitude: lng,
          lastUpdated: new Date(),
        })

        if (onLocationUpdate) {
          onLocationUpdate(lat, lng)
        }
      },
      (err) => {
        console.warn('Geolocation error:', err)
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
      }
    )

    setIsTracking(true)
  }, [onLocationUpdate])

  const stopTracking = useCallback(() => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
      setIsTracking(false)
    }
  }, [])

  useEffect(() => {
    if (hasActiveDispatch) {
      startTracking()
    } else {
      stopTracking()
    }

    return () => stopTracking()
  }, [hasActiveDispatch, startTracking, stopTracking])

  return { location, isTracking }
}
