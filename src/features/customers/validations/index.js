/**
 * Customers Validations
 * Validation functions for customer management
 */

// ===== Name Validation =====
export const validateCustomerName = (name, field = 'Name') => {
  if (!name || name.trim().length < 2) {
    return `${field} must be at least 2 characters`
  }
  if (name.trim().length > 50) {
    return `${field} must be less than 50 characters`
  }
  if (!/^[a-zA-Z\s-']+$/.test(name)) {
    return `${field} can only contain letters, spaces, hyphens, and apostrophes`
  }
  return null
}

// ===== Email Validation =====
export const validateCustomerEmail = (email) => {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  return null
}

// ===== Phone Validation =====
export const validateCustomerPhone = (phone) => {
  if (!phone) return null // optional
  const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number (e.g., 08012345678)'
  }
  return null
}

// ===== Role Validation =====
export const validateCustomerRole = (role) => {
  const validRoles = ['CLIENT', 'ADMIN', 'SUPER_ADMIN']
  if (!role) return 'Role is required'
  if (!validRoles.includes(role)) return 'Invalid role'
  return null
}

// ===== Status Validation =====
export const validateCustomerStatus = (status) => {
  const validStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']
  if (!status) return 'Status is required'
  if (!validStatuses.includes(status)) return 'Invalid status'
  return null
}

// ===== Customer Update Validation =====
export const validateCustomerUpdate = (data) => {
  const errors = {}

  if (data.firstName !== undefined) {
    const nameError = validateCustomerName(data.firstName, 'First name')
    if (nameError) errors.firstName = nameError
  }

  if (data.lastName !== undefined) {
    const nameError = validateCustomerName(data.lastName, 'Last name')
    if (nameError) errors.lastName = nameError
  }

  if (data.email !== undefined) {
    const emailError = validateCustomerEmail(data.email)
    if (emailError) errors.email = emailError
  }

  if (data.phoneNumber !== undefined) {
    const phoneError = validateCustomerPhone(data.phoneNumber)
    if (phoneError) errors.phoneNumber = phoneError
  }

  if (data.role !== undefined) {
    const roleError = validateCustomerRole(data.role)
    if (roleError) errors.role = roleError
  }

  if (data.status !== undefined) {
    const statusError = validateCustomerStatus(data.status)
    if (statusError) errors.status = statusError
  }

  return errors
}

// ===== Customer Search Validation =====
export const validateCustomerSearch = (query) => {
  if (!query) return null
  if (query.trim().length < 2) {
    return 'Search query must be at least 2 characters'
  }
  if (query.trim().length > 100) {
    return 'Search query must be less than 100 characters'
  }
  return null
}

// ===== Customer Filter Validation =====
export const validateCustomerFilters = (filters) => {
  const errors = {}

  if (filters.role) {
    const roleError = validateCustomerRole(filters.role)
    if (roleError) errors.role = roleError
  }

  if (filters.status) {
    const statusError = validateCustomerStatus(filters.status)
    if (statusError) errors.status = statusError
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
