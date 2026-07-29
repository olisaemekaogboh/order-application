import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const pricingService = {
  /**
   * Get all active pricing configurations (public)
   */
  getActivePricing: async () => {
    const response = await axiosInstance.get('/pricing/active')
    return response.data.data
  },

  /**
   * Get active pricing for a specific vehicle type
   * @param {string} vehicleType - e.g., 'MOTORCYCLE', 'MINI_VAN', 'STANDARD', 'TRUCK'
   */
  getPricingByVehicleType: async (vehicleType) => {
    const response = await axiosInstance.get(`/pricing/vehicle/${vehicleType}`)
    return response.data.data
  },

  /**
   * Calculate delivery price
   * @param {Object} data - { distanceKm, weight, volume, vehicleType, expressDelivery }
   */
  calculatePrice: async (data) => {
    const response = await axiosInstance.post('/pricing/calculate', data)
    return response.data.data
  },
}

export default pricingService
