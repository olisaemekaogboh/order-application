import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
    addNotification: (state, action) => {
      state.notifications = [action.payload, ...state.notifications]
      if (!action.payload.read) {
        state.unreadCount += 1
      }
    },
    markAsRead: (state, action) => {
      const id = action.payload
      const notif = state.notifications.find(n => n.id === id)
      if (notif && !notif.read) {
        notif.read = true
        state.unreadCount -= 1
      }
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setNotifications, addNotification, markAsRead, setUnreadCount, setLoading } = notificationSlice.actions
export default notificationSlice.reducer