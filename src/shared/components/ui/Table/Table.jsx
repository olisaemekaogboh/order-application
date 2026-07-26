import React from 'react'
import clsx from 'clsx'

const Table = ({ children, className = '' }) => (
  <div className="overflow-x-auto">
    <table className={clsx('min-w-full divide-y divide-gray-200 dark:divide-gray-700', className)}>
      {children}
    </table>
  </div>
)


export default Table