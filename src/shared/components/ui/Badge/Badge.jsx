import React from 'react'
import clsx from 'clsx'

const variantClasses = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  info: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
}

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'full',
  className = '',
  ...props
}) => {
  const roundedClass =
    rounded === 'full' ? 'rounded-full' : rounded === 'md' ? 'rounded-md' : 'rounded'
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium',
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.md,
        roundedClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}


export default Badge