import React from 'react'
import clsx from 'clsx'

const CardDescription = ({ children, className = '' }) => (
  <p className={clsx('text-sm text-gray-500 dark:text-gray-400', className)}>{children}</p>
)


export default CardDescription