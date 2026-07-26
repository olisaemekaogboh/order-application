/**
 * Admin Validations
 * Validation functions for admin forms and operations
 */

// ===== User Management Validations =====
export const validateUserUpdate = (data) => {
  const errors = {}

  if (data.firstName !== undefined) {
    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters'
    }
    if (data.firstName && data.firstName.length > 50) {
      errors.firstName = 'First name must be less than 50 characters'
    }
  }

  if (data.lastName !== undefined) {
    if (!data.lastName || data.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters'
    }
    if (data.lastName && data.lastName.length > 50) {
      errors.lastName = 'Last name must be less than 50 characters'
    }
  }

  if (data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address'
    }
  }

  if (data.phoneNumber !== undefined) {
    const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
    if (data.phoneNumber && !phoneRegex.test(data.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number (e.g., 08012345678)'
    }
  }

  if (data.role !== undefined) {
    const validRoles = ['CLIENT', 'ADMIN', 'SUPER_ADMIN']
    if (!validRoles.includes(data.role)) {
      errors.role = 'Invalid role'
    }
  }

  return errors
}

// ===== Driver Management Validations =====
export const validateDriverRegistration = (data) => {
  const errors = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name is required and must be at least 2 characters'
  }

  if (!data.email) {
    errors.email = 'Email is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.email = 'Please enter a valid email address'
    }
  }

  if (!data.phoneNumber) {
    errors.phoneNumber = 'Phone number is required'
  } else {
    const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
    if (!phoneRegex.test(data.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number'
    }
  }

  if (!data.licenseNumber) {
    errors.licenseNumber = 'License number is required'
  }

  if (!data.vehicleType) {
    errors.vehicleType = 'Vehicle type is required'
  }

  if (!data.vehiclePlateNumber) {
    errors.vehiclePlateNumber = 'Vehicle plate number is required'
  }

  return errors
}

export const validateDriverUpdate = (data) => {
  const errors = {}

  if (data.name !== undefined && data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (data.phoneNumber !== undefined) {
    const phoneRegex = /^(?:\+234|0)([7-9][01])\d{8}$/
    if (data.phoneNumber && !phoneRegex.test(data.phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = 'Please enter a valid phone number'
    }
  }

  if (data.vehiclePlateNumber !== undefined && !data.vehiclePlateNumber) {
    errors.vehiclePlateNumber = 'Vehicle plate number is required'
  }

  return errors
}

// ===== Pricing Config Validations =====
export const validatePricingConfig = (data) => {
  const errors = {}

  if (!data.vehicleType) {
    errors.vehicleType = 'Vehicle type is required'
  }

  if (data.baseRatePerKm === undefined || data.baseRatePerKm === null || data.baseRatePerKm < 0) {
    errors.baseRatePerKm = 'Base rate per km is required and must be positive'
  }

  if (data.minimumCharge === undefined || data.minimumCharge === null || data.minimumCharge < 0) {
    errors.minimumCharge = 'Minimum charge is required and must be positive'
  }

  if (data.weightSurchargePerKg !== undefined && data.weightSurchargePerKg < 0) {
    errors.weightSurchargePerKg = 'Weight surcharge must be positive'
  }

  if (data.volumeSurchargePerCubicMeter !== undefined && data.volumeSurchargePerCubicMeter < 0) {
    errors.volumeSurchargePerCubicMeter = 'Volume surcharge must be positive'
  }

  if (data.expressSurcharge !== undefined && data.expressSurcharge < 0) {
    errors.expressSurcharge = 'Express surcharge must be positive'
  }

  if (data.effectiveFrom && data.effectiveTo) {
    if (new Date(data.effectiveFrom) > new Date(data.effectiveTo)) {
      errors.effectiveTo = 'End date must be after start date'
    }
  }

  return errors
}

// ===== System Config Validations =====
export const validateSystemConfig = (data) => {
  const errors = {}

  if (!data.configKey || data.configKey.trim().length < 2) {
    errors.configKey = 'Config key is required and must be at least 2 characters'
  }

  if (data.configValue === undefined || data.configValue === null) {
    errors.configValue = 'Config value is required'
  }

  return errors
}

// ===== Revenue Report Validations =====
export const validateRevenueReport = (data) => {
  const errors = {}

  if (!data.period) {
    errors.period = 'Report period is required'
  }

  if (data.startDate && isNaN(new Date(data.startDate).getTime())) {
    errors.startDate = 'Invalid start date'
  }

  if (data.endDate && isNaN(new Date(data.endDate).getTime())) {
    errors.endDate = 'Invalid end date'
  }

  if (data.startDate && data.endDate) {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      errors.endDate = 'End date must be after start date'
    }
  }

  return errors
}

// ===== Role Assignment Validation =====
export const validateRoleAssignment = (data) => {
  const errors = {}

  if (!data.userId) {
    errors.userId = 'User ID is required'
  }

  if (!data.role) {
    errors.role = 'Role is required'
  }

  const validRoles = ['CLIENT', 'ADMIN', 'SUPER_ADMIN']
  if (data.role && !validRoles.includes(data.role)) {
    errors.role = 'Invalid role'
  }

  return errors
}
