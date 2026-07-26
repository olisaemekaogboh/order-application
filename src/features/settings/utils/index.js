/**
 * Settings Utilities
 * Helper functions for settings
 */

import {
  SETTINGS_CATEGORIES_LABELS,
  SETTINGS_CATEGORIES_ICONS,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
  TIMEZONE_OPTIONS,
  CURRENCY_OPTIONS,
} from '../constants'

// ===== Category Helpers =====
export const getCategoryLabel = (category) => {
  return SETTINGS_CATEGORIES_LABELS[category] || category
}

export const getCategoryIcon = (category) => {
  return SETTINGS_CATEGORIES_ICONS[category] || '📋'
}

// ===== Option Helpers =====
export const getLanguageLabel = (code) => {
  const found = LANGUAGE_OPTIONS.find((opt) => opt.value === code)
  return found?.label || code
}

export const getThemeLabel = (theme) => {
  const found = THEME_OPTIONS.find((opt) => opt.value === theme)
  return found?.label || theme
}

export const getTimezoneLabel = (tz) => {
  const found = TIMEZONE_OPTIONS.find((opt) => opt.value === tz)
  return found?.label || tz
}

export const getCurrencyLabel = (currency) => {
  const found = CURRENCY_OPTIONS.find((opt) => opt.value === currency)
  return found?.label || currency
}

// ===== Formatting Helpers =====
export const formatDeviceName = (device) => {
  if (!device) return 'Unknown Device'
  if (device.current) return `${device.name} (Current)`
  return device.name
}

export const formatLastActive = (timestamp) => {
  if (!timestamp) return 'Never'
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// ===== Setting Helpers =====
export const isSettingEnabled = (settings, key, defaultValue = true) => {
  if (settings === undefined || settings === null) return defaultValue
  return settings[key] !== undefined ? settings[key] : defaultValue
}

export const getSettingValue = (settings, key, defaultValue = null) => {
  if (settings === undefined || settings === null) return defaultValue
  return settings[key] !== undefined ? settings[key] : defaultValue
}

// ===== Validation Helpers =====
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const isValidPhone = (phone) => {
  const regex = /^(?:\+234|0)([7-9][01])\d{8}$/
  return regex.test(phone.replace(/\s/g, ''))
}

// ===== Theme Helpers =====
export const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark')
  } else if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
