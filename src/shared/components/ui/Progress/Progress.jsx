import React from 'react'
import clsx from 'clsx'

const Progress = ({ value, max = 100, label, size = 'md', className = '', ...props }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeMap = {
    sm: 'h-1',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return (
    <div className={clsx('space-y-1', className)}>
      {(label || typeof value === 'number') && (
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={clsx(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          sizeMap[size]
        )}
        {...props}
      >
        <div
          className="bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, height: '100%' }}
        />
      </div>
    </div>
  )
}


export default Progress