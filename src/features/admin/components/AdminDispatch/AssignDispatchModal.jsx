// AssignDispatchModal.jsx - With dropdowns
import React, { useState, useEffect } from 'react'
import Modal from '@/shared/components/ui/Modal/Modal'
import Select from '@/shared/components/ui/Select/Select'
import Textarea from '@/shared/components/ui/Textarea/Textarea'
import Button from '@/shared/components/ui/Button/Button'
import { driverService } from '@/features/drivers/services/driverService'
import { vehicleService } from '@/features/vehicles/services/vehicleService'
import toast from 'react-hot-toast'

const AssignDispatchModal = ({ isOpen, onClose, onAssign, order, loading }) => {
  const [availableDrivers, setAvailableDrivers] = useState([])
  const [availableVehicles, setAvailableVehicles] = useState([])
  const [driversLoading, setDriversLoading] = useState(false)
  const [vehiclesLoading, setVehiclesLoading] = useState(false)
  const [formData, setFormData] = useState({
    driverId: '',
    vehicleId: '',
    priority: 0,
    notes: '',
  })

  useEffect(() => {
    if (isOpen && order) {
      setFormData({
        driverId: '',
        vehicleId: '',
        priority: 0,
        notes: '',
      })
      fetchAvailableDrivers()
      fetchAvailableVehicles()
    }
  }, [isOpen, order])

  const fetchAvailableDrivers = async () => {
    setDriversLoading(true)
    try {
      const drivers = await driverService.getAvailableDrivers()
      setAvailableDrivers(drivers || [])
    } catch (error) {
      console.error('Failed to fetch drivers:', error)
      toast.error('Failed to load available drivers')
    } finally {
      setDriversLoading(false)
    }
  }

  const fetchAvailableVehicles = async () => {
    setVehiclesLoading(true)
    try {
      const vehicles = await vehicleService.getAvailableVehicles()
      setAvailableVehicles(vehicles || [])
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      toast.error('Failed to load available vehicles')
    } finally {
      setVehiclesLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.driverId) {
      toast.error('Please select a driver')
      return
    }
    if (!formData.vehicleId) {
      toast.error('Please select a vehicle')
      return
    }
    onAssign(formData)
  }

  const priorityOptions = [
    { value: 0, label: 'Normal' },
    { value: 1, label: 'High' },
    { value: 2, label: 'Urgent' },
  ]

  const driverOptions = availableDrivers.map((d) => ({
    value: d.id,
    label: `${d.name} ${d.vehiclePlateNumber ? `(${d.vehiclePlateNumber})` : ''}`,
    disabled: !d.available || !d.verified,
  }))

  const vehicleOptions = availableVehicles.map((v) => ({
    value: v.id,
    label: `${v.vehicleNumber} - ${v.brand || ''} ${v.model || ''} (${v.plateNumber || 'N/A'})`,
    disabled: v.status !== 'AVAILABLE',
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Dispatch">
      <form onSubmit={handleSubmit} className="space-y-4">
        {order && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Order: #{order.orderNumber || order.id?.slice(0, 8)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {order.pickupLocation || 'N/A'} → {order.deliveryLocation || 'N/A'}
            </p>
          </div>
        )}

        <div>
          <Select
            label="Driver *"
            options={driverOptions}
            value={formData.driverId}
            onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
            required
            disabled={loading || driversLoading}
            placeholder={driversLoading ? 'Loading drivers...' : 'Select a driver'}
          />
          {availableDrivers.length === 0 && !driversLoading && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              No available drivers found. Please register drivers first.
            </p>
          )}
        </div>

        <div>
          <Select
            label="Vehicle *"
            options={vehicleOptions}
            value={formData.vehicleId}
            onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
            required
            disabled={loading || vehiclesLoading}
            placeholder={vehiclesLoading ? 'Loading vehicles...' : 'Select a vehicle'}
          />
          {availableVehicles.length === 0 && !vehiclesLoading && (
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
              No available vehicles found. Please add vehicles first.
            </p>
          )}
        </div>

        <div>
          <Select
            label="Priority"
            options={priorityOptions}
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
            disabled={loading}
          />
        </div>

        <div>
          <Textarea
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Special instructions for driver..."
            disabled={loading}
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !formData.driverId || !formData.vehicleId}
          >
            {loading ? 'Assigning...' : 'Assign Dispatch'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AssignDispatchModal
