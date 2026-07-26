/**
 * Auth Utilities
 * Helper functions for authentication
 */

// ===== User Helpers =====
export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return 'U'
  const first = firstName?.charAt(0) || ''
  const last = lastName?.charAt(0) || ''
  return `${first}${last}`.toUpperCase()
}

export const getFullName = (firstName, lastName) => {
  if (!firstName && !lastName) return 'User'
  return `${firstName || ''} ${lastName || ''}`.trim()
}

// ===== Phone Formatting =====
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `0${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`
  }
  if (cleaned.length === 13 && cleaned.startsWith('234')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 13)}`
  }
  return phone
}

// ===== Email Masking =====
export const maskEmail = (email) => {
  if (!email) return ''
  const [username, domain] = email.split('@')
  if (!domain) return email
  const masked =
    username.length > 3 ? username.slice(0, 2) + '*'.repeat(username.length - 2) : username
  return `${masked}@${domain}`
}

// ===== Token Helpers =====
export const parseJwtToken = (token) => {
  if (!token) return null
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export const isTokenExpired = (token) => {
  if (!token) return true
  const payload = parseJwtToken(token)
  if (!payload || !payload.exp) return true
  return Date.now() >= payload.exp * 1000
}

export const getAuthHeaders = (token) => {
  if (!token) return {}
  return {
    Authorization: `Bearer ${token}`,
  }
}

// ===== Role Checks =====
export const hasRole = (user, role) => {
  if (!user || !user.role) return false
  if (Array.isArray(role)) return role.includes(user.role)
  return user.role === role
}

export const isClient = (user) => hasRole(user, 'CLIENT')
export const isAdmin = (user) => hasRole(user, 'ADMIN')
export const isSuperAdmin = (user) => hasRole(user, 'SUPER_ADMIN')
export const isAdminOrSuperAdmin = (user) => hasRole(user, ['ADMIN', 'SUPER_ADMIN'])

// ===== Session Helpers =====
export const getSessionTimeout = () => {
  return 15 * 60 * 1000 // 15 minutes
}

export const isSessionValid = (lastActivity) => {
  if (!lastActivity) return false
  const timeout = getSessionTimeout()
  return Date.now() - lastActivity < timeout
}

// ===== Google Auth Helpers =====
export const getGoogleAuthUrl = (redirectUri) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const scope = 'email profile'
  return `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`
}
