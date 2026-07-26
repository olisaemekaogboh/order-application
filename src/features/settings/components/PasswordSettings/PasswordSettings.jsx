import React, { useState } from 'react'
import { useSettings } from '../../hooks/useSettings'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'

export const PasswordSettings = () => {
  const { changePassword, loading } = useSettings()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
      setErrors({})
    } catch (error) {
      // error handled in hook
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Current Password"
            name="currentPassword"
            type={showCurrent ? 'text' : 'password'}
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            disabled={isSubmitting}
            rightElement={
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? '🙈' : '👁️'}
              </button>
            }
          />
          <Input
            label="New Password"
            name="newPassword"
            type={showNew ? 'text' : 'password'}
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            disabled={isSubmitting}
            rightElement={
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showNew ? '🙈' : '👁️'}
              </button>
            }
          />
          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isSubmitting}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            }
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default PasswordSettings
