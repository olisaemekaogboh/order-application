import React from 'react'
import clsx from 'clsx'

const Skeleton = ({ variant = 'text', width, height, className = '' }) => {
  const base = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded'
  const variantClass =
    variant === 'circle' ? 'rounded-full' : variant === 'rect' ? 'rounded-md' : 'rounded'
  return (
    <div
      className={clsx(base, variantClass, className)}
      style={{ width, height: height || (variant === 'text' ? '1rem' : undefined) }}
    />
  )
}


export default Skeleton