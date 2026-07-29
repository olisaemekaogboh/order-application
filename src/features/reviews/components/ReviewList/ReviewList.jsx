import React from 'react'
import PropTypes from 'prop-types'
import ReviewCard from '../ReviewCard/ReviewCard'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'

const ReviewList = ({ reviews, onEdit, onDelete, onReport, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <EmptyState icon="📝" title="No reviews yet" description="Be the first to leave a review!" />
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          onEdit={onEdit}
          onDelete={onDelete}
          onReport={onReport}
        />
      ))}
    </div>
  )
}

ReviewList.propTypes = {
  reviews: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onReport: PropTypes.func,
  loading: PropTypes.bool,
}

export default ReviewList
