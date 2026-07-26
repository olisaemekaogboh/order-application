import React from 'react'
import clsx from 'clsx'

const TableCell = ({ children, className = '', ...props }) => (
  <td className={clsx('px-4 py-3 text-sm text-gray-700 dark:text-gray-300', className)} {...props}>
    {children}
  </td>
)

const TableHeaderCell = ({ children, className = '', ...props }) => (
  <th
    className={clsx(
      'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      className
    )}
    {...props}
  >
    {children}
  </th>
)


export default TableCell