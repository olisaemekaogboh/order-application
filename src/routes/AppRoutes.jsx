import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// Layouts
import PublicLayout from '../shared/components/layouts/PublicLayout/PublicLayout'
import AuthLayout from '../shared/components/layouts/AuthLayout/AuthLayout'
import DashboardLayout from '../shared/components/layouts/DashboardLayout/DashboardLayout'
import AdminLayout from '../shared/components/layouts/AdminLayout/AdminLayout'
import SuperAdminLayout from '../shared/components/layouts/SuperAdminLayout/SuperAdminLayout'

// Auth
import { LoginPage, RegisterPage, VerifyEmail } from '../features/auth'

// Public Pages
import LandingPage from '../features/support/components/PublicPages/LandingPage/LandingPage'
import AboutPage from '../features/support/components/PublicPages/AboutPage/AboutPage'
import ContactPage from '../features/support/components/PublicPages/ContactPage/ContactPage'
import PricingPage from '../features/support/components/PublicPages/PricingPage/PricingPage'

// Orders
import { CreateOrder, OrderTracking, OrderHistory, OrderManagement } from '../features/orders'

// Payments
import { PaymentHistory } from '../features/payments'

// Client
import { ClientDashboard, ClientProfile, ClientAddresses } from '../features/client'

// Drivers
import { DriverManagement } from '../features/drivers'

// Analytics
import { RevenueAnalytics, GlobalRevenue } from '../features/analytics'

// Admin (admin‑specific components)
import {
  AdminDashboard,
  SuperAdminDashboard,
  PricingConfiguration,
  UserManagement,
  SuperAdminUserManagement,
  AdminManagement,
  AuditLogs,
  SystemConfiguration,
} from '../features/admin'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={['CLIENT']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/create-order" element={<CreateOrder />} />
          <Route path="/client/order-tracking/:id" element={<OrderTracking />} />
          <Route path="/client/order-history" element={<OrderHistory />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/addresses" element={<ClientAddresses />} />
          <Route path="/client/payments" element={<PaymentHistory />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/drivers" element={<DriverManagement />} />
          <Route path="/admin/revenue" element={<RevenueAnalytics />} />
          <Route path="/admin/pricing" element={<PricingConfiguration />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={['SUPER_ADMIN']} />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/users" element={<SuperAdminUserManagement />} />
          <Route path="/super-admin/admins" element={<AdminManagement />} />
          <Route path="/super-admin/system" element={<SystemConfiguration />} />
          <Route path="/super-admin/audit" element={<AuditLogs />} />
          <Route path="/super-admin/revenue" element={<GlobalRevenue />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
