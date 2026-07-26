import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../auth/hooks/useAuth'

const LandingPage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
            Logistics Made Simple
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ship your goods across Nigeria with ease. Real-time tracking, transparent pricing, and
            reliable delivery.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg text-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to="/client/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Fast Delivery</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Same-day and next-day delivery options across major cities.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Real-time Tracking</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Know exactly where your package is at all times.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transparent Pricing</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              No hidden fees. Calculate your cost instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
