import React from 'react'
import PropTypes from 'prop-types'
import { formatRating, mapReviewResponse } from '../../utils'

const ReviewCard = ({ review, onEdit, onDelete, onReport }) => {
  const data = mapReviewResponse(review)
  if (!data) return null

  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5 ? 1 : 0
    const empty = 5 - full - half
    return (
      <div className="flex gap-0.5">
        {[...Array(full)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">
            ★
          </span>
        ))}
        {half === 1 && <span className="text-yellow-400">★</span>}
        {[...Array(empty)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {data.customerName || 'Customer'}
            </span>
            <span className="text-sm text-gray-500">{data.createdAtFormatted}</span>
          </div>
          {renderStars(data.rating)}
          <p className="mt-1 text-gray-700 dark:text-gray-300">{data.comment}</p>
          {data.status && (
            <span
              className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                data.status === 'APPROVED'
                  ? 'bg-green-100 text-green-800'
                  : data.status === 'REJECTED'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
              }`}
            >
              {data.statusLabel}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(data.id)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(data.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          )}
          {onReport && (
            <button
              onClick={() => onReport(data.id)}
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
