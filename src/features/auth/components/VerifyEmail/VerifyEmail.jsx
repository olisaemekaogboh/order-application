import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import Button from '@/shared/components/ui/Button/Button'
import { AUTH_ROUTES } from '../../constants'
import toast from 'react-hot-toast'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }
    const verify = async () => {
      try {
        await authService.verifyEmail(token)
        setStatus('success')
        toast.success('Email verified successfully!')
      } catch (error) {
        setStatus('error')
        toast.error(error.response?.data?.message || 'Verification failed')
      }
    }
    verify()
  }, [token])

  if (status === 'verifying') {
    return (
      <div className="text-center py-12">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Verifying your email...</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Verified!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Your email has been successfully verified.
        </p>
        <Button className="mt-6" onClick={() => navigate(AUTH_ROUTES.LOGIN)}>
          Go to Login
        </Button>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">❌</div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verification Failed</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        The verification link is invalid or has expired.
      </p>
      <Button className="mt-6" variant="outline" onClick={() => navigate(AUTH_ROUTES.LOGIN)}>
        Go to Login
      </Button>
    </div>
  )
}

export default VerifyEmail
