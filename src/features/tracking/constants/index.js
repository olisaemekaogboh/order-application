/**
 * Tracking Constants
 * All tracking-related constants in one place
 */

// ===== Tracking Statuses =====
export const TRACKING_STATUSES = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
}

export const TRACKING_STATUSES_LABELS = {
  [TRACKING_STATUSES.PENDING]: 'Order Placed',
  [TRACKING_STATUSES.ASSIGNED]: 'Driver Assigned',
  [TRACKING_STATUSES.PICKED_UP]: 'Picked Up',
  [TRACKING_STATUSES.IN_TRANSIT]: 'In Transit',
  [TRACKING_STATUSES.DELIVERED]: 'Delivered',
  [TRACKING_STATUSES.CANCELLED]: 'Cancelled',
}

export const TRACKING_STATUSES_ICONS = {
  [TRACKING_STATUSES.PENDING]: '📋',
  [TRACKING_STATUSES.ASSIGNED]: '👤',
  [TRACKING_STATUSES.PICKED_UP]: '📦',
  [TRACKING_STATUSES.IN_TRANSIT]: '🚚',
  [TRACKING_STATUSES.DELIVERED]: '✅',
  [TRACKING_STATUSES.CANCELLED]: '❌',
}

export const TRACKING_STATUSES_COLORS = {
  [TRACKING_STATUSES.PENDING]:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [TRACKING_STATUSES.ASSIGNED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [TRACKING_STATUSES.PICKED_UP]:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [TRACKING_STATUSES.IN_TRANSIT]:
    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  [TRACKING_STATUSES.DELIVERED]:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [TRACKING_STATUSES.CANCELLED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
}

// ===== Tracking Events =====
export const TRACKING_EVENTS = {
  ORDER_CREATED: 'ORDER_CREATED',
  DRIVER_ASSIGNED: 'DRIVER_ASSIGNED',
  DRIVER_EN_ROUTE: 'DRIVER_EN_ROUTE',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  ARRIVED: 'ARRIVED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
}

export const TRACKING_EVENTS_LABELS = {
  [TRACKING_EVENTS.ORDER_CREATED]: 'Order Created',
  [TRACKING_EVENTS.DRIVER_ASSIGNED]: 'Driver Assigned',
  [TRACKING_EVENTS.DRIVER_EN_ROUTE]: 'Driver En Route',
  [TRACKING_EVENTS.PICKED_UP]: 'Picked Up',
  [TRACKING_EVENTS.IN_TRANSIT]: 'In Transit',
  [TRACKING_EVENTS.ARRIVED]: 'Arrived',
  [TRACKING_EVENTS.DELIVERED]: 'Delivered',
  [TRACKING_EVENTS.CANCELLED]: 'Cancelled',
}

// ===== Tracking Error Messages =====
export const TRACKING_ERRORS = {
  ORDER_NOT_FOUND: 'Order not found',
  TRACKING_NOT_FOUND: 'Tracking information not available',
  INVALID_ORDER: 'Invalid order ID',
  NOT_AUTHORIZED: 'You are not authorized to track this order',
  DRIVER_LOCATION_UNAVAILABLE: 'Driver location not available',
}

// ===== Tracking Success Messages =====
export const TRACKING_SUCCESS = {
  TRACKING_FETCHED: 'Tracking information retrieved',
  LOCATION_UPDATED: 'Location updated',
}

// ===== Tracking API Endpoints =====
export const TRACKING_API = {
  TRACK_ORDER: '/orders/{id}/track',
  UPDATE_DRIVER_LOCATION: '/drivers/{id}/location',
  GET_DRIVER_LOCATION: '/drivers/{id}/location',
}

// ===== Tracking Routes =====
export const TRACKING_ROUTES = {
  TRACK: '/client/order-tracking/:id',
  MAP: '/client/tracking-map/:id',
}

// ===== WebSocket Events =====
export const WS_TRACKING_EVENTS = {
  LOCATION_UPDATE: 'location_update',
  STATUS_UPDATE: 'status_update',
  DRIVER_UPDATE: 'driver_update',
}

// ===== Map Defaults =====
export const MAP_DEFAULTS = {
  ZOOM: 13,
  CENTER_LAT: 6.5244, // Nigeria center (Lagos approximate)
  CENTER_LNG: 3.3792,
  ANIMATION_DURATION: 1000,
}
