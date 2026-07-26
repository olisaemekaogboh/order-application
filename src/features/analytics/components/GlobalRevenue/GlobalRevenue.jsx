import React, { useState, useEffect } from 'react'
import { useAnalytics } from '../../../analytics/hooks/useAnalytics'
import RevenueChart from '../../../analytics/components/RevenueChart/RevenueChart'
import RevenueReport from '../../../analytics/components/RevenueReport/RevenueReport'
import Select from '@/shared/components/ui/Select/Select'
import Spinner from '@/shared/components/ui/Spinner/Spinner'
import { REPORT_PERIODS_LABELS } from '../../../analytics/constants'

const GlobalRevenue = () => {
  const { reportData, loading, generateReport, period, changePeriod } = useAnalytics()

  useEffect(() => {
    generateReport({ period })
  }, [period])

  const periodOptions = Object.entries(REPORT_PERIODS_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Global Revenue Overview
        </h1>
        <Select
          options={periodOptions}
          value={period}
          onChange={(e) => changePeriod(e.target.value)}
          className="w-full sm:w-48"
        />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <RevenueChart data={reportData} />
        <RevenueReport report={reportData} />
      </div>
    </div>
  )
}

export default GlobalRevenue
