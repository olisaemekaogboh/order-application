import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import Input from '@/shared/components/ui/Input/Input'
import Button from '@/shared/components/ui/Button/Button'
import { validatePassword, validateConfirmPassword } from '@/shared/utils/validators/formValidators'
import { AUTH_ROUTES } from '../../constants'
import toast from 'react-hot-toast'

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    if (!token) {
      toast.error('Invalid or missing reset token')
      return
    }
    setLoading(true)
    try {
      await authService.resetPassword({
        token,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      toast.success('Password reset successfully!')
      navigate(AUTH_ROUTES.LOGIN)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="New Password"
        type="password"
        {...register('newPassword', {
          required: 'New password is required',
          validate: (value) => validatePassword(value) || true,
        })}
        error={errors.newPassword?.message}
        disabled={loading}
      />
      <Input
        label="Confirm New Password"
        type="password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value, formValues) => {
            const error = validateConfirmPassword(formValues.newPassword, value)
            return error || true
          },
        })}
        error={errors.confirmPassword?.message}
        disabled={loading}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  )
}

export default ResetPasswordForm
