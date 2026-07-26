import React from 'react'

const QuickActions = ({ actions = [] }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`${action.color} hover:opacity-90 text-white rounded-lg p-4 flex flex-col items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            <span className="text-3xl">{action.icon}</span>
            <span className="text-sm font-medium text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
