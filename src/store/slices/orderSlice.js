import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  pagination: { page: 0, size: 10, total: 0 },
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload.content || []
      state.pagination = {
        page: action.payload.page || 0,
        size: action.payload.size || 10,
        total: action.payload.totalElements || 0,
      }
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    clearOrders: (state) => {
      state.orders = []
      state.currentOrder = null
    },
  },
})

export const { setOrders, setCurrentOrder, setLoading, clearOrders } = orderSlice.actions
export default orderSlice.reducer