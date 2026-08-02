// ReviewForm.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@/shared/components/ui/Button/Button'
import Textarea from '@/shared/components/ui/Textarea/Textarea'
import { MAX_RATING } from '../../constants'

const ReviewForm = ({ initialData, onSubmit, loading }) => {
  const [rating, setRating] = useState(initialData?.rating || 0)
  const [comment, setComment] = useState(initialData?.comment || '')
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    onSubmit({ rating, comment })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating *
        </label>
        <div className="flex gap-1">
          {[...Array(MAX_RATING)].map((_, i) => {
            const value = i + 1
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className={`text-3xl focus:outline-none transition ${
                  value <= (hoverRating || rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                aria-label={`Rate ${value}`}
              >
                ★
              </button>
            )
          })}
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 ? `${rating} / ${MAX_RATING}` : 'Select rating'}
          </span>
        </div>
      </div>

      <Textarea
        label="Comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        maxLength={500}
        placeholder="Share your experience..."
        disabled={loading}
      />
      <div className="text-xs text-gray-400 text-right">{comment.length}/500</div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={loading || rating === 0}>
          {loading ? 'Submitting...' : initialData ? 'Update Review' : 'Submit Review'}
        </Button>
      </div>
    </form>
  )
}

ReviewForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default ReviewForm
