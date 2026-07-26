import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  sidebarOpen: true,
  modalOpen: false,
  modalContent: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    openModal: (state, action) => {
      state.modalOpen = true
      state.modalContent = action.payload
    },
    closeModal: (state) => {
      state.modalOpen = false
      state.modalContent = null
    },
  },
})

export const { toggleTheme, setTheme, toggleSidebar, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer