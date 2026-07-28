import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const settingsService = {
  /**
   * Account
   */
  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile')
    return unwrap(response)
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put('/users/profile', data)
    return unwrap(response)
  },

  updateProfilePicture: async (pictureUrl) => {
    const response = await axiosInstance.post('/users/profile/picture', null, {
      params: { pictureUrl },
    })

    return unwrap(response)
  },

  /**
   * Password
   */
  changePassword: async (oldPassword, newPassword) => {
    const response = await axiosInstance.post('/users/change-password', null, {
      params: {
        oldPassword,
        newPassword,
      },
    })

    return unwrap(response)
  },

  /**
   * Addresses
   */
  getAddresses: async () => {
    const response = await axiosInstance.get('/users/addresses')
    return unwrap(response)
  },

  addAddress: async (data) => {
    const response = await axiosInstance.post('/users/addresses', data)
    return unwrap(response)
  },

  updateAddress: async (id, data) => {
    const response = await axiosInstance.put(`/users/addresses/${id}`, data)
    return unwrap(response)
  },

  deleteAddress: async (id) => {
    const response = await axiosInstance.delete(`/users/addresses/${id}`)
    return unwrap(response)
  },

  setDefaultAddress: async (id) => {
    const response = await axiosInstance.put(`/users/addresses/default/${id}`)
    return unwrap(response)
  },

  /**
   * Notification preferences
   *
   * Requires backend endpoints.
   */
  getNotificationPreferences: async () => {
    const response = await axiosInstance.get('/users/settings/notifications')
    return unwrap(response)
  },

  updateNotificationPreferences: async (data) => {
    const response = await axiosInstance.put('/users/settings/notifications', data)
    return unwrap(response)
  },

  /**
   * Devices
   *
   * Requires backend endpoints.
   */
  getDevices: async () => {
    const response = await axiosInstance.get('/users/settings/devices')
    return unwrap(response)
  },

  revokeDevice: async (deviceId) => {
    const response = await axiosInstance.delete(`/users/settings/devices/${deviceId}`)
    return unwrap(response)
  },
}

export default settingsService
