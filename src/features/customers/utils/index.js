/**
 * Customers Utilities
 * Helper functions for customer management
 */

import {
  CUSTOMER_STATUSES_LABELS,
  CUSTOMER_STATUSES_COLORS,
  CUSTOMER_ROLES_LABELS,
} from '../constants'

// ===== Status Helpers =====
export const getCustomerStatusLabel = (status) => {
  return CUSTOMER_STATUSES_LABELS[status] || status
}

export const getCustomerStatusColor = (status) => {
  return (
    CUSTOMER_STATUSES_COLORS[status] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  )
}

export const getCustomerRoleLabel = (role) => {
  return CUSTOMER_ROLES_LABELS[role] || role
}

// ===== Name Helpers =====
export const getFullName = (firstName, lastName) => {
  if (!firstName && !lastName) return 'Unknown'
  return `${firstName || ''} ${lastName || ''}`.trim()
}

export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  const first = firstName?.charAt(0) || ''
  const last = lastName?.charAt(0) || ''
  return `${first}${last}`.toUpperCase()
}

// ===== Format Helpers =====
export const formatCustomerDate = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// ===== Status Check Helpers =====
export const isCustomerActive = (customer) => {
  return customer?.enabled === true && customer?.status !== 'SUSPENDED'
}

export const isCustomerSuspended = (customer) => {
  return customer?.status === 'SUSPENDED'
}

export const isCustomerPending = (customer) => {
  return customer?.status === 'PENDING'
}

// ===== Search Helpers =====
export const filterCustomers = (customers, searchTerm) => {
  if (!searchTerm) return customers
  const lower = searchTerm.toLowerCase()
  return customers.filter(
    (c) =>
      c.firstName?.toLowerCase().includes(lower) ||
      c.lastName?.toLowerCase().includes(lower) ||
      c.email?.toLowerCase().includes(lower) ||
      c.phoneNumber?.includes(searchTerm)
  )
}

// ===== Sort Helpers =====
export const sortCustomers = (customers, sortBy, sortDirection = 'asc') => {
  if (!customers || !Array.isArray(customers)) return customers
  const sorted = [...customers].sort((a, b) => {
    const valA = a[sortBy] || ''
    const valB = b[sortBy] || ''
    if (typeof valA === 'string') {
      return valA.localeCompare(valB)
    }
    return valA - valB
  })
  return sortDirection === 'desc' ? sorted.reverse() : sorted
}

// ===== Map Customer Data =====
export const mapCustomerResponse = (customer) => {
  if (!customer) return null
  return {
    ...customer,
    fullName: getFullName(customer.firstName, customer.lastName),
    initials: getInitials(customer.firstName, customer.lastName),
    statusLabel: getCustomerStatusLabel(customer.status),
    statusColor: getCustomerStatusColor(customer.status),
    roleLabel: getCustomerRoleLabel(customer.role),
    isActive: isCustomerActive(customer),
    isSuspended: isCustomerSuspended(customer),
    isPending: isCustomerPending(customer),
    formattedDate: formatCustomerDate(customer.createdAt),
  }
}

export const mapCustomerList = (customers) => {
  if (!Array.isArray(customers)) return []
  return customers.map(mapCustomerResponse)
}

// ===== Analytics Helpers =====
export const calculateCustomerGrowth = (current, previous) => {
  if (!previous || previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export const getGrowthColor = (growth) => {
  if (growth > 0) return 'text-green-600 dark:text-green-400'
  if (growth < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}
