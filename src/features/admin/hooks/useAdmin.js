import { useState, useCallback } from 'react'
import { adminService } from '../services/adminService'
import { driverService } from '../../drivers/services/driverService'
import { toast } from 'react-hot-toast'

export const useAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [drivers, setDrivers] = useState([])
  const [pricingConfigs, setPricingConfigs] = useState([])
  const [systemConfigs, setSystemConfigs] = useState([])
  const [auditLogs, setAuditLogs] = useState([])
  const [trackingSessions, setTrackingSessions] = useState([])
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    total: 0,
    totalPages: 0,
  })

  // ===== Dashboard Stats =====
  const getDashboardStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getDashboardStats()
      setStats(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch dashboard stats'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const getSuperDashboardStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getSuperAdminDashboardStats()
      setStats(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch super admin dashboard stats'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== User Management =====
  const fetchUsers = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await adminService.getAllUsers({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setUsers(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 20,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch users'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  const fetchUsersByRole = useCallback(
    async (role, params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await adminService.getUsersByRole(role, {
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setUsers(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 20,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch users by role'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  const updateUserStatus = useCallback(async (userId, enabled) => {
    setLoading(true)
    try {
      await adminService.updateUserStatus(userId, { enabled })
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, enabled } : user)))
      toast.success(`User ${enabled ? 'enabled' : 'disabled'} successfully`)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update user status'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteUser = useCallback(async (userId) => {
    setLoading(true)
    try {
      await adminService.deleteUser(userId)
      setUsers((prev) => prev.filter((user) => user.id !== userId))
      toast.success('User deleted successfully')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete user'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Driver Management =====
  const fetchDrivers = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await driverService.getAllDrivers({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setDrivers(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 20,
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

  // ===== Pricing Configuration =====
  const fetchPricingConfigs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getPricingConfigs()
      setPricingConfigs(data || [])
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch pricing configs'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createPricingConfig = useCallback(async (data) => {
    setLoading(true)
    try {
      const result = await adminService.createPricingConfig(data)
      setPricingConfigs((prev) => [...prev, result])
      toast.success('Pricing configuration created')
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create pricing config'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePricingConfig = useCallback(async (id, data) => {
    setLoading(true)
    try {
      const result = await adminService.updatePricingConfig(id, data)
      setPricingConfigs((prev) => prev.map((config) => (config.id === id ? result : config)))
      toast.success('Pricing configuration updated')
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update pricing config'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePricingConfig = useCallback(async (id) => {
    setLoading(true)
    try {
      await adminService.deletePricingConfig(id)
      setPricingConfigs((prev) => prev.filter((config) => config.id !== id))
      toast.success('Pricing configuration deleted')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete pricing config'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const activatePricingConfig = useCallback(async (id) => {
    setLoading(true)
    try {
      await adminService.activatePricingConfig(id)
      setPricingConfigs((prev) =>
        prev.map((config) =>
          config.id === id ? { ...config, active: true } : { ...config, active: false }
        )
      )
      toast.success('Pricing configuration activated')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to activate pricing config'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deactivatePricingConfig = useCallback(async (id) => {
    setLoading(true)
    try {
      await adminService.deactivatePricingConfig(id)
      setPricingConfigs((prev) =>
        prev.map((config) => (config.id === id ? { ...config, active: false } : config))
      )
      toast.success('Pricing configuration deactivated')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to deactivate pricing config'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== System Configuration (NEW) =====
  const fetchSystemConfigs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminService.getSystemConfigs()
      setSystemConfigs(data || [])
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch system configs'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSystemConfig = useCallback(async (key, data) => {
    setLoading(true)
    try {
      const result = await adminService.updateSystemConfig(key, data)
      setSystemConfigs((prev) => prev.map((config) => (config.key === key ? result : config)))
      toast.success('System configuration updated')
      return result
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update system config'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Admin Tracking (NEW) =====
  const fetchAllTracking = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await adminService.getAllTracking({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setTrackingSessions(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 20,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch tracking sessions'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Driver Payment (NEW) =====
  const processDriverPayment = useCallback(async (driverId, amount) => {
    setLoading(true)
    try {
      await adminService.processDriverPayment(driverId, amount)
      toast.success(`Payment of ₦${amount} processed for driver`)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to process driver payment'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Audit Logs =====
  const fetchAuditLogs = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await adminService.getAuditLogs({
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setAuditLogs(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || 20,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch audit logs'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Pagination =====
  const changePage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const changePageSize = useCallback((size) => {
    setPagination((prev) => ({ ...prev, size, page: 0 }))
  }, [])

  // ===== Reset =====
  const resetState = useCallback(() => {
    setStats(null)
    setUsers([])
    setDrivers([])
    setPricingConfigs([])
    setSystemConfigs([])
    setAuditLogs([])
    setTrackingSessions([])
    setPagination({
      page: 0,
      size: 20,
      total: 0,
      totalPages: 0,
    })
    setError(null)
  }, [])

  return {
    // State
    loading,
    error,
    stats,
    users,
    drivers,
    pricingConfigs,
    systemConfigs,
    auditLogs,
    trackingSessions,
    pagination,

    // Dashboard
    getDashboardStats,
    getSuperDashboardStats,

    // Users
    fetchUsers,
    fetchUsersByRole,
    updateUserStatus,
    deleteUser,

    // Drivers
    fetchDrivers,

    // Pricing
    fetchPricingConfigs,
    createPricingConfig,
    updatePricingConfig,
    deletePricingConfig,
    activatePricingConfig,
    deactivatePricingConfig,

    // System Config
    fetchSystemConfigs,
    updateSystemConfig,

    // Tracking
    fetchAllTracking,

    // Driver Payment
    processDriverPayment,

    // Audit Logs
    fetchAuditLogs,

    // Pagination
    changePage,
    changePageSize,

    // Reset
    resetState,
  }
}
