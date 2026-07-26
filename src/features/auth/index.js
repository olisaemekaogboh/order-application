/**
 * Auth Feature Index
 * Main entry point for the authentication feature
 */
// ===== Components =====
export { default as LoginPage } from './pages/LoginPage/LoginPage'
export { default as RegisterPage } from './pages/RegisterPage/RegisterPage'
export { default as LoginForm } from './components/LoginForm/LoginForm'
export { default as RegisterForm } from './components/RegisterForm/RegisterForm'
export { default as GoogleLoginButton } from './components/GoogleLoginButton/GoogleLoginButton'
export { default as ForgotPasswordForm } from './components/ForgotPasswordForm/ForgotPasswordForm'
export { default as ResetPasswordForm } from './components/ResetPasswordForm/ResetPasswordForm'
export { default as VerifyEmail } from './components/VerifyEmail/VerifyEmail'
export { default as AuthProvider } from './components/AuthProvider/AuthProvider'

// ===== Context =====
export { default as AuthContext } from '../../shared/contexts/AuthContext/AuthContext'

// ===== Hooks =====
export { useAuth } from './hooks/useAuth'

// ===== Services =====
export { authService } from './services/authService'

// ===== Constants =====
export {
  USER_ROLES,
  USER_ROLES_LABELS,
  STORAGE_KEYS,
  AUTH_ERRORS,
  AUTH_SUCCESS,
  PASSWORD_RULES,
  PASSWORD_STRENGTH,
  AUTH_ROUTES,
  AUTH_API,
  TOKEN_EXPIRY,
  AUTH_DEFAULTS,
} from './constants'

// ===== Validations =====
export {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
  validateName,
  validateLoginForm,
  validateRegisterForm,
  validateForgotPassword,
  validateResetPassword,
  getPasswordStrength,
  getPasswordRequirements,
  validateOTP,
  isFormValid,
  getFieldError,
} from './validations'

// ===== Utils =====
export {
  getInitials,
  getFullName,
  formatPhoneNumber,
  maskEmail,
  getAuthHeaders,
  parseJwtToken,
  isTokenExpired,
} from './utils'
