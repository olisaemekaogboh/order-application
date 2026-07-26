import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const userService = {
  // Use /auth/me instead of /users/profile (which may not exist)
  getProfile: async () => {
    const response = await axiosInstance.get('/auth/me')
    return response.data.data
  },
  updateProfile: async (data) => {
    const response = await axiosInstance.put('/users/profile', data)
    return response.data.data
  },
  changePassword: async (oldPassword, newPassword) => {
    const response = await axiosInstance.post('/users/change-password', {
      oldPassword,
      newPassword,
    })
    return response.data
  },
  updateProfilePicture: async (pictureUrl) => {
    const response = await axiosInstance.post('/users/profile/picture?pictureUrl=' + pictureUrl)
    return response.data
  },
  getPaymentHistory: async () => {
    // Placeholder – implement if backend supports
    return []
  },
}
