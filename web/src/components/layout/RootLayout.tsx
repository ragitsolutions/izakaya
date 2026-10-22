import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'
import { useStructuredData } from '@/hooks/useStructuredData'
import { buildRestaurantStructuredData } from '@/lib/structuredData'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieBanner } from './CookieBanner'
import { DemoBadge } from './DemoBadge'

export function RootLayout() {
  const location = useLocation()
  const { locale } = useLanguage()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  useStructuredData(buildRestaurantStructuredData(locale))

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main id="contenido" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <DemoBadge />
    </div>
  )
}
