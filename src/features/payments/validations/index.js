/**
 * Payments Validations
 * Validation functions for payment operations
 */

// ===== Amount Validation =====
export const validatePaymentAmount = (amount) => {
  if (amount === undefined || amount === null) {
    return 'Payment amount is required'
  }
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Amount must be a valid number'
  }
  if (amount <= 0) {
    return 'Amount must be greater than 0'
  }
  if (amount > 1000000000) {
    return 'Amount exceeds maximum allowed (1,000,000,000)'
  }
  return null
}

// ===== Payment Method Validation =====
export const validatePaymentMethod = (method) => {
  const validMethods = ['CASH', 'CARD', 'BANK_TRANSFER', 'PAYSTACK', 'FLUTTERWAVE', 'WALLET']
  if (!method) return 'Payment method is required'
  if (!validMethods.includes(method)) return 'Invalid payment method'
  return null
}

// ===== Currency Validation =====
export const validateCurrency = (currency) => {
  const validCurrencies = ['NGN', 'USD', 'EUR', 'GBP']
  if (!currency) return null // optional
  if (!validCurrencies.includes(currency)) return 'Invalid currency code'
  return null
}

// ===== Payment Reference Validation =====
export const validatePaymentReference = (reference) => {
  if (!reference) return 'Payment reference is required'
  if (reference.trim().length < 5) {
    return 'Payment reference must be at least 5 characters'
  }
  if (reference.trim().length > 100) {
    return 'Payment reference must be less than 100 characters'
  }
  return null
}

// ===== Refund Validation =====
export const validateRefund = (data) => {
  const errors = {}

  const amountError = validatePaymentAmount(data.amount)
  if (amountError) errors.amount = amountError

  if (!data.reason) {
    errors.reason = 'Refund reason is required'
  } else if (data.reason.trim().length < 3) {
    errors.reason = 'Refund reason must be at least 3 characters'
  }

  return errors
}

// ===== Payment Initialization Validation =====
export const validatePaymentInit = (data) => {
  const errors = {}

  if (!data.orderId) {
    errors.orderId = 'Order ID is required'
  }

  const methodError = validatePaymentMethod(data.paymentMethod)
  if (methodError) errors.paymentMethod = methodError

  const amountError = validatePaymentAmount(data.amount)
  if (amountError) errors.amount = amountError

  if (data.currency) {
    const currencyError = validateCurrency(data.currency)
    if (currencyError) errors.currency = currencyError
  }

  return errors
}

// ===== Payment Verification Validation =====
export const validatePaymentVerification = (reference) => {
  return validatePaymentReference(reference)
}

// ===== Payment History Filter Validation =====
export const validatePaymentFilters = (filters) => {
  const errors = {}

  if (filters.startDate && isNaN(new Date(filters.startDate).getTime())) {
    errors.startDate = 'Invalid start date'
  }

  if (filters.endDate && isNaN(new Date(filters.endDate).getTime())) {
    errors.endDate = 'Invalid end date'
  }

  if (filters.startDate && filters.endDate) {
    if (new Date(filters.startDate) > new Date(filters.endDate)) {
      errors.endDate = 'End date must be after start date'
    }
  }

  if (
    filters.minAmount !== undefined &&
    (isNaN(Number(filters.minAmount)) || Number(filters.minAmount) < 0)
  ) {
    errors.minAmount = 'Minimum amount must be a positive number'
  }

  if (
    filters.maxAmount !== undefined &&
    (isNaN(Number(filters.maxAmount)) || Number(filters.maxAmount) < 0)
  ) {
    errors.maxAmount = 'Maximum amount must be a positive number'
  }

  if (filters.status) {
    const validStatuses = [
      'PENDING',
      'PROCESSING',
      'PAID',
      'FAILED',
      'REFUNDED',
      'CANCELLED',
      'PARTIALLY_REFUNDED',
    ]
    if (!validStatuses.includes(filters.status)) {
      errors.status = 'Invalid payment status'
    }
  }

  if (filters.method) {
    const validMethods = ['CASH', 'CARD', 'BANK_TRANSFER', 'PAYSTACK', 'FLUTTERWAVE', 'WALLET']
    if (!validMethods.includes(filters.method)) {
      errors.method = 'Invalid payment method'
    }
  }

  return errors
}
