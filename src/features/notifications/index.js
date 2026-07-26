/**
 * Notifications Feature Index
 * Main entry point for the notifications feature
 */

// ===== Components =====
export { default as NotificationBell } from './components/NotificationBell/NotificationBell'
export { default as NotificationPage } from './components/NotificationPage/NotificationPage'
export { NotificationProvider } from './components/NotificationContext/NotificationProvider'

// ===== Hooks =====
export { useNotifications } from './hooks/useNotifications'

// ===== Services =====
export { notificationService } from './services/notificationService'

// ===== Constants =====
export {
  NOTIFICATION_TYPES,
  NOTIFICATION_TYPES_LABELS,
  NOTIFICATION_TYPES_ICONS,
  NOTIFICATION_PRIORITIES,
  NOTIFICATION_PRIORITIES_LABELS,
  NOTIFICATION_PRIORITIES_COLORS,
  NOTIFICATION_ERRORS,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_API,
  NOTIFICATION_ROUTES,
  NOTIFICATION_DEFAULTS,
  WS_NOTIFICATION_EVENTS,
} from './constants'

// ===== Validations =====
export {
  validateNotificationType,
  validateNotificationPriority,
  validateNotificationMessage,
  validateNotificationTitle,
  validateNotificationFilters,
} from './validations'

// ===== Utils =====
export {
  getNotificationTypeLabel,
  getNotificationTypeIcon,
  getNotificationPriorityLabel,
  getNotificationPriorityColor,
  formatNotificationTime,
  groupNotificationsByDate,
  filterNotificationsByType,
  filterNotificationsByPriority,
  markAllNotificationsRead,
  countUnread,
  sortNotificationsByDate,
} from './utils'
