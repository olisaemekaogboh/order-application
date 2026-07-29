import { REVIEW_STATUS_LABELS, MODERATION_STATUS } from '../constants'

export const getReviewStatusLabel = (status) => {
  return REVIEW_STATUS_LABELS[status] || status
}

export const getModerationStatusLabel = (status) => {
  const labels = {
    PENDING: 'Pending',
    REVIEWED: 'Reviewed',
    FLAGGED: 'Flagged',
  }
  return labels[status] || status
}

export const formatRating = (rating) => {
  if (rating === undefined || rating === null) return 'N/A'
  return Number(rating).toFixed(1)
}

export const getStarArray = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return {
    full: Array(full).fill('full'),
    half: Array(half).fill('half'),
    empty: Array(empty).fill('empty'),
  }
}

export const mapReviewResponse = (review) => {
  if (!review) return null
  return {
    ...review,
    formattedRating: formatRating(review.rating),
    statusLabel: getReviewStatusLabel(review.status),
    createdAtFormatted: new Date(review.createdAt).toLocaleDateString(),
  }
}
