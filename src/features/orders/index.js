/**
 * Orders Feature Index
 * Main entry point for the orders feature
 */

// ===== Components =====
export { default as CreateOrder } from './components/CreateOrder/CreateOrder'
export { default as OrderTracking } from './components/OrderTracking/OrderTracking'
export { default as OrderHistory } from './components/OrderHistory/OrderHistory'
export { default as OrderManagement } from './components/OrderManagement/OrderManagement'
export { default as OrderForm } from './components/OrderForm/OrderForm'
export { default as OrderCard } from './components/OrderCard/OrderCard'
export { default as OrderList } from './components/OrderList/OrderList'
export { default as OrderStatusBadge } from './components/OrderStatusBadge/OrderStatusBadge'
export { default as PriceCalculator } from './components/PriceCalculator/PriceCalculator'
export { default as OrderTable } from './components/OrderTable/OrderTable'

// The OrderTrackingMap is now inside tracking feature; we import from there.
// If you prefer to keep a copy inside orders, you can export it here as well.
export { default as OrderTrackingMap } from '../tracking/components/OrderTrackingMap/OrderTrackingMap'

// ===== Context & Provider =====
export { OrderContext } from './components/OrderProvider/OrderContext'
export { OrderProvider } from './components/OrderProvider/OrderProvider'

// ===== Hooks =====
export { useOrders } from './hooks/useOrders'

// ===== Services =====
export { orderService } from './services/orderService'

// ===== Constants =====
export {
  ORDER_STATUSES,
  ORDER_STATUSES_LABELS,
  ORDER_STATUSES_COLORS,
  PAYMENT_STATUSES,
  PAYMENT_STATUSES_LABELS,
  VEHICLE_TYPES,
  VEHICLE_TYPES_LABELS,
  ORDER_CONSTANTS,
  ORDER_ERRORS,
  ORDER_SUCCESS,
  ORDER_API,
  ORDER_ROUTES,
  ORDER_FILTER_DEFAULTS,
} from './constants'

// ===== Validations =====
export {
  validateDistance,
  validateWeight,
  validateVolume,
  validateVehicleType,
  validateAddress,
  validatePickupDate,
  validateOrderForm,
  validatePriceCalculation,
  validateStatusTransition,
  validatePaymentStatus,
  validateOrderNumber,
  validateOrderFilters,
} from './validations'

// ===== Utils =====
export {
  formatOrderNumber,
  getOrderStatusColor,
  calculateEstimatedDelivery,
  isOrderActive,
  isOrderDeliverable,
  canCancelOrder,
  getOrderTotal,
  getOrderSubtotal,
  getOrderTax,
  formatPrice,
  getVehicleTypeLabel,
  getPaymentStatusLabel,
  mapOrderResponse,
  mapOrderList,
} from './utils'
