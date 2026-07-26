/**
 * Orders Validations
 * Validation functions for order forms and data
 */

// ===== Distance Validation =====
export const validateDistance = (distance) => {
  if (distance === undefined || distance === null) return 'Distance is required'
  const num = Number(distance)
  if (isNaN(num)) return 'Distance must be a number'
  if (num < 1) return 'Distance must be at least 1 km'
  if (num > 1000) return 'Distance cannot exceed 1000 km'
  return null
}

// ===== Weight Validation =====
export const validateWeight = (weight) => {
  if (weight === undefined || weight === null) return null // weight is optional
  const num = Number(weight)
  if (isNaN(num)) return 'Weight must be a number'
  if (num < 0) return 'Weight cannot be negative'
  if (num > 10000) return 'Weight cannot exceed 10000 kg'
  return null
}

// ===== Volume Validation =====
export const validateVolume = (volume) => {
  if (volume === undefined || volume === null) return null // volume is optional
  const num = Number(volume)
  if (isNaN(num)) return 'Volume must be a number'
  if (num < 0) return 'Volume cannot be negative'
  if (num > 100) return 'Volume cannot exceed 100 m³'
  return null
}

// ===== Vehicle Type Validation =====
export const validateVehicleType = (type) => {
  if (!type) return 'Vehicle type is required'
  const validTypes = ['MOTORCYCLE', 'MINI_VAN', 'STANDARD', 'TRUCK']
  if (!validTypes.includes(type)) return 'Invalid vehicle type'
  return null
}

// ===== Address Validation =====
export const validateAddress = (address) => {
  if (!address || address.trim().length < 3)
    return 'Address is required and must be at least 3 characters'
  if (address.trim().length > 255) return 'Address must be less than 255 characters'
  return null
}

// ===== Pickup Date Validation =====
export const validatePickupDate = (date) => {
  if (!date) return 'Pickup date is required'
  const now = new Date()
  const pickup = new Date(date)
  if (isNaN(pickup.getTime())) return 'Invalid date format'
  if (pickup < now) return 'Pickup date cannot be in the past'
  return null
}

// ===== Order Form Validation =====
export const validateOrderForm = (data) => {
  const errors = {}

  // Pickup Address
  const pickupError = validateAddress(data.pickupLocation)
  if (pickupError) errors.pickupLocation = pickupError

  // Delivery Address
  const deliveryError = validateAddress(data.deliveryLocation)
  if (deliveryError) errors.deliveryLocation = deliveryError

  // Distance
  const distanceError = validateDistance(data.distanceKm)
  if (distanceError) errors.distanceKm = distanceError

  // Weight
  const weightError = validateWeight(data.weight)
  if (weightError) errors.weight = weightError

  // Volume
  const volumeError = validateVolume(data.volume)
  if (volumeError) errors.volume = volumeError

  // Vehicle Type
  const vehicleError = validateVehicleType(data.vehicleType)
  if (vehicleError) errors.vehicleType = vehicleError

  // Pickup Date
  const pickupDateError = validatePickupDate(data.pickupDate)
  if (pickupDateError) errors.pickupDate = pickupDateError

  // Check if pickup and delivery are the same
  if (data.pickupLocation && data.deliveryLocation) {
    if (data.pickupLocation.trim().toLowerCase() === data.deliveryLocation.trim().toLowerCase()) {
      errors.deliveryLocation = 'Pickup and delivery locations cannot be the same'
    }
  }

  return errors
}

// ===== Price Calculation Validation =====
export const validatePriceCalculation = (data) => {
  const errors = {}

  const distanceError = validateDistance(data.distanceKm)
  if (distanceError) errors.distanceKm = distanceError

  const vehicleError = validateVehicleType(data.vehicleType)
  if (vehicleError) errors.vehicleType = vehicleError

  const weightError = validateWeight(data.weight)
  if (weightError) errors.weight = weightError

  const volumeError = validateVolume(data.volume)
  if (volumeError) errors.volume = volumeError

  return errors
}

// ===== Order Status Transition Validation =====
export const validateStatusTransition = (currentStatus, newStatus) => {
  const transitions = {
    PENDING: ['ASSIGNED', 'CANCELLED'],
    ASSIGNED: ['PICKED_UP', 'CANCELLED'],
    PICKED_UP: ['IN_TRANSIT', 'CANCELLED'],
    IN_TRANSIT: ['DELIVERED', 'CANCELLED'],
    DELIVERED: [],
    CANCELLED: [],
  }

  const allowed = transitions[currentStatus] || []
  if (!allowed.includes(newStatus)) {
    return `Cannot transition from ${currentStatus} to ${newStatus}`
  }
  return null
}

// ===== Payment Status Validation =====
export const validatePaymentStatus = (status) => {
  const validStatuses = ['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED']
  if (!validStatuses.includes(status)) return 'Invalid payment status'
  return null
}

// ===== Order Number Validation =====
export const validateOrderNumber = (orderNumber) => {
  if (!orderNumber) return 'Order number is required'
  const pattern = /^LOG\d{14}$/
  if (!pattern.test(orderNumber)) return 'Invalid order number format'
  return null
}

// ===== Search Filter Validation =====
export const validateOrderFilters = (filters) => {
  const errors = {}

  if (filters.page !== undefined && (filters.page < 0 || !Number.isInteger(filters.page))) {
    errors.page = 'Page must be a positive integer'
  }

  if (
    filters.size !== undefined &&
    (filters.size < 1 || filters.size > 100 || !Number.isInteger(filters.size))
  ) {
    errors.size = 'Size must be between 1 and 100'
  }

  if (filters.startDate && isNaN(new Date(filters.startDate).getTime())) {
    errors.startDate = 'Invalid start date'
  }

  if (filters.endDate && isNaN(new Date(filters.endDate).getTime())) {
    errors.endDate = 'Invalid end date'
  }

  if (
    filters.minPrice !== undefined &&
    (isNaN(Number(filters.minPrice)) || Number(filters.minPrice) < 0)
  ) {
    errors.minPrice = 'Minimum price must be a positive number'
  }

  if (
    filters.maxPrice !== undefined &&
    (isNaN(Number(filters.maxPrice)) || Number(filters.maxPrice) < 0)
  ) {
    errors.maxPrice = 'Maximum price must be a positive number'
  }

  return errors
}
