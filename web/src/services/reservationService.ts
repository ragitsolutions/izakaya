import type { ServicePeriod } from '@/config/hours.config'
import { reservationConfig } from '@/config/reservation.config'
import { addDays, getWeekday, minutesToTime, startOfDay, timeToMinutes, toISODate } from '@/lib/date'
import type { NewReservationInput, Reservation, ReservationStatus, Zone } from '@/types/reservation'
import { readJSON, removeKey, writeJSON } from './storage'
import { settingsService } from './settingsService'

const RESERVATIONS_KEY = 'reservations'
const SEEDED_KEY = 'reservations-seeded'

// Simula la latency de una API real, para que el flujo se sienta genuino.
const FAKE_LATENCY_MS = 350

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), FAKE_LATENCY_MS))
}

function generateToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 20)
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`
}

function generateId(): string {
  return `res_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

// ---------------------------------------------------------------------------
// Disponibilidad
// ---------------------------------------------------------------------------

/** Franjas horarias (inicio) dentro de un servicio, dejando terminar antes del cierre. */
function slotsForService(start: string, end: string): string[] {
  const slots: string[] = []
  const startMin = timeToMinutes(start)
  const endMin = timeToMinutes(end)
  const { slotIntervalMinutes, reservationDurationMinutes } = reservationConfig

  for (let t = startMin; t + reservationDurationMinutes <= endMin; t += slotIntervalMinutes) {
    slots.push(minutesToTime(t))
  }
  return slots
}

/** Todas las franjas (comida + cena) de una fecha dada, o [] si el restaurante cierra ese día. */
export function getAllSlotsForDate(date: Date): string[] {
  const schedule = settingsService.getSchedule()[getWeekday(date)]
  if (schedule.closed) return []
  return schedule.services.flatMap((service) => slotsForService(service.start, service.end))
}

/** Igual que `getAllSlotsForDate`, pero agrupado por servicio (comidas/cenas) para la UI. */
export function getSlotsByService(date: Date): { label: ServicePeriod['label']; slots: string[] }[] {
  const schedule = settingsService.getSchedule()[getWeekday(date)]
  if (schedule.closed) return []
  return schedule.services.map((service) => ({
    label: service.label,
    slots: slotsForService(service.start, service.end),
  }))
}

export function isDateBookable(date: Date): boolean {
  const today = startOfDay(new Date())
  const target = startOfDay(date)
  if (target < today) return false
  const maxDate = addDays(today, reservationConfig.bookingWindowDays)
  if (target > maxDate) return false
  if (settingsService.isBlocked(toISODate(date))) return false
  return getAllSlotsForDate(date).length > 0
}

function reservationsOverlap(aStart: number, bStart: number): boolean {
  const duration = reservationConfig.reservationDurationMinutes
  return aStart < bStart + duration && bStart < aStart + duration
}

function isTableFree(
  tableId: string,
  date: string,
  time: string,
  reservations: Reservation[],
  excludeReservationId?: string,
): boolean {
  const slotMin = timeToMinutes(time)
  return !reservations.some((r) => {
    if (r.id === excludeReservationId) return false
    if (r.status === 'cancelled') return false
    if (r.tableId !== tableId || r.date !== date) return false
    return reservationsOverlap(slotMin, timeToMinutes(r.time))
  })
}

interface TableAssignment {
  tableId: string
  reassignedZone: boolean
}

/** Mesa libre más ajustada al nº de comensales, priorizando la zona preferida. */
function findAvailableTable(
  date: string,
  time: string,
  partySize: number,
  zonePreference: Zone,
  reservations: Reservation[],
  excludeReservationId?: string,
): TableAssignment | null {
  const bySize = (a: { capacity: number }, b: { capacity: number }) => a.capacity - b.capacity

  const candidates = settingsService.getTables().filter((t) => t.capacity >= partySize)

  const preferred = candidates
    .filter((t) => t.zone === zonePreference)
    .sort(bySize)
    .find((t) => isTableFree(t.id, date, time, reservations, excludeReservationId))

  if (preferred) return { tableId: preferred.id, reassignedZone: false }

  const fallback = candidates
    .filter((t) => t.zone !== zonePreference)
    .sort(bySize)
    .find((t) => isTableFree(t.id, date, time, reservations, excludeReservationId))

  if (fallback) return { tableId: fallback.id, reassignedZone: true }

  return null
}

