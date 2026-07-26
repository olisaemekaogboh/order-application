/**
 * Settings Validations
 * Validation functions for settings forms and data
 */

// ===== Profile Validations =====
export const validateFirstName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'First name must be at least 2 characters'
  }
  if (name.trim().length > 50) {
    return 'First name must be less than 50 characters'
  }
  return null
}

export const validateLastName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'Last name must be at least 2 characters'
  }
  if (name.trim().length > 50) {
    return 'Last name must be less than 50 characters'
  }
  return null
}

export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  return null
}

export const validatePhone = (phone) => {
  if (!phone) return null
  const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number (e.g., 08012345678)'
  }
  return null
}

// ===== Password Validations =====
export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (password.length > 100) return 'Password must be less than 100 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character'
  }
  return null
}

export const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return 'Please confirm your password'
  if (password !== confirm) return 'Passwords do not match'
  return null
}

// ===== Profile Form Validation =====
export const validateProfileForm = (data) => {
  const errors = {}
  const firstNameError = validateFirstName(data.firstName)
  if (firstNameError) errors.firstName = firstNameError
  const lastNameError = validateLastName(data.lastName)
  if (lastNameError) errors.lastName = lastNameError
  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError
  const phoneError = validatePhone(data.phoneNumber)
  if (phoneError) errors.phoneNumber = phoneError
  return errors
}

// ===== Password Change Validation =====
export const validatePasswordChange = (data) => {
  const errors = {}
  if (!data.currentPassword) errors.currentPassword = 'Current password is required'
  const newPassError = validatePassword(data.newPassword)
  if (newPassError) errors.newPassword = newPassError
  const confirmError = validateConfirmPassword(data.newPassword, data.confirmPassword)
  if (confirmError) errors.confirmPassword = confirmError
  return errors
}

// ===== Notification Settings Validation =====
export const validateNotificationSettings = (data) => {
  const errors = {}
  // All fields are boolean, no validation needed
  return errors
}

// ===== Setting Value Validation =====
export const validateSettingValue = (key, value) => {
  const validations = {
    'preferences.language': (v) =>
      ['en', 'yo', 'ha', 'ig', 'fr'].includes(v) ? null : 'Invalid language',
    'preferences.theme': (v) => (['light', 'dark', 'system'].includes(v) ? null : 'Invalid theme'),
    'preferences.timezone': (v) => (v && v.length > 0 ? null : 'Invalid timezone'),
    'preferences.currency': (v) =>
      ['NGN', 'USD', 'EUR', 'GBP'].includes(v) ? null : 'Invalid currency',
    'notifications.email': (v) => (typeof v === 'boolean' ? null : 'Must be a boolean'),
    'notifications.sms': (v) => (typeof v === 'boolean' ? null : 'Must be a boolean'),
    'notifications.push': (v) => (typeof v === 'boolean' ? null : 'Must be a boolean'),
    'security.twoFactor': (v) => (typeof v === 'boolean' ? null : 'Must be a boolean'),
    'security.sessionTimeout': (v) =>
      Number.isInteger(v) && v > 0 ? null : 'Must be a positive integer',
  }
  const validator = validations[key]
  if (!validator) return null
  return validator(value)
}
