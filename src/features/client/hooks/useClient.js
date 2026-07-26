import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { userService } from '../../customers/services/userService'

export const useClient = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [addresses, setAddresses] = useState([])

  // ===== Get Profile =====
  const getProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Using userService from customers feature (reuse)
      // You should create a dedicated client service if needed
      const data = await userService.getProfile()
      setProfile(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load profile'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Profile =====
  const updateProfile = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await userService.updateProfile(data)
      setProfile(updated)
      toast.success('Profile updated successfully')
      return updated
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Addresses =====
  const getAddresses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Using addressService (you'll need to create or import)
      // For now, mock data
      const data = [
        { id: '1', addressLine1: '123 Main St', city: 'Lagos', state: 'Lagos', isDefault: true },
        {
          id: '2',
          addressLine1: '456 Victoria Island',
          city: 'Lagos',
          state: 'Lagos',
          isDefault: false,
        },
      ]
      setAddresses(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load addresses'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Add Address =====
  const addAddress = useCallback(async (data) => {
    setLoading(true)
    try {
      // Mock API call
      const newAddress = { id: Date.now().toString(), ...data }
      setAddresses((prev) => [...prev, newAddress])
      toast.success('Address added')
      return newAddress
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add address'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Delete Address =====
  const deleteAddress = useCallback(async (id) => {
    setLoading(true)
    try {
      setAddresses((prev) => prev.filter((a) => a.id !== id))
      toast.success('Address deleted')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete address'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Set Default Address =====
  const setDefaultAddress = useCallback(async (id) => {
    setLoading(true)
    try {
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          isDefault: a.id === id,
        }))
      )
      toast.success('Default address updated')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to set default address'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    error,
    profile,
    addresses,
    getProfile,
    updateProfile,
    getAddresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  }
}
