/**
 * Notifications Constants
 * All notification-related constants in one place
 */

// ===== Notification Types =====
export const NOTIFICATION_TYPES = {
  ORDER_UPDATE: 'ORDER_UPDATE',
  PAYMENT: 'PAYMENT',
  SYSTEM: 'SYSTEM',
  PROMOTION: 'PROMOTION',
  REMINDER: 'REMINDER',
  ALERT: 'ALERT',
  DRIVER_ASSIGNED: 'DRIVER_ASSIGNED',
  DELIVERY_CONFIRMED: 'DELIVERY_CONFIRMED',
}

export const NOTIFICATION_TYPES_LABELS = {
  [NOTIFICATION_TYPES.ORDER_UPDATE]: 'Order Update',
  [NOTIFICATION_TYPES.PAYMENT]: 'Payment',
  [NOTIFICATION_TYPES.SYSTEM]: 'System',
  [NOTIFICATION_TYPES.PROMOTION]: 'Promotion',
  [NOTIFICATION_TYPES.REMINDER]: 'Reminder',
  [NOTIFICATION_TYPES.ALERT]: 'Alert',
  [NOTIFICATION_TYPES.DRIVER_ASSIGNED]: 'Driver Assigned',
  [NOTIFICATION_TYPES.DELIVERY_CONFIRMED]: 'Delivery Confirmed',
}

export const NOTIFICATION_TYPES_ICONS = {
  [NOTIFICATION_TYPES.ORDER_UPDATE]: '📦',
  [NOTIFICATION_TYPES.PAYMENT]: '💳',
  [NOTIFICATION_TYPES.SYSTEM]: '⚙️',
  [NOTIFICATION_TYPES.PROMOTION]: '🎉',
  [NOTIFICATION_TYPES.REMINDER]: '⏰',
  [NOTIFICATION_TYPES.ALERT]: '⚠️',
  [NOTIFICATION_TYPES.DRIVER_ASSIGNED]: '👤',
  [NOTIFICATION_TYPES.DELIVERY_CONFIRMED]: '✅',
}

// ===== Notification Priorities =====
export const NOTIFICATION_PRIORITIES = {
  LOW: 'LOW',
  NORMAL: 'NORMAL',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
}

export const NOTIFICATION_PRIORITIES_LABELS = {
  [NOTIFICATION_PRIORITIES.LOW]: 'Low',
  [NOTIFICATION_PRIORITIES.NORMAL]: 'Normal',
  [NOTIFICATION_PRIORITIES.HIGH]: 'High',
  [NOTIFICATION_PRIORITIES.URGENT]: 'Urgent',
}

export const NOTIFICATION_PRIORITIES_COLORS = {
  [NOTIFICATION_PRIORITIES.LOW]: 'bg-gray-100 text-gray-800',
  [NOTIFICATION_PRIORITIES.NORMAL]: 'bg-blue-100 text-blue-800',
  [NOTIFICATION_PRIORITIES.HIGH]: 'bg-yellow-100 text-yellow-800',
  [NOTIFICATION_PRIORITIES.URGENT]: 'bg-red-100 text-red-800',
}

// ===== Notification Error Messages =====
export const NOTIFICATION_ERRORS = {
  NOT_FOUND: 'Notification not found',
  FETCH_FAILED: 'Failed to fetch notifications',
  MARK_READ_FAILED: 'Failed to mark notification as read',
  MARK_ALL_READ_FAILED: 'Failed to mark all notifications as read',
  DELETE_FAILED: 'Failed to delete notification',
  SEND_FAILED: 'Failed to send notification',
  INVALID_TYPE: 'Invalid notification type',
}

// ===== Notification Success Messages =====
export const NOTIFICATION_SUCCESS = {
  MARKED_READ: 'Notification marked as read',
  ALL_MARKED_READ: 'All notifications marked as read',
  DELETED: 'Notification deleted',
  SENT: 'Notification sent successfully',
}

// ===== Notification API Endpoints =====
export const NOTIFICATION_API = {
  BASE: '/notifications',
  GET_ALL: '/notifications',
  GET_UNREAD: '/notifications/unread',
  MARK_READ: '/notifications/{id}/read',
  MARK_ALL_READ: '/notifications/read-all',
  DELETE: '/notifications/{id}',
  DELETE_ALL: '/notifications/delete-all',
  COUNT_UNREAD: '/notifications/count/unread',
  SEND: '/notifications/send',
}

// ===== Notification Routes =====
export const NOTIFICATION_ROUTES = {
  LIST: '/notifications',
  DETAILS: '/notifications/:id',
}

// ===== Notification Defaults =====
export const NOTIFICATION_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
  PRIORITY: NOTIFICATION_PRIORITIES.NORMAL,
}

// ===== WebSocket Events =====
export const WS_NOTIFICATION_EVENTS = {
  NOTIFICATION: 'notification',
  ORDER_UPDATE: 'order_update',
  PAYMENT_UPDATE: 'payment_update',
  DRIVER_UPDATE: 'driver_update',
}
