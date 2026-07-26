import axiosInstance from '@/shared/utils/helpers/axiosConfig'

export const notificationService = {
  getNotifications: async (params = {}) => {
    const response = await axiosInstance.get('/notifications', { params })
    return response.data.data
  },
  getUnreadNotifications: async () => {
    const response = await axiosInstance.get('/notifications/unread')
    return response.data.data
  },
  markAsRead: async (id) => {
    const response = await axiosInstance.put(`/notifications/${id}/read`)
    return response.data
  },
  markAllAsRead: async () => {
    const response = await axiosInstance.put('/notifications/read-all')
    return response.data
  },
  deleteNotification: async (id) => {
    const response = await axiosInstance.delete(`/notifications/${id}`)
    return response.data
  },
  deleteAllNotifications: async () => {
    const response = await axiosInstance.delete('/notifications/delete-all')
    return response.data
  },
  getUnreadCount: async () => {
    const response = await axiosInstance.get('/notifications/count/unread')
    return response.data.data
  },
}
