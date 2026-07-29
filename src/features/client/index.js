export { default as ClientDashboard } from './components/Dashboard/Dashboard'
export { default as ClientProfile } from './components/Profile/Profile'
export { default as ClientAddresses } from './components/Addresses/Addresses'

export { useClient } from './hooks/useClient'

export { CLIENT_ROUTES, CLIENT_DEFAULTS } from './constants'
export { validateClientProfile } from './validations'
export { formatClientName } from './utils'
