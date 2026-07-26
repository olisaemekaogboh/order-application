import React from 'react'
import clsx from 'clsx'

const TableBody = ({ children, className = '' }) => (
  <tbody className={clsx('divide-y divide-gray-200 dark:divide-gray-700', className)}>
    {children}
  </tbody>
)


export default TableBody