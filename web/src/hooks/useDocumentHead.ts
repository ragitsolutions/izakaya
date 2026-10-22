import { useEffect } from 'react'
import heroImage from '@/assets/images/local/local-comedor-960.webp'
import { siteConfig } from '@/config/site.config'
import { useLanguage } from '@/i18n/LanguageContext'

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonicalLink(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

interface DocumentHeadOptions {
  title: string
  description?: string
}

const OG_LOCALE = { es: 'es_ES', en: 'en_GB' } as const

/** Actualiza título, meta-descripción y Open Graph al navegar entre páginas (SPA, sin servidor). */
export function useDocumentHead({ title, description }: DocumentHeadOptions) {
  const { locale } = useLanguage()

  useEffect(() => {
    const fullTitle = `${title} · ${siteConfig.name}`
    const desc = description ?? siteConfig.shortDescription[locale]
    const absoluteImage = `${window.location.origin}${heroImage}`

    document.title = fullTitle
    setMetaTag('name', 'description', desc)
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', desc)
    setMetaTag('property', 'og:image', absoluteImage)
    setMetaTag('property', 'og:url', window.location.href)
    setMetaTag('property', 'og:locale', OG_LOCALE[locale])
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', desc)
    setMetaTag('name', 'twitter:image', absoluteImage)
    setCanonicalLink(window.location.origin + window.location.pathname)
  }, [title, description, locale])
}
