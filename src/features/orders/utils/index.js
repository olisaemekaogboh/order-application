/**
 * Orders Utilities
 * Helper functions for order management
 */

import { ORDER_STATUSES, PAYMENT_STATUSES, VEHICLE_TYPES } from '../constants'

// ===== Order Number Formatting =====
export const formatOrderNumber = (orderNumber) => {
  if (!orderNumber) return ''
  if (orderNumber.startsWith('LOG')) {
    const date = orderNumber.slice(3, 11)
    const seq = orderNumber.slice(11)
    return `LOG-${date}-${seq}`
  }
  return orderNumber
}

// ===== Status Helpers =====
export const getOrderStatusColor = (status) => {
  const colors = {
    [ORDER_STATUSES.PENDING]: 'yellow',
    [ORDER_STATUSES.ASSIGNED]: 'blue',
    [ORDER_STATUSES.PICKED_UP]: 'purple',
    [ORDER_STATUSES.IN_TRANSIT]: 'indigo',
    [ORDER_STATUSES.DELIVERED]: 'green',
    [ORDER_STATUSES.CANCELLED]: 'red',
  }
  return colors[status] || 'gray'
}

export const isOrderActive = (order) => {
  if (!order) return false
  const activeStatuses = [
    ORDER_STATUSES.PENDING,
    ORDER_STATUSES.ASSIGNED,
    ORDER_STATUSES.PICKED_UP,
    ORDER_STATUSES.IN_TRANSIT,
  ]
  return activeStatuses.includes(order.status)
}

export const isOrderDeliverable = (order) => {
  if (!order) return false
  return order.status === ORDER_STATUSES.IN_TRANSIT
}

export const canCancelOrder = (order) => {
  if (!order) return false
  const cancellable = [ORDER_STATUSES.PENDING, ORDER_STATUSES.ASSIGNED, ORDER_STATUSES.PICKED_UP]
  return cancellable.includes(order.status)
}

// ===== Delivery Estimation =====
export const calculateEstimatedDelivery = (distanceKm, vehicleType) => {
  const speeds = {
    [VEHICLE_TYPES.MOTORCYCLE]: 40,
    [VEHICLE_TYPES.MINI_VAN]: 45,
    [VEHICLE_TYPES.STANDARD]: 50,
    [VEHICLE_TYPES.TRUCK]: 35,
  }
  const speed = speeds[vehicleType] || 40
  const hours = distanceKm / speed
  const minutes = Math.round(hours * 60)
  return minutes
}

// ===== Price Helpers =====
export const getOrderTotal = (order) => {
  if (!order) return 0
  return order.totalPrice || 0
}

export const getOrderSubtotal = (order) => {
  if (!order) return 0
  return order.basePrice || 0
}

export const getOrderTax = (order) => {
  if (!order) return 0
  const total = order.totalPrice || 0
  const subtotal = order.basePrice || 0
  return Math.max(0, total - subtotal)
}

export const formatPrice = (amount, currency = 'NGN') => {
  if (amount === undefined || amount === null) return '₦0.00'
  if (currency === 'NGN') {
    return `₦${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

// ===== Label Helpers =====
export const getVehicleTypeLabel = (type) => {
  const labels = {
    [VEHICLE_TYPES.MOTORCYCLE]: 'Motorcycle',
    [VEHICLE_TYPES.MINI_VAN]: 'Mini Van',
    [VEHICLE_TYPES.STANDARD]: 'Standard',
    [VEHICLE_TYPES.TRUCK]: 'Truck',
  }
  return labels[type] || type
}

export const getPaymentStatusLabel = (status) => {
  const labels = {
    [PAYMENT_STATUSES.PENDING]: 'Pending',
    [PAYMENT_STATUSES.PAID]: 'Paid',
    [PAYMENT_STATUSES.FAILED]: 'Failed',
    [PAYMENT_STATUSES.REFUNDED]: 'Refunded',
    [PAYMENT_STATUSES.CANCELLED]: 'Cancelled',
  }
  return labels[status] || status
}

// ===== Order Data Transformation =====
export const mapOrderResponse = (data) => {
  if (!data) return null
  return {
    ...data,
    formattedPrice: formatPrice(data.totalPrice),
    formattedDate: new Date(data.orderDate).toLocaleDateString(),
    formattedStatus: data.status?.toLowerCase() || '',
    isActive: isOrderActive(data),
    canCancel: canCancelOrder(data),
    estimatedDeliveryTime:
      data.distanceKm && data.vehicleType
        ? calculateEstimatedDelivery(data.distanceKm, data.vehicleType)
        : null,
  }
}

export const mapOrderList = (orders) => {
  if (!Array.isArray(orders)) return []
  return orders.map(mapOrderResponse)
}
