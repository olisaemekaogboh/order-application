import React, { useState, useEffect } from 'react'
import { revenueService } from '../../../../../services/api/revenueService'
import RevenueChart from '../../../components/dashboard/RevenueChart/RevenueChart'
import RevenueReport from '../../../features/admin/RevenueReport/RevenueReport'
import toast from 'react-hot-toast'
//import './GlobalRevenue.css'

const GlobalRevenue = () => {
  const [report, setReport] = useState(null)
  const [period, setPeriod] = useState('YEAR')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReport()
  }, [period])

  const fetchReport = async () => {
    setLoading(true)
    try {
      const data = await revenueService.getRevenueReport({ period })
      setReport(data)
    } catch (error) {
      toast.error('Failed to load global revenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Global Revenue Overview
      </h1>
      <div className="mb-4">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="DAY">Today</option>
          <option value="WEEK">This Week</option>
          <option value="MONTH">This Month</option>
          <option value="YEAR">This Year</option>
        </select>
      </div>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <RevenueChart data={report?.chartData} />
          <RevenueReport report={report} />
        </div>
      )}
    </div>
  )
}

export default GlobalRevenue
