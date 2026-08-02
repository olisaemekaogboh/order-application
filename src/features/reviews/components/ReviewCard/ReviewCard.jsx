// ReviewCard.jsx
import React from 'react'
import PropTypes from 'prop-types'
import { REVIEW_STATUS_LABELS, MODERATION_STATUS_LABELS } from '../../constants'

const ReviewCard = ({ review, onEdit, onDelete, onReport }) => {
  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const empty = 5 - full
    return (
      <div className="flex gap-0.5">
        {[...Array(full)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">
            ★
          </span>
        ))}
        {[...Array(empty)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">
            ★
          </span>
        ))}
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'EDITED':
        return 'bg-blue-100 text-blue-800'
      case 'DELETED':
        return 'bg-red-100 text-red-800'
      case 'HIDDEN':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getModerationColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REVIEWED':
        return 'bg-green-100 text-green-800'
      case 'FLAGGED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900 dark:text-white">
              {review.customerName || 'Customer'}
            </span>
            <span className="text-sm text-gray-500">
              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
            </span>
          </div>
          {renderStars(review.rating)}
          <p className="mt-1 text-gray-700 dark:text-gray-300">{review.comment || 'No comment'}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {review.status && (
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(review.status)}`}>
                {REVIEW_STATUS_LABELS[review.status] || review.status}
              </span>
            )}
            {review.moderationStatus && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${getModerationColor(review.moderationStatus)}`}
              >
                {MODERATION_STATUS_LABELS[review.moderationStatus] || review.moderationStatus}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          {onEdit && review.status === 'ACTIVE' && (
            <button
              onClick={() => onEdit(review)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && review.status !== 'DELETED' && (
            <button
              onClick={() => onDelete(review.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          )}
          {onReport && (
            <button
              onClick={() => onReport(review.id)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Report
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onReport: PropTypes.func,
}

export default ReviewCard