function hasAnyAvailability(
  date: string,
  time: string,
  partySize: number,
  reservations: Reservation[],
): boolean {
  return settingsService
    .getTables()
    .filter((t) => t.capacity >= partySize)
    .some((t) => isTableFree(t.id, date, time, reservations))
}

// ---------------------------------------------------------------------------
// Datos de ejemplo (demo)
// ---------------------------------------------------------------------------

const SEED_NAMES = [
  { name: 'Marta Sánchez', email: 'marta.sanchez@example.com', phone: '+34 611 22 33 44' },
  { name: 'Javier Torres', email: 'javier.torres@example.com', phone: '+34 622 33 44 55' },
  { name: 'Lucía Fernández', email: 'lucia.fernandez@example.com', phone: '+34 633 44 55 66' },
  { name: 'Diego Molina', email: 'diego.molina@example.com', phone: '+34 644 55 66 77' },
  { name: 'Sara Ibáñez', email: 'sara.ibanez@example.com', phone: '+34 655 66 77 88' },
  { name: 'Pablo Navarro', email: 'pablo.navarro@example.com', phone: '+34 666 77 88 99' },
  { name: 'Elena Campos', email: 'elena.campos@example.com', phone: '+34 677 88 99 00' },
  { name: 'Hugo Delgado', email: 'hugo.delgado@example.com', phone: '+34 688 99 00 11' },
]

const ZONES: Zone[] = ['bar', 'table', 'terrace']

function seedReservations(): Reservation[] {
  const seeded: Reservation[] = []
  const today = startOfDay(new Date())

  for (let dayOffset = 0; dayOffset < 14; dayOffset++) {
    const date = addDays(today, dayOffset)
    const slots = getAllSlotsForDate(date)
    if (slots.length === 0) continue

    const iso = toISODate(date)
    // Más reservas los fines de semana y en horario de cena, para que el
    // calendario muestre franjas realmente llenas en algún momento.
    const weekday = date.getDay()
    const isWeekend = weekday === 5 || weekday === 6 || weekday === 0
    const bookingsToCreate = isWeekend ? 9 : 5

    for (let i = 0; i < bookingsToCreate; i++) {
      const time = slots[Math.floor(Math.random() * slots.length)]
      const partySize = 1 + Math.floor(Math.random() * reservationConfig.maxPartySizeOnline)
      const zonePreference = ZONES[Math.floor(Math.random() * ZONES.length)]
      const customer = SEED_NAMES[Math.floor(Math.random() * SEED_NAMES.length)]

      const assignment = findAvailableTable(iso, time, partySize, zonePreference, seeded)
      if (!assignment) continue // franja llena para ese tamaño de grupo, se omite

      const createdAt = new Date().toISOString()
      seeded.push({
        id: generateId(),
        token: generateToken(),
        status: Math.random() < 0.85 ? 'confirmed' : 'pending',
        date: iso,
        time,
        partySize,
        zonePreference,
        tableId: assignment.tableId,
        customer: { ...customer, notes: '' },
        reassignedZone: assignment.reassignedZone,
        createdByAdmin: false,
        createdAt,
        updatedAt: createdAt,
      })
    }
  }

  return seeded
}

function ensureSeeded(): Reservation[] {
  const alreadySeeded = readJSON<boolean>(SEEDED_KEY, false)
  if (alreadySeeded) {
    return readJSON<Reservation[]>(RESERVATIONS_KEY, [])
  }
  const seeded = seedReservations()
  writeJSON(RESERVATIONS_KEY, seeded)
  writeJSON(SEEDED_KEY, true)
  return seeded
}

function loadReservations(): Reservation[] {
  return ensureSeeded()
}

function saveReservations(reservations: Reservation[]) {
  writeJSON(RESERVATIONS_KEY, reservations)
}

// ---------------------------------------------------------------------------
// API pública del servicio
// ---------------------------------------------------------------------------

export class ReservationError extends Error {}

