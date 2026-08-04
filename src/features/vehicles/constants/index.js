/**
 * Vehicles Constants
 * All vehicle-related constants in one place
 * MUST match backend VehicleType enum
 */

// ===== Vehicle Statuses =====
export const VEHICLE_STATUSES = {
  AVAILABLE: 'AVAILABLE',
  IN_USE: 'IN_USE',
  MAINTENANCE: 'MAINTENANCE',
  REPAIR: 'REPAIR',
  RETIRED: 'RETIRED',
}

export const VEHICLE_STATUSES_LABELS = {
  [VEHICLE_STATUSES.AVAILABLE]: 'Available',
  [VEHICLE_STATUSES.IN_USE]: 'In Use',
  [VEHICLE_STATUSES.MAINTENANCE]: 'Maintenance',
  [VEHICLE_STATUSES.REPAIR]: 'Repair',
  [VEHICLE_STATUSES.RETIRED]: 'Retired',
}

export const VEHICLE_STATUSES_COLORS = {
  [VEHICLE_STATUSES.AVAILABLE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [VEHICLE_STATUSES.IN_USE]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [VEHICLE_STATUSES.MAINTENANCE]:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [VEHICLE_STATUSES.REPAIR]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [VEHICLE_STATUSES.RETIRED]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
}

// ===== Vehicle Types =====
// MUST match backend VehicleType enum values
export const VEHICLE_TYPES = {
  MOTORCYCLE: 'MOTORCYCLE',
  VAN: 'VAN',
  SUV: 'SUV',
  MINI_TRUCK: 'MINI_TRUCK',
  TRICYCLE: 'TRICYCLE',
  REFRIGERATED_TRUCK: 'REFRIGERATED_TRUCK',
  TRUCK: 'TRUCK',
  TRAILER: 'TRAILER',
  TANKER: 'TANKER',
  PICKUP: 'PICKUP',
  SEDAN: 'SEDAN',
}

export const VEHICLE_TYPES_LABELS = {
  [VEHICLE_TYPES.MOTORCYCLE]: 'Motorcycle',
  [VEHICLE_TYPES.VAN]: 'Van',
  [VEHICLE_TYPES.SUV]: 'SUV',
  [VEHICLE_TYPES.MINI_TRUCK]: 'Mini Truck',
  [VEHICLE_TYPES.TRICYCLE]: 'Tricycle',
  [VEHICLE_TYPES.REFRIGERATED_TRUCK]: 'Refrigerated Truck',
  [VEHICLE_TYPES.TRUCK]: 'Truck',
  [VEHICLE_TYPES.TRAILER]: 'Trailer',
  [VEHICLE_TYPES.TANKER]: 'Tanker',
  [VEHICLE_TYPES.PICKUP]: 'Pickup',
  [VEHICLE_TYPES.SEDAN]: 'Sedan',
}

export const VEHICLE_TYPES_ICONS = {
  [VEHICLE_TYPES.MOTORCYCLE]: '🏍️',
  [VEHICLE_TYPES.VAN]: '🚐',
  [VEHICLE_TYPES.SUV]: '🚙',
  [VEHICLE_TYPES.MINI_TRUCK]: '🚛',
  [VEHICLE_TYPES.TRICYCLE]: '🛺',
  [VEHICLE_TYPES.REFRIGERATED_TRUCK]: '🧊',
  [VEHICLE_TYPES.TRUCK]: '🚛',
  [VEHICLE_TYPES.TRAILER]: '🚛',
  [VEHICLE_TYPES.TANKER]: '⛽',
  [VEHICLE_TYPES.PICKUP]: '🛻',
  [VEHICLE_TYPES.SEDAN]: '🚗',
}

// ===== Vehicle Options for Select Dropdowns =====
export const VEHICLE_TYPE_OPTIONS = Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => ({
  value,
  label,
}))

// ===== Vehicle Fuel Types =====
export const FUEL_TYPES = {
  PETROL: 'PETROL',
  DIESEL: 'DIESEL',
  ELECTRIC: 'ELECTRIC',
  HYBRID: 'HYBRID',
  CNG: 'CNG',
}

export const FUEL_TYPES_LABELS = {
  [FUEL_TYPES.PETROL]: 'Petrol',
  [FUEL_TYPES.DIESEL]: 'Diesel',
  [FUEL_TYPES.ELECTRIC]: 'Electric',
  [FUEL_TYPES.HYBRID]: 'Hybrid',
  [FUEL_TYPES.CNG]: 'CNG',
}

