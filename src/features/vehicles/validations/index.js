/**
 * Vehicles Validations
 * Validation functions for vehicle management
 */

import { VEHICLE_STATUSES, VEHICLE_TYPES, FUEL_TYPES, MAINTENANCE_TYPES } from '../constants'

// ===== Plate Number Validation =====
export const validatePlateNumber = (plate) => {
  if (!plate) return 'Plate number is required'
  if (plate.trim().length < 3) return 'Plate number must be at least 3 characters'
  if (plate.trim().length > 20) return 'Plate number must be less than 20 characters'
  return null
}

// ===== Vehicle Model Validation =====
export const validateVehicleModel = (model) => {
  if (!model) return 'Vehicle model is required'
  if (model.trim().length < 2) return 'Model must be at least 2 characters'
  if (model.trim().length > 50) return 'Model must be less than 50 characters'
  return null
}

// ===== Vehicle Make Validation =====
export const validateVehicleMake = (make) => {
  if (!make) return 'Vehicle make is required'
  if (make.trim().length < 2) return 'Make must be at least 2 characters'
  if (make.trim().length > 30) return 'Make must be less than 30 characters'
  return null
}

// ===== Vehicle Year Validation =====
export const validateVehicleYear = (year) => {
  if (!year) return 'Year is required'
  const numYear = Number(year)
  if (isNaN(numYear) || !Number.isInteger(numYear)) return 'Year must be a valid number'
  if (numYear < 1980) return 'Year must be 1980 or later'
  if (numYear > new Date().getFullYear() + 1) return 'Year cannot be in the future'
  return null
}

// ===== Vehicle Type Validation =====
export const validateVehicleType = (type) => {
  const validTypes = Object.values(VEHICLE_TYPES)
  if (!type) return 'Vehicle type is required'
  if (!validTypes.includes(type)) return 'Invalid vehicle type'
  return null
}

// ===== Fuel Type Validation =====
export const validateFuelType = (fuelType) => {
  const validFuelTypes = Object.values(FUEL_TYPES)
  if (!fuelType) return null
  if (!validFuelTypes.includes(fuelType)) return 'Invalid fuel type'
  return null
}

// ===== Vehicle Status Validation =====
export const validateVehicleStatus = (status) => {
  const validStatuses = Object.values(VEHICLE_STATUSES)
  if (!status) return 'Status is required'
  if (!validStatuses.includes(status)) return 'Invalid vehicle status'
  return null
}

// ===== Mileage Validation =====
export const validateMileage = (mileage) => {
  if (mileage === undefined || mileage === null) return null
  const num = Number(mileage)
  if (isNaN(num)) return 'Mileage must be a number'
  if (num < 0) return 'Mileage cannot be negative'
  return null
}

// ===== Vehicle Form Validation =====
export const validateVehicleForm = (data) => {
  const errors = {}

  const plateError = validatePlateNumber(data.plateNumber)
  if (plateError) errors.plateNumber = plateError

  const makeError = validateVehicleMake(data.make)
  if (makeError) errors.make = makeError

  const modelError = validateVehicleModel(data.model)
  if (modelError) errors.model = modelError

  const yearError = validateVehicleYear(data.year)
  if (yearError) errors.year = yearError

  const typeError = validateVehicleType(data.type)
  if (typeError) errors.type = typeError

  const fuelError = validateFuelType(data.fuelType)
  if (fuelError) errors.fuelType = fuelError

  const statusError = validateVehicleStatus(data.status)
  if (statusError) errors.status = statusError

  const mileageError = validateMileage(data.mileage)
  if (mileageError) errors.mileage = mileageError

  return errors
}

// ===== Maintenance Validation =====
export const validateMaintenance = (data) => {
  const errors = {}

  if (!data.type) {
    errors.type = 'Maintenance type is required'
  } else {
    const validTypes = Object.values(MAINTENANCE_TYPES)
    if (!validTypes.includes(data.type)) {
      errors.type = 'Invalid maintenance type'
    }
  }

  if (!data.description || data.description.trim().length < 3) {
    errors.description = 'Description must be at least 3 characters'
  }

  if (data.cost !== undefined && data.cost !== null) {
    const numCost = Number(data.cost)
    if (isNaN(numCost) || numCost < 0) {
      errors.cost = 'Cost must be a positive number'
    }
  }

  if (data.date && isNaN(new Date(data.date).getTime())) {
    errors.date = 'Invalid date'
  }

  return errors
}

// ===== Vehicle Filters Validation =====
export const validateVehicleFilters = (filters) => {
  const errors = {}

  if (filters.status) {
    const statusError = validateVehicleStatus(filters.status)
    if (statusError) errors.status = statusError
  }

  if (filters.type) {
    const typeError = validateVehicleType(filters.type)
    if (typeError) errors.type = typeError
  }

  if (filters.fuelType) {
    const fuelError = validateFuelType(filters.fuelType)
    if (fuelError) errors.fuelType = fuelError
  }

  if (filters.startYear && isNaN(Number(filters.startYear))) {
    errors.startYear = 'Invalid year'
  }

  if (filters.endYear && isNaN(Number(filters.endYear))) {
    errors.endYear = 'Invalid year'
  }

  if (filters.startYear && filters.endYear) {
    if (Number(filters.startYear) > Number(filters.endYear)) {
      errors.endYear = 'End year must be after start year'
    }
  }

  return errors
}
