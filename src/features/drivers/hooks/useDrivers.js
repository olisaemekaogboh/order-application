import { useState, useCallback } from 'react'
import { driverService } from '../services/driverService'
import { toast } from 'react-hot-toast'
import { DRIVER_DEFAULTS } from '../constants'

export const useDrivers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [drivers, setDrivers] = useState([])
  const [currentDriver, setCurrentDriver] = useState(null)
  const [earnings, setEarnings] = useState([])
  const [pagination, setPagination] = useState({
    page: DRIVER_DEFAULTS.PAGE,
    size: DRIVER_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Fetch All Drivers =====
  const fetchDrivers = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await driverService.getAllDrivers({
          page: pagination.page,
          size: pagination.size,
          sortBy: DRIVER_DEFAULTS.SORT_BY,
          sortDirection: DRIVER_DEFAULTS.SORT_DIRECTION,
          ...params,
        })
        setDrivers(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || DRIVER_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch drivers'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Fetch Available Drivers =====
  const fetchAvailableDrivers = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const response = await driverService.getAvailableDrivers(params)
      return response
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch available drivers'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Driver by ID =====
  const getDriver = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const driver = await driverService.getDriverById(id)
      setCurrentDriver(driver)
      return driver
    } catch (err) {
      const message = err.response?.data?.message || 'Driver not found'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Register Driver =====
  const registerDriver = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const driver = await driverService.registerDriver(data)
      setDrivers((prev) => [driver, ...prev])
      toast.success('Driver registered successfully')
      return driver
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to register driver'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Driver =====
  const updateDriver = useCallback(
    async (id, data) => {
      setLoading(true)
      setError(null)
      try {
        const driver = await driverService.updateDriver(id, data)
        setDrivers((prev) => prev.map((d) => (d.id === id ? driver : d)))
        if (currentDriver?.id === id) {
          setCurrentDriver(driver)
        }
        toast.success('Driver updated successfully')
        return driver
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update driver'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentDriver]
  )

  // ===== Delete Driver =====
  const deleteDriver = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await driverService.deleteDriver(id)
        setDrivers((prev) => prev.filter((d) => d.id !== id))
        if (currentDriver?.id === id) {
          setCurrentDriver(null)
        }
        toast.success('Driver deleted successfully')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete driver'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentDriver]
  )

  // ===== Update Availability =====
  const updateAvailability = useCallback(
    async (id, available) => {
      setLoading(true)
      try {
        await driverService.updateAvailability(id, available)
        setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, available } : d)))
        if (currentDriver?.id === id) {
          setCurrentDriver((prev) => ({ ...prev, available }))
        }
        toast.success(`Driver ${available ? 'available' : 'unavailable'}`)
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update availability'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentDriver]
  )

  // ===== Update Location =====
  const updateLocation = useCallback(
    async (id, latitude, longitude, location) => {
      setLoading(true)
      try {
        await driverService.updateLocation(id, latitude, longitude, location)
        const updated = {
          currentLatitude: latitude,
          currentLongitude: longitude,
          currentLocation: location,
        }
        setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)))
        if (currentDriver?.id === id) {
          setCurrentDriver((prev) => ({ ...prev, ...updated }))
        }
        toast.success('Location updated')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update location'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentDriver]
  )

  // ===== Get Driver Earnings =====
  const getDriverEarnings = useCallback(async (id) => {
    setLoading(true)
    try {
      const data = await driverService.getDriverEarnings(id)
      setEarnings(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch earnings'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Driver Earnings (Paginated) =====
  const getDriverEarningsPaginated = useCallback(async (id, page = 0, size = 10) => {
    setLoading(true)
    try {
      const response = await driverService.getDriverEarningsPaginated(id, page, size)
      setEarnings(response.content || [])
      setPagination({
        page: response.page || 0,
        size: response.size || 10,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      })
      return response
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch earnings'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Total Earnings =====
  const getTotalEarnings = useCallback(async (id) => {
    try {
      const total = await driverService.getTotalEarnings(id)
      return total
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch total earnings'
      toast.error(message)
      throw err
    }
  }, [])

  // ===== Get Unpaid Earnings =====
  const getUnpaidEarnings = useCallback(async (id) => {
    try {
      const unpaid = await driverService.getUnpaidEarnings(id)
      return unpaid
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch unpaid earnings'
      toast.error(message)
      throw err
    }
  }, [])

  // ===== Process Payment =====
  const processPayment = useCallback(
    async (id, amount) => {
      setLoading(true)
      try {
        await driverService.processPayment(id, amount)
        // Refresh earnings after payment
        await getDriverEarnings(id)
        toast.success('Payment processed successfully')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to process payment'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [getDriverEarnings]
  )

  // ===== Change Page =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setDrivers([])
    setCurrentDriver(null)
    setEarnings([])
    setError(null)
    setPagination({
      page: DRIVER_DEFAULTS.PAGE,
      size: DRIVER_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    error,
    drivers,
    currentDriver,
    earnings,
    pagination,

    // Actions
    fetchDrivers,
    fetchAvailableDrivers,
    getDriver,
    registerDriver,
    updateDriver,
    deleteDriver,
    updateAvailability,
    updateLocation,
    getDriverEarnings,
    getDriverEarningsPaginated,
    getTotalEarnings,
    getUnpaidEarnings,
    processPayment,
    changePage,
    changePageSize,
    reset,
  }
}
