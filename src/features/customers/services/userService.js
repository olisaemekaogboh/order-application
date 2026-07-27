import axiosInstance from '@/shared/utils/helpers/axiosConfig'

const unwrap = (response) => response?.data?.data ?? response?.data

export const userService = {
  /* ===========================
   * PROFILE
   * =========================== */

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
      params: {
        pictureUrl,
      },
    })

    return unwrap(response)
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await axiosInstance.post('/users/change-password', null, {
      params: {
        oldPassword,
        newPassword,
      },
    })

    return unwrap(response)
  },

  /* ===========================
   * ADDRESSES
   * =========================== */

  getAddresses: async () => {
    const response = await axiosInstance.get('/users/addresses')
    return unwrap(response) || []
  },

  getAddressById: async (addressId) => {
    const response = await axiosInstance.get(`/users/addresses/${addressId}`)

    return unwrap(response)
  },

  getDefaultAddress: async () => {
    const response = await axiosInstance.get('/users/addresses/default')
    return unwrap(response)
  },

  addAddress: async (address) => {
    const response = await axiosInstance.post('/users/addresses', address)

    return unwrap(response)
  },

  updateAddress: async (addressId, address) => {
    const response = await axiosInstance.put(`/users/addresses/${addressId}`, address)

    return unwrap(response)
  },

  deleteAddress: async (addressId) => {
    const response = await axiosInstance.delete(`/users/addresses/${addressId}`)

    return unwrap(response)
  },

  setDefaultAddress: async (addressId) => {
    const response = await axiosInstance.put(`/users/addresses/default/${addressId}`)

    return unwrap(response)
  },

  geocodeAddress: async (address) => {
    const response = await axiosInstance.post('/users/addresses/geocode', null, {
      params: {
        address,
      },
    })

    return unwrap(response)
  },

  /* ===========================
   * PAYMENT
   * =========================== */

  getPaymentHistory: async () => {
    // Backend endpoint not yet implemented.
    return []
  },
}
