/**
 * Customers Feature Index
 * Main entry point for the customers feature
 */

// ===== Components =====
export { default as CustomerManagement } from './components/CustomerManagement'
export { default as CustomerTable } from './components/CustomerTable'
export { default as CustomerDetails } from './components/CustomerDetails'
export { default as CustomerForm } from './components/CustomerForm'

// ===== Hooks =====
export { useCustomers } from './hooks/useCustomers'

// ===== Services =====
export { userService } from './services/userService'

// ===== Constants =====
export {
  CUSTOMER_STATUSES,
  CUSTOMER_STATUSES_LABELS,
  CUSTOMER_STATUSES_COLORS,
  CUSTOMER_ROLES,
  CUSTOMER_ROLES_LABELS,
  CUSTOMER_ERRORS,
  CUSTOMER_SUCCESS,
  CUSTOMER_API,
  CUSTOMER_ROUTES,
  CUSTOMER_DEFAULTS,
  CUSTOMER_ACTIVITY,
  CUSTOMER_ACTIVITY_LABELS,
} from './constants'

// ===== Validations =====
export {
  validateCustomerName,
  validateCustomerEmail,
  validateCustomerPhone,
  validateCustomerRole,
  validateCustomerStatus,
  validateCustomerUpdate,
  validateCustomerSearch,
  validateCustomerFilters,
} from './validations'

// ===== Utils =====
export {
  getCustomerStatusLabel,
  getCustomerStatusColor,
  getCustomerRoleLabel,
  getFullName,
  getInitials,
  formatCustomerDate,
  isCustomerActive,
  isCustomerSuspended,
  isCustomerPending,
  filterCustomers,
  sortCustomers,
  mapCustomerResponse,
  mapCustomerList,
  calculateCustomerGrowth,
  getGrowthColor,
} from './utils'
