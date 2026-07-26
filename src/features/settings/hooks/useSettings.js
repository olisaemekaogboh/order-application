import { useState, useCallback, useEffect } from 'react'
import { userService } from '../../customers/services/userService'
import { authService } from '../../../auth/services/authService'
import { toast } from 'react-hot-toast'
import { SETTINGS_DEFAULTS } from '../constants'

export const useSettings = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)
  const [preferences, setPreferences] = useState(SETTINGS_DEFAULTS)
  const [notificationSettings, setNotificationSettings] = useState(SETTINGS_DEFAULTS.notifications)
  const [securitySettings, setSecuritySettings] = useState(SETTINGS_DEFAULTS.security)
  const [devices, setDevices] = useState([])

  // ===== Load Profile =====
  const loadProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await userService.getProfile()
      setProfile(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load profile'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Profile =====
  const updateProfile = useCallback(async (data) => {
    setLoading(true)
    setError(null)
    try {
      const updated = await userService.updateProfile(data)
      setProfile(updated)
      toast.success('Profile updated successfully')
      return updated
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Change Password =====
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true)
    setError(null)
    try {
      await authService.changePassword(currentPassword, newPassword)
      toast.success('Password changed successfully')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to change password'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Profile Picture =====
  const updateProfilePicture = useCallback(async (pictureUrl) => {
    setLoading(true)
    try {
      await userService.updateProfilePicture(pictureUrl)
      setProfile((prev) => ({ ...prev, profilePicture: pictureUrl }))
      toast.success('Profile picture updated')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile picture'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Preferences =====
  const updatePreferences = useCallback(async (data) => {
    setLoading(true)
    try {
      setPreferences((prev) => ({ ...prev, ...data }))
      // Here you would call an API to save preferences
      toast.success('Preferences updated')
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update preferences'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Notification Settings =====
  const updateNotificationSettings = useCallback(async (data) => {
    setLoading(true)
    try {
      setNotificationSettings((prev) => ({ ...prev, ...data }))
      toast.success('Notification settings updated')
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update notification settings'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Update Security Settings =====
  const updateSecuritySettings = useCallback(async (data) => {
    setLoading(true)
    try {
      setSecuritySettings((prev) => ({ ...prev, ...data }))
      toast.success('Security settings updated')
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update security settings'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Load Devices =====
  const loadDevices = useCallback(async () => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual
      const data = [
        { id: '1', name: 'Chrome on Windows', lastActive: new Date().toISOString(), current: true },
        {
          id: '2',
          name: 'Safari on iPhone',
          lastActive: new Date(Date.now() - 86400000).toISOString(),
          current: false,
        },
      ]
      setDevices(data)
      return data
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to load devices'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Revoke Device =====
  const revokeDevice = useCallback(async (deviceId) => {
    setLoading(true)
    try {
      setDevices((prev) => prev.filter((d) => d.id !== deviceId))
      toast.success('Device revoked')
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to revoke device'
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // ===== Reset =====
  const reset = useCallback(() => {
    setProfile(null)
    setPreferences(SETTINGS_DEFAULTS)
    setNotificationSettings(SETTINGS_DEFAULTS.notifications)
    setSecuritySettings(SETTINGS_DEFAULTS.security)
    setDevices([])
    setError(null)
  }, [])

  // ===== Load initial data =====
  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  return {
    loading,
    error,
    profile,
    preferences,
    notificationSettings,
    securitySettings,
    devices,
    loadProfile,
    updateProfile,
    changePassword,
    updateProfilePicture,
    updatePreferences,
    updateNotificationSettings,
    updateSecuritySettings,
    loadDevices,
    revokeDevice,
    reset,
  }
}
