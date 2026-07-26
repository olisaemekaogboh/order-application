import React from 'react'
import clsx from 'clsx'

const Loader = ({ size = 'md', className = '', ...props }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  }
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-t-transparent border-blue-600 dark:border-blue-400',
        sizeMap[size] || sizeMap.md,
        className
      )}
      {...props}
    />
  )
}


export default Loader