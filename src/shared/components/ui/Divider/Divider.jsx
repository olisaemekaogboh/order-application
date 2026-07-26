import React from 'react'
import clsx from 'clsx'

const Divider = ({ orientation = 'horizontal', className = '', ...props }) => {
  return (
    <div
      className={clsx(
        orientation === 'horizontal' ? 'w-full border-t' : 'h-full border-l',
        'border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    />
  )
}


export default Divider