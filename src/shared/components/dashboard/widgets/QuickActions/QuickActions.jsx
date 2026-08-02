import React from 'react'

const QuickActions = ({ actions = [] }) => {
  if (!actions.length) return null

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Quickly access frequently used admin features.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`
              ${action.color}
              group
              h-28
              rounded-xl
              text-white
              shadow-md
              hover:shadow-xl
              hover:-translate-y-1
              active:scale-95
              transition-all
              duration-300
              flex
              flex-col
              items-center
              justify-center
              gap-3
              focus:outline-none
              focus:ring-4
              focus:ring-blue-300
            `}
          >
            {action.icon && (
              <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {action.icon}
              </div>
            )}

            <span className="text-sm font-semibold text-center px-2 leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuickActions
