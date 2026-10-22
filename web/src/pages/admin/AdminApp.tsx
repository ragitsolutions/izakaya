import { Navigate, Route, Routes } from 'react-router-dom'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminLogin } from './AdminLogin'
import AdminReservations from './AdminReservations'
import AdminSettings from './AdminSettings'

export default function AdminApp() {
  const { isAuthenticated, login, logout } = useAdminAuth()

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />
  }

  return (
    <Routes>
      <Route element={<AdminLayout onLogout={logout} />}>
        <Route index element={<Navigate to="reservas" replace />} />
        <Route path="reservas" element={<AdminReservations />} />
        <Route path="configuracion" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="reservas" replace />} />
      </Route>
    </Routes>
  )
}
