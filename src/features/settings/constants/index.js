/**
 * Settings Constants
 * All settings-related constants in one place
 */

// ===== Settings Categories =====
export const SETTINGS_CATEGORIES = {
  PROFILE: 'PROFILE',
  PREFERENCES: 'PREFERENCES',
  NOTIFICATIONS: 'NOTIFICATIONS',
  SECURITY: 'SECURITY',
  PAYMENT: 'PAYMENT',
  SYSTEM: 'SYSTEM',
  GENERAL: 'GENERAL',
}

export const SETTINGS_CATEGORIES_LABELS = {
  [SETTINGS_CATEGORIES.PROFILE]: 'Profile',
  [SETTINGS_CATEGORIES.PREFERENCES]: 'Preferences',
  [SETTINGS_CATEGORIES.NOTIFICATIONS]: 'Notifications',
  [SETTINGS_CATEGORIES.SECURITY]: 'Security',
  [SETTINGS_CATEGORIES.PAYMENT]: 'Payment',
  [SETTINGS_CATEGORIES.SYSTEM]: 'System',
  [SETTINGS_CATEGORIES.GENERAL]: 'General',
}

export const SETTINGS_CATEGORIES_ICONS = {
  [SETTINGS_CATEGORIES.PROFILE]: '👤',
  [SETTINGS_CATEGORIES.PREFERENCES]: '⚙️',
  [SETTINGS_CATEGORIES.NOTIFICATIONS]: '🔔',
  [SETTINGS_CATEGORIES.SECURITY]: '🔒',
  [SETTINGS_CATEGORIES.PAYMENT]: '💳',
  [SETTINGS_CATEGORIES.SYSTEM]: '🖥️',
  [SETTINGS_CATEGORIES.GENERAL]: '📋',
}

// ===== Settings Keys =====
export const SETTINGS_KEYS = {
  // Profile Settings
  PROFILE_FIRST_NAME: 'profile.firstName',
  PROFILE_LAST_NAME: 'profile.lastName',
  PROFILE_EMAIL: 'profile.email',
  PROFILE_PHONE: 'profile.phone',
  PROFILE_PICTURE: 'profile.picture',

  // Preference Settings
  PREF_LANGUAGE: 'preferences.language',
  PREF_THEME: 'preferences.theme',
  PREF_TIMEZONE: 'preferences.timezone',
  PREF_DATE_FORMAT: 'preferences.dateFormat',
  PREF_CURRENCY: 'preferences.currency',

  // Notification Settings
  NOTIF_EMAIL: 'notifications.email',
  NOTIF_SMS: 'notifications.sms',
  NOTIF_PUSH: 'notifications.push',
  NOTIF_ORDER_UPDATES: 'notifications.orderUpdates',
  NOTIF_PROMOTIONS: 'notifications.promotions',
  NOTIF_SYSTEM: 'notifications.system',

  // Security Settings
  SECURITY_TWO_FACTOR: 'security.twoFactor',
  SECURITY_SESSION_TIMEOUT: 'security.sessionTimeout',
  SECURITY_DEVICE_MANAGEMENT: 'security.deviceManagement',

  // Payment Settings
  PAYMENT_DEFAULT_METHOD: 'payment.defaultMethod',
  PAYMENT_SAVED_CARDS: 'payment.savedCards',
  PAYMENT_BILLING_ADDRESS: 'payment.billingAddress',

  // System Settings
  SYSTEM_MAINTENANCE_MODE: 'system.maintenanceMode',
  SYSTEM_DEBUG_MODE: 'system.debugMode',
  SYSTEM_DEFAULT_ROLE: 'system.defaultRole',
}

// ===== Settings Defaults =====
export const SETTINGS_DEFAULTS = {
  language: 'en',
  theme: 'light',
  timezone: 'Africa/Lagos',
  dateFormat: 'MM/DD/YYYY',
  currency: 'NGN',
  notifications: {
    email: true,
    sms: true,
    push: true,
    orderUpdates: true,
    promotions: false,
    system: true,
  },
  security: {
    twoFactor: false,
    sessionTimeout: 30, // minutes
  },
  payment: {
    defaultMethod: 'card',
  },
}

// ===== Setting Error Messages =====
export const SETTINGS_ERRORS = {
  FETCH_FAILED: 'Failed to load settings',
  UPDATE_FAILED: 'Failed to update settings',
  INVALID_SETTING: 'Invalid setting key',
  INVALID_VALUE: 'Invalid value for setting',
  PROFILE_UPDATE_FAILED: 'Failed to update profile',
  PASSWORD_UPDATE_FAILED: 'Failed to update password',
  SECURITY_UPDATE_FAILED: 'Failed to update security settings',
  SESSION_UPDATE_FAILED: 'Failed to update session settings',
}

// ===== Setting Success Messages =====
export const SETTINGS_SUCCESS = {
  UPDATED: 'Settings updated successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_UPDATED: 'Password updated successfully',
  SECURITY_UPDATED: 'Security settings updated',
}

// ===== Settings API Endpoints =====
export const SETTINGS_API = {
  GET_ALL: '/settings',
  UPDATE: '/settings',
  UPDATE_BY_KEY: '/settings/{key}',
  GET_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  UPDATE_PICTURE: '/users/profile/picture',
  GET_DEVICES: '/users/devices',
  REVOKE_DEVICE: '/users/devices/{id}',
}

// ===== Settings Routes =====
export const SETTINGS_ROUTES = {
  PROFILE: '/settings/profile',
  PREFERENCES: '/settings/preferences',
  NOTIFICATIONS: '/settings/notifications',
  SECURITY: '/settings/security',
  PAYMENT: '/settings/payment',
  SYSTEM: '/settings/system',
  GENERAL: '/settings/general',
}

// ===== Language Options =====
export const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'yo', label: 'Yoruba' },
  { value: 'ha', label: 'Hausa' },
  { value: 'ig', label: 'Igbo' },
  { value: 'fr', label: 'French' },
]

// ===== Theme Options =====
export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

// ===== Timezone Options =====
export const TIMEZONE_OPTIONS = [
  { value: 'Africa/Lagos', label: 'Lagos (GMT+1)' },
  { value: 'Africa/Abidjan', label: 'Abidjan (GMT+0)' },
  { value: 'Africa/Nairobi', label: 'Nairobi (GMT+3)' },
  { value: 'Africa/Cairo', label: 'Cairo (GMT+2)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (GMT+2)' },
]

// ===== Currency Options =====
export const CURRENCY_OPTIONS = [
  { value: 'NGN', label: '₦ NGN' },
  { value: 'USD', label: '$ USD' },
  { value: 'EUR', label: '€ EUR' },
  { value: 'GBP', label: '£ GBP' },
]
