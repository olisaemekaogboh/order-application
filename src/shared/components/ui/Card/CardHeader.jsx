import React from 'react'
import clsx from 'clsx'

const CardHeader = ({ children, className = '' }) => (
  <div className={clsx('mb-4', className)}>{children}</div>
)


export default CardHeader