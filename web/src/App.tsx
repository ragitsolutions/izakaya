import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Carta from '@/pages/Carta'
import Gallery from '@/pages/Gallery'
import Reservation from '@/pages/Reservation'
import ConfirmReservationPage from '@/pages/reservation/ConfirmReservationPage'
import CancelReservationPage from '@/pages/reservation/CancelReservationPage'
import ModifyReservationPage from '@/pages/reservation/ModifyReservationPage'
import Contact from '@/pages/Contact'
import Demo from '@/pages/Demo'
import Privacy from '@/pages/legal/Privacy'
import LegalNotice from '@/pages/legal/LegalNotice'
import Cookies from '@/pages/legal/Cookies'
import AdminApp from '@/pages/admin/AdminApp'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="admin/*" element={<AdminApp />} />
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="nosotros" element={<About />} />
        <Route path="carta" element={<Carta />} />
        <Route path="galeria" element={<Gallery />} />
        <Route path="reservas" element={<Reservation />} />
        <Route path="reserva/:token/confirmar" element={<ConfirmReservationPage />} />
        <Route path="reserva/:token/cancelar" element={<CancelReservationPage />} />
        <Route path="reserva/:token/modificar" element={<ModifyReservationPage />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="demo" element={<Demo />} />
        <Route path="legal/privacidad" element={<Privacy />} />
        <Route path="legal/aviso-legal" element={<LegalNotice />} />
        <Route path="legal/cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
