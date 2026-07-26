import React from 'react'
import clsx from 'clsx'

const CardContent = ({ children, className = '' }) => (
  <div className={clsx('text-gray-700 dark:text-gray-300', className)}>{children}</div>
)


export default CardContent