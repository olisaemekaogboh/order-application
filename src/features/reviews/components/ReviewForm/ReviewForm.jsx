import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { validateReview } from '../../validations'
import Button from '@/shared/components/ui/Button/Button'
import Input from '@/shared/components/ui/Input/Input'
import Textarea from '@/shared/components/ui/Textarea/Textarea'
import { MAX_RATING, MIN_RATING } from '../../constants'

const ReviewForm = ({ initialData, onSubmit, loading, orderId, driverId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: initialData?.rating || 3,
      comment: initialData?.comment || '',
      orderId: orderId || initialData?.orderId || '',
      driverId: driverId || initialData?.driverId || '',
    },
  })

  const rating = watch('rating')

  const handleRatingChange = (value) => {
    setValue('rating', value, { shouldValidate: true })
  }

  const onSubmitForm = async (data) => {
    const validationErrors = validateReview(data)
    if (Object.keys(validationErrors).length > 0) {
      // Set errors manually if needed
      return
    }
    await onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
        <div className="flex gap-1 mt-1">
          {[...Array(MAX_RATING)].map((_, i) => {
            const value = i + 1
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingChange(value)}
                className={`text-3xl focus:outline-none transition ${
                  value <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
                aria-label={`Rate ${value}`}
              >
                ★
              </button>
            )
          })}
          <span className="ml-2 text-sm text-gray-500">
            ({rating} / {MAX_RATING})
          </span>
        </div>
        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
      </div>

      <Textarea
        label="Comment (optional)"
        {...register('comment')}
        rows={4}
        maxLength={500}
        error={errors.comment?.message}
        disabled={loading}
      />

      <input type="hidden" {...register('orderId')} />
      <input type="hidden" {...register('driverId')} />

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </div>
    </form>
  )
}

ReviewForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  orderId: PropTypes.string,
  driverId: PropTypes.string,
}

export default ReviewForm
