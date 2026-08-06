// features/drivers/components/DriverDispatches/DriverDispatches.jsx

import { useEffect, useState } from 'react'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import DispatchCard from './DispatchCard'
import DispatchDetailsModal from './DispatchDetailsModal'
import { dispatchService } from '@/shared/services/dispatchService'

const DriverDispatches = () => {
  const [dispatches, setDispatches] = useState([])
  const [selectedDispatch, setSelectedDispatch] = useState(null)
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [size] = useState(10)
  const [totalPages, setTotalPages] = useState(0)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const loadDispatches = async () => {
    setLoading(true)

    try {
      const response = await dispatchService.getMyDispatches({
        page,
        size,
      })

      setDispatches(response.content || [])
      setTotalPages(response.totalPages || 0)
    } catch (err) {
      console.error(err)
      setDispatches([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDispatches()
  }, [page])

  const filteredDispatches = dispatches.filter((dispatch) => {
    const matchesSearch =
      dispatch.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      dispatch.pickupLocation?.toLowerCase().includes(search.toLowerCase()) ||
      dispatch.deliveryLocation?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = status === '' || dispatch.status === status

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search dispatch..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-md px-3 py-2 dark:bg-gray-700"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="WAITING_DRIVER_ACCEPTANCE">Waiting</option>
          <option value="DRIVER_ACCEPTED">Accepted</option>
          <option value="EN_ROUTE_PICKUP">En Route</option>
          <option value="PICKUP_COMPLETED">Picked Up</option>
          <option value="DELIVERY_IN_PROGRESS">Delivering</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>

      {filteredDispatches.length === 0 ? (
        <EmptyState
          icon="🚚"
          title="No Dispatches"
          description="You don't have any dispatches yet."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDispatches.map((dispatch) => (
            <DispatchCard
              key={dispatch.id}
              dispatch={dispatch}
              onView={() => setSelectedDispatch(dispatch)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-3">
          <Button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>

          <span className="flex items-center">
            Page {page + 1} of {totalPages}
          </span>

          <Button disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}

      <DispatchDetailsModal
        dispatch={selectedDispatch}
        isOpen={!!selectedDispatch}
        onClose={() => setSelectedDispatch(null)}
      />
    </div>
  )
}

export default DriverDispatches
