import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const pricingService = {
  getActivePricing: async () => {
    try {
      const response = await axiosInstance.get('/pricing/active')
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch pricing:', error)
      // Return empty array so UI falls back to all vehicle types
      return []
    }
  },
  calculatePrice: async (data) => {
    try {
      console.log('Pricing request payload:', data)
      const response = await axiosInstance.post('/pricing/calculate', data)
      return response.data.data
    } catch (error) {
      console.error('Pricing API error:', error.response?.data || error.message)
      throw error
    }
  },
}
