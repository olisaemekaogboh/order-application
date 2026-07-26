import React from 'react'
import clsx from 'clsx'

const Timeline = ({ items = [], className = '' }) => {
  return (
    <div
      className={clsx(
        'relative space-y-4 pl-8 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700',
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="relative">
          <div
            className={clsx(
              'absolute -left-7 w-4 h-4 rounded-full border-2',
              item.active
                ? 'bg-blue-600 border-blue-600'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            )}
          />
          <div
            className={clsx(
              'pb-2',
              item.active ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            <p className="text-sm font-medium">{item.title}</p>
            {item.time && <p className="text-xs text-gray-400 dark:text-gray-500">{item.time}</p>}
            {item.description && <p className="text-sm mt-1">{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}


export default Timeline