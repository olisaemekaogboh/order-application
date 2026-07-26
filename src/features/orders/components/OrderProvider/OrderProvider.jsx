import React from 'react'
import { useOrders } from '../../hooks/useOrders'
import OrderContext from './OrderContext'

export const OrderProvider = ({ children }) => {
  const orderState = useOrders()
  return <OrderContext.Provider value={orderState}>{children}</OrderContext.Provider>
}
