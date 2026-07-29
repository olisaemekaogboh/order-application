import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import { driverService } from '../../services/driverService'
import Table from '@/shared/components/ui/Table/Table'
import Spinner from '@/shared/components/ui/Spinner/Spinner'

const DriverEarnings = () => {
  const { user } = useAuth()
  const [earnings, setEarnings] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const data = await driverService.getDriverEarnings(user.id)
        setEarnings(data.transactions || [])
        setTotal(data.total || 0)
      } catch (error) {
        console.error('Failed to load earnings', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEarnings()
  }, [user.id])

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )

  const columns = [
    { key: 'orderId', label: 'Order' },
    { key: 'amount', label: 'Amount', render: (val) => `₦${Number(val).toLocaleString()}` },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString() },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Earnings</h1>
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <p className="text-lg">
          Total Earnings: <span className="font-bold text-blue-600">₦{total.toLocaleString()}</span>
        </p>
      </div>
      <Table data={earnings} columns={columns} />
    </div>
  )
}

export default DriverEarnings
