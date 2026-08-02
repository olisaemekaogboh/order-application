// features/notifications/components/NotificationPage/NotificationPage.jsx
import React, { useState, useEffect } from 'react'
import { useNotifications } from '../../hooks/useNotifications'
import { useAuth } from '../../../auth/hooks/useAuth'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Badge from '@/shared/components/ui/Badge/Badge'
import Button from '@/shared/components/ui/Button/Button'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Tabs from '@/shared/components/ui/Tabs/Tabs'
import AdminNotificationBroadcast from '../AdminNotificationBroadcast/AdminNotificationBroadcast'
import { Bell, CheckCheck, Trash2, X, CheckCircle } from 'lucide-react'
import { NOTIFICATION_TYPES_LABELS } from '../../constants'
import { formatNotificationTime } from '../../utils'
import toast from 'react-hot-toast'

const NotificationPage = () => {
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'

  const {
    notifications,
    unreadCount,
    loading,
    pagination,
    filter,
    setFilter,
    fetchNotifications,
    changePage,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    markSelectedAsRead,
    deleteSelected,
    isConnected,
  } = useNotifications()

  const [selectedIds, setSelectedIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    // Fetch notifications with current filter
    const params = filter !== 'all' ? { status: filter } : {}
    fetchNotifications(params)
  }, [fetchNotifications, filter, pagination.page])

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleMarkSelectedAsRead = () => {
    if (selectedIds.length === 0) return
    markSelectedAsRead(selectedIds)
    setSelectedIds([])
    setSelectAll(false)
  }

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return
    if (window.confirm(`Delete ${selectedIds.length} notification(s)?`)) {
      deleteSelected(selectedIds)
      setSelectedIds([])
      setSelectAll(false)
    }
  }

  const handleMarkAsRead = (id) => {
    markAsRead(id)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this notification?')) {
      deleteNotification(id)
    }
  }

  const handleDeleteAll = () => {
    if (notifications.length === 0) return
    if (window.confirm('Delete all notifications?')) {
      deleteAllNotifications()
    }
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }

  const getNotificationTypeIcon = (type) => {
    const icons = {
      ORDER_UPDATE: '📦',
      PAYMENT: '💳',
      SYSTEM: '⚙️',
      PROMOTION: '🎉',
      ALERT: '⚠️',
      REMINDER: '⏰',
      DRIVER_ASSIGNED: '👤',
      DELIVERY_CONFIRMED: '✅',
    }
    return icons[type] || '🔔'
  }

  const getNotificationPriorityColor = (priority) => {
    const colors = {
      URGENT: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      LOW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    }
    return colors[priority] || ''
  }

  const tabs = [
    {
      label: (
        <span className="flex items-center gap-2">
          All
          <Badge variant="default" size="sm">
            {notifications.length}
          </Badge>
        </span>
      ),
      value: 'all',
    },
    {
      label: (
        <span className="flex items-center gap-2">
          Unread
          <Badge variant="warning" size="sm">
            {unreadCount}
          </Badge>
        </span>
      ),
      value: 'unread',
    },
    {
      label: (
        <span className="flex items-center gap-2">
          Read
          <Badge variant="success" size="sm">
            {notifications.length - unreadCount}
          </Badge>
        </span>
      ),
      value: 'read',
    },
  ]

  if (loading && notifications.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell size={28} className="text-blue-600" />
            Notifications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isConnected ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />
                Live updates connected
              </span>
            ) : (
              <span className="flex items-center gap-1 text-gray-400">
                <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" />
                Reconnecting...
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Broadcast Button - Only for Admins */}
          {isAdmin && <AdminNotificationBroadcast />}

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-1.5">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedIds.length} selected
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleMarkSelectedAsRead}
                className="text-blue-600 hover:text-blue-800"
              >
                <CheckCheck size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDeleteSelected}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setSelectedIds([])
                  setSelectAll(false)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </Button>
            </div>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="whitespace-nowrap"
          >
            <CheckCheck size={16} className="mr-1" />
            Mark all read
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleDeleteAll}
            disabled={notifications.length === 0}
            className="text-red-600 hover:text-red-800 border-red-300 hover:border-red-400"
          >
            <Trash2 size={16} className="mr-1" />
            Delete all
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs
          tabs={tabs.map((tab) => ({ ...tab, content: null }))}
          defaultTab={0}
          onChange={(index) => setFilter(tabs[index].value)}
        />
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="No notifications"
          description={
            filter === 'all'
              ? "You don't have any notifications yet."
              : filter === 'unread'
                ? "You're all caught up!"
                : "You don't have any read notifications."
          }
          action={
            filter !== 'all' && (
              <Button variant="ghost" onClick={() => setFilter('all')}>
                View all
              </Button>
            )
          }
        />
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            {/* Select All */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(e.target.checked)
                  if (e.target.checked) {
                    setSelectedIds(notifications.map((n) => n.id))
                  } else {
                    setSelectedIds([])
                  }
                }}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectAll ? 'Deselect all' : 'Select all'}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                {notifications.length} notifications
              </span>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(notification.id)}
                    onChange={() => handleToggleSelect(notification.id)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                  />

                  <div className="flex-shrink-0 text-2xl">
                    {getNotificationTypeIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="flex-shrink-0 w-2 h-2 mt-1.5 bg-blue-600 rounded-full" />
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="default" size="sm">
                        {NOTIFICATION_TYPES_LABELS[notification.type] || notification.type}
                      </Badge>
                      {notification.priority && (
                        <Badge
                          variant={notification.priority === 'URGENT' ? 'danger' : 'default'}
                          size="sm"
                          className={getNotificationPriorityColor(notification.priority)}
                        >
                          {notification.priority}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {formatNotificationTime(notification.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Mark as read"
                      >
                        <CheckCircle size={16} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(notification.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {pagination.page * pagination.size + 1} to{' '}
                {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
                {pagination.total} notifications
              </div>
              <Pagination
                currentPage={pagination.page + 1}
                totalPages={pagination.totalPages}
                onPageChange={(page) => changePage(page - 1)}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default NotificationPage
