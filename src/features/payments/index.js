// features/payments/index.js
/**
 * Payments Feature Index
 * Main entry point for the payments feature
 */

// ===== Components =====
export { default as PaymentHistory } from './components/PaymentHistory/PaymentHistory'
export { default as PaymentButton } from './components/PaymentButton/PaymentButton'
export { default as PaymentGatewaySelector } from './components/PaymentGatewaySelector/PaymentGatewaySelector'

// ===== Pages =====
export { default as PaymentCallback } from './components/PaymentCallback/PaymentCallback'

// ===== Hooks =====
export { usePayments } from './hooks/usePayments'

// ===== Services =====
export { paymentService } from './services/paymentService'

// ===== Constants =====
export {
  PAYMENT_STATUSES,
  PAYMENT_STATUSES_LABELS,
  PAYMENT_STATUSES_COLORS,
  PAYMENT_METHODS,
  PAYMENT_METHODS_LABELS,
  PAYMENT_METHODS_ICONS,
  PAYMENT_ERRORS,
  PAYMENT_SUCCESS,
  PAYMENT_API,
  PAYMENT_ROUTES,
  PAYMENT_GATEWAYS,
  PAYMENT_GATEWAYS_LABELS,
  PAYMENT_GATEWAYS_COLORS,
  PAYMENT_GATEWAYS_ICONS,
  PAYMENT_GATEWAYS_LOGOS,
  PAYMENT_DEFAULTS,
  TEST_CARDS,
} from './constants'

// ===== Validations =====
export {
  validatePaymentAmount,
  validatePaymentMethod,
  validateCurrency,
  validatePaymentReference,
  validateRefund,
  validatePaymentInit,
  validatePaymentVerification,
  validatePaymentFilters,
} from './validations'

// ===== Utils =====
export {
  getPaymentStatusLabel,
  getPaymentStatusColor,
  getPaymentMethodLabel,
  getPaymentMethodIcon,
  formatPaymentAmount,
  formatPaymentDate,
  isPaymentSuccessful,
  isPaymentPending,
  isPaymentRefundable,
  isPaymentFailed,
  filterPayments,
  mapPaymentResponse,
  mapPaymentList,
  generateTransactionReference,
  extractReferenceParts,
  getGatewayLogo,
} from './utils'
