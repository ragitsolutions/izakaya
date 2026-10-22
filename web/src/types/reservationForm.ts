import type { Zone } from './reservation'

export interface ReservationDetails {
  name: string
  email: string
  phone: string
  zonePreference: Zone
  notes: string
  privacyAccepted: boolean
}

export const emptyReservationDetails: ReservationDetails = {
  name: '',
  email: '',
  phone: '',
  zonePreference: 'table',
  notes: '',
  privacyAccepted: false,
}
