/**
 * Auth Validations
 * Validation schemas and functions for authentication
 */

// ===== Email Validation =====
export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  if (email.length > 100) return 'Email must be less than 100 characters'
  return null
}

// ===== Password Validation =====
export const validatePassword = (password) => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (password.length > 100) return 'Password must be less than 100 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number'
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
  }
  return null
}

// ===== Confirm Password Validation =====
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return null
}

// ===== Phone Number Validation =====
export const validatePhone = (phone) => {
  if (!phone) return null // Phone is optional
  // Nigerian phone number format: 08012345678 or +2348012345678
  const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number (e.g., 08012345678 or +2348012345678)'
  }
  return null
}

// ===== Name Validation =====
export const validateName = (name, field = 'Name') => {
  if (!name) return `${field} is required`
  if (name.length < 2) return `${field} must be at least 2 characters`
  if (name.length > 50) return `${field} must be less than 50 characters`
  if (!/^[a-zA-Z\s-']+$/.test(name))
    return `${field} can only contain letters, spaces, hyphens, and apostrophes`
  return null
}

// ===== Login Form Validation =====
export const validateLoginForm = (data) => {
  const errors = {}

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  return errors
}

// ===== Register Form Validation =====
export const validateRegisterForm = (data) => {
  const errors = {}

  const firstNameError = validateName(data.firstName, 'First name')
  if (firstNameError) errors.firstName = firstNameError

  const lastNameError = validateName(data.lastName, 'Last name')
  if (lastNameError) errors.lastName = lastNameError

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const phoneError = validatePhone(data.phoneNumber)
  if (phoneError) errors.phoneNumber = phoneError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword)
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError

  // Terms acceptance
  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions'
  }

  return errors
}

// ===== Forgot Password Validation =====
export const validateForgotPassword = (data) => {
  const errors = {}
  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError
  return errors
}

// ===== Reset Password Validation =====
export const validateResetPassword = (data) => {
  const errors = {}

  const passwordError = validatePassword(data.newPassword)
  if (passwordError) errors.newPassword = passwordError

  const confirmPasswordError = validateConfirmPassword(data.newPassword, data.confirmPassword)
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError

  return errors
}

// ===== Password Strength Checker =====
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Weak', color: 'red' }

  let score = 0

  // Length
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1

  // Complexity
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1

  let label, color
  if (score <= 2) {
    label = 'Weak'
    color = 'red'
  } else if (score <= 4) {
    label = 'Medium'
    color = 'yellow'
  } else {
    label = 'Strong'
    color = 'green'
  }

  return { score, label, color }
}

// ===== Password Requirements Check =====
export const getPasswordRequirements = (password) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
}

// ===== OTP Validation =====
export const validateOTP = (otp) => {
  if (!otp) return 'OTP is required'
  if (!/^\d{6}$/.test(otp)) return 'OTP must be a 6-digit number'
  return null
}

// ===== Form Helpers =====
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0
}

export const getFieldError = (errors, field) => {
  return errors[field] || null
}
