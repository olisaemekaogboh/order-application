import React from 'react'

import { Bar } from 'react-chartjs-2'

const ReviewChart = ({ analytics }) => {
  const distribution = analytics?.ratingDistribution ?? {}

  const data = {
    labels: ['1★', '2★', '3★', '4★', '5★'],

    datasets: [
      {
        label: 'Reviews',

        data: [
          distribution[1] || 0,

          distribution[2] || 0,

          distribution[3] || 0,

          distribution[4] || 0,

          distribution[5] || 0,
        ],
      },
    ],
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Review Ratings</h2>

      <Bar data={data} />
    </div>
  )
}

export default ReviewChart
