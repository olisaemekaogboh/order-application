import { useState, useCallback } from 'react'
import { notificationService } from '../services/notificationService'
import { useSocket } from '@/shared/hooks/useSocket'
import { WS_NOTIFICATION_EVENTS, NOTIFICATION_DEFAULTS } from '../constants'
import toast from 'react-hot-toast'

export const useNotifications = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [pagination, setPagination] = useState({
    page: NOTIFICATION_DEFAULTS.PAGE,
    size: NOTIFICATION_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== WebSocket listener for real-time notifications =====
  const { isConnected } = useSocket(WS_NOTIFICATION_EVENTS.NOTIFICATION, (data) => {
    if (data) {
      addNotification(data)
    }
  })

  // ===== Fetch Notifications =====
  const fetchNotifications = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await notificationService.getNotifications({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setNotifications(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || NOTIFICATION_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        // Update unread count
        const unread = (response.content || []).filter((n) => !n.read).length
        setUnreadCount(unread)
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch notifications'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Fetch Unread Notifications =====
  const fetchUnreadNotifications = useCallback(async () => {
    try {
      const data = await notificationService.getUnreadNotifications()
      setNotifications(data || [])
      setUnreadCount(data.length || 0)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch unread notifications'
      toast.error(message)
      throw err
    }
  }, [])

  // ===== Get Unread Count =====
  const fetchUnreadCount = useCallback(async () => {
    try {
      const count = await notificationService.getUnreadCount()
      setUnreadCount(count || 0)
      return count
    } catch (err) {
      console.debug('Failed to fetch unread count:', err.message)
      return 0
    }
  }, [])

  // ===== Mark Notification as Read =====
  const markAsRead = useCallback(async (id) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))
      toast.success('Notification marked as read')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to mark as read'
      toast.error(message)
      throw err
    }
  }, [])

  // ===== Mark All as Read =====
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
      toast.success('All notifications marked as read')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to mark all as read'
      toast.error(message)
      throw err
    }
  }, [])

  // ===== Delete Notification =====
  const deleteNotification = useCallback(
    async (id) => {
      try {
        await notificationService.deleteNotification(id)
        setNotifications((prev) => prev.filter((n) => n.id !== id))
        // If the deleted notification was unread, decrement count
        const wasUnread = notifications.find((n) => n.id === id)?.read === false
        if (wasUnread) {
          setUnreadCount((prev) => Math.max(0, prev - 1))
        }
        toast.success('Notification deleted')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete notification'
        toast.error(message)
        throw err
      }
    },
    [notifications]
  )

  // ===== Delete All Notifications =====
  const deleteAllNotifications = useCallback(async () => {
    try {
      await notificationService.deleteAllNotifications()
      setNotifications([])
      setUnreadCount(0)
      toast.success('All notifications deleted')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete notifications'
      toast.error(message)
      throw err
    }
  }, [])

  // ===== Add a new notification (used by WebSocket) =====
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [notification, ...prev])
    if (!notification.read) {
      setUnreadCount((prev) => prev + 1)
    }
  }, [])

  // ===== Change Page =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
    setError(null)
    setPagination({
      page: NOTIFICATION_DEFAULTS.PAGE,
      size: NOTIFICATION_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    error,
    notifications,
    unreadCount,
    pagination,
    isConnected, // WebSocket connection status

    // Actions
    fetchNotifications,
    fetchUnreadNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    addNotification, // for manual additions
    changePage,
    changePageSize,
    reset,
  }
}
