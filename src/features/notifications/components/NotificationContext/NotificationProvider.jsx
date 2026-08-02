import React, { useState, useEffect } from 'react'
import NotificationContext from './NotificationContext'
import { notificationService } from '../../services/notificationService'
import { useSocket } from '@/shared/hooks/useSocket'
import { SOCKET_EVENTS } from '@/shared/services/websocket/socketEvents'
import { useAuth } from '../../../auth/hooks/useAuth'
import toast from 'react-hot-toast'

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    total: 0,
    totalPages: 0,
  })

  const fetchNotifications = async (params = {}) => {
    if (!isAuthenticated) return
    setLoading(true)
    try {
      const data = await notificationService.getNotifications({
        page: pagination.page,
        size: pagination.size,
        ...params,
      })
      setNotifications(data.content || [])
      setPagination({
        page: data.page || 0,
        size: data.size || 20,
        total: data.total || 0,
        totalPages: data.totalPages || 0,
      })
      const unread = data.content?.filter((n) => !n.read).length || 0
      setUnreadCount(unread)
    } catch (error) {
      console.debug('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  useSocket(SOCKET_EVENTS.NOTIFICATIONS, (notification) => {
    if (notification && isAuthenticated) {
      setNotifications((prev) => [notification, ...prev])
      if (!notification.read) {
        setUnreadCount((c) => c + 1)

        if (notification.type === 'REVIEW_APPROVED') {
          toast.success('✅ Your review was approved!')
        } else if (notification.type === 'REVIEW_REJECTED') {
          toast.error('❌ Your review was rejected')
        } else if (notification.type === 'REVIEW_REPORTED') {
          toast.error('🚨 Your review was flagged')
        }
      }
    }
  })

  useEffect(() => {
    fetchNotifications()
  }, [isAuthenticated])

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      setUnreadCount((c) => Math.max(0, c - 1))
    } catch (error) {
      console.debug('Failed to mark as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.debug('Failed to mark all as read:', error)
    }
  }

  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (error) {
      console.debug('Failed to delete notification:', error)
    }
  }

  const deleteAllNotifications = async () => {
    try {
      await notificationService.deleteAllNotifications()
      setNotifications([])
      setUnreadCount(0)
    } catch (error) {
      console.debug('Failed to delete all notifications:', error)
    }
  }

  const getUnreadCount = async () => {
    try {
      const count = await notificationService.getUnreadCount()
      setUnreadCount(count || 0)
      return count
    } catch (error) {
      console.debug('Failed to get unread count:', error)
      return 0
    }
  }

  const changePage = (page) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        pagination,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllNotifications,
        getUnreadCount,
        changePage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
