/**
 * Admin Constants
 * All admin-related constants in one place
 */

// ===== Admin Roles =====
export const ADMIN_ROLES = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const ADMIN_ROLES_LABELS = {
  [ADMIN_ROLES.ADMIN]: 'Admin',
  [ADMIN_ROLES.SUPER_ADMIN]: 'Super Admin',
};

// ===== Admin Permissions =====
export const ADMIN_PERMISSIONS = {
  VIEW_USERS: 'VIEW_USERS',
  MANAGE_USERS: 'MANAGE_USERS',
  VIEW_DRIVERS: 'VIEW_DRIVERS',
  MANAGE_DRIVERS: 'MANAGE_DRIVERS',
  VIEW_ORDERS: 'VIEW_ORDERS',
  MANAGE_ORDERS: 'MANAGE_ORDERS',
  VIEW_REVENUE: 'VIEW_REVENUE',
  MANAGE_REVENUE: 'MANAGE_REVENUE',
  VIEW_PRICING: 'VIEW_PRICING',
  MANAGE_PRICING: 'MANAGE_PRICING',
  VIEW_SYSTEM: 'VIEW_SYSTEM',
  MANAGE_SYSTEM: 'MANAGE_SYSTEM',
  VIEW_AUDIT: 'VIEW_AUDIT',
  MANAGE_ADMINS: 'MANAGE_ADMINS',
};

// ===== Admin Error Messages =====
export const ADMIN_ERRORS = {
  USER_NOT_FOUND: 'User not found',
  USER_UPDATE_FAILED: 'Failed to update user',
  USER_DELETE_FAILED: 'Failed to delete user',
  USER_ENABLE_FAILED: 'Failed to enable user',
  USER_DISABLE_FAILED: 'Failed to disable user',
  DRIVER_NOT_FOUND: 'Driver not found',
  DRIVER_UPDATE_FAILED: 'Failed to update driver',
  DRIVER_DELETE_FAILED: 'Failed to delete driver',
  DRIVER_ASSIGN_FAILED: 'Failed to assign driver',
  PRICING_NOT_FOUND: 'Pricing configuration not found',
  PRICING_UPDATE_FAILED: 'Failed to update pricing',
  PRICING_DELETE_FAILED: 'Failed to delete pricing',
  PRICING_ACTIVATE_FAILED: 'Failed to activate pricing',
  PRICING_DEACTIVATE_FAILED: 'Failed to deactivate pricing',
  SYSTEM_CONFIG_NOT_FOUND: 'System configuration not found',
  SYSTEM_CONFIG_UPDATE_FAILED: 'Failed to update system configuration',
  REVENUE_REPORT_FAILED: 'Failed to generate revenue report',
  AUDIT_LOG_NOT_FOUND: 'Audit log not found',
  UNAUTHORIZED_ACTION: 'You are not authorized to perform this action',
  INVALID_ROLE: 'Invalid role assignment',
  CANNOT_DELETE_SELF: 'Cannot delete your own account',
  CANNOT_DISABLE_SELF: 'Cannot disable your own account',
};

// ===== Admin Success Messages =====
export const ADMIN_SUCCESS = {
  USER_ENABLED: 'User enabled successfully',
  USER_DISABLED: 'User disabled successfully',
  USER_DELETED: 'User deleted successfully',
  USER_UPDATED: 'User updated successfully',
  DRIVER_CREATED: 'Driver created successfully',
  DRIVER_UPDATED: 'Driver updated successfully',
  DRIVER_DELETED: 'Driver deleted successfully',
  DRIVER_ASSIGNED: 'Driver assigned successfully',
  PRICING_CREATED: 'Pricing configuration created successfully',
  PRICING_UPDATED: 'Pricing configuration updated successfully',
  PRICING_DELETED: 'Pricing configuration deleted successfully',
  PRICING_ACTIVATED: 'Pricing configuration activated',
  PRICING_DEACTIVATED: 'Pricing configuration deactivated',
  SYSTEM_CONFIG_UPDATED: 'System configuration updated successfully',
  REVENUE_REPORT_GENERATED: 'Revenue report generated successfully',
};

// ===== Admin API Endpoints =====
export const ADMIN_API = {
  BASE: '/admin',
  DASHBOARD: '/admin/dashboard',
  SUPER_DASHBOARD: '/admin/dashboard/super',
  USERS: '/admin/users',
  USERS_BY_ROLE: '/admin/users/role/{role}',
  ENABLE_USER: '/admin/users/{id}/enable',
  DISABLE_USER: '/admin/users/{id}/disable',
  DELETE_USER: '/admin/users/{id}',
  DRIVERS: '/admin/drivers',
  DRIVER_AVAILABILITY: '/admin/drivers/{id}/availability',
  DRIVER_LOCATION: '/admin/drivers/{id}/location',
  PRICING: '/admin/pricing',
  PRICING_ACTIVATE: '/admin/pricing/{id}/activate',
  PRICING_DEACTIVATE: '/admin/pricing/{id}/deactivate',
  SYSTEM_CONFIGS: '/admin/system/configs',
  AUDIT_LOGS: '/admin/audit-logs',
  RECENT_ORDERS: '/admin/orders/recent',
};

// ===== Admin Routes =====
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  ORDERS: '/admin/orders',
  DRIVERS: '/admin/drivers',
  REVENUE: '/admin/revenue',
  PRICING: '/admin/pricing',
  USERS: '/admin/users',
  SUPER_DASHBOARD: '/super-admin/dashboard',
  SUPER_USERS: '/super-admin/users',
  ADMIN_MANAGEMENT: '/super-admin/admins',
  SYSTEM_CONFIG: '/super-admin/system',
  AUDIT_LOGS: '/super-admin/audit',
  GLOBAL_REVENUE: '/super-admin/revenue',
};

// ===== Dashboard Defaults =====
export const DASHBOARD_DEFAULTS = {
  PERIOD: 'WEEK',
  CHART_COLORS: {
    revenue: '#3b82f6',
    orders: '#22c55e',
    users: '#8b5cf6',
    drivers: '#f59e0b',
  },
};

// ===== User Management Defaults =====
export const USER_MANAGEMENT_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
};

// ===== Audit Log Types =====
export const AUDIT_ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
  ASSIGN: 'ASSIGN',
  ACTIVATE: 'ACTIVATE',
  DEACTIVATE: 'DEACTIVATE',
  GENERATE: 'GENERATE',
  EXPORT: 'EXPORT',
  IMPORT: 'IMPORT',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
};

export const AUDIT_ENTITY_TYPES = {
  USER: 'USER',
  DRIVER: 'DRIVER',
  ORDER: 'ORDER',
  PAYMENT: 'PAYMENT',
  PRICING: 'PRICING',
  SYSTEM_CONFIG: 'SYSTEM_CONFIG',
  REVENUE: 'REVENUE',
  ADMIN: 'ADMIN',
};