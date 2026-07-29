import React, { useEffect, useState } from 'react'
import { vehicleService } from '@/shared/services/vehicleService'
import Table from '@/shared/components/ui/Table/Table'
import Pagination from '@/shared/components/ui/Pagination/Pagination'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import Modal from '@/shared/components/ui/Modal/Modal'
import Input from '@/shared/components/ui/Input/Input'
import Select from '@/shared/components/ui/Select/Select'
import { VEHICLE_TYPES_LABELS } from '../../../orders/constants'
import toast from 'react-hot-toast'

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0, totalPages: 0 })
  const [showModal, setShowModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    type: '',
    capacity: '',
    status: 'AVAILABLE',
  })

  const fetchVehicles = async (page = pagination.page) => {
    setLoading(true)
    try {
      const response = await vehicleService.getVehicles({ page, size: pagination.size })
      setVehicles(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
    } catch (error) {
      toast.error('Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleSave = async () => {
    try {
      if (editingVehicle) {
        await vehicleService.updateVehicle(editingVehicle.id, formData)
        toast.success('Vehicle updated')
      } else {
        await vehicleService.createVehicle(formData)
        toast.success('Vehicle created')
      }
      setShowModal(false)
      setEditingVehicle(null)
      setFormData({ vehicleNumber: '', type: '', capacity: '', status: 'AVAILABLE' })
      fetchVehicles(pagination.page)
    } catch (error) {
      toast.error('Save failed')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vehicle?')) {
      try {
        await vehicleService.deleteVehicle(id)
        toast.success('Vehicle deleted')
        fetchVehicles(pagination.page)
      } catch (error) {
        toast.error('Delete failed')
      }
    }
  }

  const columns = [
    { key: 'vehicleNumber', label: 'Number' },
    { key: 'type', label: 'Type', render: (val) => VEHICLE_TYPES_LABELS[val] || val },
    { key: 'capacity', label: 'Capacity' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setEditingVehicle(row)
              setFormData(row)
              setShowModal(true)
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(row.id)}
            className="text-red-600"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <Button
          onClick={() => {
            setEditingVehicle(null)
            setFormData({ vehicleNumber: '', type: '', capacity: '', status: 'AVAILABLE' })
            setShowModal(true)
          }}
        >
          Add Vehicle
        </Button>
      </div>

      {loading ? <Spinner /> : <Table data={vehicles} columns={columns} />}
      <Pagination
        currentPage={pagination.page + 1}
        totalPages={pagination.totalPages}
        onPageChange={(page) => fetchVehicles(page - 1)}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{editingVehicle ? 'Edit' : 'New'} Vehicle</h2>
          <div className="space-y-4">
            <Input
              label="Vehicle Number"
              value={formData.vehicleNumber}
              onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
            />
            <Select
              label="Type"
              options={Object.entries(VEHICLE_TYPES_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <Input
              label="Capacity (kg)"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
            <Select
              label="Status"
              options={[
                { value: 'AVAILABLE', label: 'Available' },
                { value: 'IN_TRANSIT', label: 'In Transit' },
                { value: 'MAINTENANCE', label: 'Maintenance' },
              ]}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminVehicles
