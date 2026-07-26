/**
 * Support Validations
 * Validation functions for tickets and messages
 */

// ===== Ticket Validation =====
export const validateTicketTitle = (title) => {
  if (!title) return 'Title is required'
  if (title.trim().length < 3) return 'Title must be at least 3 characters'
  if (title.trim().length > 200) return 'Title must be less than 200 characters'
  return null
}

export const validateTicketDescription = (description) => {
  if (!description) return 'Description is required'
  if (description.trim().length < 10) return 'Description must be at least 10 characters'
  if (description.trim().length > 5000) return 'Description must be less than 5000 characters'
  return null
}

export const validateTicketCategory = (category) => {
  const validCategories = [
    'ORDER_ISSUE',
    'PAYMENT_ISSUE',
    'DELIVERY_ISSUE',
    'DRIVER_ISSUE',
    'ACCOUNT_ISSUE',
    'GENERAL_INQUIRY',
    'FEATURE_REQUEST',
    'COMPLAINT',
    'OTHER',
  ]
  if (!category) return 'Category is required'
  if (!validCategories.includes(category)) return 'Invalid category'
  return null
}

export const validateTicketPriority = (priority) => {
  const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']
  if (!priority) return null // optional
  if (!validPriorities.includes(priority)) return 'Invalid priority'
  return null
}

// ===== Message Validation =====
export const validateMessageContent = (content) => {
  if (!content) return 'Message is required'
  if (content.trim().length < 2) return 'Message must be at least 2 characters'
  if (content.trim().length > 5000) return 'Message must be less than 5000 characters'
  return null
}

// ===== Ticket Form Validation =====
export const validateTicketForm = (data) => {
  const errors = {}
  const titleError = validateTicketTitle(data.title)
  if (titleError) errors.title = titleError
  const descError = validateTicketDescription(data.description)
  if (descError) errors.description = descError
  const catError = validateTicketCategory(data.category)
  if (catError) errors.category = catError
  const priorityError = validateTicketPriority(data.priority)
  if (priorityError) errors.priority = priorityError
  return errors
}

// ===== Ticket Filter Validation =====
export const validateTicketFilters = (filters) => {
  const errors = {}

  if (filters.status) {
    const validStatuses = ['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED']
    if (!validStatuses.includes(filters.status)) {
      errors.status = 'Invalid status'
    }
  }

  if (filters.priority) {
    const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']
    if (!validPriorities.includes(filters.priority)) {
      errors.priority = 'Invalid priority'
    }
  }

  if (filters.category) {
    const validCategories = [
      'ORDER_ISSUE',
      'PAYMENT_ISSUE',
      'DELIVERY_ISSUE',
      'DRIVER_ISSUE',
      'ACCOUNT_ISSUE',
      'GENERAL_INQUIRY',
      'FEATURE_REQUEST',
      'COMPLAINT',
      'OTHER',
    ]
    if (!validCategories.includes(filters.category)) {
      errors.category = 'Invalid category'
    }
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
