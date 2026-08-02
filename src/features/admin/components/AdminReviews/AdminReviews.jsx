// AdminReviews.jsx - Fixed with proper moderation status handling
import React, { useEffect, useState, useCallback } from 'react'
import { reviewService } from '../../../reviews/services/reviewService'
import Table from '@/shared/components/ui/Table/Table'
import TableHead from '@/shared/components/ui/Table/TableHead'
import TableBody from '@/shared/components/ui/Table/TableBody'
import TableRow from '@/shared/components/ui/Table/TableRow'
import TableCell from '@/shared/components/ui/Table/TableCell'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Button from '@/shared/components/ui/Button/Button'
import Modal from '@/shared/components/ui/Modal/Modal'
import { REVIEW_STATUS_LABELS, MODERATION_STATUS_LABELS } from '../../../reviews/constants'
import toast from 'react-hot-toast'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedReview, setSelectedReview] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    rating: 0,
    comment: '',
    title: '',
  })
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    totalPages: 0,
  })
  const [filters, setFilters] = useState({
    status: '',
    moderationStatus: '',
  })

  const fetchReviews = useCallback(
    async (page = 0) => {
      setLoading(true)
      try {
        const params = {
          page: page,
          size: pagination.size,
          sortBy: 'createdAt',
          sortDirection: 'DESC',
        }

        if (filters.status && filters.status !== '') {
          params.status = filters.status
        }
        if (filters.moderationStatus && filters.moderationStatus !== '') {
          params.moderationStatus = filters.moderationStatus
        }

        console.log('Fetching with params:', params)

        const response = await reviewService.getAllReviews(params)
        console.log('Full response:', response)

        let content = []
        let pageNumber = 0
        let pageSize = 10
        let totalElements = 0
        let totalPages = 0

        if (response && typeof response === 'object') {
          if (response.data) {
            content = response.data.content || response.data || []
            pageNumber = response.data.pageNumber || response.data.page || 0
            pageSize = response.data.pageSize || response.data.size || 10
            totalElements = response.data.totalElements || response.data.total || 0
            totalPages = response.data.totalPages || 0
          } else if (response.content !== undefined) {
            content = response.content || []
            pageNumber = response.pageNumber || response.page || 0
            pageSize = response.pageSize || response.size || 10
            totalElements = response.totalElements || response.total || 0
            totalPages = response.totalPages || 0
          } else if (Array.isArray(response)) {
            content = response
            totalElements = response.length
            totalPages = 1
          }
        }

        // Log each review to see the moderation status
        if (content.length > 0) {
          console.log('First review:', content[0])
          console.log('All keys in first review:', Object.keys(content[0]))
          console.log(
            'Moderation status field:',
            content[0].moderationStatus || content[0].moderation_status || 'NOT FOUND'
          )
        }

        setReviews(content)
        setPagination({
          page: pageNumber,
          size: pageSize,
          total: totalElements,
          totalPages: totalPages,
        })
      } catch (error) {
        console.error('Failed to fetch reviews', error)
        toast.error(error.response?.data?.message || 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    },
    [filters.status, filters.moderationStatus, pagination.size]
  )

  useEffect(() => {
    fetchReviews(0)
  }, [fetchReviews, refreshTrigger])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value }
      console.log('Filter changed:', key, value, newFilters)
      return newFilters
    })
    setPagination((prev) => ({ ...prev, page: 0 }))
  }

  const handleModerate = async (id, status) => {
    try {
      await reviewService.moderateReview(id, { moderationStatus: status })
      toast.success(`Review ${status.toLowerCase()}`)
      fetchReviews(pagination.page)
    } catch (error) {
      console.error('Moderation failed', error)
      toast.error(error.response?.data?.message || 'Failed to moderate review')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return

    try {
      await reviewService.deleteReview(id)
      toast.success('Review deleted successfully')
      fetchReviews(pagination.page)
    } catch (error) {
      console.error('Delete failed', error)
      toast.error(error.response?.data?.message || 'Failed to delete review')
    }
  }

  const handleEdit = (review) => {
    setSelectedReview(review)
    setEditFormData({
      rating: review.rating || 0,
      comment: review.comment || '',
      title: review.title || '',
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async () => {
    try {
      await reviewService.updateReview(selectedReview.id, {
        rating: editFormData.rating,
        comment: editFormData.comment,
        title: editFormData.title,
      })
      toast.success('Review updated successfully')
      setIsEditModalOpen(false)
      setSelectedReview(null)
      fetchReviews(pagination.page)
    } catch (error) {
      console.error('Update failed', error)
      toast.error(error.response?.data?.message || 'Failed to update review')
    }
  }

  const handlePageChange = (page) => {
    fetchReviews(page - 1)
  }

  const resetFilters = () => {
    setFilters({ status: '', moderationStatus: '' })
    setPagination((prev) => ({ ...prev, page: 0 }))
  }

  // Bulk Approve all pending reviews
  const handleBulkApprove = async () => {
    const pendingReviews = reviews.filter((r) => {
      const status = r.moderationStatus || r.moderation_status
      return status === 'PENDING'
    })

    if (pendingReviews.length === 0) {
      toast.info('No pending reviews to approve')
      return
    }

    if (!window.confirm(`Approve ${pendingReviews.length} pending review(s)?`)) return

    let approved = 0
    let failed = 0

    for (const review of pendingReviews) {
      try {
        await reviewService.moderateReview(review.id, { moderationStatus: 'APPROVED' })
        approved++
      } catch (error) {
        console.error('Failed to approve review:', error)
        failed++
      }
    }

    toast.success(`Approved ${approved} reviews, ${failed} failed`)
    fetchReviews(pagination.page)
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'rating', label: 'Rating' },
    { key: 'title', label: 'Title' },
    { key: 'comment', label: 'Comment' },
    { key: 'customerName', label: 'Customer' },
    { key: 'driverName', label: 'Driver' },
    { key: 'orderNumber', label: 'Order' },
    { key: 'reviewType', label: 'Type' },
    { key: 'reviewStatus', label: 'Status' },
    { key: 'moderationStatus', label: 'Moderation' },
    { key: 'reported', label: 'Reported' },
    { key: 'deleted', label: 'Deleted' },
    { key: 'createdAt', label: 'Created' },
    { key: 'updatedAt', label: 'Updated' },
    { key: 'actions', label: 'Actions' },
  ]

  const renderCell = (row, column) => {
    // Get value with fallback for different field names
    let value = row[column.key]

    // Special handling for moderationStatus
    if (column.key === 'moderationStatus') {
      value = row.moderationStatus || row.moderation_status || 'PENDING'
    }

    // Special handling for reviewStatus
    if (column.key === 'reviewStatus') {
      value = row.reviewStatus || row.review_status || 'ACTIVE'
    }

    switch (column.key) {
      case 'id':
        return value?.slice(0, 8) || 'N/A'
      case 'rating':
        return value ? `${value} ★` : 'N/A'
      case 'title':
        return value || 'No title'
      case 'comment':
        return value ? (value.length > 50 ? value.slice(0, 50) + '...' : value) : 'No comment'
      case 'customerName':
        return value || row.customer?.name || row.customer?.email || row.customerEmail || 'N/A'
      case 'driverName':
        return value || row.driver?.name || row.driver?.email || row.driverEmail || 'N/A'
      case 'orderNumber':
        return value || row.order?.orderNumber || row.orderNumber || 'N/A'
      case 'reviewType':
        return value || 'CUSTOMER_TO_DRIVER'
      case 'reviewStatus':
        return REVIEW_STATUS_LABELS[value] || value || 'ACTIVE'
      case 'moderationStatus': {
        const status = row.moderationStatus || row.moderation_status || 'PENDING'
        return MODERATION_STATUS_LABELS[status] || status || 'PENDING'
      }
      case 'reported':
        return value ? 'Yes' : 'No'
      case 'deleted':
        return value ? 'Yes' : 'No'
      case 'createdAt':
        return value ? new Date(value).toLocaleDateString() : 'N/A'
      case 'updatedAt':
        return value ? new Date(value).toLocaleDateString() : 'N/A'
      case 'actions': {
        // Get moderation status from multiple possible field names
        const moderationStatus = row.moderationStatus || row.moderation_status || 'PENDING'

        console.log('Review ID:', row.id, 'Moderation Status:', moderationStatus)

        return (
          <div className="flex gap-1 flex-wrap">
            {moderationStatus === 'PENDING' && (
              <>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleModerate(row.id, 'APPROVED')}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleModerate(row.id, 'REJECTED')}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleModerate(row.id, 'FLAGGED')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1"
                >
                  Flag
                </Button>
              </>
            )}
            {moderationStatus === 'FLAGGED' && (
              <>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleModerate(row.id, 'APPROVED')}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleModerate(row.id, 'REJECTED')}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
                >
                  Reject
                </Button>
              </>
            )}
            {moderationStatus === 'APPROVED' && (
              <Button
                size="sm"
                variant="warning"
                onClick={() => handleModerate(row.id, 'FLAGGED')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1"
              >
                Flag
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(row)}
              className="text-blue-600 hover:text-blue-800 border-blue-300 text-xs px-2 py-1"
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDelete(row.id)}
              className="text-red-600 hover:text-red-800 border-red-300 text-xs px-2 py-1"
            >
              Delete
            </Button>
          </div>
        )
      }
      default:
        return value || 'N/A'
    }
  }

  if (loading && reviews.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Review Moderation ({pagination.total})
        </h1>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="EDITED">Edited</option>
            <option value="DELETED">Deleted</option>
            <option value="HIDDEN">Hidden</option>
          </select>

          <select
            value={filters.moderationStatus}
            onChange={(e) => handleFilterChange('moderationStatus', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">All Moderation</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="FLAGGED">Flagged</option>
          </select>

          <Button onClick={resetFilters} variant="outline" size="sm">
            Reset
          </Button>
          <Button onClick={() => fetchReviews(0)} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      {/* Bulk Approve Button */}
      {reviews.some((r) => {
        const status = r.moderationStatus || r.moderation_status
        return status === 'PENDING'
      }) && (
        <div className="mb-4">
          <Button
            onClick={handleBulkApprove}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Approve All Pending
          </Button>
        </div>
      )}

      {reviews.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No reviews found"
          description="Reviews will appear here once customers submit them."
        />
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {col.label}
                    </th>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((col, index) => (
                      <TableCell key={index} className="px-3 py-2 text-sm">
                        {renderCell(row, col)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {pagination.page * pagination.size + 1} to{' '}
                {Math.min((pagination.page + 1) * pagination.size, pagination.total)} of{' '}
                {pagination.total} reviews
              </div>
              <Pagination
                currentPage={pagination.page + 1}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Review</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditFormData({ ...editFormData, rating: star })}
                    className={`text-2xl ${star <= editFormData.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Review title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Comment
              </label>
              <textarea
                value={editFormData.comment}
                onChange={(e) => setEditFormData({ ...editFormData, comment: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Review comment"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleEditSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Review
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminReviews
