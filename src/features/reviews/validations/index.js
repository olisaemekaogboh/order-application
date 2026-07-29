import { MAX_RATING, MIN_RATING } from '../constants'

export const validateReview = (data) => {
  const errors = {}

  if (!data.orderId) {
    errors.orderId = 'Order ID is required'
  }

  if (!data.driverId) {
    errors.driverId = 'Driver ID is required'
  }

  if (data.rating === undefined || data.rating === null) {
    errors.rating = 'Rating is required'
  } else if (data.rating < MIN_RATING || data.rating > MAX_RATING) {
    errors.rating = `Rating must be between ${MIN_RATING} and ${MAX_RATING}`
  }

  if (data.comment && data.comment.length > 500) {
    errors.comment = 'Comment must be less than 500 characters'
  }

  return errors
}

export const validateReport = (data) => {
  const errors = {}
  if (!data.reason) {
    errors.reason = 'Reason for reporting is required'
  } else if (data.reason.length < 3) {
    errors.reason = 'Reason must be at least 3 characters'
  }
  return errors
}
