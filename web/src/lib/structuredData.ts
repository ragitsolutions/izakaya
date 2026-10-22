import heroImage from '@/assets/images/local/local-comedor-960.webp'
import { siteConfig } from '@/config/site.config'
import { settingsService } from '@/services/settingsService'
import { WEEKDAYS, type Locale } from '@/types/common'

const SCHEMA_DAY_NAME: Record<(typeof WEEKDAYS)[number], string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
}

/** Datos estructurados schema.org/Restaurant, generados a partir de la configuración actual. */
export function buildRestaurantStructuredData(locale: Locale) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const schedule = settingsService.getSchedule()

  const openingHoursSpecification = WEEKDAYS.filter((day) => !schedule[day].closed).flatMap((day) =>
    schedule[day].services.map((service) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: SCHEMA_DAY_NAME[day],
      opens: service.start,
      closes: service.end,
    })),
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteConfig.name,
    description: siteConfig.shortDescription[locale],
    image: `${origin}${heroImage}`,
    url: origin,
    telephone: siteConfig.phone.e164,
    email: siteConfig.email,
    servesCuisine: locale === 'es' ? ['Japonesa', 'Asiática'] : ['Japanese', 'Asian fusion'],
    priceRange: '€€',
    acceptsReservations: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.province,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    menu: `${origin}/carta`,
    openingHoursSpecification,
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  }
}
