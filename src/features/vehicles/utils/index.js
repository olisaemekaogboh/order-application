/**
 * Vehicles Utilities
 * Helper functions for vehicle management
 */

import {
  VEHICLE_STATUSES_LABELS,
  VEHICLE_STATUSES_COLORS,
  VEHICLE_TYPES_LABELS,
  VEHICLE_TYPES_ICONS,
  FUEL_TYPES_LABELS,
  MAINTENANCE_TYPES_LABELS,
} from '../constants'

// ===== Status Helpers =====
export const getVehicleStatusLabel = (status) => {
  return VEHICLE_STATUSES_LABELS[status] || status
}

export const getVehicleStatusColor = (status) => {
  return (
    VEHICLE_STATUSES_COLORS[status] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  )
}

// ===== Type Helpers =====
export const getVehicleTypeLabel = (type) => {
  return VEHICLE_TYPES_LABELS[type] || type
}

export const getVehicleTypeIcon = (type) => {
  return VEHICLE_TYPES_ICONS[type] || '🚗'
}

// ===== Fuel Type Helpers =====
export const getFuelTypeLabel = (fuelType) => {
  return FUEL_TYPES_LABELS[fuelType] || fuelType
}

// ===== Maintenance Helpers =====
export const getMaintenanceTypeLabel = (type) => {
  return MAINTENANCE_TYPES_LABELS[type] || type
}

// ===== Format Helpers =====
export const formatMileage = (mileage) => {
  if (!mileage && mileage !== 0) return 'N/A'
  return `${Number(mileage).toLocaleString()} km`
}

export const formatVehicleYear = (year) => {
  if (!year) return 'N/A'
  return year
}

// ===== Filter Helpers =====
export const filterVehicles = (vehicles, filters) => {
  let filtered = [...vehicles]

  if (filters.status) {
    filtered = filtered.filter((v) => v.status === filters.status)
  }

  if (filters.type) {
    filtered = filtered.filter((v) => v.type === filters.type)
  }

  if (filters.fuelType) {
    filtered = filtered.filter((v) => v.fuelType === filters.fuelType)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (v) =>
        v.plateNumber?.toLowerCase().includes(search) ||
        v.make?.toLowerCase().includes(search) ||
        v.model?.toLowerCase().includes(search)
    )
  }

  return filtered
}

// ===== Stats Helpers =====
export const calculateVehicleStats = (vehicles) => {
  const total = vehicles.length
  const available = vehicles.filter((v) => v.status === 'AVAILABLE').length
  const inUse = vehicles.filter((v) => v.status === 'IN_USE').length
  const maintenance = vehicles.filter((v) => v.status === 'MAINTENANCE').length
  const repair = vehicles.filter((v) => v.status === 'REPAIR').length
  const retired = vehicles.filter((v) => v.status === 'RETIRED').length

  const byType = vehicles.reduce((acc, v) => {
    acc[v.type] = (acc[v.type] || 0) + 1
    return acc
  }, {})

  const byFuelType = vehicles.reduce((acc, v) => {
    acc[v.fuelType] = (acc[v.fuelType] || 0) + 1
    return acc
  }, {})

  return {
    total,
    available,
    inUse,
    maintenance,
    repair,
    retired,
    byType,
    byFuelType,
  }
}

// ===== Map Vehicle Data =====
export const mapVehicleResponse = (vehicle) => {
  if (!vehicle) return null
  return {
    ...vehicle,
    statusLabel: getVehicleStatusLabel(vehicle.status),
    statusColor: getVehicleStatusColor(vehicle.status),
    typeLabel: getVehicleTypeLabel(vehicle.type),
    typeIcon: getVehicleTypeIcon(vehicle.type),
    fuelTypeLabel: getFuelTypeLabel(vehicle.fuelType),
    formattedMileage: formatMileage(vehicle.mileage),
    fullName: `${vehicle.make} ${vehicle.model}`,
  }
}

export const mapVehicleList = (vehicles) => {
  if (!Array.isArray(vehicles)) return []
  return vehicles.map(mapVehicleResponse)
}
