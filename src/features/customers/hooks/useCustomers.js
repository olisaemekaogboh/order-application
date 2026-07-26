import { useState, useCallback } from 'react'
import { userService } from '../services/userService'
import { toast } from 'react-hot-toast'
import { CUSTOMER_DEFAULTS } from '../constants'

export const useCustomers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [customers, setCustomers] = useState([])
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [stats, setStats] = useState(null)
  const [pagination, setPagination] = useState({
    page: CUSTOMER_DEFAULTS.PAGE,
    size: CUSTOMER_DEFAULTS.SIZE,
    total: 0,
    totalPages: 0,
  })

  // ===== Fetch All Customers =====
  const fetchCustomers = useCallback(
    async (params = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response = await userService.getAllUsers({
          page: pagination.page,
          size: pagination.size,
          sortBy: CUSTOMER_DEFAULTS.SORT_BY,
          sortDirection: CUSTOMER_DEFAULTS.SORT_DIRECTION,
          ...params,
        })
        setCustomers(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || CUSTOMER_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch customers'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Get Customer by ID =====
  const getCustomer = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const customer = await userService.getUserById(id)
      setCurrentCustomer(customer)
      return customer
    } catch (err) {
      const message = err.response?.data?.message || 'Customer not found'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Get Customer by Email =====
  const getCustomerByEmail = useCallback(async (email) => {
    setLoading(true)
    setError(null)
    try {
      const customer = await userService.getUserByEmail(email)
      setCurrentCustomer(customer)
      return customer
    } catch (err) {
      const message = err.response?.data?.message || 'Customer not found'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Customer =====
  const updateCustomer = useCallback(
    async (id, data) => {
      setLoading(true)
      setError(null)
      try {
        const customer = await userService.updateUser(id, data)
        setCustomers((prev) => prev.map((c) => (c.id === id ? customer : c)))
        if (currentCustomer?.id === id) {
          setCurrentCustomer(customer)
        }
        toast.success('Customer updated successfully')
        return customer
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to update customer'
        setError(message)
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Delete Customer =====
  const deleteCustomer = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await userService.deleteUser(id)
        setCustomers((prev) => prev.filter((c) => c.id !== id))
        if (currentCustomer?.id === id) {
          setCurrentCustomer(null)
        }
        toast.success('Customer deleted successfully')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to delete customer'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Enable Customer =====
  const enableCustomer = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await userService.enableUser(id)
        setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, enabled: true } : c)))
        if (currentCustomer?.id === id) {
          setCurrentCustomer((prev) => ({ ...prev, enabled: true }))
        }
        toast.success('Customer enabled')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to enable customer'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Disable Customer =====
  const disableCustomer = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await userService.disableUser(id)
        setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, enabled: false } : c)))
        if (currentCustomer?.id === id) {
          setCurrentCustomer((prev) => ({ ...prev, enabled: false }))
        }
        toast.success('Customer disabled')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to disable customer'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Suspend Customer =====
  const suspendCustomer = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await userService.suspendUser(id)
        setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'SUSPENDED' } : c)))
        if (currentCustomer?.id === id) {
          setCurrentCustomer((prev) => ({ ...prev, status: 'SUSPENDED' }))
        }
        toast.success('Customer suspended')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to suspend customer'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Reactivate Customer =====
  const reactivateCustomer = useCallback(
    async (id) => {
      setLoading(true)
      try {
        await userService.reactivateUser(id)
        setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'ACTIVE' } : c)))
        if (currentCustomer?.id === id) {
          setCurrentCustomer((prev) => ({ ...prev, status: 'ACTIVE' }))
        }
        toast.success('Customer reactivated')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to reactivate customer'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Assign Role =====
  const assignRole = useCallback(
    async (id, role) => {
      setLoading(true)
      try {
        await userService.assignRole(id, role)
        setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, role } : c)))
        if (currentCustomer?.id === id) {
          setCurrentCustomer((prev) => ({ ...prev, role }))
        }
        toast.success('Role assigned successfully')
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to assign role'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [currentCustomer]
  )

  // ===== Get Customer Stats =====
  const getCustomerStats = useCallback(async () => {
    setLoading(true)
    try {
      const data = await userService.getStats()
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

  // ===== Search Customers =====
  const searchCustomers = useCallback(
    async (query, params = {}) => {
      setLoading(true)
      try {
        const response = await userService.searchUsers(query, {
          page: pagination.page,
          size: pagination.size,
          ...params,
        })
        setCustomers(response.content || [])
        setPagination({
          page: response.page || 0,
          size: response.size || CUSTOMER_DEFAULTS.SIZE,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        })
        return response
      } catch (err) {
        const message = err.response?.data?.message || 'Search failed'
        toast.error(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [pagination.page, pagination.size]
  )

  // ===== Export Customers =====
  const exportCustomers = useCallback(async (format = 'csv') => {
    setLoading(true)
    try {
      const blob = await userService.exportUsers(format)
      // Trigger download
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `customers.${format}`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      toast.success('Export successful')
    } catch (err) {
      const message = err.response?.data?.message || 'Export failed'
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

  // ===== Clear Current Customer =====
  const clearCurrentCustomer = useCallback(() => {
    setCurrentCustomer(null)
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setCustomers([])
    setCurrentCustomer(null)
    setStats(null)
    setError(null)
    setPagination({
      page: CUSTOMER_DEFAULTS.PAGE,
      size: CUSTOMER_DEFAULTS.SIZE,
      total: 0,
      totalPages: 0,
    })
  }, [])

  return {
    // State
    loading,
    error,
    customers,
    currentCustomer,
    stats,
    pagination,

    // Actions
    fetchCustomers,
    getCustomer,
    getCustomerByEmail,
    updateCustomer,
    deleteCustomer,
    enableCustomer,
    disableCustomer,
    suspendCustomer,
    reactivateCustomer,
    assignRole,
    getCustomerStats,
    searchCustomers,
    exportCustomers,
    changePage,
    changePageSize,
    clearCurrentCustomer,
    reset,
  }
}
