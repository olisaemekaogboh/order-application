/**
 * Orders Constants
 * All order-related constants in one place
 */

// ===== Order Statuses =====
export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  PICKED_UP: 'PICKED_UP',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
}

export const ORDER_STATUSES_LABELS = {
  [ORDER_STATUSES.PENDING]: 'Pending',
  [ORDER_STATUSES.ASSIGNED]: 'Assigned',
  [ORDER_STATUSES.PICKED_UP]: 'Picked Up',
  [ORDER_STATUSES.IN_TRANSIT]: 'In Transit',
  [ORDER_STATUSES.DELIVERED]: 'Delivered',
  [ORDER_STATUSES.CANCELLED]: 'Cancelled',
}

export const ORDER_STATUSES_COLORS = {
  [ORDER_STATUSES.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ORDER_STATUSES.ASSIGNED]: 'bg-blue-100 text-blue-800',
  [ORDER_STATUSES.PICKED_UP]: 'bg-purple-100 text-purple-800',
  [ORDER_STATUSES.IN_TRANSIT]: 'bg-indigo-100 text-indigo-800',
  [ORDER_STATUSES.DELIVERED]: 'bg-green-100 text-green-800',
  [ORDER_STATUSES.CANCELLED]: 'bg-red-100 text-red-800',
}

// ===== Payment Statuses =====
export const PAYMENT_STATUSES = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
}

export const PAYMENT_STATUSES_LABELS = {
  [PAYMENT_STATUSES.PENDING]: 'Pending',
  [PAYMENT_STATUSES.PAID]: 'Paid',
  [PAYMENT_STATUSES.FAILED]: 'Failed',
  [PAYMENT_STATUSES.REFUNDED]: 'Refunded',
  [PAYMENT_STATUSES.CANCELLED]: 'Cancelled',
}

// ===== Vehicle Types (aligned with backend enum) =====
export const VEHICLE_TYPES = {
  MOTORCYCLE: 'MOTORCYCLE',
  VAN: 'VAN',
  SUV: 'SUV',
  MINI_TRUCK: 'MINI_TRUCK',
  TRICYCLE: 'TRICYCLE',
  REFRIGERATED_TRUCK: 'REFRIGERATED_TRUCK',
  TRUCK: 'TRUCK',
  TRAILER: 'TRAILER',
  TANKER: 'TANKER',
  PICKUP: 'PICKUP',
  SEDAN: 'SEDAN',
}

export const VEHICLE_TYPES_LABELS = {
  [VEHICLE_TYPES.MOTORCYCLE]: 'Motorcycle',
  [VEHICLE_TYPES.VAN]: 'Van',
  [VEHICLE_TYPES.SUV]: 'SUV',
  [VEHICLE_TYPES.MINI_TRUCK]: 'Mini Truck',
  [VEHICLE_TYPES.TRICYCLE]: 'Tricycle',
  [VEHICLE_TYPES.REFRIGERATED_TRUCK]: 'Refrigerated Truck',
  [VEHICLE_TYPES.TRUCK]: 'Truck',
  [VEHICLE_TYPES.TRAILER]: 'Trailer',
  [VEHICLE_TYPES.TANKER]: 'Tanker',
  [VEHICLE_TYPES.PICKUP]: 'Pickup',
  [VEHICLE_TYPES.SEDAN]: 'Sedan',
}

// ===== Order Constants =====
export const ORDER_CONSTANTS = {
  MIN_DISTANCE: 1, // km
  MAX_DISTANCE: 1000, // km
  MIN_WEIGHT: 0.1, // kg
  MAX_WEIGHT: 10000, // kg
  MIN_VOLUME: 0.01, // m³
  MAX_VOLUME: 100, // m³
  EXPRESS_SURCHARGE: 0.25, // 25% extra
  COMMISSION_RATE: 0.05, // 5%
}

// ===== Order Error Messages =====
export const ORDER_ERRORS = {
  NOT_FOUND: 'Order not found',
  INVALID_STATUS: 'Invalid order status',
  ALREADY_DELIVERED: 'Order already delivered',
  ALREADY_CANCELLED: 'Order already cancelled',
  CANNOT_CANCEL: 'Cannot cancel order in current status',
  INVALID_DISTANCE: 'Invalid distance',
  INVALID_WEIGHT: 'Invalid weight',
  INVALID_VOLUME: 'Invalid volume',
  DRIVER_NOT_AVAILABLE: 'Driver not available',
  DRIVER_ALREADY_ASSIGNED: 'Driver already assigned',
  NO_DRIVER_FOUND: 'No driver available for this order',
  PAYMENT_FAILED: 'Payment failed',
  INVALID_ADDRESS: 'Invalid address provided',
  PICKUP_IN_PAST: 'Pickup date cannot be in the past',
  EXPRESS_NOT_ALLOWED: 'Express delivery not allowed for this vehicle type',
  PRICE_CALCULATION_FAILED: 'Failed to calculate price',
  ORDER_CREATION_FAILED: 'Failed to create order',
  UPDATE_FAILED: 'Failed to update order',
  CANCELLATION_FAILED: 'Failed to cancel order',
  ASSIGNMENT_FAILED: 'Failed to assign driver',
}

// ===== Order Success Messages =====
export const ORDER_SUCCESS = {
  CREATED: 'Order created successfully',
  UPDATED: 'Order updated successfully',
  CANCELLED: 'Order cancelled successfully',
  STATUS_UPDATED: 'Order status updated successfully',
  DRIVER_ASSIGNED: 'Driver assigned successfully',
  PRICE_CALCULATED: 'Price calculated successfully',
  DELETED: 'Order deleted successfully',
}

// ===== Order API Endpoints =====
export const ORDER_API = {
  BASE: '/orders',
  CREATE: '/orders',
  GET_ALL: '/orders/all',
  GET_MY_ORDERS: '/orders/my-orders',
  GET_BY_ID: '/orders/{id}',
  GET_BY_NUMBER: '/orders/number/{orderNumber}',
  UPDATE_STATUS: '/orders/{id}/status',
  CANCEL: '/orders/{id}/cancel',
  ASSIGN_DRIVER: '/orders/{id}/assign-driver',
  CALCULATE_PRICE: '/orders/calculate-price',
  TRACK: '/orders/{id}/track',
  GET_RECENT: '/orders/recent',
  COUNT: '/orders/count',
  ACTIVE_COUNT: '/orders/count-active',
}

// ===== Order Routes =====
export const ORDER_ROUTES = {
  CREATE: '/client/create-order',
  TRACK: '/client/order-tracking/:id',
  HISTORY: '/client/order-history',
  MANAGE: '/admin/orders',
  DETAILS: '/admin/orders/:id',
}

// ===== Order Filter Defaults =====
export const ORDER_FILTER_DEFAULTS = {
  PAGE: 0,
  SIZE: 20,
  SORT_BY: 'createdAt',
  SORT_DIRECTION: 'DESC',
}
