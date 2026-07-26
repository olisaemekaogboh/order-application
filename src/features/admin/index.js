/**
 * Admin Feature Index
 * Main entry point for the admin feature
 */

// ===== Core Admin Components =====
export { default as AdminDashboard } from './components/Dashboard/AdminDashboard'
export { default as SuperAdminDashboard } from './components/Dashboard/SuperAdminDashboard'

export { default as PricingConfiguration } from './components/PricingConfiguration/PricingConfiguration'
export { default as UserManagement } from './components/UserManagement/UserManagement'
export { default as SuperAdminUserManagement } from './components/SuperAdminUserManagement/SuperAdminUserManagement'
export { default as AdminManagement } from './components/AdminManagement/AdminManagement'
export { default as AuditLogs } from './components/AuditLogs/AuditLogs'

// Add to existing exports
export { default as SystemConfiguration } from './components/SystemConfiguration/SystemConfiguration'
// ===== Shared / Reusable Admin UI Components =====
// These may be used by multiple features; we re-export them here for convenience.
export { default as OrderTable } from '../orders/components/OrderTable/OrderTable'
export { default as DriverTable } from '../drivers/components/DriverTable/DriverTable'
export { default as UserTable } from '../customers/components/CustomerTable/CustomerTable'
export { default as RevenueReport } from '../analytics/components/RevenueReport/RevenueReport'
export { default as PricingConfigForm } from './components/PricingConfigForm/PricingConfigForm'
export { default as DriverAssignmentModal } from '../drivers/components/DriverAssignmentModal/DriverAssignmentModal'

// ===== Hooks =====
export { useAdmin } from './hooks/useAdmin'

// ===== Services =====
export { adminService } from './services/adminService'

// ===== Constants =====
export {
  ADMIN_ROLES,
  ADMIN_ROLES_LABELS,
  ADMIN_PERMISSIONS,
  ADMIN_ERRORS,
  ADMIN_SUCCESS,
  ADMIN_API,
  ADMIN_ROUTES,
  DASHBOARD_DEFAULTS,
  USER_MANAGEMENT_DEFAULTS,
  AUDIT_ACTIONS,
  AUDIT_ENTITY_TYPES,
} from './constants'

// ===== Validations =====
export {
  validateUserUpdate,
  validateDriverRegistration,
  validateDriverUpdate,
  validatePricingConfig,
  validateSystemConfig,
  validateRevenueReport,
  validateRoleAssignment,
} from './validations'

// ===== Utils =====
export {
  isAdmin,
  isSuperAdmin,
  getAdminLevel,
  getUserStatus,
  getUserStatusColor,
  getDriverStatus,
  getDriverStatusColor,
  formatUserRole,
  formatUserRoles,
  filterUsers,
  filterDrivers,
  calculateGrowth,
  getGrowthColor,
  getGrowthIcon,
} from './utils'
