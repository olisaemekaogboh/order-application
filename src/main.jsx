import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { ThemeProvider } from './shared/contexts/ThemeContext/ThemeProvider'
import { LanguageProvider } from './shared/contexts/LanguageContext/LanguageProvider'
import AuthProvider from './features/auth/components/AuthProvider/AuthProvider'
import { NotificationProvider } from './features/notifications/components/NotificationContext/NotificationProvider'
import { OrderProvider } from './features/orders/components/OrderProvider/OrderProvider'
import { store } from './store/store'
import './assets/styles/global.css'
import 'leaflet/dist/leaflet.css'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
            <ThemeProvider>
              <LanguageProvider>
                <AuthProvider>
                  <NotificationProvider>
                    <OrderProvider>
                      <App />
                    </OrderProvider>
                  </NotificationProvider>
                </AuthProvider>
              </LanguageProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)
