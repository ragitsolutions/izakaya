import type { Bilingual } from '@/types/common'

/**
 * Datos centrales del restaurante. Cambiar aquí se refleja en toda la web
 * (cabecera, pie, contacto, SEO, datos estructurados, emails, textos legales).
 */
export const siteConfig = {
  name: 'Izakaya',
  tagline: {
    es: 'Tapas Orientales',
    en: 'Oriental Tapas',
  } satisfies Bilingual,

  shortDescription: {
    es: 'Izakaya es un restaurante de diseño en el que la cocina japonesa se sirve en formato de tapas, pensado para compartir despacio.',
    en: 'Izakaya is a design restaurant where Japanese cuisine is served tapas-style, meant to be shared slowly.',
  } satisfies Bilingual,

  address: {
    street: 'C. de Faustino Martínez, 21 (entrada por C. Velázquez)',
    postalCode: '28420',
    city: 'Galapagar',
    province: 'Madrid',
    country: 'España',
    countryCode: 'ES',
  },

  // TODO: confirmar con el cliente — coordenadas aproximadas (centro de Galapagar);
  // el mapa de Contacto usa la dirección en texto, no estas coordenadas, así que
  // ya apunta al lugar correcto. Esto solo afecta a los datos estructurados SEO.
  coordinates: {
    lat: 40.5775,
    lng: -4.0056,
  },

  // TODO: confirmar con el cliente — teléfono de ejemplo.
  phone: {
    display: '+34 910 00 00 00',
    e164: '+34910000000',
  },

  // TODO: confirmar con el cliente — email de ejemplo.
  email: 'reservas@izakaya-restaurante.es',

  // TODO: confirmar con el cliente — perfiles de ejemplo.
  social: {
    instagram: 'https://instagram.com/izakaya.tapas',
    facebook: 'https://facebook.com/izakaya.tapas',
  },

  // Usado como fallback del iframe de Google Maps en Contacto si no se
  // dispone de un src de "compartir ubicación" específico del cliente.
  get googleMapsEmbedSrc() {
    const query = encodeURIComponent(
      `${this.address.street}, ${this.address.postalCode} ${this.address.city}, ${this.address.country}`,
    )
    return `https://www.google.com/maps?q=${query}&output=embed`
  },

  get googleMapsDirectionsUrl() {
    const query = encodeURIComponent(
      `${this.address.street}, ${this.address.postalCode} ${this.address.city}, ${this.address.country}`,
    )
    return `https://www.google.com/maps/dir/?api=1&destination=${query}`
  },
}

export type SiteConfig = typeof siteConfig
