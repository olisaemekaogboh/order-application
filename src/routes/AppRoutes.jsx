import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

// Layouts
import PublicLayout from '../shared/components/layouts/PublicLayout/PublicLayout'
import AuthLayout from '../shared/components/layouts/AuthLayout/AuthLayout'
import DashboardLayout from '../shared/components/layouts/DashboardLayout/DashboardLayout'
import AdminLayout from '../shared/components/layouts/AdminLayout/AdminLayout'
import SuperAdminLayout from '../shared/components/layouts/SuperAdminLayout/SuperAdminLayout'

// Auth
import {
  LoginPage,
  RegisterPage,
  VerifyEmail,
  ForgotPasswordForm,
  ResetPasswordForm,
} from '../features/auth'

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

// Reviews
import { MyReviews } from '../features/reviews'

// Notifications
import { NotificationPage } from '../features/notifications'

// Drivers
import { DriverManagement } from '../features/drivers'

// Analytics
import { RevenueAnalytics, GlobalRevenue } from '../features/analytics'

// Admin
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

// ---- New Admin Components ----
import AdminCustomers from '../features/admin/components/AdminCustomers/AdminCustomers'
import AdminPayments from '../features/admin/components/AdminPayments/AdminPayments'
import AdminReviews from '../features/admin/components/AdminReviews/AdminReviews'
import AdminVehicles from '../features/admin/components/AdminVehicles/AdminVehicles'
import AdminDispatch from '../features/admin/components/AdminDispatch/AdminDispatch'
import AdminTracking from '../features/admin/components/AdminTracking/AdminTracking'
import AdminFleet from '../features/admin/components/AdminFleet/AdminFleet'

// ---- Driver Components ----
import DriverDashboard from '../features/drivers/components/DriverDashboard/DriverDashboard'
import DriverOrders from '../features/drivers/components/DriverOrders/DriverOrders'
import DriverEarnings from '../features/drivers/components/DriverEarnings/DriverEarnings'
import DriverProfile from '../features/drivers/components/DriverProfile/DriverProfile'

// ---- Reports ----
import ReportGenerator from '../features/reports/components/ReportGenerator/ReportGenerator'

