import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@/components/admin/AdminLayout'
import AdminReservations from './AdminReservations'
import AdminSettings from './AdminSettings'

/**
 * Sin pantalla de login: para esta demo el panel es público (se enseña
 * directamente a los dueños desde el botón del header). La maqueta de
 * login real queda en AdminLogin.tsx/useAdminAuth.ts/adminAuthService.ts
 * para cuando se sustituya por autenticación real (ver README).
 */
export default function AdminApp() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="reservas" replace />} />
        <Route path="reservas" element={<AdminReservations />} />
        <Route path="configuracion" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="reservas" replace />} />
      </Route>
    </Routes>
  )
}
