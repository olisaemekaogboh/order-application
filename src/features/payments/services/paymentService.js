// features/payments/services/paymentService.js
import axiosInstance from '@/shared/utils/helpers/axiosConfig'

// ===== Payment Initialization =====
export const initializePayment = async (data) => {
  const response = await axiosInstance.post('/payments/initialize', data)
  return response.data.data
}

// ===== Payment Verification =====
export const verifyPayment = async (data) => {
  const response = await axiosInstance.post('/payments/verify', data)
  return response.data.data
}

// ===== Cancel Payment =====
export const cancelPayment = async (data) => {
  const response = await axiosInstance.put('/payments/cancel', data)
  return response.data.data
}

// ===== Refund Payment (Admin only) =====
export const refundPayment = async (data) => {
  const response = await axiosInstance.post('/payments/refund', data)
  return response.data.data
}

// ===== Get Payment by Order ID =====
export const getPaymentByOrder = async (orderId) => {
  const response = await axiosInstance.get(`/payments/order/${orderId}`)
  return response.data.data
}

// ===== Get Payment by Transaction Reference =====
export const getPaymentByReference = async (reference) => {
  const response = await axiosInstance.get(`/payments/${reference}`)
  return response.data.data
}

// ===== Get Payment by Gateway Reference =====
export const getPaymentByGatewayReference = async (gatewayReference) => {
  const response = await axiosInstance.get(`/payments/reference/${gatewayReference}`)
  return response.data.data
}

// ===== Get User Payments (Paginated) =====
export const getUserPayments = async (params = {}) => {
  const response = await axiosInstance.get('/payments/user', { params })
  return response.data.data
}

// ===== Get All Payments - Admin only =====
export const getAllPayments = async (params = {}) => {
  const response = await axiosInstance.get('/payments/all', { params })
  return response.data.data
}

// ===== Get Payment Statistics - Admin only =====
export const getPaymentStatistics = async () => {
  const response = await axiosInstance.get('/payments/statistics')
  return response.data.data
}

// ===== Get Payment Status =====
export const getPaymentStatus = async (reference) => {
  const payment = await getPaymentByReference(reference)
  return payment?.status
}

// ===== Webhook Handlers (These are called by the backend, not directly from frontend) =====
// The frontend doesn't call webhook endpoints directly - they are called by payment gateways
// However, we provide them here for reference and testing

// For testing webhooks locally (if needed)
export const simulatePaystackWebhook = async (payload) => {
  const response = await axiosInstance.post('/payments/webhook/paystack', payload, {
    headers: {
      'x-paystack-signature': 'test_signature',
    },
  })
  return response.data
}

export const simulateFlutterwaveWebhook = async (payload) => {
  const response = await axiosInstance.post('/payments/webhook/flutterwave', payload, {
    headers: {
      'verif-hash': 'test_hash',
    },
  })
  return response.data
}

// ===== Convenience Exports =====
export const paymentService = {
  initializePayment,
  verifyPayment,
  cancelPayment,
  refundPayment,
  getPaymentByOrder,
  getPaymentByReference,
  getPaymentByGatewayReference,
  getUserPayments,
  getAllPayments,
  getPaymentStatistics,
  getPaymentStatus,
  // Webhook test helpers (for development)
  simulatePaystackWebhook,
  simulateFlutterwaveWebhook,
}

export default paymentService
