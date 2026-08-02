import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const DriverStatusChart = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-[500px] flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No driver data available</p>
      </div>
    )
  }

  const available = analytics.availableDrivers ?? 0
  const busy = analytics.busyDrivers ?? 0
  const offline = analytics.offlineDrivers ?? 0

  const total = available + busy + offline

  const chartData = {
    labels: ['Available', 'Busy', 'Offline'],
    datasets: [
      {
        data: [available, busy, offline],
        backgroundColor: ['#22C55E', '#F59E0B', '#EF4444'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'bottom',
      },

      tooltip: {
        callbacks: {
          label(context) {
            const value = context.parsed
            const percent = total === 0 ? 0 : ((value / total) * 100).toFixed(1)

            return `${context.label}: ${value} (${percent}%)`
          },
        },
      },
    },

    cutout: '65%',
  }

  const cards = [
    {
      title: 'Available',
      value: available,
      color: 'bg-green-500',
    },
    {
      title: 'Busy',
      value: busy,
      color: 'bg-yellow-500',
    },
    {
      title: 'Offline',
      value: offline,
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Driver Status</h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">Current fleet availability</p>
      </div>

      <div className="h-[260px]">
        <Doughnut data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">
        {cards.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center"
          >
            <div className={`mx-auto mb-3 h-3 w-3 rounded-full ${item.color}`} />

            <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{item.value}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriverStatusChart
