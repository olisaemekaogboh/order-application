// features/drivers/hooks/useDriverDashboard.js

import { useState, useEffect, useCallback, useRef } from 'react'

import { driverService } from '../services/driverService'
import { notificationService } from '@/features/notifications/services/notificationService'
import { dispatchService } from '@/shared/services/dispatchService'
import { trackingService } from '@/features/tracking/services/trackingService'

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

  // Prevent duplicate dispatch actions
  const [isUpdating, setIsUpdating] = useState(false)

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

  /*
   * ============================================================
   * ACTIVE DISPATCH
   *
   * Dispatch status is the source of truth.
   * ============================================================
   */

  const hasActiveDispatch = Boolean(
    dashboard.currentDispatch && !TERMINAL_STATUSES.includes(dashboard.currentDispatch.status)
  )

  /*
   * ============================================================
   * LOAD TRACKING
   *
   * Tracking is ONLY used for:
   * - tracking session
   * - GPS/location
   *
   * Tracking does NOT control dispatch workflow.
   * ============================================================
   */

  const loadTrackingForOrder = useCallback(async (orderId) => {
    if (!orderId) {
      return null
    }

    try {
      const tracking = await trackingService.getTrackingByOrder(orderId)

      return tracking?.id ? tracking : null
    } catch (err) {
      console.debug('No tracking found for order:', orderId)
      return null
    }
  }, [])

  /*
   * ============================================================
   * LOAD DASHBOARD
   * ============================================================
   */

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const dashboardData = await driverService.getDashboard()

      if (!dashboardData) {
        throw new Error('Dashboard response is empty')
      }

      /*
       * Tracking
       */
      let trackingSession = null

      if (dashboardData.currentDispatch?.orderId) {
        trackingSession = await loadTrackingForOrder(dashboardData.currentDispatch.orderId)
      }

      /*
       * Earnings
       */
      let earnings = []

      try {
        const earningsData = await driverService.getMyEarningsPaginated(0, 10)

        earnings = earningsData?.content ?? []
      } catch (err) {
        console.warn('Could not load earnings:', err)
      }

      /*
       * Notifications
       */
      let notifications = []

      try {
        const notificationResponse = await notificationService.getNotifications(0, 10)

        notifications = notificationResponse?.content ?? []
      } catch (err) {
        console.warn('Could not load notifications:', err)
      }

      /*
       * Dashboard state
       */
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

      /*
       * Dispatch controls progress.
       */
      const progress = dashboardData.currentDispatch
        ? (DISPATCH_PROGRESS[dashboardData.currentDispatch.status] ?? 0)
        : 0

      setDeliveryProgress(progress)
    } catch (err) {
      console.error('Failed to load dashboard:', err)

      const errorMessage = err.response?.data?.message || err.message || 'Failed to load dashboard'

      setError(errorMessage)

      notify.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [loadTrackingForOrder])

  /*
   * ============================================================
   * STOP POLLING
   * ============================================================
   */

  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }

    isPollingRef.current = false
  }, [])

  /*
   * ============================================================
   * START POLLING
   *
   * Backend remains the source of truth.
   * ============================================================
   */

  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current || isPollingRef.current) {
      return
    }

    isPollingRef.current = true

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const dashboardData = await driverService.getDashboard()

        const dispatch = dashboardData?.currentDispatch

        /*
         * Stop polling when there is no active dispatch.
         */
        if (!dispatch || TERMINAL_STATUSES.includes(dispatch.status)) {
          stopPolling()

          /*
           * Still update final dispatch state.
           */
          setDashboard((prev) => ({
            ...prev,
            currentDispatch: dispatch ?? null,
            stats: {
              ...prev.stats,
              activeDispatches: dashboardData?.activeDispatches ?? prev.stats.activeDispatches,
              completedDeliveries: dashboardData?.totalDeliveries ?? prev.stats.completedDeliveries,
              totalEarnings: dashboardData?.totalEarnings ?? prev.stats.totalEarnings,
              driverRating: dashboardData?.rating ?? prev.stats.driverRating,
            },
          }))

          setDeliveryProgress(dispatch ? (DISPATCH_PROGRESS[dispatch.status] ?? 0) : 0)

          return
        }

        /*
         * Tracking is display/location only.
         */
        let trackingSession = null

        if (dispatch.orderId) {
          trackingSession = await loadTrackingForOrder(dispatch.orderId)
        }

        /*
         * Update current dispatch.
         */
        setDashboard((prev) => ({
          ...prev,

          currentDispatch: dispatch,

          trackingSession: trackingSession || prev.trackingSession,

          stats: {
            ...prev.stats,

            activeDispatches: dashboardData.activeDispatches ?? prev.stats.activeDispatches,

            completedDeliveries: dashboardData.totalDeliveries ?? prev.stats.completedDeliveries,

            totalEarnings: dashboardData.totalEarnings ?? prev.stats.totalEarnings,

            driverRating: dashboardData.rating ?? prev.stats.driverRating,
          },
        }))

        /*
         * Update progress.
         */
        setDeliveryProgress(DISPATCH_PROGRESS[dispatch.status] ?? 0)
      } catch (err) {
        /*
         * Polling errors should not destroy dashboard state.
         */
        console.debug('Dashboard polling failed:', err?.message)
      }
    }, 5000)
  }, [loadTrackingForOrder, stopPolling])

  /*
   * ============================================================
   * POLLING LIFECYCLE
   * ============================================================
   */

  useEffect(() => {
    if (hasActiveDispatch) {
      startPolling()
    } else {
      stopPolling()
    }

    return () => {
      stopPolling()
    }
  }, [hasActiveDispatch, startPolling, stopPolling])

  /*
   * ============================================================
   * ACCEPT DISPATCH
   * ============================================================
   */

  const acceptDispatch = useCallback(
    async (dispatchId) => {
      if (!dispatchId) {
        throw new Error('Dispatch ID is required')
      }

      if (isUpdating) {
        return
      }

      setIsUpdating(true)

      try {
        await dispatchService.acceptDispatch(dispatchId)

        notify.success('Dispatch accepted successfully')

        await loadDashboard()
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to accept dispatch'

        notify.error(message)

        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [isUpdating, loadDashboard]
  )

  /*
   * ============================================================
   * REJECT DISPATCH
   * ============================================================
   */

  const rejectDispatch = useCallback(
    async (dispatchId, reason = 'Rejected by driver') => {
      if (!dispatchId) {
        throw new Error('Dispatch ID is required')
      }

      if (isUpdating) {
        return
      }

      setIsUpdating(true)

      try {
        await dispatchService.rejectDispatch(dispatchId, reason)

        notify.success('Dispatch rejected')

        await loadDashboard()
      } catch (err) {
        const message = err.response?.data?.message || err.message || 'Failed to reject dispatch'

        notify.error(message)

        throw err
      } finally {
        setIsUpdating(false)
      }
    },
    [isUpdating, loadDashboard]
  )

  /*
   * ============================================================
   * START TRIP
   *
   * Backend contract:
   * DispatchService.startTrip(dispatchId, userId)
   *
   * Frontend service:
   * dispatchService.startTrip(dispatchId)
   *
   * DRIVER_ACCEPTED
   *        ↓
   * EN_ROUTE_PICKUP
   * ============================================================
   */

  const startTrip = useCallback(async () => {
    const dispatchId = dashboard.currentDispatch?.id

    if (!dispatchId) {
      const message = 'No active dispatch'
      notify.error(message)
      throw new Error(message)
    }

    if (dashboard.currentDispatch?.status !== 'DRIVER_ACCEPTED') {
      const message = `Cannot start trip from status: ${dashboard.currentDispatch?.status}`

      console.warn(message)

      return
    }

    if (isUpdating) {
      return
    }

    setIsUpdating(true)

    try {
      await dispatchService.startTrip(dispatchId)

      notify.success('Trip started successfully')

      await loadDashboard()
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to start trip'

      notify.error(message)

      throw err
    } finally {
      setIsUpdating(false)
    }
  }, [dashboard.currentDispatch, isUpdating, loadDashboard])

  /*
   * ============================================================
   * PICKUP COMPLETED
   *
   * EN_ROUTE_PICKUP
   *        ↓
   * PICKUP_COMPLETED
   * ============================================================
   */

  const pickupCompleted = useCallback(async () => {
    const dispatchId = dashboard.currentDispatch?.id

    if (!dispatchId) {
      const message = 'No active dispatch'
      notify.error(message)
      throw new Error(message)
    }

    if (dashboard.currentDispatch?.status !== 'EN_ROUTE_PICKUP') {
      const message =
        `Cannot complete pickup from status: ` + `${dashboard.currentDispatch?.status}`

      console.warn(message)

      return
    }

    if (isUpdating) {
      return
    }

    setIsUpdating(true)

    try {
      await dispatchService.pickupCompleted(dispatchId)

      notify.success('Pickup completed successfully')

      await loadDashboard()
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to complete pickup'

      notify.error(message)

      throw err
    } finally {
      setIsUpdating(false)
    }
  }, [dashboard.currentDispatch, isUpdating, loadDashboard])

  /*
   * ============================================================
   * START DELIVERY
   *
   * PICKUP_COMPLETED
   *        ↓
   * DELIVERY_IN_PROGRESS
   * ============================================================
   */

  const startDelivery = useCallback(async () => {
    const dispatchId = dashboard.currentDispatch?.id

    if (!dispatchId) {
      const message = 'No active dispatch'
      notify.error(message)
      throw new Error(message)
    }

    if (dashboard.currentDispatch?.status !== 'PICKUP_COMPLETED') {
      const message = `Cannot start delivery from status: ` + `${dashboard.currentDispatch?.status}`

      console.warn(message)

      return
    }

    if (isUpdating) {
      return
    }

    setIsUpdating(true)

    try {
      await dispatchService.startDelivery(dispatchId)

      notify.success('Delivery started successfully')

      await loadDashboard()
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to start delivery'

      notify.error(message)

      throw err
    } finally {
      setIsUpdating(false)
    }
  }, [dashboard.currentDispatch, isUpdating, loadDashboard])

  /*
   * ============================================================
   * COMPLETE DELIVERY
   *
   * DELIVERY_IN_PROGRESS
   *        ↓
   * DELIVERED
   * ============================================================
   */

  const completeDelivery = useCallback(async () => {
    const dispatchId = dashboard.currentDispatch?.id

    if (!dispatchId) {
      const message = 'No active dispatch to complete'
      notify.error(message)
      throw new Error(message)
    }

    if (dashboard.currentDispatch?.status !== 'DELIVERY_IN_PROGRESS') {
      const message =
        `Cannot complete delivery from status: ` + `${dashboard.currentDispatch?.status}`

      console.warn(message)

      return
    }

    if (isUpdating) {
      return
    }

    setIsUpdating(true)

    try {
      await dispatchService.completeDispatch(dispatchId)

      notify.success('Delivery completed successfully! 🎉')

      await loadDashboard()

      stopPolling()
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to complete delivery'

      notify.error(message)

      throw err
    } finally {
      setIsUpdating(false)
    }
  }, [dashboard.currentDispatch, isUpdating, loadDashboard, stopPolling])

  /*
   * ============================================================
   * UPDATE DRIVER LOCATION
   *
   * Tracking handles GPS only.
   * It does NOT change dispatch status.
   * ============================================================
   */

  const updateLocation = useCallback(
    async (latitude, longitude) => {
      const trackingId = dashboard.trackingSession?.id

      if (!trackingId) {
        return
      }

      if (latitude == null || longitude == null) {
        return
      }

      try {
        await trackingService.updateLocation(trackingId, latitude, longitude)
      } catch (err) {
        console.warn('Location update failed:', err?.message)
      }
    },
    [dashboard.trackingSession]
  )

  /*
   * ============================================================
   * RETURN API
   * ============================================================
   */

  return {
    loading,
    error,

    dashboard,

    deliveryProgress,

    hasActiveDispatch,

    isUpdating,

    loadDashboard,

    acceptDispatch,
    rejectDispatch,

    startTrip,
    pickupCompleted,
    startDelivery,
    completeDelivery,

    updateLocation,
  }
}

export default useDriverDashboard
