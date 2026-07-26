import React, { useState, useEffect } from 'react'
import Modal from '@/shared/components/ui/Modal/Modal'
import { driverService } from '../../services/driverService'
import { orderService } from '../../../orders/services/orderService'
import toast from 'react-hot-toast'

export const DriverAssignmentModal = ({ isOpen, onClose, orderId }) => {
  const [drivers, setDrivers] = useState([])
  const [selectedDriver, setSelectedDriver] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchAvailableDrivers()
    }
  }, [isOpen])

  const fetchAvailableDrivers = async () => {
    try {
      const data = await driverService.getAvailableDrivers()
      setDrivers(data || [])
    } catch (error) {
      toast.error('Failed to load drivers')
    }
  }

  const handleAssign = async () => {
    if (!selectedDriver) {
      toast.error('Please select a driver')
      return
    }
    setLoading(true)
    try {
      await orderService.assignDriver(orderId, selectedDriver)
      toast.success('Driver assigned successfully')
      onClose()
    } catch (error) {
      toast.error('Failed to assign driver')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Driver">
      <div className="space-y-4">
        <select
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Select a driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name} - {driver.vehicleType}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssign}
          disabled={loading || !selectedDriver}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? 'Assigning...' : 'Assign Driver'}
        </button>
      </div>
    </Modal>
  )
}

export default DriverAssignmentModal
