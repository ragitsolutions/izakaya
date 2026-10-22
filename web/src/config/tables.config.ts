import type { RestaurantTable } from '@/types/reservation'

// TODO: confirmar con el cliente — plano de mesas de prueba para la demo.
export const tables: RestaurantTable[] = [
  { id: 'bar-1', zone: 'bar', capacity: 2, label: 'Barra 1' },
  { id: 'bar-2', zone: 'bar', capacity: 2, label: 'Barra 2' },

  { id: 'table-2-1', zone: 'table', capacity: 2, label: 'Mesa 1' },
  { id: 'table-2-2', zone: 'table', capacity: 2, label: 'Mesa 2' },
  { id: 'table-2-3', zone: 'table', capacity: 2, label: 'Mesa 3' },
  { id: 'table-2-4', zone: 'table', capacity: 2, label: 'Mesa 4' },
  { id: 'table-2-5', zone: 'table', capacity: 2, label: 'Mesa 5' },
  { id: 'table-2-6', zone: 'table', capacity: 2, label: 'Mesa 6' },

  { id: 'table-4-1', zone: 'table', capacity: 4, label: 'Mesa 7' },
  { id: 'table-4-2', zone: 'table', capacity: 4, label: 'Mesa 8' },
  { id: 'table-4-3', zone: 'table', capacity: 4, label: 'Mesa 9' },
  { id: 'table-4-4', zone: 'table', capacity: 4, label: 'Mesa 10' },

  { id: 'table-6-1', zone: 'table', capacity: 6, label: 'Mesa 11' },
  { id: 'table-6-2', zone: 'table', capacity: 6, label: 'Mesa 12' },

  { id: 'terrace-4-1', zone: 'terrace', capacity: 4, label: 'Terraza 1' },
  { id: 'terrace-4-2', zone: 'terrace', capacity: 4, label: 'Terraza 2' },
]

export const zoneLabels = {
  bar: { es: 'Barra', en: 'Bar' },
  table: { es: 'Mesa', en: 'Table' },
  terrace: { es: 'Terraza', en: 'Terrace' },
} as const