// Placeholder for missing components
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-96">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">This page is under construction.</p>
    </div>
  </div>
)

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* AUTH */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        </Route>
      </Route>

      {/* CLIENT */}
      <Route element={<PrivateRoute allowedRoles={['CLIENT']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />

          {/* Orders – using exact constants */}
          <Route path="/client/create-order" element={<CreateOrder />} />
          <Route path="/client/order-history" element={<OrderHistory />} />
          <Route path="/client/order-tracking/:id" element={<OrderTracking />} />

          {/* Payments */}
          <Route path="/client/payments" element={<PaymentHistory />} />
          <Route path="/client/payments/history" element={<PaymentHistory />} />
          <Route
            path="/client/payments/:paymentId"
            element={<Placeholder title="Payment Details" />}
          />

          {/* Addresses */}
          <Route path="/client/addresses" element={<ClientAddresses />} />
          <Route path="/client/addresses/new" element={<Placeholder title="New Address" />} />
          <Route path="/client/addresses/:id/edit" element={<Placeholder title="Edit Address" />} />

          {/* Profile */}
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/profile/edit" element={<Placeholder title="Edit Profile" />} />
          <Route path="/client/change-password" element={<Placeholder title="Change Password" />} />

          {/* Reviews */}
          <Route path="/client/reviews" element={<MyReviews />} />
          <Route
            path="/client/reviews/create/:orderId"
            element={<Placeholder title="Create Review" />}
          />

          {/* Notifications */}
          <Route path="/client/notifications" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* DRIVER */}
      <Route element={<PrivateRoute allowedRoles={['DRIVER']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          <Route path="/driver/orders" element={<DriverOrders />} />
          <Route path="/driver/orders/:id" element={<Placeholder title="Driver Order Details" />} />
          <Route path="/driver/assigned-orders" element={<DriverOrders />} />
          <Route path="/driver/history" element={<DriverOrders />} />
          <Route path="/driver/profile" element={<DriverProfile />} />
          <Route path="/driver/change-password" element={<Placeholder title="Change Password" />} />
          <Route path="/driver/earnings" element={<DriverEarnings />} />
          <Route path="/driver/notifications" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* ADMIN */}
      <Route element={<PrivateRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route
            path="/admin/orders/create"
            element={<Placeholder title="Create Order (Admin)" />}
          />
          <Route path="/admin/orders/:id" element={<Placeholder title="Admin Order Details" />} />
          <Route
            path="/admin/orders/:id/edit"
            element={<Placeholder title="Edit Order (Admin)" />}
          />
          <Route path="/admin/dispatch" element={<AdminDispatch />} />
          <Route path="/admin/dispatch/live" element={<Placeholder title="Live Dispatch" />} />
          <Route path="/admin/tracking" element={<AdminTracking />} />
          <Route path="/admin/tracking/live" element={<Placeholder title="Live Tracking" />} />
          <Route path="/admin/drivers" element={<DriverManagement />} />
          <Route path="/admin/drivers/new" element={<Placeholder title="New Driver" />} />
          <Route path="/admin/drivers/:id" element={<Placeholder title="Driver Details" />} />
          <Route path="/admin/drivers/:id/edit" element={<Placeholder title="Edit Driver" />} />
          <Route path="/admin/vehicles" element={<AdminVehicles />} />
          <Route path="/admin/vehicles/new" element={<Placeholder title="New Vehicle" />} />
          <Route path="/admin/vehicles/:id" element={<Placeholder title="Vehicle Details" />} />
          <Route path="/admin/vehicles/:id/edit" element={<Placeholder title="Edit Vehicle" />} />
          <Route path="/admin/fleet" element={<AdminFleet />} />
          <Route path="/admin/fleet/maintenance" element={<Placeholder title="Maintenance" />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/customers/:id" element={<Placeholder title="Customer Details" />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/payment-history" element={<AdminPayments />} />
          <Route path="/admin/revenue" element={<RevenueAnalytics />} />
          <Route path="/admin/pricing" element={<PricingConfiguration />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/notifications" element={<NotificationPage />} />
          <Route path="/admin/crm" element={<Placeholder title="CRM" />} />
          <Route path="/admin/reports" element={<ReportGenerator />} />
          <Route path="/admin/analytics" element={<Placeholder title="Analytics" />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>
      </Route>

      {/* SUPER ADMIN */}
      <Route element={<PrivateRoute allowedRoles={['SUPER_ADMIN']} />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/users" element={<SuperAdminUserManagement />} />
          <Route path="/super-admin/admins" element={<AdminManagement />} />
          <Route path="/super-admin/system" element={<SystemConfiguration />} />
          <Route path="/super-admin/audit" element={<AuditLogs />} />
          <Route path="/super-admin/revenue" element={<GlobalRevenue />} />
          <Route path="/super-admin/pricing" element={<PricingConfiguration />} />
          <Route
            path="/super-admin/analytics"
            element={<Placeholder title="Super Admin Analytics" />}
          />
          <Route path="/super-admin/drivers" element={<DriverManagement />} />
          <Route path="/super-admin/vehicles" element={<AdminVehicles />} />
          <Route path="/super-admin/orders" element={<OrderManagement />} />
          <Route path="/super-admin/customers" element={<AdminCustomers />} />
          <Route path="/super-admin/notifications" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* SHARED */}
      <Route path="/403" element={<Placeholder title="403 - Forbidden" />} />
      <Route path="/404" element={<Placeholder title="404 - Page Not Found" />} />
      <Route path="/500" element={<Placeholder title="500 - Server Error" />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default AppRoutes
