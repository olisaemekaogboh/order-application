import React from 'react'
import clsx from 'clsx'

const CardTitle = ({ children, className = '' }) => (
  <h3 className={clsx('text-xl font-semibold text-gray-900 dark:text-white', className)}>
    {children}
  </h3>
)


export default CardTitle