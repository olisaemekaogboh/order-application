/**
 * Tracking Validations
 * Validation functions for tracking operations
 */

// ===== Order ID Validation =====
export const validateOrderId = (orderId) => {
  if (!orderId) return 'Order ID is required'
  if (typeof orderId !== 'string' || orderId.trim().length === 0) {
    return 'Invalid order ID'
  }
  return null
}

// ===== Tracking Filter Validation =====
export const validateTrackingFilters = (filters) => {
  const errors = {}

  if (filters.status) {
    const validStatuses = [
      'PENDING',
      'ASSIGNED',
      'PICKED_UP',
      'IN_TRANSIT',
      'DELIVERED',
      'CANCELLED',
    ]
    if (!validStatuses.includes(filters.status)) {
      errors.status = 'Invalid tracking status'
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

// ===== Location Validation =====
export const validateLocation = (latitude, longitude) => {
  const errors = {}

  if (latitude === undefined || latitude === null) {
    errors.latitude = 'Latitude is required'
  } else if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
    errors.latitude = 'Latitude must be between -90 and 90'
  }

  if (longitude === undefined || longitude === null) {
    errors.longitude = 'Longitude is required'
  } else if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
    errors.longitude = 'Longitude must be between -180 and 180'
  }

  return errors
}
