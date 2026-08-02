import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const OrderStatusChart = ({ analytics }) => {
  const ordersByStatus = analytics?.ordersByStatus ?? {}

  const labels = Object.keys(ordersByStatus)
  const values = Object.values(ordersByStatus)

  const totalOrders = values.reduce((sum, value) => sum + value, 0)

  if (!labels.length) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-[420px] flex flex-col">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Status</h2>

        <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
          No order data available.
        </div>
      </div>
    )
  }

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#06B6D4',
          '#F97316',
          '#84CC16',
        ],
        borderWidth: 1,
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
            return `${context.label}: ${context.parsed}`
          },
        },
      },
    },

    cutout: '60%',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-[420px]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Status</h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Total Orders: <span className="font-semibold">{totalOrders}</span>
        </p>
      </div>

      <div className="h-[300px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}

export default OrderStatusChart
