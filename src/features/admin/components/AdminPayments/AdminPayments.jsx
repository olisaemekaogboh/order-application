import React, { useEffect, useState } from 'react'
import { adminService } from '../../services/adminService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import { PAYMENT_STATUSES_LABELS } from '../../../payments/constants'

const AdminPayments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const response = await adminService.getAllPayments({
        page: pagination.page,
        size: pagination.size,
      })
      setPayments(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      console.error('Failed to fetch payments', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [pagination.page])

  const columns = [
    { key: 'transactionReference', label: 'Reference' },
    { key: 'amount', label: 'Amount', render: (val) => `₦${Number(val).toLocaleString()}` },
    { key: 'status', label: 'Status', render: (val) => PAYMENT_STATUSES_LABELS[val] || val },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'createdAt', label: 'Date', render: (val) => new Date(val).toLocaleString() },
  ]

  if (loading && payments.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      {payments.length === 0 ? (
        <EmptyState icon="💳" title="No payments found" />
      ) : (
        <>
          <Table data={payments} columns={columns} />
          <Pagination
            currentPage={pagination.page + 1}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setPagination((prev) => ({ ...prev, page: page - 1 }))}
          />
        </>
      )}
    </div>
  )
}

export default AdminPayments
