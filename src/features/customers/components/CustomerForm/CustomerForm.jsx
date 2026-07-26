import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CUSTOMER_ROLES_LABELS } from '../constants'
import Input from '@/shared/components/ui/Input/Input'
import Select from '@/shared/components/ui/Select/Select'
import Button from '@/shared/components/ui/Button/Button'
import toast from 'react-hot-toast'

const CustomerForm = ({ initialData = null, onSubmit, onCancel, loading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onFormSubmit = async (data) => {
    try {
      await onSubmit(data)
      toast.success(initialData ? 'Customer updated' : 'Customer created')
    } catch (error) {
      // error handled by parent
    }
  }

  const roleOptions = Object.entries(CUSTOMER_ROLES_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          {...register('firstName', { required: 'First name is required' })}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName', { required: 'Last name is required' })}
          error={errors.lastName?.message}
        />
      </div>
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
        disabled={!!initialData} // email not editable after creation
      />
      <Input
        label="Phone Number"
        {...register('phoneNumber')}
        error={errors.phoneNumber?.message}
      />
      <Select
        label="Role"
        options={roleOptions}
        {...register('role', { required: 'Role is required' })}
        error={errors.role?.message}
      />
      {!initialData && (
        <>
          <Input
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword', {
              validate: (value, formValues) =>
                value === formValues.password || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />
        </>
      )}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default CustomerForm
