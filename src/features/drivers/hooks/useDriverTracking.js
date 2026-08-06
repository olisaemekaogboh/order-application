import { useEffect, useRef, useState } from 'react'
import { trackingService } from '@/features/tracking/services/trackingService'

const useDriverTracking = (trackingId) => {
  const watchId = useRef(null)

  const [location, setLocation] = useState(null)
  const [tracking, setTracking] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!trackingId) return

    if (!navigator.geolocation) {
      setError('Geolocation is not supported.')
      return
    }

    watchId.current = navigator.geolocation.watchPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLocation({
          latitude,
          longitude,
        })

        try {
          await trackingService.updateLocation({
            trackingId,
            latitude,
            longitude,
          })
        } catch (err) {
          console.error(err)
        }
      },
      (err) => {
        setError(err.message)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 15000,
      }
    )

    setTracking(true)

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current)
      }

      setTracking(false)
    }
  }, [trackingId])

  return {
    location,
    tracking,
    error,
  }
}

export default useDriverTracking
