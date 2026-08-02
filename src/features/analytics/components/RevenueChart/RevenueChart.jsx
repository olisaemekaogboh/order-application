import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const RevenueChart = ({ analytics }) => {
  const revenuePoints = analytics?.revenueByPeriod ?? []

  const chartData = {
    labels: revenuePoints.map((item) => item.period),
    datasets: [
      {
        label: 'Revenue (₦)',
        data: revenuePoints.map((item) => item.amount),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top',
      },

      title: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: (ctx) => `₦${Number(ctx.parsed.y).toLocaleString()}`,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          callback: (value) => `₦${Number(value).toLocaleString()}`,
        },
      },
    },
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Revenue Analytics</h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500">Total Revenue</p>

          <p className="text-xl font-bold text-green-600 mt-1">
            {analytics?.formattedTotalRevenue ?? '₦0'}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500">Average Daily</p>

          <p className="text-xl font-bold mt-1">
            ₦{Number(analytics?.averageDailyRevenue ?? 0).toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500">Growth</p>

          <p
            className={`text-xl font-bold mt-1 ${
              (analytics?.growthPercentage ?? 0) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {(analytics?.growthPercentage ?? 0).toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="relative h-[350px] w-full">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

export default RevenueChart
