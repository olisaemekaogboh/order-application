/**
 * Drivers Utilities
 * Helper functions for driver management
 */

import { VEHICLE_TYPES_LABELS, DRIVER_STATUSES_LABELS } from '../constants'

// ===== Status Helpers =====
export const getDriverStatus = (driver) => {
  if (!driver) return 'unknown'
  if (!driver.available) return 'busy'
  return 'available'
}

export const getDriverStatusLabel = (driver) => {
  const status = getDriverStatus(driver)
  return DRIVER_STATUSES_LABELS[status] || status
}

export const getDriverStatusColor = (driver) => {
  const colors = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    busy: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    offline: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  }
  return colors[getDriverStatus(driver)] || colors.unknown
}

// ===== Vehicle Helpers =====
export const getVehicleTypeLabel = (type) => {
  return VEHICLE_TYPES_LABELS[type] || type
}

// ===== Rating Helpers =====
export const formatRating = (rating) => {
  if (rating === undefined || rating === null) return 'N/A'
  return rating.toFixed(1)
}

export const getRatingColor = (rating) => {
  if (rating >= 4.5) return 'text-green-600 dark:text-green-400'
  if (rating >= 3.5) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

// ===== Earning Helpers =====
export const formatEarnings = (amount, currency = 'NGN') => {
  if (amount === undefined || amount === null) return '₦0.00'
  if (currency === 'NGN') {
    return `₦${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export const calculateCommission = (amount, rate = 0.05) => {
  return amount * rate
}

// ===== Search Helpers =====
export const filterDrivers = (drivers, searchTerm) => {
  if (!searchTerm) return drivers
  const lower = searchTerm.toLowerCase()
  return drivers.filter(
    (d) =>
      d.name?.toLowerCase().includes(lower) ||
      d.email?.toLowerCase().includes(lower) ||
      d.phoneNumber?.includes(searchTerm) ||
      d.vehiclePlateNumber?.toLowerCase().includes(lower)
  )
}

// ===== Sort Helpers =====
export const sortDrivers = (drivers, sortBy, sortDirection = 'asc') => {
  if (!drivers || !Array.isArray(drivers)) return drivers
  const sorted = [...drivers].sort((a, b) => {
    const valA = a[sortBy] || ''
    const valB = b[sortBy] || ''
    if (typeof valA === 'string') {
      return valA.localeCompare(valB)
    }
    return valA - valB
  })
  return sortDirection === 'desc' ? sorted.reverse() : sorted
}

// ===== Map Driver Data =====
export const mapDriverResponse = (driver) => {
  if (!driver) return null
  return {
    ...driver,
    formattedRating: formatRating(driver.rating),
    formattedEarnings: formatEarnings(driver.totalEarnings),
    statusLabel: getDriverStatusLabel(driver),
    vehicleLabel: getVehicleTypeLabel(driver.vehicleType),
    statusColor: getDriverStatusColor(driver),
    fullName: driver.name,
  }
}

export const mapDriverList = (drivers) => {
  if (!Array.isArray(drivers)) return []
  return drivers.map(mapDriverResponse)
}
