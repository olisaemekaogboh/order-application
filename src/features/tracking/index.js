/**
 * Tracking Feature Index
 * Main entry point for the tracking feature
 */

// ===== Components =====
export { default as OrderTracking } from './components/OrderTracking'
export { default as OrderTrackingMap } from './components/OrderTrackingMap'

// ===== Hooks =====
export { useTracking } from './hooks/useTracking'

// ===== Constants =====
export {
  TRACKING_STATUSES,
  TRACKING_STATUSES_LABELS,
  TRACKING_STATUSES_ICONS,
  TRACKING_STATUSES_COLORS,
  TRACKING_EVENTS,
  TRACKING_EVENTS_LABELS,
  TRACKING_ERRORS,
  TRACKING_SUCCESS,
  TRACKING_API,
  TRACKING_ROUTES,
  WS_TRACKING_EVENTS,
  MAP_DEFAULTS,
} from './constants'

// ===== Validations =====
export { validateOrderId, validateTrackingFilters, validateLocation } from './validations'

// ===== Utils =====
export {
  getTrackingStatusLabel,
  getTrackingStatusColor,
  getTrackingStatusIcon,
  getMapCenter,
  getMapZoom,
  formatDistance,
  formatTrackingTime,
  calculateProgress,
  calculateETA,
  getMarkerIcon,
} from './utils'
