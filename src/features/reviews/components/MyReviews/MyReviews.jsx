import React, { useEffect, useState } from 'react'
import { useReviews } from '../../hooks/useReviews'
import ReviewList from '../ReviewList/ReviewList'
import ReviewForm from '../ReviewForm/ReviewForm'
import Button from '@/shared/components/ui/Button/Button'
import Modal from '@/shared/components/ui/Modal/Modal'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

const MyReviews = () => {
  const {
    reviews,
    loading,
    pagination,
    fetchMyReviews,
    deleteReview,
    updateReview,
    createReview,
    changePage,
  } = useReviews()

  const [editingReview, setEditingReview] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchMyReviews()
  }, [])

  const handleEdit = (review) => {
    setEditingReview(review)
  }

  const handleUpdate = async (data) => {
    await updateReview(editingReview.id, data)
    setEditingReview(null)
    fetchMyReviews()
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this review?')) {
      await deleteReview(id)
      fetchMyReviews()
    }
  }

  const handleCreate = async (data) => {
    await createReview(data)
    setShowCreateModal(false)
    fetchMyReviews()
  }

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
        <Button onClick={() => setShowCreateModal(true)}>Write a Review</Button>
      </div>

      <ReviewList reviews={reviews} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />

      {pagination.total > pagination.size && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {pagination.page * pagination.size + 1} to{' '}
            {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
            {pagination.total}
          </div>
          <Pagination
            currentPage={pagination.page + 1}
            totalPages={pagination.totalPages}
            onPageChange={(page) => changePage(page - 1)}
          />
        </div>
      )}

      {/* Create Review Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <ReviewForm
            onSubmit={handleCreate}
            loading={loading}
            // Pass orderId and driverId as needed – you may want to let user select
          />
        </div>
      </Modal>

      {/* Edit Review Modal */}
      <Modal isOpen={!!editingReview} onClose={() => setEditingReview(null)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Edit Review</h2>
          <ReviewForm initialData={editingReview} onSubmit={handleUpdate} loading={loading} />
        </div>
      </Modal>
    </div>
  )
}

export default MyReviews
