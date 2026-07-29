import React, { useEffect, useState } from 'react'
import { reviewService } from '../../../reviews/services/reviewService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Button from '@/shared/components/ui/Button/Button'
import { REVIEW_STATUS_LABELS } from '../../../reviews/constants'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const response = await reviewService.getAllReviews({
        page: pagination.page,
        size: pagination.size,
      })
      setReviews(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      console.error('Failed to fetch reviews', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [pagination.page])

  const handleModerate = async (id, status) => {
    try {
      await reviewService.moderateReview(id, { status })
      fetchReviews()
    } catch (error) {
      console.error('Moderation failed', error)
    }
  }

  const columns = [
    { key: 'id', label: 'ID', render: (val) => val.slice(0, 8) },
    { key: 'rating', label: 'Rating' },
    { key: 'comment', label: 'Comment', render: (val) => val?.slice(0, 50) + '...' },
    { key: 'status', label: 'Status', render: (val) => REVIEW_STATUS_LABELS[val] || val },
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          {row.status === 'PENDING' && (
            <>
              <Button size="sm" variant="ghost" onClick={() => handleModerate(row.id, 'APPROVED')}>
                Approve
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleModerate(row.id, 'REJECTED')}>
                Reject
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  if (loading && reviews.length === 0)
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Moderation</h1>
      {reviews.length === 0 ? (
        <EmptyState icon="📝" title="No reviews found" />
      ) : (
        <Table data={reviews} columns={columns} />
      )}
      <Pagination
        currentPage={pagination.page + 1}
        totalPages={pagination.totalPages}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
      />
    </div>
  )
}

export default AdminReviews
