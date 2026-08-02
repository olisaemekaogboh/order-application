import { useState, useCallback, useEffect } from 'react'
import { notificationService } from '../services/notificationService'
import { useSocket } from '@/shared/hooks/useSocket'
import { WS_NOTIFICATION_EVENTS, NOTIFICATION_DEFAULTS } from '../constants'
import toast from 'react-hot-toast'

export const useNotifications = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [filter, setFilter] = useState('all')
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
        // Use provided params or fallback to state
        const page = params.page !== undefined ? params.page : pagination.page
        const size = params.size !== undefined ? params.size : pagination.size

        // Remove pagination params from the filter params to avoid duplication
        const { page: _, size: __, ...filterParams } = params

        const response = await notificationService.getNotifications({
          page,
          size,
          ...filterParams,
        })

        console.log('📬 Notifications fetched:', response) // Debug log

        setNotifications(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || NOTIFICATION_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })

        // Update unread count from the response
        const unread = (response.content || []).filter((n) => !n.read).length
        setUnreadCount(unread)

        return response
      } catch (err) {
        console.error('❌ Failed to fetch notifications:', err)
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

  // ===== Fetch Unread Count =====
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

  // ===== Mark Selected as Read =====
  const markSelectedAsRead = useCallback(async (ids) => {
    try {
      for (const id of ids) {
        await notificationService.markAsRead(id)
      }
      setNotifications((prev) => prev.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - ids.length))
      toast.success(`${ids.length} notifications marked as read`)
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

  // ===== Delete Selected =====
  const deleteSelected = useCallback(
    async (ids) => {
      try {
        for (const id of ids) {
          await notificationService.deleteNotification(id)
        }
        setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)))
        const unreadDeleted = notifications.filter((n) => ids.includes(n.id) && !n.read).length
        setUnreadCount((prev) => Math.max(0, prev - unreadDeleted))
        toast.success(`${ids.length} notifications deleted`)
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete notifications'
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
    filter,
    isConnected,

    // Actions
    setFilter,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markSelectedAsRead,
    markAllAsRead,
    deleteNotification,
    deleteSelected,
    deleteAllNotifications,
    addNotification,
    changePage,
    changePageSize,
    reset,
  }
}
