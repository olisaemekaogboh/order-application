// features/drivers/hooks/useDriverDashboard.js
import { useState, useEffect, useCallback, useRef } from 'react'
import { driverService } from '../services/driverService'
import { trackingService } from '@/features/tracking/services/trackingService'
import { notificationService } from '@/features/notifications/services/notificationService'
import { dispatchService } from '@/shared/services/dispatchService'
import TRACKING_STATUS from '@/features/tracking/constants/trackingStatus'
import DISPATCH_PROGRESS from '../constants/dispatchProgress'

const TERMINAL_STATUSES = ['DELIVERED', 'FAILED', 'CANCELLED']

const notify = {
  success: (message) => console.log('✅', message),
  error: (message) => console.error('❌', message),
  warning: (message) => console.warn('⚠️', message),
}

export const useDriverDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dashboard, setDashboard] = useState({
    driver: null,
    currentDispatch: null,
    recentDispatches: [],
    earnings: [],
    notifications: [],
    trackingSession: null,
    stats: {
      activeDispatches: 0,
      completedDeliveries: 0,
      totalEarnings: 0,
      driverRating: 0,
    },
  })
  const [deliveryProgress, setDeliveryProgress] = useState(0)
  const pollingIntervalRef = useRef(null)
  const isPollingRef = useRef(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const hasActiveDispatch =
    dashboard.currentDispatch && !TERMINAL_STATUSES.includes(dashboard.currentDispatch.status)

  const loadTrackingForOrder = useCallback(async (orderId) => {
    try {
      const tracking = await trackingService.getTrackingByOrder(orderId)
      if (tracking?.id) return tracking
      return null
    } catch (err) {
      console.debug('No tracking found for order:', orderId)
      return null
    }
  }, [])

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const dashboardData = await driverService.getDashboard()

      if (!dashboardData) {
        throw new Error('Dashboard response is empty')
      }

      let trackingSession = null
      if (dashboardData.currentDispatch?.orderId) {
        trackingSession = await loadTrackingForOrder(dashboardData.currentDispatch.orderId)
      }

      let earnings = []
      try {
        const earningsData = await driverService.getMyEarningsPaginated(0, 10)
        earnings = earningsData?.content ?? []
      } catch (err) {
        console.warn('Could not load earnings:', err)
      }

      let notifications = []
      try {
        const notificationResponse = await notificationService.getNotifications(0, 10)
        notifications = notificationResponse?.content ?? []
      } catch (err) {
        console.warn('Could not load notifications:', err)
      }

      setDashboard({
        driver: dashboardData.driver ?? null,
        currentDispatch: dashboardData.currentDispatch ?? null,
        recentDispatches: dashboardData.recentDispatches ?? [],
        earnings,
        notifications,
        trackingSession,
        stats: {
          activeDispatches: dashboardData.activeDispatches ?? 0,
          completedDeliveries: dashboardData.totalDeliveries ?? 0,
          totalEarnings: dashboardData.totalEarnings ?? 0,
          driverRating: dashboardData.rating ?? 0,
        },
      })

      const progress = dashboardData.currentDispatch
        ? (DISPATCH_PROGRESS[dashboardData.currentDispatch.status] ?? 0)
        : 0
      setDeliveryProgress(progress)

      setError(null)
    } catch (err) {
      console.error('Failed to load dashboard:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Failed to load dashboard'
      setError(errorMessage)
      notify.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [loadTrackingForOrder])

  // ============================================
  // UPDATE TRACKING - FORCE UPDATE
  // ============================================
  // features/drivers/hooks/useDriverDashboard.js

  const updateTracking = useCallback(
    async (status, options = {}) => {
      if (isUpdating) {
        console.log('⏳ Already updating, skipping...')
        return { alreadyUpdating: true }
      }

      if (!dashboard.trackingSession?.id) {
        throw new Error('Tracking session not found')
      }

      // ✅ FIX: Check tracking session status, not dispatch status
      if (dashboard.trackingSession?.status === status) {
        console.log(`✅ Tracking already in ${status} status, skipping update`)
        return { alreadyInStatus: true }
      }

      console.log(`🔄 Updating tracking from ${dashboard.trackingSession?.status} to ${status}`)
      setIsUpdating(true)

      try {
        const result = await trackingService.updateStatus({
          trackingId: dashboard.trackingSession.id,
          status,
        })

        console.log('✅ Status update successful:', result)

        // ✅ Update both trackingSession and currentDispatch status
        setDashboard((prev) => ({
          ...prev,
          currentDispatch: prev.currentDispatch
            ? {
                ...prev.currentDispatch,
                status: status,
              }
            : null,
          trackingSession: result || prev.trackingSession,
        }))

        // Update progress
        const progress = DISPATCH_PROGRESS[status] ?? 0
        setDeliveryProgress(progress)

        // Then reload to sync everything else
        await loadDashboard()

        return result
      } catch (error) {
        console.error('❌ Status update failed:', error)
        await loadDashboard()
        throw error
      } finally {
        setIsUpdating(false)
      }
    },
    [dashboard.trackingSession, dashboard.currentDispatch, loadDashboard, isUpdating]
  )

  // ============================================
  // POLLING
  // ============================================
  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current || isPollingRef.current) {
      return
    }

    isPollingRef.current = true

    pollingIntervalRef.current = setInterval(async () => {
      if (!hasActiveDispatch) {
        stopPolling()
        return
      }

      try {
        const dashboardData = await driverService.getDashboard()

        let trackingSession = null
        if (dashboardData.currentDispatch?.orderId) {
          trackingSession = await loadTrackingForOrder(dashboardData.currentDispatch.orderId)
        }

        // ✅ Only update if status actually changed
        if (dashboardData.currentDispatch?.status !== dashboard.currentDispatch?.status) {
          console.log(
            `📡 Polling: Status changed from ${dashboard.currentDispatch?.status} to ${dashboardData.currentDispatch?.status}`
          )
          setDashboard((prev) => ({
            ...prev,
            currentDispatch: dashboardData.currentDispatch ?? null,
            trackingSession: trackingSession || prev.trackingSession,
            stats: {
              ...prev.stats,
              activeDispatches: dashboardData.activeDispatches ?? 0,
              completedDeliveries: dashboardData.totalDeliveries ?? 0,
              totalEarnings: dashboardData.totalEarnings ?? 0,
              driverRating: dashboardData.rating ?? 0,
            },
          }))

          const progress = dashboardData.currentDispatch
            ? (DISPATCH_PROGRESS[dashboardData.currentDispatch.status] ?? 0)
            : 0
          setDeliveryProgress(progress)
        } else if (trackingSession) {
          setDashboard((prev) => ({
            ...prev,
            trackingSession: trackingSession,
          }))
        }
      } catch (err) {
        // Silent fail for polling
      }
    }, 5000) // ✅ Reduced to 5 seconds for faster sync
  }, [hasActiveDispatch, dashboard.currentDispatch, loadTrackingForOrder])

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
      isPollingRef.current = false
    }
  }, [])

  useEffect(() => {
    if (hasActiveDispatch) {
      startPolling()
    } else {
      stopPolling()
    }
    return () => stopPolling()
  }, [hasActiveDispatch, startPolling, stopPolling])

  // ============================================
  // ACTION HANDLERS
  // ============================================

  const acceptDispatch = useCallback(
    async (dispatchId) => {
      try {
        await dispatchService.acceptDispatch(dispatchId)
        notify.success('Dispatch accepted successfully')
        await loadDashboard()
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to accept dispatch'
        notify.error(message)
        throw err
      }
    },
    [loadDashboard]
  )

  const rejectDispatch = useCallback(
    async (dispatchId) => {
      try {
        await dispatchService.rejectDispatch(dispatchId, 'Rejected by driver')
        notify.success('Dispatch rejected')
        await loadDashboard()
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to reject dispatch'
        notify.error(message)
        throw err
      }
    },
    [loadDashboard]
  )

  // features/drivers/hooks/useDriverDashboard.js

  // ============================================
  // WORKFLOW METHODS - ALL WITH PROPER STATUS CHECKS
  // ============================================

  const startPickup = useCallback(async () => {
    // ✅ Check if already in target status before making API call
    if (dashboard.trackingSession?.status === TRACKING_STATUS.DRIVER_EN_ROUTE_TO_PICKUP) {
      console.log('Already en route to pickup, skipping')
      return
    }
    try {
      await updateTracking(TRACKING_STATUS.DRIVER_EN_ROUTE_TO_PICKUP)
      notify.success('Started en route to pickup')
    } catch (err) {
      const message = err.message || 'Failed to start pickup'
      notify.error(message)
      throw err
    }
  }, [updateTracking, dashboard.trackingSession])

  const arrivePickup = useCallback(async () => {
    if (dashboard.trackingSession?.status === TRACKING_STATUS.ARRIVED_PICKUP) {
      console.log('Already arrived at pickup, skipping')
      return
    }
    try {
      await updateTracking(TRACKING_STATUS.ARRIVED_PICKUP)
      notify.success('Arrived at pickup location')
    } catch (err) {
      const message = err.message || 'Failed to update pickup arrival'
      notify.error(message)
      throw err
    }
  }, [updateTracking, dashboard.trackingSession])

  const pickupCompleted = useCallback(async () => {
    if (dashboard.trackingSession?.status === TRACKING_STATUS.PICKED_UP) {
      console.log('Already picked up, skipping')
      return
    }
    try {
      await updateTracking(TRACKING_STATUS.PICKED_UP)
      notify.success('Pickup completed')
    } catch (err) {
      const message = err.message || 'Failed to complete pickup'
      notify.error(message)
      throw err
    }
  }, [updateTracking, dashboard.trackingSession])

  const startDelivery = useCallback(async () => {
    if (dashboard.trackingSession?.status === TRACKING_STATUS.IN_TRANSIT) {
      console.log('Already in transit, skipping')
      return
    }
    try {
      await updateTracking(TRACKING_STATUS.IN_TRANSIT)
      notify.success('Started delivery')
    } catch (err) {
      const message = err.message || 'Failed to start delivery'
      notify.error(message)
      throw err
    }
  }, [updateTracking, dashboard.trackingSession])

  const arriveDestination = useCallback(async () => {
    if (dashboard.trackingSession?.status === TRACKING_STATUS.ARRIVED_DESTINATION) {
      console.log('Already arrived at destination, skipping')
      return
    }
    try {
      await updateTracking(TRACKING_STATUS.ARRIVED_DESTINATION)
      notify.success('Arrived at destination')
    } catch (err) {
      const message = err.message || 'Failed to update destination arrival'
      notify.error(message)
      throw err
    }
  }, [updateTracking, dashboard.trackingSession])

  // ============================================
  // COMPLETE DELIVERY
  // ============================================
  const completeDelivery = useCallback(async () => {
    if (!dashboard.currentDispatch?.id) {
      const errorMsg = 'No active dispatch to complete'
      notify.error(errorMsg)
      throw new Error(errorMsg)
    }

    if (
      dashboard.currentDispatch?.status === 'DELIVERED' ||
      dashboard.trackingSession?.status === TRACKING_STATUS.DELIVERED
    ) {
      notify.warning('Delivery already completed')
      return
    }

    try {
      await updateTracking(TRACKING_STATUS.DELIVERED)
      await dispatchService.completeDispatch(dashboard.currentDispatch.id)
      notify.success('Delivery completed successfully! 🎉')
      await loadDashboard()
      stopPolling()
    } catch (err) {
      const message = err.message || 'Failed to complete delivery'
      notify.error(message)
      throw err
    }
  }, [
    dashboard.currentDispatch,
    dashboard.trackingSession,
    updateTracking,
    loadDashboard,
    stopPolling,
  ])

  // ============================================
  // UPDATE LOCATION
  // ============================================
  const updateLocation = useCallback(
    async (latitude, longitude) => {
      const trackingId = dashboard.trackingSession?.id
      if (!trackingId) {
        console.warn('No active tracking session.')
        return
      }
      try {
        await trackingService.updateLocation(trackingId, latitude, longitude)
      } catch (err) {
        console.warn('Location update failed:', err)
      }
    },
    [dashboard.trackingSession]
  )

  // ============================================
  // RETURN OBJECT
  // ============================================
  return {
    loading,
    error,
    dashboard,
    deliveryProgress,
    hasActiveDispatch,
    loadDashboard,
    acceptDispatch,
    rejectDispatch,
    startPickup,
    arrivePickup,
    pickupCompleted,
    startDelivery,
    arriveDestination,
    completeDelivery,
    updateLocation,
  }
}
