import React, { useState, useEffect } from 'react'
import { useAnalytics } from '../../hooks/useAnalytics'
import RevenueChart from '../RevenueChart/RevenueChart'
import RevenueReport from '../RevenueReport/RevenueReport'
import { REPORT_PERIODS_LABELS } from '../../constants'
import toast from 'react-hot-toast'

const RevenueAnalytics = () => {
  const { reportData, loading, generateReport, period, changePeriod } = useAnalytics()

  useEffect(() => {
    generateReport({ period })
  }, [period])

  if (loading && !reportData) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const periodOptions = Object.entries(REPORT_PERIODS_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revenue Analytics</h1>
      <div className="mb-4">
        <select
          value={period}
          onChange={(e) => changePeriod(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <RevenueChart data={reportData?.chartData} />
        <RevenueReport report={reportData} />
      </div>
    </div>
  )
}

export default RevenueAnalytics
