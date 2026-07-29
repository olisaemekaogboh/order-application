import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const fleetService = {
  // Get fleet analytics (dashboard)
  getFleetAnalytics: async () => {
    const response = await axiosInstance.get('/fleet/dashboard')
    return response.data.data
  },
}

export default fleetService
