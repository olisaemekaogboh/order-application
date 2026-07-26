import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuth()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Fetch user info
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const userInfo = await res.json()
        if (!res.ok) throw new Error('Failed to fetch user info')

        // 2. Send full DTO to backend
        await loginWithGoogle({
          googleToken: tokenResponse.access_token, // string
          email: userInfo.email,
          name: userInfo.name,
          googleId: userInfo.sub,
          picture: userInfo.picture || '',
        })
        toast.success('Google login successful!')
      } catch (error) {
        console.error('Google login error:', error)
        toast.error('Google login failed')
      }
    },
    onError: () => {
      toast.error('Google login failed')
    },
  })

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C6.662,2,2,6.662,2,12s4.662,10,10.545,10c5.432,0,9.272-3.797,9.272-9.269c0-0.704-0.1-1.376-0.266-1.992H12.545z"
        />
      </svg>
      Sign in with Google
    </button>
  )
}

export default GoogleLoginButton
