import { useState, useCallback } from 'react'
import { vehicleService } from '../services/vehicleService'
import { toast } from 'react-hot-toast'
import { VEHICLE_DEFAULTS } from '../constants'

export const useVehicles = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [currentVehicle, setCurrentVehicle] = useState(null)
  const [maintenanceHistory, setMaintenanceHistory] = useState([])
  const [stats, setStats] = useState(null)
  const [pagination, setPagination] = useState({
    page: VEHICLE_DEFAULTS.PAGE,
    size: VEHICLE_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Fetch All Vehicles =====
  const fetchVehicles = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await vehicleService.getVehicles({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setVehicles(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || VEHICLE_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch vehicles'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Fetch Available Vehicles =====
  const fetchAvailableVehicles = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const response = await vehicleService.getAvailableVehicles(params)
      return response
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch available vehicles'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Vehicle by ID =====
  const getVehicle = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const vehicle = await vehicleService.getVehicleById(id)
      setCurrentVehicle(vehicle)
      return vehicle
    } catch (err) {
      const message = err.response?.data?.message || 'Vehicle not found'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Vehicle by Plate =====
  const getVehicleByPlate = useCallback(async (plate) => {
    setLoading(true)
    try {
      const vehicle = await vehicleService.getVehicleByPlate(plate)
      setCurrentVehicle(vehicle)
      return vehicle
    } catch (err) {
      const message = err.response?.data?.message || 'Vehicle not found'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Create Vehicle =====
  const createVehicle = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const vehicle = await vehicleService.createVehicle(data)
      setVehicles((prev) => [vehicle, ...prev])
      toast.success('Vehicle created successfully')
      return vehicle
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create vehicle'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Vehicle =====
  const updateVehicle = useCallback(
    async (id, data) => {
      setLoading(true)
      setError(null)
      try {
        const vehicle = await vehicleService.updateVehicle(id, data)
        setVehicles((prev) => prev.map((v) => (v.id === id ? vehicle : v)))
        if (currentVehicle?.id === id) {
          setCurrentVehicle(vehicle)
        }
        toast.success('Vehicle updated successfully')
        return vehicle
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update vehicle'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentVehicle]
  )

  // ===== Delete Vehicle =====
  const deleteVehicle = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await vehicleService.deleteVehicle(id)
        setVehicles((prev) => prev.filter((v) => v.id !== id))
        if (currentVehicle?.id === id) {
          setCurrentVehicle(null)
        }
        toast.success('Vehicle deleted successfully')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete vehicle'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentVehicle]
  )

  // ===== Assign Vehicle to Driver =====
  const assignVehicle = useCallback(
    async (id, driverId) => {
      setLoading(true)
      try {
        const vehicle = await vehicleService.assignVehicle(id, driverId)
        setVehicles((prev) => prev.map((v) => (v.id === id ? vehicle : v)))
        if (currentVehicle?.id === id) {
          setCurrentVehicle(vehicle)
        }
        toast.success('Vehicle assigned successfully')
        return vehicle
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to assign vehicle'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentVehicle]
  )

  // ===== Unassign Vehicle =====
  const unassignVehicle = useCallback(
    async (id) => {
      setLoading(true)
      try {
        const vehicle = await vehicleService.unassignVehicle(id)
        setVehicles((prev) => prev.map((v) => (v.id === id ? vehicle : v)))
        if (currentVehicle?.id === id) {
          setCurrentVehicle(vehicle)
        }
        toast.success('Vehicle unassigned successfully')
        return vehicle
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to unassign vehicle'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentVehicle]
  )

  // ===== Update Vehicle Status =====
  const updateVehicleStatus = useCallback(
    async (id, status) => {
      setLoading(true)
      try {
        const vehicle = await vehicleService.updateVehicleStatus(id, status)
        setVehicles((prev) => prev.map((v) => (v.id === id ? vehicle : v)))
        if (currentVehicle?.id === id) {
          setCurrentVehicle(vehicle)
        }
        toast.success('Vehicle status updated')
        return vehicle
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update status'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentVehicle]
  )

  // ===== Get Maintenance History =====
  const getMaintenanceHistory = useCallback(async (id) => {
    setLoading(true)
    try {
      const history = await vehicleService.getMaintenanceHistory(id)
      setMaintenanceHistory(history || [])
      return history
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch maintenance history'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Schedule Maintenance =====
  const scheduleMaintenance = useCallback(
    async (id, data) => {
      setLoading(true)
      try {
        const result = await vehicleService.scheduleMaintenance(id, data)
        toast.success('Maintenance scheduled successfully')
        // Refresh maintenance history
        await getMaintenanceHistory(id)
        return result
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to schedule maintenance'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [getMaintenanceHistory]
  )

  // ===== Get Stats =====
  const getStats = useCallback(async () => {
    setLoading(true)
    try {
      const data = await vehicleService.getStats()
      setStats(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch stats'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Change Page =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setVehicles([])
    setCurrentVehicle(null)
    setMaintenanceHistory([])
    setStats(null)
    setError(null)
    setPagination({
      page: VEHICLE_DEFAULTS.PAGE,
      size: VEHICLE_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    error,
    vehicles,
    currentVehicle,
    maintenanceHistory,
    stats,
    pagination,

    // Actions
    fetchVehicles,
    fetchAvailableVehicles,
    getVehicle,
    getVehicleByPlate,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    assignVehicle,
    unassignVehicle,
    updateVehicleStatus,
    getMaintenanceHistory,
    scheduleMaintenance,
    getStats,
    changePage,
    changePageSize,
    reset,
  }
}