export const reservationService = {
  async listReservations(): Promise<Reservation[]> {
    return delay(loadReservations())
  },

  async getReservationsByDate(date: string): Promise<Reservation[]> {
    const all = loadReservations()
    return delay(all.filter((r) => r.date === date))
  },

  async getReservationByToken(token: string): Promise<Reservation | null> {
    const all = loadReservations()
    return delay(all.find((r) => r.token === token) ?? null)
  },

  /** Franjas de una fecha con disponibilidad para un nº de comensales dado (zona aún no elegida). */
  async getAvailableSlotsForDate(date: Date, partySize: number): Promise<string[]> {
    const reservations = loadReservations()
    const iso = toISODate(date)
    const slots = getAllSlotsForDate(date).filter((time) =>
      hasAnyAvailability(iso, time, partySize, reservations),
    )
    return delay(slots)
  },

  async createReservation(input: NewReservationInput): Promise<Reservation> {
    const reservations = loadReservations()
    const assignment = findAvailableTable(
      input.date,
      input.time,
      input.partySize,
      input.zonePreference,
      reservations,
    )

    if (!assignment) {
      throw new ReservationError('No hay mesas disponibles para esa franja.')
    }

    const now = new Date().toISOString()
    const reservation: Reservation = {
      id: generateId(),
      token: generateToken(),
      status: input.createdByAdmin ? 'confirmed' : 'pending',
      date: input.date,
      time: input.time,
      partySize: input.partySize,
      zonePreference: input.zonePreference,
      tableId: assignment.tableId,
      customer: input.customer,
      reassignedZone: assignment.reassignedZone,
      createdByAdmin: Boolean(input.createdByAdmin),
      createdAt: now,
      updatedAt: now,
    }

    saveReservations([...reservations, reservation])
    return delay(reservation)
  },

  async updateStatus(token: string, status: ReservationStatus): Promise<Reservation> {
    const reservations = loadReservations()
    const index = reservations.findIndex((r) => r.token === token)
    if (index === -1) throw new ReservationError('Reserva no encontrada.')

    const updated: Reservation = { ...reservations[index], status, updatedAt: new Date().toISOString() }
    const next = [...reservations]
    next[index] = updated
    saveReservations(next)
    return delay(updated)
  },

  async rescheduleReservation(
    token: string,
    changes: { date: string; time: string; partySize: number },
  ): Promise<Reservation> {
    const reservations = loadReservations()
    const index = reservations.findIndex((r) => r.token === token)
    if (index === -1) throw new ReservationError('Reserva no encontrada.')
    const current = reservations[index]
    if (current.status === 'cancelled') {
      throw new ReservationError('No se puede modificar una reserva cancelada.')
    }

    const assignment = findAvailableTable(
      changes.date,
      changes.time,
      changes.partySize,
      current.zonePreference,
      reservations,
      current.id,
    )
    if (!assignment) {
      throw new ReservationError('No hay mesas disponibles para la nueva franja.')
    }

    const updated: Reservation = {
      ...current,
      date: changes.date,
      time: changes.time,
      partySize: changes.partySize,
      tableId: assignment.tableId,
      reassignedZone: assignment.reassignedZone,
      updatedAt: new Date().toISOString(),
    }
    const next = [...reservations]
    next[index] = updated
    saveReservations(next)
    return delay(updated)
  },

  /** Uso exclusivo del panel de administración: mueve la reserva a otra mesa manualmente. */
  async moveTable(id: string, tableId: string): Promise<Reservation> {
    const reservations = loadReservations()
    const index = reservations.findIndex((r) => r.id === id)
    if (index === -1) throw new ReservationError('Reserva no encontrada.')
    const updated: Reservation = { ...reservations[index], tableId, updatedAt: new Date().toISOString() }
    const next = [...reservations]
    next[index] = updated
    saveReservations(next)
    return delay(updated)
  },

  async deleteReservation(id: string): Promise<void> {
    const reservations = loadReservations()
    saveReservations(reservations.filter((r) => r.id !== id))
    await delay(null)
  },

  async resetDemoData(): Promise<void> {
    removeKey(RESERVATIONS_KEY)
    removeKey(SEEDED_KEY)
    settingsService.resetAll()
    ensureSeeded()
    await delay(null)
  },
}
