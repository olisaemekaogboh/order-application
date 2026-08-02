import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import Spinner from '@/shared/components/ui/Spinner/Spinner'

import { adminService } from '@/features/admin/services/adminService'
import DriverSummaryTable from './DriverSummaryTable'
import DriverReport from './DriverReport'
import DriverPerformanceChart from './DriverPerformanceChart'
import DriverStatusChart from './DriverStatusChart'

const DriverAnalytics = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState(null)

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true)

      const data = await adminService.getDriverAnalytics({})

      setAnalytics(data)
    } catch (error) {
      console.error(error)
      toast.error('Failed to load driver analytics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [fetchAnalytics])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Driver Analytics</h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Monitor fleet performance, availability and delivery metrics.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      <DriverReport analytics={analytics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DriverPerformanceChart analytics={analytics} />

        <DriverStatusChart analytics={analytics} />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DriverPerformanceChart analytics={analytics} />

        <DriverStatusChart analytics={analytics} />
      </div>

      <DriverSummaryTable analytics={analytics} />
    </div>
  )
}

export default DriverAnalytics
