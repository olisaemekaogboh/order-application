// features/reviews/constants/index.js

// Review statuses - MATCH BACKEND ENUM EXACTLY
export const REVIEW_STATUS = {
  ACTIVE: 'ACTIVE',
  EDITED: 'EDITED',
  DELETED: 'DELETED',
  HIDDEN: 'HIDDEN',
}

export const REVIEW_STATUS_LABELS = {
  [REVIEW_STATUS.ACTIVE]: 'Active',
  [REVIEW_STATUS.EDITED]: 'Edited',
  [REVIEW_STATUS.DELETED]: 'Deleted',
  [REVIEW_STATUS.HIDDEN]: 'Hidden',
}

// Moderation statuses - MATCH BACKEND ENUM EXACTLY
export const MODERATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED', // Changed from REVIEWED to APPROVED
  REJECTED: 'REJECTED', // Added
  FLAGGED: 'FLAGGED',
}

export const MODERATION_STATUS_LABELS = {
  [MODERATION_STATUS.PENDING]: 'Pending',
  [MODERATION_STATUS.APPROVED]: 'Approved',
  [MODERATION_STATUS.REJECTED]: 'Rejected',
  [MODERATION_STATUS.FLAGGED]: 'Flagged',
}

// Filter options for admin
export const REVIEW_FILTER_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'EDITED', label: 'Edited' },
  { value: 'DELETED', label: 'Deleted' },
  { value: 'HIDDEN', label: 'Hidden' },
]

export const MODERATION_FILTER_OPTIONS = [
  { value: '', label: 'All Moderation' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'FLAGGED', label: 'Flagged' },
]

// Rating scale
export const MAX_RATING = 5
export const MIN_RATING = 1

// API endpoints
export const REVIEW_API = {
  BASE: '/reviews',
  CREATE: '/reviews',
  UPDATE: '/reviews/{id}',
  DELETE: '/reviews/{id}',
  GET_BY_ID: '/reviews/{id}',
  BY_DRIVER: '/reviews/driver/{driverId}',
  MY_REVIEWS: '/reviews/customer',
  BY_ORDER: '/reviews/order/{orderId}',
  REPORT: '/reviews/{id}/report',
  MODERATE: '/reviews/{id}/moderate',
}

// Review error messages
export const REVIEW_ERRORS = {
  NOT_FOUND: 'Review not found',
  ALREADY_EXISTS: 'You have already reviewed this order',
  INVALID_RATING: 'Invalid rating value',
  INVALID_STATUS: 'Invalid review status',
  PERMISSION_DENIED: 'You do not have permission to perform this action',
}
