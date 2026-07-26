/**
 * Drivers Feature Index
 * Main entry point for the drivers feature
 */

// ===== Components =====
export { default as DriverManagement } from './components/DriverManagement/DriverManagement'
export { default as DriverTable } from './components/DriverTable/DriverTable'
export { default as DriverAssignmentModal } from './components/DriverAssignmentModal/DriverAssignmentModal'

// ===== Hooks =====
export { useDrivers } from './hooks/useDrivers'

// ===== Services =====
export { driverService } from './services/driverService'

// ===== Constants =====
export {
  DRIVER_STATUSES,
  DRIVER_STATUSES_LABELS,
  DRIVER_STATUSES_COLORS,
  VEHICLE_TYPES,
  VEHICLE_TYPES_LABELS,
  VEHICLE_TYPES_OPTIONS,
  DRIVER_ERRORS,
  DRIVER_SUCCESS,
  DRIVER_API,
  DRIVER_ROUTES,
  DRIVER_DEFAULTS,
} from './constants'

// ===== Validations =====
export {
  validateDriverName,
  validateDriverEmail,
  validateDriverPhone,
  validateLicenseNumber,
  validateVehiclePlate,
  validateVehicleType,
  validateBankAccount,
  validateDriverRegistration,
  validateDriverUpdate,
  validateDriverAvailability,
  validateDriverPayment,
} from './validations'

// ===== Utils =====
export {
  getDriverStatus,
  getDriverStatusLabel,
  getDriverStatusColor,
  getVehicleTypeLabel,
  formatRating,
  getRatingColor,
  formatEarnings,
  calculateCommission,
  filterDrivers,
  sortDrivers,
  mapDriverResponse,
  mapDriverList,
} from './utils'
