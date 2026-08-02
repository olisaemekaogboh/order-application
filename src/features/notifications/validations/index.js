/**
 * Notifications Validations
 * Validation functions for notification operations
 */

export const validateNotificationType = (type) => {
  const validTypes = [
    'ORDER_UPDATE',
    'PAYMENT',
    'SYSTEM',
    'PROMOTION',
    'REMINDER',
    'ALERT',
    'DRIVER_ASSIGNED',
    'DELIVERY_CONFIRMED',
    'REVIEW_APPROVED',
    'REVIEW_REJECTED',
    'REVIEW_REPORTED',
    'REVIEW_CREATED',
    'REVIEW_UPDATED',
    'REVIEW_DELETED',
  ]
  if (!type) return 'Notification type is required'
  if (!validTypes.includes(type)) return 'Invalid notification type'
  return null
}

export const validateNotificationPriority = (priority) => {
  const validPriorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT']
  if (!priority) return null
  if (!validPriorities.includes(priority)) return 'Invalid priority'
  return null
}

export const validateNotificationMessage = (message) => {
  if (!message) return 'Message is required'
  if (message.trim().length < 2) return 'Message must be at least 2 characters'
  if (message.trim().length > 1000) return 'Message must be less than 1000 characters'
  return null
}

export const validateNotificationTitle = (title) => {
  if (!title) return 'Title is required'
  if (title.trim().length < 2) return 'Title must be at least 2 characters'
  if (title.trim().length > 255) return 'Title must be less than 255 characters'
  return null
}

export const validateNotificationFilters = (filters) => {
  const errors = {}

  if (filters.type) {
    const typeError = validateNotificationType(filters.type)
    if (typeError) errors.type = typeError
  }

  if (filters.priority) {
    const priorityError = validateNotificationPriority(filters.priority)
    if (priorityError) errors.priority = priorityError
  }

  if (filters.startDate && isNaN(new Date(filters.startDate).getTime())) {
    errors.startDate = 'Invalid start date'
  }

  if (filters.endDate && isNaN(new Date(filters.endDate).getTime())) {
    errors.endDate = 'Invalid end date'
  }

  if (filters.startDate && filters.endDate) {
    if (new Date(filters.startDate) > new Date(filters.endDate)) {
      errors.endDate = 'End date must be after start date'
    }
  }

  return errors
}
