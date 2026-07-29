import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const distanceService = {
  /**
   * Calculate distance between two addresses (in km)
   */
  calculateDistance: async (address1, address2) => {
    const response = await axiosInstance.get('/distance/calculate-address', {
      params: { address1, address2 },
    })
    return response.data.data
  },

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
