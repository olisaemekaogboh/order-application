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

const RevenueChart = ({ data }) => {
  const defaultData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue (₦)',
        data: [12000, 19000, 15000, 22000, 18000, 25000, 21000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  }

  const chartData = data || defaultData

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Revenue Overview' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '₦' + value.toLocaleString(),
        },
      },
    },
  }

  return <Line data={chartData} options={options} />
}

export default RevenueChart
