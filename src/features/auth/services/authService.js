import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials)
    return response.data.data
  },
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data.data
  },
  googleLogin: async (googleAuthData) => {
    const response = await axiosInstance.post('/auth/google', googleAuthData)
    return response.data.data
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout')
    return response.data
  },
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post('/auth/refresh', { refreshToken })
    return response.data.data
  },
  forgotPassword: async (email) => {
    const response = await axiosInstance.post('/auth/forgot-password', { email })
    return response.data
  },
  resetPassword: async (data) => {
    const response = await axiosInstance.post('/auth/reset-password', data)
    return response.data
  },
  verifyEmail: async (token) => {
    const response = await axiosInstance.get(`/auth/verify-email?token=${token}`)
    return response.data
  },
  // FIXED: Use /users/profile instead of /auth/me
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/users/profile')
    return response.data.data
  },
}
