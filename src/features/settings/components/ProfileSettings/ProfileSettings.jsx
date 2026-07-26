import React, { useState, useEffect } from 'react'
import { useSettings } from '../../hooks/useSettings'
import { validateProfileForm } from '../../validations'
import Button from '@/shared/components/ui/Button/Button'
import Input from '@/shared/components/ui/Input/Input'
import Avatar from '@/shared/components/ui/Avatar/Avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'

export const ProfileSettings = () => {
  const { profile, loading, updateProfile, updateProfilePicture } = useSettings()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
      })
    }
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateProfileForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      toast.error('Please fix the errors')
      return
    }
    setIsSubmitting(true)
    try {
      await updateProfile(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Simulate upload - replace with actual file upload logic
    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        await updateProfilePicture(event.target.result)
      } catch (error) {
        // error handled in hook
      }
    }
    reader.readAsDataURL(file)
  }

  if (loading && !profile) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
          <div className="relative">
            <Avatar
              src={profile?.profilePicture}
              fallback={profile?.firstName?.[0] || profile?.email?.[0] || 'U'}
              size="xl"
            />
            <label
              htmlFor="picture-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input
              id="picture-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePictureUpload}
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {profile?.firstName} {profile?.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Member since {new Date(profile?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              disabled={isSubmitting}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              disabled={isSubmitting}
            />
          </div>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            disabled={true}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
