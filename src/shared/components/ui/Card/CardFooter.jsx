import React from 'react'
import clsx from 'clsx'

const CardFooter = ({ children, className = '' }) => (
  <div className={clsx('mt-4 flex items-center', className)}>{children}</div>
)


export default CardFooter