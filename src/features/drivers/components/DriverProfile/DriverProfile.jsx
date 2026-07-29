import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import { driverService } from '../../services/driverService'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import toast from 'react-hot-toast'

const DriverProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    driverService
      .getDriverProfile(user.id)
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user.id])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await driverService.updateDriverProfile(user.id, profile)
      toast.success('Profile updated')
    } catch (error) {
      toast.error('Update failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  if (!profile) return <div>Profile not found</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          value={profile.fullName || ''}
          onChange={handleChange}
        />
        <Input label="Email" name="email" value={profile.email || ''} disabled />
        <Input
          label="Phone"
          name="phoneNumber"
          value={profile.phoneNumber || ''}
          onChange={handleChange}
        />
        <Input
          label="Vehicle Type"
          name="vehicleType"
          value={profile.vehicleType || ''}
          onChange={handleChange}
        />
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}

export default DriverProfile
