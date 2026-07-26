/**
 * Admin Utilities
 * Helper functions for admin operations
 */

import { ADMIN_ROLES } from '../constants'

// ===== Role Helpers =====
export const isAdmin = (user) => {
  if (!user) return false
  return user.role === ADMIN_ROLES.ADMIN || user.role === ADMIN_ROLES.SUPER_ADMIN
}

export const isSuperAdmin = (user) => {
  if (!user) return false
  return user.role === ADMIN_ROLES.SUPER_ADMIN
}

export const getAdminLevel = (user) => {
  if (!user) return null
  if (user.role === ADMIN_ROLES.SUPER_ADMIN) return 'super'
  if (user.role === ADMIN_ROLES.ADMIN) return 'admin'
  return null
}

// ===== User Status Helpers =====
export const getUserStatus = (user) => {
  if (!user) return 'unknown'
  if (!user.enabled) return 'disabled'
  if (user.enabled) return 'active'
  return 'unknown'
}

export const getUserStatusColor = (user) => {
  const colors = {
    active: 'green',
    disabled: 'red',
    unknown: 'gray',
  }
  return colors[getUserStatus(user)] || 'gray'
}

// ===== Driver Status Helpers =====
export const getDriverStatus = (driver) => {
  if (!driver) return 'unknown'
  if (!driver.available) return 'busy'
  if (driver.available) return 'available'
  return 'unknown'
}

export const getDriverStatusColor = (driver) => {
  const colors = {
    available: 'green',
    busy: 'red',
    unknown: 'gray',
  }
  return colors[getDriverStatus(driver)] || 'gray'
}

// ===== Format Helpers =====
export const formatUserRole = (role) => {
  const labels = {
    CLIENT: 'Client',
    ADMIN: 'Admin',
    SUPER_ADMIN: 'Super Admin',
  }
  return labels[role] || role
}

export const formatUserRoles = (roles) => {
  if (!Array.isArray(roles)) return []
  return roles.map(formatUserRole)
}

// ===== Search Helpers =====
export const filterUsers = (users, searchTerm) => {
  if (!searchTerm) return users
  const lower = searchTerm.toLowerCase()
  return users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(lower) ||
      user.lastName?.toLowerCase().includes(lower) ||
      user.email?.toLowerCase().includes(lower) ||
      user.phoneNumber?.includes(searchTerm)
  )
}

export const filterDrivers = (drivers, searchTerm) => {
  if (!searchTerm) return drivers
  const lower = searchTerm.toLowerCase()
  return drivers.filter(
    (driver) =>
      driver.name?.toLowerCase().includes(lower) ||
      driver.email?.toLowerCase().includes(lower) ||
      driver.phoneNumber?.includes(searchTerm) ||
      driver.vehiclePlateNumber?.toLowerCase().includes(lower)
  )
}

// ===== Stats Helpers =====
export const calculateGrowth = (current, previous) => {
  if (!previous || previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export const getGrowthColor = (growth) => {
  if (growth > 0) return 'text-green-600 dark:text-green-400'
  if (growth < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

export const getGrowthIcon = (growth) => {
  if (growth > 0) return 'arrow-up'
  if (growth < 0) return 'arrow-down'
  return 'minus'
}
