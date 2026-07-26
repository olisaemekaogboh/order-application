import React, { useState, useEffect } from 'react'
import { useClient } from '../../hooks/useClient'
import { Card, CardContent } from '@/shared/components/ui/Card/Card'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import EmptyState from '@/shared/components/ui/EmptyState/EmptyState'
import toast from 'react-hot-toast'

const ClientAddresses = () => {
  const { addresses, loading, getAddresses, addAddress, deleteAddress, setDefaultAddress } =
    useClient()

  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  useEffect(() => {
    getAddresses()
  }, [])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addAddress(formData)
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
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this address?')) {
      await deleteAddress(id)
    }
  }

  const handleSetDefault = async (id) => {
    await setDefaultAddress(id)
  }

  if (loading && addresses.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Addresses</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Address'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Address Line 1"
                value={formData.addressLine1}
                onChange={(e) => handleChange('addressLine1', e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Input
                label="Address Line 2 (Optional)"
                value={formData.addressLine2}
                onChange={(e) => handleChange('addressLine2', e.target.value)}
                disabled={isSubmitting}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <Input
                  label="State"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  disabled={isSubmitting}
                />
                <Input
                  label="Label (e.g., Home, Office)"
                  value={formData.label}
                  onChange={(e) => handleChange('label', e.target.value)}
                  disabled={isSubmitting}
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Address'}
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

export default ClientAddresses
