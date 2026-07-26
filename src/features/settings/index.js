/**
 * Settings Feature Index
 * Main entry point for the settings feature
 */

// ===== Components =====
export { ProfileSettings } from './components/ProfileSettings'
export { PasswordSettings } from './components/PasswordSettings'
export { NotificationPreferences } from './components/NotificationPreferences'
export { DevicesSettings } from './components/DevicesSettings'
// Add to existing exports
export { default as SavedAddresses } from './components/SavedAddresses/SavedAddresses'
// ===== Hooks =====
export { useSettings } from './hooks/useSettings'

// ===== Constants =====
export {
  SETTINGS_CATEGORIES,
  SETTINGS_CATEGORIES_LABELS,
  SETTINGS_CATEGORIES_ICONS,
  SETTINGS_KEYS,
  SETTINGS_DEFAULTS,
  SETTINGS_ERRORS,
  SETTINGS_SUCCESS,
  SETTINGS_API,
  SETTINGS_ROUTES,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
  TIMEZONE_OPTIONS,
  CURRENCY_OPTIONS,
} from './constants'

// ===== Validations =====
export {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateProfileForm,
  validatePasswordChange,
  validateNotificationSettings,
  validateSettingValue,
} from './validations'

// ===== Utils =====
export {
  getCategoryLabel,
  getCategoryIcon,
  getLanguageLabel,
  getThemeLabel,
  getTimezoneLabel,
  getCurrencyLabel,
  formatDeviceName,
  formatLastActive,
  isSettingEnabled,
  getSettingValue,
  isValidEmail,
  isValidPhone,
  applyTheme,
} from './utils'
