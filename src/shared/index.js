// src/shared/index.js

// ===== UI Components =====
// Instead of export * from './components/ui', explicitly import and re-export
// to avoid missing exports and to have clarity.
export { default as Accordion } from './components/ui/Accordion/Accordion'
export { default as Alert } from './components/ui/Alert/Alert'
export { default as Avatar } from './components/ui/Avatar/Avatar'
export { default as Badge } from './components/ui/Badge/Badge'
export { default as Breadcrumb } from './components/ui/Breadcrumb/Breadcrumb'
export { default as Button } from './components/ui/Button/Button'
export { default as Calendar } from './components/ui/Calendar/Calendar'
export { default as Card } from './components/ui/Card/Card'
export { default as Checkbox } from './components/ui/Checkbox/Checkbox'
export { default as CopyButton } from './components/ui/CopyButton/CopyButton'
export { default as DatePicker } from './components/ui/DatePicker/DatePicker'
export { default as Dialog } from './components/ui/Dialog/Dialog'
export { default as Divider } from './components/ui/Divider/Divider'
export { default as Drawer } from './components/ui/Drawer/Drawer'
export { default as Dropdown } from './components/ui/Dropdown/Dropdown'
export { default as EmptyState } from './components/ui/EmptyState/EmptyState'
export { default as FileUpload } from './components/ui/FileUpload/FileUpload'
export { default as Image } from './components/ui/Image/Image'
export { default as Input } from './components/ui/Input/Input'
export { default as Label } from './components/ui/Label/Label'
export { default as Loader } from './components/ui/Loader/Loader'
export { default as Modal } from './components/ui/Modal/Modal'
export { default as Pagination } from './components/ui/Pagination/Pagination'
export { default as Progress } from './components/ui/Progress/Progress'
export { default as Radio } from './components/ui/Radio/Radio'
export { default as Rating } from './components/ui/Rating/Rating'
export { default as SearchBar } from './components/ui/SearchBar/SearchBar'
export { default as Select } from './components/ui/Select/Select'
export { default as Skeleton } from './components/ui/Skeleton/Skeleton'
export { default as Spinner } from './components/ui/Spinner/Spinner'
export { default as Stepper } from './components/ui/Stepper/Stepper'
export { default as Switch } from './components/ui/Switch/Switch'
export { default as Table } from './components/ui/Table/Table'
export { default as Tabs } from './components/ui/Tabs/Tabs'
export { default as Textarea } from './components/ui/Textarea/Textarea'
export { default as Timeline } from './components/ui/Timeline/Timeline'
export { default as Toast } from './components/ui/Toast/Toast'
export { default as Tooltip } from './components/ui/Tooltip/Tooltip'

// ===== Layout Components =====
export { default as Footer } from './components/layout/Footer/Footer'
export { default as Navbar } from './components/layout/Navbar/Navbar'
export { default as Sidebar } from './components/layout/Sidebar/Sidebar'

// ===== Dashboard Widgets =====
export { default as QuickActions } from './components/dashboard/widgets/QuickActions/QuickActions'
export { default as RecentOrders } from './components/dashboard/widgets/RecentOrders/RecentOrders'
export { default as StatsCards } from './components/dashboard/widgets/StatsCards/StatsCards'

// ===== Layouts =====
export { default as AdminLayout } from './components/layouts/AdminLayout/AdminLayout'
export { default as AuthLayout } from './components/layouts/AuthLayout/AuthLayout'
export { default as DashboardLayout } from './components/layouts/DashboardLayout/DashboardLayout'
export { default as PublicLayout } from './components/layouts/PublicLayout/PublicLayout'
export { default as SuperAdminLayout } from './components/layouts/SuperAdminLayout/SuperAdminLayout'

// ===== Config =====
export { default as i18n } from './config/i18n'
export { themeConfig } from './config/themeConfig'

// ===== Contexts =====
// Only export the provider and context once – avoid duplicate named exports.
export { default as LanguageContext } from './contexts/LanguageContext/LanguageContext'
export { LanguageProvider } from './contexts/LanguageContext/LanguageProvider'
export { default as OrderContext } from './contexts/OrderContext/OrderContext'
export { OrderProvider } from './contexts/OrderContext/OrderProvider'
export { default as ThemeContext } from './contexts/ThemeContext/ThemeContext'
export { ThemeProvider } from './contexts/ThemeContext/ThemeProvider'

// ===== Hooks =====
// Since hooks are many, it's better to import and re-export them individually.
// But for brevity, we can use export * if the hooks index.js exists.
export * from './hooks'

// ===== Utils =====
// Similarly, re-export all utils from their respective files.
// Ensure that these files exist and export the correct items.
export * from './utils/formatters/currencyFormatter'
export * from './utils/formatters/dateFormatter'
export * from './utils/formatters/phoneFormatter'
export * from './utils/validators/formValidators'
export * from './utils/validators/validationRules'
export * from './utils/helpers/cookieHelper'
export * from './utils/helpers/errorHandler'
export * from './utils/helpers/fileHelper'
export * from './utils/helpers/localStorageHelper'
export * from './utils/helpers/routeHelper'
export * from './utils/constants/apiEndpoints'
export * from './utils/constants/appConstants'
export * from './utils/constants/statusCodes'
