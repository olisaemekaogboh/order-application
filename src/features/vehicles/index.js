/**
 * Vehicles Feature Index
 * Main entry point for the vehicles feature
 */

// ===== Components =====
export { default as VehicleDetails } from './components/VehicleDetails'
export { default as VehicleForm } from './components/VehicleForm'
export { default as VehicleList } from './components/VehicleList'

// ===== Hooks =====
export { useVehicles } from './hooks/useVehicles'

// ===== Services =====
export { vehicleService } from './services/vehicleService'

// ===== Constants =====
export {
  VEHICLE_STATUSES,
  VEHICLE_STATUSES_LABELS,
  VEHICLE_STATUSES_COLORS,
  VEHICLE_TYPES,
  VEHICLE_TYPES_LABELS,
  VEHICLE_TYPES_ICONS,
  FUEL_TYPES,
  FUEL_TYPES_LABELS,
  MAINTENANCE_TYPES,
  MAINTENANCE_TYPES_LABELS,
  VEHICLE_ERRORS,
  VEHICLE_SUCCESS,
  VEHICLE_API,
  VEHICLE_ROUTES,
  VEHICLE_DEFAULTS,
} from './constants'

// ===== Validations =====
export {
  validatePlateNumber,
  validateVehicleModel,
  validateVehicleMake,
  validateVehicleYear,
  validateVehicleType,
  validateFuelType,
  validateVehicleStatus,
  validateMileage,
  validateVehicleForm,
  validateMaintenance,
  validateVehicleFilters,
} from './validations'

// ===== Utils =====
export {
  getVehicleStatusLabel,
  getVehicleStatusColor,
  getVehicleTypeLabel,
  getVehicleTypeIcon,
  getFuelTypeLabel,
  getMaintenanceTypeLabel,
  formatMileage,
  formatVehicleYear,
  filterVehicles,
  calculateVehicleStats,
  mapVehicleResponse,
  mapVehicleList,
} from './utils'
