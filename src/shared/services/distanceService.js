import axiosInstance from '@/shared/utils/helpers/axiosConfig'

// Simple in-memory cache for distance calculations
const distanceCache = new Map()

export const distanceService = {
  /**
   * Calculate distance between two addresses (in km)
   * With caching to prevent duplicate API calls
   */
  calculateDistance: async (address1, address2) => {
    // Normalize addresses for cache key (trim and lowercase)
    const normalized1 = address1.trim().toLowerCase()
    const normalized2 = address2.trim().toLowerCase()

    // Create a consistent cache key (alphabetical order to handle swapped addresses)
    const cacheKey = [normalized1, normalized2].sort().join('|')

    // Check cache first
    if (distanceCache.has(cacheKey)) {
      const cached = distanceCache.get(cacheKey)
      console.log('Distance cache hit:', { address1, address2, distance: cached })
      return cached
    }

    console.log('Distance cache miss, calling API:', { address1, address2 })

    const response = await axiosInstance.get('/distance/calculate-address', {
      params: { address1: address1.trim(), address2: address2.trim() },
    })

    const distance = response.data.data

    // Store in cache
    distanceCache.set(cacheKey, distance)

    // Limit cache size to prevent memory leaks (max 100 entries)
    if (distanceCache.size > 100) {
      const firstKey = distanceCache.keys().next().value
      distanceCache.delete(firstKey)
    }

    return distance
  },

  /**
   * Clear the distance cache
   */
  clearDistanceCache: () => {
    distanceCache.clear()
    console.log('Distance cache cleared')
  },

  /**
   * Get cache size (for debugging)
   */
  getCacheSize: () => distanceCache.size,

  /**
   * Validate an address (returns boolean)
   */
  validateAddress: async (address) => {
    const response = await axiosInstance.get('/distance/validate-address', {
      params: { address },
    })
    return response.data.data
  },

  /**
   * Estimate travel time for given distance and vehicle type
   */
  travelTime: async (distanceKm, vehicleType) => {
    const response = await axiosInstance.get('/distance/travel-time', {
      params: { distanceKm, vehicleType },
    })
    return response.data.data
  },

  /**
   * Geocode address to coordinates (lat/lng)
   */
  geocode: async (address) => {
    const response = await axiosInstance.get('/distance/coordinates', {
      params: { address },
    })
    return response.data.data // { latitude, longitude }
  },

  /**
   * Reverse geocode coordinates to address
   */
  reverseGeocode: async (latitude, longitude) => {
    const response = await axiosInstance.get('/distance/reverse-geocode', {
      params: { latitude, longitude },
    })
    return response.data.data
  },
}

export default distanceService
