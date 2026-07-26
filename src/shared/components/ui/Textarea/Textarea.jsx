import React from 'react'
import clsx from 'clsx'

const Textarea = React.forwardRef(
  ({ label, error, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={clsx(
            'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'


export default Textarea