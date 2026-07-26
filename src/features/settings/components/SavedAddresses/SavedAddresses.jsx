import React, { useState, useEffect } from 'react'
import { useSettings } from '../../hooks/useSettings'
import Input from '@/shared/components/ui/Input/Input'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Nigeria',
    label: 'Home',
    isDefault: false,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // TODO: Replace with actual API call
    // For now, use mock data
    setAddresses([
      {
        id: '1',
        addressLine1: '123 Main Street',
        city: 'Lagos',
        state: 'Lagos',
        postalCode: '100001',
        country: 'Nigeria',
        label: 'Home',
        isDefault: true,
      },
      {
        id: '2',
        addressLine1: '456 Victoria Island',
        city: 'Lagos',
        state: 'Lagos',
        postalCode: '101241',
        country: 'Nigeria',
        label: 'Office',
        isDefault: false,
      },
    ])
    setLoading(false)
  }, [])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      // TODO: Replace with actual API call
      const newAddress = {
        id: Date.now().toString(),
        ...formData,
      }
      setAddresses((prev) => [...prev, newAddress])
      setShowForm(false)
      setFormData({
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Nigeria',
        label: 'Home',
        isDefault: false,
      })
      toast.success('Address added successfully')
    } catch (error) {
      toast.error('Failed to add address')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return
    try {
      setAddresses((prev) => prev.filter((a) => a.id !== id))
      toast.success('Address deleted')
    } catch (error) {
      toast.error('Failed to delete address')
    }
  }

  const handleSetDefault = async (id) => {
    try {
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          isDefault: a.id === id,
        }))
      )
      toast.success('Default address updated')
    } catch (error) {
      toast.error('Failed to update default address')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Addresses</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Address'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Address Line 1"
                value={formData.addressLine1}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
                required
                disabled={submitting}
              />
              <Input
                label="Address Line 2 (Optional)"
                value={formData.addressLine2}
                onChange={(e) => handleChange('addressLine2', e.target.value)}
                disabled={submitting}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  required
                  disabled={submitting}
                />
                <Input
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  required
                  disabled={submitting}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  disabled={submitting}
                />
                <Input
                  label="Label (e.g., Home, Office)"
                  value={formData.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                  disabled={submitting}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleChange('isDefault', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Set as default address
              </label>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save Address'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {addresses.length === 0 ? (
        <EmptyState
          icon="🏠"
          title="No Addresses"
          description="You haven't saved any addresses yet."
        />
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{address.label}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{address.addressLine1}</p>
                  {address.addressLine2 && (
                    <p className="text-gray-600 dark:text-gray-300">{address.addressLine2}</p>
                  )}
                  <p className="text-gray-600 dark:text-gray-300">
                    {address.city}, {address.state}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{address.country}</p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button size="sm" variant="ghost" onClick={() => handleSetDefault(address.id)}>
                      Set Default
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedAddresses
