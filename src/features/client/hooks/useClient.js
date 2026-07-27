import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { userService } from '../../customers/services/userService'

export const useClient = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [profile, setProfile] = useState(null)
  const [addresses, setAddresses] = useState([])

  const getErrorMessage = (err, fallback) =>
    err?.response?.data?.message || err?.response?.data?.error || fallback

  /* ==========================================
   * PROFILE
   * ========================================== */

  const getProfile = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await userService.getProfile()
      setProfile(data)
      return data
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to load profile')
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (payload) => {
    setLoading(true)
    setError(null)

    try {
      const updated = await userService.updateProfile(payload)

      setProfile(updated)

      toast.success('Profile updated successfully')

      return updated
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to update profile')
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  /* ==========================================
   * ADDRESSES
   * ========================================== */

  const getAddresses = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await userService.getAddresses()

      const list = Array.isArray(data) ? data : data?.addresses || data?.content || []

      setAddresses(list)

      return list
    } catch (err) {
      console.warn('Address endpoints unavailable. Falling back to empty list.', err)

      setAddresses([])

      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const addAddress = useCallback(
    async (payload) => {
      setLoading(true)
      setError(null)

      try {
        const created = await userService.addAddress(payload)

        await getAddresses()

        toast.success('Address added successfully')

        return created
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to add address')
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [getAddresses]
  )

  const updateAddress = useCallback(
    async (addressId, payload) => {
      setLoading(true)
      setError(null)

      try {
        const updated = await userService.updateAddress(addressId, payload)

        await getAddresses()

        toast.success('Address updated successfully')

        return updated
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to update address')

        setError(message)
        toast.error(message)

        throw err
      } finally {
        setLoading(false)
      }
    },
    [getAddresses]
  )

  const deleteAddress = useCallback(async (addressId) => {
    setLoading(true)
    setError(null)

    try {
      await userService.deleteAddress(addressId)

      setAddresses((prev) =>
        prev.filter((address) => (address.id || address.addressId) !== addressId)
      )

      toast.success('Address deleted successfully')
    } catch (err) {
      const message = getErrorMessage(err, 'Failed to delete address')

      setError(message)
      toast.error(message)

      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const setDefaultAddress = useCallback(
    async (addressId) => {
      setLoading(true)
      setError(null)

      try {
        await userService.setDefaultAddress(addressId)

        await getAddresses()

        toast.success('Default address updated')
      } catch (err) {
        const message = getErrorMessage(err, 'Failed to set default address')

        setError(message)
        toast.error(message)

        throw err
      } finally {
        setLoading(false)
      }
    },
    [getAddresses]
  )

  const getDefaultAddress = useCallback(async () => {
    try {
      return await userService.getDefaultAddress()
    } catch {
      return null
    }
  }, [])

  const geocodeAddress = useCallback(async (address) => {
    try {
      return await userService.geocodeAddress(address)
    } catch (err) {
      const message = getErrorMessage(err, 'Unable to geocode address')

      toast.error(message)
      throw err
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
    getDefaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    geocodeAddress,
  }
}
