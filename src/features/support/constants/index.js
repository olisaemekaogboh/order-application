/**
 * Support Constants
 * All support/ticket-related constants in one place
 */

// ===== Ticket Statuses =====
export const TICKET_STATUSES = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
};

export const TICKET_STATUSES_LABELS = {
  [TICKET_STATUSES.OPEN]: 'Open',
  [TICKET_STATUSES.IN_PROGRESS]: 'In Progress',
  [TICKET_STATUSES.PENDING]: 'Pending',
  [TICKET_STATUSES.RESOLVED]: 'Resolved',
  [TICKET_STATUSES.CLOSED]: 'Closed',
};

export const TICKET_STATUSES_COLORS = {
  [TICKET_STATUSES.OPEN]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [TICKET_STATUSES.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [TICKET_STATUSES.PENDING]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [TICKET_STATUSES.RESOLVED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [TICKET_STATUSES.CLOSED]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

// ===== Ticket Priorities =====
export const TICKET_PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

export const TICKET_PRIORITIES_LABELS = {
  [TICKET_PRIORITIES.LOW]: 'Low',
  [TICKET_PRIORITIES.MEDIUM]: 'Medium',
  [TICKET_PRIORITIES.HIGH]: 'High',
  [TICKET_PRIORITIES.URGENT]: 'Urgent',
};

export const TICKET_PRIORITIES_COLORS = {
  [TICKET_PRIORITIES.LOW]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  [TICKET_PRIORITIES.MEDIUM]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [TICKET_PRIORITIES.HIGH]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [TICKET_PRIORITIES.URGENT]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

// ===== Ticket Categories =====
export const TICKET_CATEGORIES = {
  ORDER_ISSUE: 'ORDER_ISSUE',
  PAYMENT_ISSUE: 'PAYMENT_ISSUE',
  DELIVERY_ISSUE: 'DELIVERY_ISSUE',
  DRIVER_ISSUE: 'DRIVER_ISSUE',
  ACCOUNT_ISSUE: 'ACCOUNT_ISSUE',
  GENERAL_INQUIRY: 'GENERAL_INQUIRY',
  FEATURE_REQUEST: 'FEATURE_REQUEST',
  COMPLAINT: 'COMPLAINT',
  OTHER: 'OTHER',
};

export const TICKET_CATEGORIES_LABELS = {
  [TICKET_CATEGORIES.ORDER_ISSUE]: 'Order Issue',
  [TICKET_CATEGORIES.PAYMENT_ISSUE]: 'Payment Issue',
  [TICKET_CATEGORIES.DELIVERY_ISSUE]: 'Delivery Issue',
  [TICKET_CATEGORIES.DRIVER_ISSUE]: 'Driver Issue',
  [TICKET_CATEGORIES.ACCOUNT_ISSUE]: 'Account Issue',
  [TICKET_CATEGORIES.GENERAL_INQUIRY]: 'General Inquiry',
  [TICKET_CATEGORIES.FEATURE_REQUEST]: 'Feature Request',
  [TICKET_CATEGORIES.COMPLAINT]: 'Complaint',
  [TICKET_CATEGORIES.OTHER]: 'Other',
};

export const TICKET_CATEGORIES_ICONS = {
  [TICKET_CATEGORIES.ORDER_ISSUE]: '📦',
  [TICKET_CATEGORIES.PAYMENT_ISSUE]: '💳',
  [TICKET_CATEGORIES.DELIVERY_ISSUE]: '🚚',
  [TICKET_CATEGORIES.DRIVER_ISSUE]: '👤',
  [TICKET_CATEGORIES.ACCOUNT_ISSUE]: '🔐',
  [TICKET_CATEGORIES.GENERAL_INQUIRY]: '❓',
  [TICKET_CATEGORIES.FEATURE_REQUEST]: '💡',
  [TICKET_CATEGORIES.COMPLAINT]: '⚠️',
  [TICKET_CATEGORIES.OTHER]: '📋',
};

// ===== Ticket Error Messages =====
export const TICKET_ERRORS = {
  NOT_FOUND: 'Ticket not found',
  FETCH_FAILED: 'Failed to fetch tickets',
  CREATE_FAILED: 'Failed to create ticket',
  UPDATE_FAILED: 'Failed to update ticket',
  DELETE_FAILED: 'Failed to delete ticket',
  MESSAGE_FAILED: 'Failed to send message',
  ASSIGN_FAILED: 'Failed to assign agent',
  CLOSE_FAILED: 'Failed to close ticket',
  REOPEN_FAILED: 'Failed to reopen ticket',
  INVALID_STATUS: 'Invalid ticket status',
  INVALID_PRIORITY: 'Invalid priority',
  INVALID_CATEGORY: 'Invalid category',
};

// ===== Ticket Success Messages =====
export const TICKET_SUCCESS = {
  CREATED: 'Support ticket created successfully',
  UPDATED: 'Ticket updated successfully',
  DELETED: 'Ticket deleted successfully',
  MESSAGE_SENT: 'Message sent successfully',
  ASSIGNED: 'Agent assigned successfully',
  CLOSED: 'Ticket closed successfully',
  REOPENED: 'Ticket reopened successfully',
};

// ===== Ticket API Endpoints =====
export const TICKET_API = {
  BASE: '/support/tickets',
  GET_ALL: '/support/tickets',
  GET_BY_ID: '/support/tickets/{id}',
  CREATE: '/support/tickets',
  UPDATE: '/support/tickets/{id}',
  DELETE: '/support/tickets/{id}',
  GET_MESSAGES: '/support/tickets/{id}/messages',
  SEND_MESSAGE: '/support/tickets/{id}/messages',
  ASSIGN: '/support/tickets/{id}/assign',
  CLOSE: '/support/tickets/{id}/close',
  REOPEN: '/support/tickets/{id}/reopen',
  GET_STATS: '/support/stats',
};

// ===== Ticket Routes =====
export const TICKET_ROUTES = {
  LIST: '/support',
  DETAILS: '/support/:id',
  CREATE: '/support/create',
};

// ===== Ticket Defaults =====
export const TICKET_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
  STATUS: TICKET_STATUSES.OPEN,
  PRIORITY: TICKET_PRIORITIES.MEDIUM,
  CATEGORY: TICKET_CATEGORIES.GENERAL_INQUIRY,
};