import React from 'react'
import clsx from 'clsx'

const EmptyState = ({ title, description, icon, action, className = '' }) => {
  return (
    <div className={clsx('text-center py-12', className)}>
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}


export default EmptyState