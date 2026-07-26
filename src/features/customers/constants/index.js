/**
 * Customers Constants
 * All customer-related constants in one place
 */

// ===== Customer Statuses =====
export const CUSTOMER_STATUSES = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING: 'PENDING',
};

export const CUSTOMER_STATUSES_LABELS = {
  [CUSTOMER_STATUSES.ACTIVE]: 'Active',
  [CUSTOMER_STATUSES.INACTIVE]: 'Inactive',
  [CUSTOMER_STATUSES.SUSPENDED]: 'Suspended',
  [CUSTOMER_STATUSES.PENDING]: 'Pending',
};

export const CUSTOMER_STATUSES_COLORS = {
  [CUSTOMER_STATUSES.ACTIVE]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [CUSTOMER_STATUSES.INACTIVE]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  [CUSTOMER_STATUSES.SUSPENDED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [CUSTOMER_STATUSES.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

// ===== Customer Roles =====
export const CUSTOMER_ROLES = {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const CUSTOMER_ROLES_LABELS = {
  [CUSTOMER_ROLES.CLIENT]: 'Client',
  [CUSTOMER_ROLES.ADMIN]: 'Admin',
  [CUSTOMER_ROLES.SUPER_ADMIN]: 'Super Admin',
};

// ===== Customer Error Messages =====
export const CUSTOMER_ERRORS = {
  NOT_FOUND: 'Customer not found',
  EMAIL_EXISTS: 'Email already registered',
  PHONE_EXISTS: 'Phone number already registered',
  UPDATE_FAILED: 'Failed to update customer',
  DELETE_FAILED: 'Failed to delete customer',
  ENABLE_FAILED: 'Failed to enable customer',
  DISABLE_FAILED: 'Failed to disable customer',
  SUSPEND_FAILED: 'Failed to suspend customer',
  REACTIVATE_FAILED: 'Failed to reactivate customer',
  ROLE_ASSIGN_FAILED: 'Failed to assign role',
  INVALID_ROLE: 'Invalid role assignment',
  INVALID_STATUS: 'Invalid customer status',
};

// ===== Customer Success Messages =====
export const CUSTOMER_SUCCESS = {
  UPDATED: 'Customer updated successfully',
  DELETED: 'Customer deleted successfully',
  ENABLED: 'Customer enabled successfully',
  DISABLED: 'Customer disabled successfully',
  SUSPENDED: 'Customer suspended successfully',
  REACTIVATED: 'Customer reactivated successfully',
  ROLE_ASSIGNED: 'Role assigned successfully',
};

// ===== Customer API Endpoints =====
export const CUSTOMER_API = {
  BASE: '/users',
  GET_ALL: '/users',
  GET_BY_ID: '/users/{id}',
  GET_BY_EMAIL: '/users/email/{email}',
  UPDATE: '/users/{id}',
  DELETE: '/users/{id}',
  ENABLE: '/users/{id}/enable',
  DISABLE: '/users/{id}/disable',
  SUSPEND: '/users/{id}/suspend',
  REACTIVATE: '/users/{id}/reactivate',
  ASSIGN_ROLE: '/users/{id}/role',
  GET_STATS: '/users/stats',
  GET_RECENT: '/users/recent',
  SEARCH: '/users/search',
  EXPORT: '/users/export',
};

// ===== Customer Routes =====
export const CUSTOMER_ROUTES = {
  LIST: '/admin/users',
  DETAILS: '/admin/users/:id',
  CREATE: '/admin/users/create',
  EDIT: '/admin/users/:id/edit',
};

// ===== Customer Defaults =====
export const CUSTOMER_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
  ROLE: 'CLIENT',
};

// ===== Customer Activity Types =====
export const CUSTOMER_ACTIVITY = {
  LOGIN: 'LOGIN',
  ORDER_CREATED: 'ORDER_CREATED',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  PAYMENT_MADE: 'PAYMENT_MADE',
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  PASSWORD_CHANGED: 'PASSWORD_CHANGED',
};

export const CUSTOMER_ACTIVITY_LABELS = {
  [CUSTOMER_ACTIVITY.LOGIN]: 'Login',
  [CUSTOMER_ACTIVITY.ORDER_CREATED]: 'Order Created',
  [CUSTOMER_ACTIVITY.ORDER_CANCELLED]: 'Order Cancelled',
  [CUSTOMER_ACTIVITY.PAYMENT_MADE]: 'Payment Made',
  [CUSTOMER_ACTIVITY.PROFILE_UPDATED]: 'Profile Updated',
  [CUSTOMER_ACTIVITY.PASSWORD_CHANGED]: 'Password Changed',
};