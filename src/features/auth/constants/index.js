/**
 * Auth Constants
 * All authentication-related constants in one place
 */

// ===== User Roles =====
export const USER_ROLES = {
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const USER_ROLES_LABELS = {
  [USER_ROLES.CLIENT]: 'Client',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
};

// ===== Storage Keys =====
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  REMEMBER_ME: 'remember_me',
};

// ===== Auth Error Messages =====
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  ACCOUNT_LOCKED: 'Your account has been locked. Please try again later or contact support.',
  ACCOUNT_DISABLED: 'Your account has been disabled. Please contact support.',
  ACCOUNT_NOT_VERIFIED: 'Please verify your email address before logging in.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  PHONE_ALREADY_EXISTS: 'This phone number is already registered.',
  TOKEN_EXPIRED: 'Your session has expired. Please login again.',
  TOKEN_INVALID: 'Invalid token. Please try again.',
  PASSWORD_RESET_FAILED: 'Failed to reset password. Please try again.',
  EMAIL_NOT_FOUND: 'No account found with this email address.',
  OLD_PASSWORD_INCORRECT: 'Current password is incorrect.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  GOOGLE_AUTH_FAILED: 'Google authentication failed. Please try again.',
};

// ===== Auth Success Messages =====
export const AUTH_SUCCESS = {
  LOGIN_SUCCESS: 'Welcome back! You have been logged in successfully.',
  REGISTER_SUCCESS: 'Account created successfully! Please verify your email.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  PASSWORD_RESET_SENT: 'Password reset link has been sent to your email.',
  PASSWORD_RESET_SUCCESS: 'Password has been reset successfully.',
  EMAIL_VERIFIED: 'Email verified successfully! You can now log in.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
};

// ===== Password Validation Rules =====
export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 100,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_DIGIT: true,
  REQUIRE_SPECIAL: true,
  SPECIAL_CHARS: '@$!%*?&',
};

// ===== Password Strength Labels =====
export const PASSWORD_STRENGTH = {
  WEAK: 'Weak',
  MEDIUM: 'Medium',
  STRONG: 'Strong',
};

// ===== Auth Routes =====
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',
};

// ===== API Endpoints =====
export const AUTH_API = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  GOOGLE_AUTH: '/auth/google',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
  RESEND_VERIFICATION: '/auth/resend-verification',
  ME: '/auth/me',
};

// ===== Token Expiry Times (in seconds) =====
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 900, // 15 minutes
  REFRESH_TOKEN: 604800, // 7 days
  REMEMBER_ME: 2592000, // 30 days
};

// ===== Default Values =====
export const AUTH_DEFAULTS = {
  ROLE: USER_ROLES.CLIENT,
  LANGUAGE: 'en',
  THEME: 'light',
};