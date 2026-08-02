import { useEffect } from 'react'
import { useAnalytics } from '../../hooks/useAnalytics'
import RevenueChart from '../RevenueChart/RevenueChart'
import RevenueReport from '../RevenueReport/RevenueReport'
import { REPORT_PERIODS_LABELS } from '../../constants'

const RevenueAnalytics = () => {
  const { reportData, loading, generateReport, period, changePeriod } = useAnalytics()

  useEffect(() => {
    generateReport({ period })
  }, [period, generateReport])

  if (loading && !reportData) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    )
  }

  const periodOptions = Object.entries(REPORT_PERIODS_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Revenue Analytics</h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Revenue trends and financial performance.
        </p>
      </div>

      <div>
        <select
          value={period}
          onChange={(e) => changePeriod(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white"
        >
          {periodOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-8">
        <RevenueChart analytics={reportData} />

        <RevenueReport report={reportData} />
      </div>
    </div>
  )
}

export default RevenueAnalytics
