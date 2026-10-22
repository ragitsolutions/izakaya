export type Zone = 'bar' | 'table' | 'terrace'

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface RestaurantTable {
  id: string
  zone: Zone
  capacity: number
  /** Nombre corto mostrado en el plano del panel de administración. */
  label: string
}

export interface Reservation {
  id: string
  /** Token único usado en las URLs de confirmar/cancelar/modificar (sin autenticación). */
  token: string
  status: ReservationStatus
  date: string // "YYYY-MM-DD"
  time: string // "HH:mm"
  partySize: number
  zonePreference: Zone
  tableId: string
  customer: {
    name: string
    email: string
    phone: string
    notes: string
  }
  /** true si no había mesa libre en la zona preferida y se asignó otra. */
  reassignedZone: boolean
  /** true si la reserva se creó manualmente desde el panel (por teléfono). */
  createdByAdmin: boolean
  createdAt: string // ISO
  updatedAt: string // ISO
}

export interface NewReservationInput {
  date: string
  time: string
  partySize: number
  zonePreference: Zone
  customer: {
    name: string
    email: string
    phone: string
    notes: string
  }
  createdByAdmin?: boolean
}
