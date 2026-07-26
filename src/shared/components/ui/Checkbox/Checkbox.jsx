import React from 'react'
import clsx from 'clsx'

const Checkbox = React.forwardRef(
  ({ id, label, checked, onChange, disabled = false, className = '', ...props }, ref) => {
    return (
      <div className={clsx('flex items-center gap-2', className)}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          {...props}
        />
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'


export default Checkbox