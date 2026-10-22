import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { CookieConsentProvider } from '@/hooks/CookieConsentContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CookieConsentProvider>
          <App />
        </CookieConsentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
