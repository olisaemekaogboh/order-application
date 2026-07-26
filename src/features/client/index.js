/**
 * Client Feature Index
 * Main entry point for the client feature
 */

// ===== Components =====
export { default as ClientDashboard } from './components/Dashboard/Dashboard'
export { default as ClientProfile } from './components/Profile/Profile'
export { default as ClientAddresses } from './components/Addresses/Addresses'

// ===== Hooks =====
export { useClient } from './hooks/useClient'

// ===== Constants =====
export { CLIENT_ROUTES, CLIENT_DEFAULTS } from './constants'

// ===== Validations =====
export { validateClientProfile } from './validations'

// ===== Utils =====
export { formatClientName } from './utils'