// ===== Vehicle Maintenance Types =====
export const MAINTENANCE_TYPES = {
  OIL_CHANGE: 'OIL_CHANGE',
  TIRE_ROTATION: 'TIRE_ROTATION',
  BRAKE_SERVICE: 'BRAKE_SERVICE',
  ENGINE_TUNE: 'ENGINE_TUNE',
  TRANSMISSION: 'TRANSMISSION',
  ELECTRICAL: 'ELECTRICAL',
  ROUTINE: 'ROUTINE',
  EMERGENCY: 'EMERGENCY',
}

export const MAINTENANCE_TYPES_LABELS = {
  [MAINTENANCE_TYPES.OIL_CHANGE]: 'Oil Change',
  [MAINTENANCE_TYPES.TIRE_ROTATION]: 'Tire Rotation',
  [MAINTENANCE_TYPES.BRAKE_SERVICE]: 'Brake Service',
  [MAINTENANCE_TYPES.ENGINE_TUNE]: 'Engine Tune-up',
  [MAINTENANCE_TYPES.TRANSMISSION]: 'Transmission Service',
  [MAINTENANCE_TYPES.ELECTRICAL]: 'Electrical Repair',
  [MAINTENANCE_TYPES.ROUTINE]: 'Routine Maintenance',
  [MAINTENANCE_TYPES.EMERGENCY]: 'Emergency Repair',
}

// ===== Maintenance Priority =====
export const MAINTENANCE_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
}

export const MAINTENANCE_PRIORITY_LABELS = {
  [MAINTENANCE_PRIORITY.LOW]: 'Low',
  [MAINTENANCE_PRIORITY.MEDIUM]: 'Medium',
  [MAINTENANCE_PRIORITY.HIGH]: 'High',
  [MAINTENANCE_PRIORITY.URGENT]: 'Urgent',
}

export const MAINTENANCE_PRIORITY_COLORS = {
  [MAINTENANCE_PRIORITY.LOW]: 'bg-gray-100 text-gray-800',
  [MAINTENANCE_PRIORITY.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [MAINTENANCE_PRIORITY.HIGH]: 'bg-orange-100 text-orange-800',
  [MAINTENANCE_PRIORITY.URGENT]: 'bg-red-100 text-red-800',
}

// ===== Vehicle Error Messages =====
export const VEHICLE_ERRORS = {
  NOT_FOUND: 'Vehicle not found',
  PLATE_EXISTS: 'Plate number already exists',
  UPDATE_FAILED: 'Failed to update vehicle',
  DELETE_FAILED: 'Failed to delete vehicle',
  CREATE_FAILED: 'Failed to create vehicle',
  ASSIGN_FAILED: 'Failed to assign vehicle to driver',
  MAINTENANCE_FAILED: 'Failed to schedule maintenance',
  INVALID_STATUS: 'Invalid vehicle status',
  INVALID_TYPE: 'Invalid vehicle type',
  INVALID_FUEL: 'Invalid fuel type',
}

// ===== Vehicle Success Messages =====
export const VEHICLE_SUCCESS = {
  CREATED: 'Vehicle created successfully',
  UPDATED: 'Vehicle updated successfully',
  DELETED: 'Vehicle deleted successfully',
  ASSIGNED: 'Vehicle assigned successfully',
  UNASSIGNED: 'Vehicle unassigned successfully',
  MAINTENANCE_SCHEDULED: 'Maintenance scheduled successfully',
  STATUS_UPDATED: 'Vehicle status updated successfully',
}

// ===== Vehicle API Endpoints =====
export const VEHICLE_API = {
  BASE: '/vehicles',
  GET_ALL: '/vehicles',
  GET_AVAILABLE: '/vehicles/available',
  GET_BY_ID: '/vehicles/{id}',
  GET_BY_PLATE: '/vehicles/plate/{plate}',
  CREATE: '/vehicles',
  UPDATE: '/vehicles/{id}',
  DELETE: '/vehicles/{id}',
  ASSIGN_DRIVER: '/vehicles/{id}/assign',
  UNASSIGN_DRIVER: '/vehicles/{id}/unassign',
  UPDATE_STATUS: '/api/vehicles/{id}/status', // ✅ Fixed - now uses /api prefix
  MAINTENANCE: '/vehicles/{id}/maintenance',
  GET_MAINTENANCE_HISTORY: '/vehicles/{id}/maintenance',
  GET_AVAILABLE: '/vehicles/available',
  GET_STATS: '/vehicles/stats',
}

// ===== Vehicle Routes =====
export const VEHICLE_ROUTES = {
  LIST: '/admin/vehicles',
  DETAILS: '/admin/vehicles/:id',
  CREATE: '/admin/vehicles/create',
  EDIT: '/admin/vehicles/:id/edit',
}

// ===== Vehicle Defaults =====
export const VEHICLE_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
  STATUS: VEHICLE_STATUSES.AVAILABLE,
  TYPE: VEHICLE_TYPES.SEDAN,
  FUEL_TYPE: FUEL_TYPES.PETROL,
}
