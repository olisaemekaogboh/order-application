import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className = '', ...props }) => (
  <div className={clsx('bg-white dark:bg-gray-800 rounded-xl shadow-md p-6', className)} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={clsx('mb-4', className)}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={clsx('text-xl font-semibold text-gray-900 dark:text-white', className)}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={clsx('text-sm text-gray-500 dark:text-gray-400', className)}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={clsx('text-gray-700 dark:text-gray-300', className)}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={clsx('mt-4 flex items-center', className)}>{children}</div>
);

export default Card