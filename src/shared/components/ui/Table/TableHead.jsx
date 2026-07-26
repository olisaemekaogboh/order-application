import React from 'react'
import clsx from 'clsx'

const TableHead = ({ children, className = '' }) => (
  <thead className={clsx('bg-gray-50 dark:bg-gray-800', className)}>{children}</thead>
)


export default TableHead