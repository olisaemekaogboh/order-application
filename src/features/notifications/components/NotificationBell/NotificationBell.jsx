import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { formatNotificationTime } from '../../utils'
import { useNavigate } from 'react-router-dom'
import { NOTIFICATION_ROUTES } from '../../constants'
import { useNotifications } from '../../hooks/useNotifications'
import { useAuth } from '../../../auth/hooks/useAuth'

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    isConnected,
  } = useNotifications()

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount()
      fetchNotifications({ page: 0, size: 5 })
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchUnreadCount()
      fetchNotifications({ page: 0, size: 5 })
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification.id)
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl)
    } else if (notification.type?.startsWith('REVIEW_')) {
      navigate('/admin/reviews')
    } else {
      navigate(NOTIFICATION_ROUTES.LIST)
    }
    setIsOpen(false)
  }

  const handleViewAll = () => {
    navigate(NOTIFICATION_ROUTES.LIST)
    setIsOpen(false)
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
    fetchUnreadCount()
    fetchNotifications({ page: 0, size: 5 })
  }

  if (!isAuthenticated) {
    return null
  }

  const recentNotifications = notifications.slice(0, 5)

  const getNotificationIcon = (type) => {
    const icons = {
      ORDER_UPDATE: '📦',
      PAYMENT: '💳',
      SYSTEM: '⚙️',
      PROMOTION: '🎉',
      ALERT: '⚠️',
      REMINDER: '⏰',
      DRIVER_ASSIGNED: '👤',
      DELIVERY_CONFIRMED: '✅',
      REVIEW_APPROVED: '✅',
      REVIEW_REJECTED: '❌',
      REVIEW_REPORTED: '🚨',
      REVIEW_CREATED: '✍️',
      REVIEW_UPDATED: '📝',
      REVIEW_DELETED: '🗑️',
    }
    return icons[type] || '🔔'
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        {!isConnected && (
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </div>
            ) : recentNotifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-lg">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {formatNotificationTime(notification.createdAt)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-center">
            <button
              onClick={handleViewAll}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 w-full py-1"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell
