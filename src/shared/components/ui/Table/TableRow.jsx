import React from 'react'
import clsx from 'clsx'

const TableRow = ({ children, className = '', ...props }) => (
  <tr className={clsx('hover:bg-gray-50 dark:hover:bg-gray-700/50', className)} {...props}>
    {children}
  </tr>
)


export default TableRow