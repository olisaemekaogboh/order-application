/**
 * Notifications Utilities
 * Helper functions for notifications
 */

import {
  NOTIFICATION_TYPES_LABELS,
  NOTIFICATION_TYPES_ICONS,
  NOTIFICATION_PRIORITIES_LABELS,
  NOTIFICATION_PRIORITIES_COLORS,
} from '../constants'

// ===== Type & Priority Helpers =====
export const getNotificationTypeLabel = (type) => {
  return NOTIFICATION_TYPES_LABELS[type] || type
}

export const getNotificationTypeIcon = (type) => {
  return NOTIFICATION_TYPES_ICONS[type] || '📬'
}

export const getNotificationPriorityLabel = (priority) => {
  return NOTIFICATION_PRIORITIES_LABELS[priority] || priority
}

export const getNotificationPriorityColor = (priority) => {
  return NOTIFICATION_PRIORITIES_COLORS[priority] || 'bg-gray-100 text-gray-800'
}

// ===== Time Helpers =====
export const formatNotificationTime = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ===== Grouping Helpers =====
export const groupNotificationsByDate = (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return {}
  const groups = {}
  notifications.forEach((n) => {
    const date = new Date(n.createdAt).toDateString()
    if (!groups[date]) groups[date] = []
    groups[date].push(n)
  })
  return groups
}

// ===== Filter Helpers =====
export const filterNotificationsByType = (notifications, type) => {
  if (!type) return notifications
  return notifications.filter((n) => n.type === type)
}

export const filterNotificationsByPriority = (notifications, priority) => {
  if (!priority) return notifications
  return notifications.filter((n) => n.priority === priority)
}

// ===== Mark/Unmark =====
export const markAllNotificationsRead = (notifications) => {
  return notifications.map((n) => ({ ...n, read: true }))
}

// ===== Count Helpers =====
export const countUnread = (notifications) => {
  return notifications.filter((n) => !n.read).length
}

// ===== Sort Helpers =====
export const sortNotificationsByDate = (notifications, order = 'desc') => {
  if (!notifications || !Array.isArray(notifications)) return []
  const sorted = [...notifications].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return order === 'desc' ? dateB - dateA : dateA - dateB
  })
  return sorted
}
