/**
 * Support Utilities
 * Helper functions for support tickets
 */

import {
  TICKET_STATUSES_LABELS,
  TICKET_STATUSES_COLORS,
  TICKET_PRIORITIES_LABELS,
  TICKET_PRIORITIES_COLORS,
  TICKET_CATEGORIES_LABELS,
  TICKET_CATEGORIES_ICONS,
} from '../constants'

// ===== Status Helpers =====
export const getTicketStatusLabel = (status) => {
  return TICKET_STATUSES_LABELS[status] || status
}

export const getTicketStatusColor = (status) => {
  return (
    TICKET_STATUSES_COLORS[status] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  )
}

// ===== Priority Helpers =====
export const getTicketPriorityLabel = (priority) => {
  return TICKET_PRIORITIES_LABELS[priority] || priority
}

export const getTicketPriorityColor = (priority) => {
  return (
    TICKET_PRIORITIES_COLORS[priority] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  )
}

// ===== Category Helpers =====
export const getTicketCategoryLabel = (category) => {
  return TICKET_CATEGORIES_LABELS[category] || category
}

export const getTicketCategoryIcon = (category) => {
  return TICKET_CATEGORIES_ICONS[category] || '📋'
}

// ===== Format Helpers =====
export const formatTicketDate = (date) => {
  if (!date) return 'N/A'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getTicketAge = (createdAt) => {
  if (!createdAt) return 'N/A'
  const created = new Date(createdAt)
  const now = new Date()
  const diff = now - created
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours === 0) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}m ago`
    }
    return `${hours}h ago`
  }
  return `${days}d ago`
}

// ===== Filter Helpers =====
export const filterTickets = (tickets, filters) => {
  let filtered = [...tickets]

  if (filters.status) {
    filtered = filtered.filter((t) => t.status === filters.status)
  }

  if (filters.priority) {
    filtered = filtered.filter((t) => t.priority === filters.priority)
  }

  if (filters.category) {
    filtered = filtered.filter((t) => t.category === filters.category)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(search) ||
        t.description?.toLowerCase().includes(search) ||
        t.id?.toLowerCase().includes(search)
    )
  }

  return filtered
}

// ===== Stats Helpers =====
export const calculateTicketStats = (tickets) => {
  const total = tickets.length
  const open = tickets.filter((t) => t.status === 'OPEN').length
  const inProgress = tickets.filter((t) => t.status === 'IN_PROGRESS').length
  const pending = tickets.filter((t) => t.status === 'PENDING').length
  const resolved = tickets.filter((t) => t.status === 'RESOLVED').length
  const closed = tickets.filter((t) => t.status === 'CLOSED').length

  const byPriority = {
    LOW: tickets.filter((t) => t.priority === 'LOW').length,
    MEDIUM: tickets.filter((t) => t.priority === 'MEDIUM').length,
    HIGH: tickets.filter((t) => t.priority === 'HIGH').length,
    URGENT: tickets.filter((t) => t.priority === 'URGENT').length,
  }

  const byCategory = tickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {})

  return {
    total,
    open,
    inProgress,
    pending,
    resolved,
    closed,
    byPriority,
    byCategory,
  }
}
