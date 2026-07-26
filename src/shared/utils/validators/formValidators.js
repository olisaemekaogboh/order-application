// ===== Email Validation =====
export const validateEmail = (email) => {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
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
    return 'Password must contain at least one special character'
  }
  return null
}

// ===== Confirm Password Validation =====
export const validateConfirmPassword = (password, confirm) => {
  if (!confirm) return 'Please confirm your password'
  if (password !== confirm) return 'Passwords do not match'
  return null
}

// ===== Phone Validation =====
export const validatePhone = (phone) => {
  if (!phone) return null
  const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number (e.g., 08012345678)'
  }
  return null
}

// ===== Name Validation =====
export const validateName = (name, field = 'Name') => {
  if (!name || name.trim().length < 2) {
    return `${field} must be at least 2 characters`
  }
  if (name.trim().length > 50) {
    return `${field} must be less than 50 characters`
  }
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
  const confirmError = validateConfirmPassword(data.password, data.confirmPassword)
  if (confirmError) errors.confirmPassword = confirmError
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
  const confirmError = validateConfirmPassword(data.newPassword, data.confirmPassword)
  if (confirmError) errors.confirmPassword = confirmError
  return errors
}

// ===== Password Strength =====
export const getPasswordStrength = (password) => {
  if (!password) return 'WEAK'
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
  if (score <= 2) return 'WEAK'
  if (score <= 4) return 'MEDIUM'
  return 'STRONG'
}

// ===== Password Requirements =====
export const getPasswordRequirements = () => {
  return [
    'At least 8 characters',
    'At least one uppercase letter',
    'At least one lowercase letter',
    'At least one number',
    'At least one special character (!@#$%^&*(),.?":{}|<>)',
  ]
}

// ===== OTP Validation =====
export const validateOTP = (otp) => {
  if (!otp) return 'OTP is required'
  if (!/^\d{6}$/.test(otp)) return 'OTP must be a 6-digit number'
  return null
}

// ===== Form Helpers =====
export const isFormValid = (errors) => {
  return Object.keys(errors).every((key) => !errors[key])
}

export const getFieldError = (errors, field) => {
  return errors[field] || null
}
