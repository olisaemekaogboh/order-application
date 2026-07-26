import React from 'react'
import clsx from 'clsx'

const Avatar = ({
  src,
  alt,
  fallback,
  size = 'md',
  rounded = true,
  className = '',
  ...props
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  }

  const classes = clsx(
    'inline-flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium',
    sizeMap[size] || sizeMap.md,
    rounded ? 'rounded-full' : 'rounded-md',
    className
  )

  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={alt || 'avatar'} className="w-full h-full object-cover rounded-full" />
      ) : (
        <span>{fallback || alt?.charAt(0) || 'U'}</span>
      )}
    </div>
  )
}


export default Avatar