import React, { useState } from 'react'
import clsx from 'clsx'

const Image = ({
  src,
  alt,
  fallback = '/placeholder-image.svg',
  className = '',
  ...props
}) => {
  const [error, setError] = useState(false)

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={() => setError(true)}
      className={clsx('max-w-full h-auto object-cover', className)}
      {...props}
    />
  )
}


export default Image