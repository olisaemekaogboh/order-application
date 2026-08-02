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

  /* ===========================
   * ADMIN - USER MANAGEMENT
   * Note: All admin endpoints are under /api/admin
   * =========================== */

  // Get all users (admin only) - GET /api/admin/users
  getAllUsers: async (params = {}) => {
    const response = await axiosInstance.get('/admin/users', {
      params: {
        page: params.page || 0,
        size: params.size || 20,
        role: params.role,
        sortBy: params.sortBy || 'createdAt',
        sortDirection: params.sortDirection || 'DESC',
        ...params,
      },
    })
    return unwrap(response)
  },

  // Get user by ID - NOT available in your current backend
  // Using the admin users endpoint with ID filter or profile endpoint
  getUserById: async (id) => {
    // Since there's no GET /api/admin/users/{id}, we'll get all users and filter
    // This is not efficient for large datasets but works for now
    const response = await axiosInstance.get('/admin/users', {
      params: {
        size: 1000, // Get enough users to find the one we need
      },
    })
    const data = unwrap(response)
    const user = data?.content?.find((u) => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  },

  // Get user by email - NOT available in your current backend
  // Using the admin users endpoint with search parameter
  getUserByEmail: async (email) => {
    // You'll need to add search parameter to your backend
    // For now, get all users and filter
    const response = await axiosInstance.get('/admin/users', {
      params: {
        size: 1000,
      },
    })
    const data = unwrap(response)
    const user = data?.content?.find((u) => u.email === email)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  },

  // Update user - using existing PUT /api/users/{userId}/status or /api/users/{userId}/role
  updateUser: async (id, data) => {
    // Check what fields are being updated
    if (data.role) {
      // Update role - PUT /api/users/{userId}/role
      const response = await axiosInstance.put(`/users/${id}/role`, {
        role: data.role,
      })
      return unwrap(response)
    } else if (data.enabled !== undefined) {
      // Update status - PUT /api/users/{userId}/status
      const response = await axiosInstance.put(`/users/${id}/status`, {
        enabled: data.enabled,
      })
      return unwrap(response)
    } else {
      // For other updates, you might need to add a general update endpoint
      // For now, we'll use the admin endpoint if available
      throw new Error('Update endpoint not available for these fields')
    }
  },

  // Delete user - DELETE /api/admin/users/{userId}
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/admin/users/${id}`)
    return unwrap(response)
  },

  // Enable user - PUT /api/users/{userId}/status
  enableUser: async (id) => {
    const response = await axiosInstance.put(`/users/${id}/status`, {
      enabled: true,
    })
    return unwrap(response)
  },

  // Disable user - PUT /api/users/{userId}/status
  disableUser: async (id) => {
    const response = await axiosInstance.put(`/users/${id}/status`, {
      enabled: false,
    })
    return unwrap(response)
  },

  // Suspend user - Not directly available in your backend
  // You might need to add a status field or use a workaround
  suspendUser: async (id) => {
    // Since there's no suspend endpoint, we'll disable the user
    // and maybe add a note or use a different approach
    const response = await axiosInstance.put(`/users/${id}/status`, {
      enabled: false,
    })
    // You might want to add a custom header or parameter for suspension
    return unwrap(response)
  },

  // Reactivate user - PUT /api/users/{userId}/status
  reactivateUser: async (id) => {
    const response = await axiosInstance.put(`/users/${id}/status`, {
      enabled: true,
    })
    return unwrap(response)
  },

  // Assign role - PUT /api/users/{userId}/role
  assignRole: async (id, role) => {
    const response = await axiosInstance.put(`/users/${id}/role`, {
      role: role,
    })
    return unwrap(response)
  },

  // Get user statistics - NOT available in your backend
  // You'll need to create a stats endpoint or compute from users
  getStats: async () => {
    // This endpoint doesn't exist yet
    // You could create GET /api/admin/users/stats
    // For now, return mock data or throw error
    console.warn('Stats endpoint not implemented yet')
    return {
      totalUsers: 0,
      activeUsers: 0,
      suspendedUsers: 0,
      rolesDistribution: {},
    }
  },

  // Search users - NOT available in your backend
  // You'll need to add search parameter to GET /api/admin/users
  searchUsers: async (query, params = {}) => {
    // Your backend doesn't have search parameter yet
    // You'll need to add it to UserManagementController
    const response = await axiosInstance.get('/admin/users', {
      params: {
        page: params.page || 0,
        size: params.size || 20,
        search: query, // This parameter needs to be added to backend
        ...params,
      },
    })
    return unwrap(response)
  },

  // Export users - NOT available in your backend
  // You'll need to create GET /api/admin/users/export
  exportUsers: async (format = 'csv') => {
    // This endpoint doesn't exist yet
    console.warn('Export endpoint not implemented yet')
    throw new Error('Export functionality not available yet')
  },
}
