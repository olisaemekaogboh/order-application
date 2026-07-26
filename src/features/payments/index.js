/**
 * Payments Feature Index
 * Main entry point for the payments feature
 */

// ===== Components =====
export { default as PaymentHistory } from './components/PaymentHistory/PaymentHistory'

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
  PAYMENT_DEFAULTS,
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
