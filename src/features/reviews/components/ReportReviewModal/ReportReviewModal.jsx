import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@/shared/components/ui/Button/Button'
import Textarea from '@/shared/components/ui/Textarea/Textarea'

const ReportReviewModal = ({ isOpen, onClose, onReport, loading }) => {
  const [reason, setReason] = useState('')

  const handleSubmit = () => {
    if (!reason.trim()) {
      alert('Please provide a reason')
      return
    }
    onReport({ reason })
    setReason('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Report Review</h2>
        <Textarea
          label="Reason for reporting"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="Explain why you're reporting this review..."
          disabled={loading}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Report'}
          </Button>
        </div>
      </div>
    </div>
  )
}

ReportReviewModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onReport: PropTypes.func,
  loading: PropTypes.bool,
}

export default ReportReviewModal
