import React, { useState, useEffect } from 'react'
import NotificationContext from './NotificationContext'
import { notificationService } from '../../services/notificationService'
import { useSocket } from '@/shared/hooks/useSocket'
import { SOCKET_EVENTS } from '@/shared/services/websocket/socketEvents'
import { useAuth } from '../../../auth/hooks/useAuth' // adjust path if needed

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async () => {
    if (!isAuthenticated) return // only fetch if authenticated
    try {
      const data = await notificationService.getNotifications({ page: 0, size: 20 })
      setNotifications(data.content || [])
      const unread = data.content?.filter((n) => !n.read).length || 0
      setUnreadCount(unread)
    } catch (error) {
      console.debug('Failed to fetch notifications:', error)
    }
  }

  // WebSocket listener only if authenticated
  useSocket(SOCKET_EVENTS.NOTIFICATIONS, (notification) => {
    if (notification && isAuthenticated) {
      setNotifications((prev) => [notification, ...prev])
      if (!notification.read) {
        setUnreadCount((c) => c + 1)
      }
    }
  })

  useEffect(() => {
    fetchNotifications()
  }, [isAuthenticated]) // re-fetch when auth state changes

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

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
