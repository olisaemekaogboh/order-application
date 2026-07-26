import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useClient } from '../../hooks/useClient'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/components/ui/Card/Card'
import toast from 'react-hot-toast'

const ClientProfile = () => {
  const { profile, loading, getProfile, updateProfile } = useClient()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  })

  useEffect(() => {
    getProfile()
  }, [])

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phoneNumber: profile.phoneNumber || '',
      })
    }
  }, [profile, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await updateProfile(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message}
                disabled={isSubmitting}
              />
              <Input
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message}
                disabled={isSubmitting}
              />
            </div>

            <Input
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
              disabled={true}
            />

            <Input
              label="Phone Number"
              {...register('phoneNumber')}
              error={errors.phoneNumber?.message}
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
    </div>
  )
}

export default ClientProfile
