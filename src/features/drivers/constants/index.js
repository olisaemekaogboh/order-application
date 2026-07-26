/**
 * Drivers Constants
 * All driver-related constants in one place
 */

// ===== Driver Statuses =====
export const DRIVER_STATUSES = {
  AVAILABLE: 'AVAILABLE',
  BUSY: 'BUSY',
  OFFLINE: 'OFFLINE',
  UNAVAILABLE: 'UNAVAILABLE',
};

export const DRIVER_STATUSES_LABELS = {
  [DRIVER_STATUSES.AVAILABLE]: 'Available',
  [DRIVER_STATUSES.BUSY]: 'Busy',
  [DRIVER_STATUSES.OFFLINE]: 'Offline',
  [DRIVER_STATUSES.UNAVAILABLE]: 'Unavailable',
};

export const DRIVER_STATUSES_COLORS = {
  [DRIVER_STATUSES.AVAILABLE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [DRIVER_STATUSES.BUSY]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [DRIVER_STATUSES.OFFLINE]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  [DRIVER_STATUSES.UNAVAILABLE]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

// ===== Vehicle Types (same as orders) =====
export const VEHICLE_TYPES = {
  MOTORCYCLE: 'MOTORCYCLE',
  MINI_VAN: 'MINI_VAN',
  STANDARD: 'STANDARD',
  TRUCK: 'TRUCK',
};

export const VEHICLE_TYPES_LABELS = {
  [VEHICLE_TYPES.MOTORCYCLE]: 'Motorcycle',
  [VEHICLE_TYPES.MINI_VAN]: 'Mini Van',
  [VEHICLE_TYPES.STANDARD]: 'Standard',
  [VEHICLE_TYPES.TRUCK]: 'Truck',
};

export const VEHICLE_TYPES_OPTIONS = [
  { value: VEHICLE_TYPES.MOTORCYCLE, label: 'Motorcycle' },
  { value: VEHICLE_TYPES.MINI_VAN, label: 'Mini Van' },
  { value: VEHICLE_TYPES.STANDARD, label: 'Standard' },
  { value: VEHICLE_TYPES.TRUCK, label: 'Truck' },
];

// ===== Driver Error Messages =====
export const DRIVER_ERRORS = {
  NOT_FOUND: 'Driver not found',
  ALREADY_EXISTS: 'Driver already exists with this email or phone',
  EMAIL_EXISTS: 'Email already registered',
  PHONE_EXISTS: 'Phone number already registered',
  LICENSE_EXISTS: 'License number already registered',
  VEHICLE_EXISTS: 'Vehicle plate number already registered',
  NOT_AVAILABLE: 'Driver is not available',
  ALREADY_ASSIGNED: 'Driver is already assigned to another order',
  UPDATE_FAILED: 'Failed to update driver',
  DELETE_FAILED: 'Failed to delete driver',
  REGISTRATION_FAILED: 'Failed to register driver',
  PAYMENT_FAILED: 'Failed to process driver payment',
  INSUFFICIENT_EARNINGS: 'Insufficient earnings for payment',
  INVALID_LICENSE: 'Invalid license number',
  INVALID_VEHICLE: 'Invalid vehicle type',
};

// ===== Driver Success Messages =====
export const DRIVER_SUCCESS = {
  REGISTERED: 'Driver registered successfully',
  UPDATED: 'Driver updated successfully',
  DELETED: 'Driver deleted successfully',
  AVAILABILITY_UPDATED: 'Driver availability updated',
  LOCATION_UPDATED: 'Driver location updated',
  PAYMENT_PROCESSED: 'Driver payment processed successfully',
  EARNINGS_RETRIEVED: 'Driver earnings retrieved',
  RATING_UPDATED: 'Driver rating updated',
};

// ===== Driver API Endpoints =====
export const DRIVER_API = {
  BASE: '/drivers',
  GET_ALL: '/drivers',
  GET_BY_ID: '/drivers/{id}',
  GET_BY_EMAIL: '/drivers/email/{email}',
  REGISTER: '/drivers',
  UPDATE: '/drivers/{id}',
  DELETE: '/drivers/{id}',
  AVAILABILITY: '/drivers/{id}/availability',
  LOCATION: '/drivers/{id}/location',
  EARNINGS: '/drivers/{id}/earnings',
  EARNINGS_PAGINATED: '/drivers/{id}/earnings/paginated',
  TOTAL_EARNINGS: '/drivers/{id}/earnings/total',
  UNPAID_EARNINGS: '/drivers/{id}/earnings/unpaid',
  PAYMENT: '/drivers/{id}/payments',
  AVAILABLE_DRIVERS: '/drivers/available',
  AVAILABLE_FOR_ASSIGNMENT: '/drivers/available/assignment',
  STATS: '/drivers/stats',
};

// ===== Driver Routes =====
export const DRIVER_ROUTES = {
  LIST: '/admin/drivers',
  DETAILS: '/admin/drivers/:id',
  CREATE: '/admin/drivers/create',
  EDIT: '/admin/drivers/:id/edit',
  EARNINGS: '/admin/drivers/:id/earnings',
};

// ===== Driver Defaults =====
export const DRIVER_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
  AVAILABILITY: true,
  RATING: 0,
};