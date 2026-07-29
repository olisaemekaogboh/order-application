import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../auth/hooks/useAuth'

// Map backend role names to URL path segments
const ROLE_PATH_MAP = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  CLIENT: 'client',
  DRIVER: 'driver',
}

const LandingPage = () => {
  const { isAuthenticated, user, loading } = useAuth()
  const navigate = useNavigate()

  const handleDashboardRedirect = () => {
    if (!user) return navigate('/client/dashboard')
    const role = user.role
    const pathSegment = ROLE_PATH_MAP[role] || 'client'
    navigate(`/${pathSegment}/dashboard`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-fadeIn">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all hover:shadow-lg hover:scale-105"
              >
                Get Started
              </Link>
            </>
          ) : (
            ''
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 md:py-28 text-center animate-slideUp">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Smart Logistics for{' '}
          <span className="text-blue-600 dark:text-blue-400">Modern Businesses</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Ship your goods across Nigeria with real‑time tracking, transparent pricing, and reliable
          delivery – all from one platform.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {!isAuthenticated ? (
            <>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/30 hover:shadow-xl hover:scale-105"
              >
                Start Shipping Today
              </Link>
              <Link
                to="/login"
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all hover:scale-105"
              >
                Sign In
              </Link>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Welcome back, {user?.firstName || 'User'}! Ready to manage your logistics?
              </p>
              <button
                onClick={handleDashboardRedirect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/30 hover:shadow-xl hover:scale-105"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slideUp">
        {[
          {
            title: 'Fast Delivery',
            desc: 'Choose from same‑day or next‑day delivery options across all major Nigerian cities.',
          },
          {
            title: 'Live Tracking',
            desc: 'Track your shipments in real‑time with detailed location updates and ETA notifications.',
          },
          {
            title: 'Transparent Pricing',
            desc: 'No hidden fees. Get an instant price estimate before you book your shipment.',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Trust / Stats */}
      <section className="container mx-auto px-6 py-12 border-t border-gray-200 dark:border-gray-700 animate-slideUp">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { value: '1000+', label: 'Deliveries Completed' },
            { value: '98%', label: 'On‑Time Delivery Rate' },
            { value: '4.9★', label: 'Average Customer Rating' },
          ].map((stat, index) => (
            <div key={index} className="transition-all hover:scale-105">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
        .animate-slideUp:nth-child(2) {
          animation-delay: 0.1s;
        }
        .animate-slideUp:nth-child(3) {
          animation-delay: 0.2s;
        }
        .animate-slideUp:nth-child(4) {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}

export default LandingPage
