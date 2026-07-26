/**
 * Tracking Utilities
 * Helper functions for tracking and map operations
 */

import {
  TRACKING_STATUSES_LABELS,
  TRACKING_STATUSES_COLORS,
  TRACKING_STATUSES_ICONS,
} from '../constants'

// ===== Status Helpers =====
export const getTrackingStatusLabel = (status) => {
  return TRACKING_STATUSES_LABELS[status] || status
}

export const getTrackingStatusColor = (status) => {
  return (
    TRACKING_STATUSES_COLORS[status] ||
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  )
}

export const getTrackingStatusIcon = (status) => {
  return TRACKING_STATUSES_ICONS[status] || '📌'
}

// ===== Map Helpers =====
export const getMapCenter = (latitude, longitude) => {
  if (latitude && longitude) {
    return { lat: latitude, lng: longitude }
  }
  // Default to Nigeria
  return { lat: 6.5244, lng: 3.3792 }
}

export const getMapZoom = (distance) => {
  if (!distance) return 13
  if (distance < 1) return 16
  if (distance < 5) return 14
  if (distance < 20) return 13
  if (distance < 50) return 12
  return 11
}

// ===== Distance Helpers =====
export const formatDistance = (km) => {
  if (!km) return '0 km'
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

// ===== Time Helpers =====
export const formatTrackingTime = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ===== Progress Helpers =====
export const calculateProgress = (status) => {
  const order = ['PENDING', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED']
  const index = order.indexOf(status)
  if (index === -1) return 0
  return (index / (order.length - 1)) * 100
}

// ===== ETA Helpers =====
export const calculateETA = (distanceKm, speedKmPerHour = 40) => {
  if (!distanceKm) return null
  const hours = distanceKm / speedKmPerHour
  const minutes = Math.round(hours * 60)
  if (minutes < 60) return `${minutes} minutes`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

// ===== Map Marker Helpers =====
export const getMarkerIcon = (status) => {
  const icons = {
    PENDING: '📍',
    ASSIGNED: '👤',
    PICKED_UP: '📦',
    IN_TRANSIT: '🚚',
    DELIVERED: '✅',
    CANCELLED: '❌',
  }
  return icons[status] || '📍'
}
