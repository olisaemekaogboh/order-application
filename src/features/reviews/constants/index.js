// Review statuses (based on backend)
export const REVIEW_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  REPORTED: 'REPORTED',
}

export const REVIEW_STATUS_LABELS = {
  [REVIEW_STATUS.PENDING]: 'Pending',
  [REVIEW_STATUS.APPROVED]: 'Approved',
  [REVIEW_STATUS.REJECTED]: 'Rejected',
  [REVIEW_STATUS.REPORTED]: 'Reported',
}

// Moderation statuses
export const MODERATION_STATUS = {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  FLAGGED: 'FLAGGED',
}

// Rating scale
export const MAX_RATING = 5
export const MIN_RATING = 1

// API endpoints (for reference)
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
}
