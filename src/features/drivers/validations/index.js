/**
 * Drivers Validations
 * Validation functions for driver registration and updates
 */

// ===== Name Validation =====
export const validateDriverName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'Name must be at least 2 characters'
  }
  if (name.trim().length > 100) {
    return 'Name must be less than 100 characters'
  }
  return null
}

// ===== Email Validation =====
export const validateDriverEmail = (email) => {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Please enter a valid email address'
  return null
}

// ===== Phone Validation =====
export const validateDriverPhone = (phone) => {
  if (!phone) return 'Phone number is required'
  const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Please enter a valid phone number (e.g., 08012345678)'
  }
  return null
}

// ===== License Number Validation =====
export const validateLicenseNumber = (license) => {
  if (!license || license.trim().length < 3) {
    return 'License number is required and must be at least 3 characters'
  }
  if (license.trim().length > 50) {
    return 'License number must be less than 50 characters'
  }
  return null
}

// ===== Vehicle Plate Validation =====
export const validateVehiclePlate = (plate) => {
  if (!plate || plate.trim().length < 3) {
    return 'Vehicle plate number is required and must be at least 3 characters'
  }
  if (plate.trim().length > 20) {
    return 'Vehicle plate number must be less than 20 characters'
  }
  return null
}

// ===== Vehicle Type Validation =====
export const validateVehicleType = (type) => {
  const validTypes = ['MOTORCYCLE', 'MINI_VAN', 'STANDARD', 'TRUCK']
  if (!type) return 'Vehicle type is required'
  if (!validTypes.includes(type)) return 'Invalid vehicle type'
  return null
}

// ===== Bank Account Validation =====
export const validateBankAccount = (accountNumber, bankName) => {
  const errors = {}
  if (accountNumber) {
    if (!/^\d{10}$/.test(accountNumber.replace(/\s/g, ''))) {
      errors.accountNumber = 'Account number must be 10 digits'
    }
  }
  if (bankName && bankName.trim().length < 2) {
    errors.bankName = 'Bank name must be at least 2 characters'
  }
  return errors
}

// ===== Driver Registration Validation =====
export const validateDriverRegistration = (data) => {
  const errors = {}

  const nameError = validateDriverName(data.name)
  if (nameError) errors.name = nameError

  const emailError = validateDriverEmail(data.email)
  if (emailError) errors.email = emailError

  const phoneError = validateDriverPhone(data.phoneNumber)
  if (phoneError) errors.phoneNumber = phoneError

  const licenseError = validateLicenseNumber(data.licenseNumber)
  if (licenseError) errors.licenseNumber = licenseError

  const vehicleError = validateVehicleType(data.vehicleType)
  if (vehicleError) errors.vehicleType = vehicleError

  const plateError = validateVehiclePlate(data.vehiclePlateNumber)
  if (plateError) errors.vehiclePlateNumber = plateError

  // Bank details (optional)
  if (data.accountNumber || data.bankName) {
    const bankErrors = validateBankAccount(data.accountNumber, data.bankName)
    Object.assign(errors, bankErrors)
  }

  return errors
}

// ===== Driver Update Validation =====
export const validateDriverUpdate = (data) => {
  const errors = {}

  if (data.name !== undefined) {
    const nameError = validateDriverName(data.name)
    if (nameError) errors.name = nameError
  }

  if (data.phoneNumber !== undefined) {
    const phoneError = validateDriverPhone(data.phoneNumber)
    if (phoneError) errors.phoneNumber = phoneError
  }

  if (data.licenseNumber !== undefined) {
    const licenseError = validateLicenseNumber(data.licenseNumber)
    if (licenseError) errors.licenseNumber = licenseError
  }

  if (data.vehicleType !== undefined) {
    const vehicleError = validateVehicleType(data.vehicleType)
    if (vehicleError) errors.vehicleType = vehicleError
  }

  if (data.vehiclePlateNumber !== undefined) {
    const plateError = validateVehiclePlate(data.vehiclePlateNumber)
    if (plateError) errors.vehiclePlateNumber = plateError
  }

  return errors
}

// ===== Driver Availability Validation =====
export const validateDriverAvailability = (available) => {
  if (available === undefined || available === null) {
    return 'Availability status is required'
  }
  if (typeof available !== 'boolean') {
    return 'Availability must be a boolean'
  }
  return null
}

// ===== Driver Payment Validation =====
export const validateDriverPayment = (amount) => {
  if (amount === undefined || amount === null) {
    return 'Payment amount is required'
  }
  if (typeof amount !== 'number' || amount <= 0) {
    return 'Amount must be a positive number'
  }
  return null
}
