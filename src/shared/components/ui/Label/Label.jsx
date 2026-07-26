import React from 'react'
import clsx from 'clsx'

const Label = ({ children, htmlFor, className = '', ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('text-sm font-medium text-gray-700 dark:text-gray-300', className)}
      {...props}
    >
      {children}
    </label>
  )
}


export default Label