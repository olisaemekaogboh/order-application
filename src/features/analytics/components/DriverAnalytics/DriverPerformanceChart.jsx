import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DriverPerformanceChart = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-[420px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading driver analytics...</p>
      </div>
    )
  }

  const metrics = analytics.performanceMetrics ?? {}

  const chartData = {
    labels: ['Total', 'Available', 'Busy', 'Offline'],
    datasets: [
      {
        label: 'Drivers',
        data: [
          analytics.totalDrivers ?? 0,
          analytics.availableDrivers ?? 0,
          analytics.busyDrivers ?? 0,
          analytics.offlineDrivers ?? 0,
        ],
        backgroundColor: ['#2563EB', '#16A34A', '#D97706', '#DC2626'],
        borderRadius: 6,
        maxBarThickness: 45,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Driver Performance</h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">Fleet availability overview</p>
      </div>

      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Utilization Rate</p>

          <p className="text-2xl font-bold text-green-600">
            {(metrics.completionRate ?? 0).toFixed(1)}%
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Availability Rate</p>

          <p className="text-2xl font-bold text-blue-600">
            {(metrics.availabilityRate ?? 0).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default DriverPerformanceChart
