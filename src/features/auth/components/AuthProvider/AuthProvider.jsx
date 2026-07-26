import React, { useState, useEffect } from 'react'
import AuthContext from '../../../../shared/contexts/AuthContext/AuthContext'
import { authService } from '../../services/authService'
import { localStorageHelper } from '@/shared/utils/helpers/localStorageHelper'

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorageHelper.getToken()
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          localStorageHelper.clearAuth()
          setIsAuthenticated(false)
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email, password) => {
    const response = await authService.login({ email, password })
    const { accessToken, refreshToken, user } = response
    localStorageHelper.setTokens(accessToken, refreshToken)
    setUser(user)
    setIsAuthenticated(true)
    return response
  }

  // ✅ Accept the full Google auth DTO (googleToken, email, name, googleId, picture)
  const loginWithGoogle = async (googleAuthData) => {
    const response = await authService.googleLogin(googleAuthData)
    const { accessToken, refreshToken, user } = response
    localStorageHelper.setTokens(accessToken, refreshToken)
    setUser(user)
    setIsAuthenticated(true)
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    return response
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
    localStorageHelper.clearAuth()
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
