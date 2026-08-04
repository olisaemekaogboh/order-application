import React, { useEffect, useRef, useState } from 'react'
import { MAP_DEFAULTS } from '../../constants'

// Simple map component using OpenStreetMap (Leaflet)
// To use Google Maps, replace with Google Maps React component
const OrderTrackingMap = ({ pickup, delivery, currentLocation, status }) => {
  const mapRef = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Dynamic import of Leaflet to avoid SSR issues
    const loadMap = async () => {
      try {
        // Only load if we have coordinates or addresses
        if (!pickup?.address && !delivery?.address) return

        // For now, show a placeholder
        setMapLoaded(true)
      } catch (error) {
        console.error('Failed to load map:', error)
        setMapLoaded(true)
      }
    }

    loadMap()
  }, [pickup, delivery])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Live Tracking</h3>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 relative">
        {currentLocation?.latitude && currentLocation?.longitude ? (
          <>
            <div className="text-center">
              <div className="text-4xl mb-2">📍</div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Driver is live</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lat: {currentLocation.latitude.toFixed(6)}, Lng:{' '}
                {currentLocation.longitude.toFixed(6)}
              </p>
              {status && (
                <span className="inline-block mt-2 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded-full">
                  {status}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-sm">
                {pickup?.address && delivery?.address
                  ? 'Map loading...'
                  : 'Map will appear once tracking starts'}
              </p>
              {pickup?.address && (
                <p className="text-xs text-gray-400 mt-1">
                  From: {pickup.address} → To: {delivery?.address}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderTrackingMap
