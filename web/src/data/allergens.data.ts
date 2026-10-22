import type { Bilingual } from '@/types/common'

/**
 * Los 14 alérgenos de declaración obligatoria en la UE (Reglamento 1169/2011).
 * `id` se usa como clave estable en `menu.data.ts` y en los iconos de `AllergenIcon`.
 */
export interface AllergenDef {
  id: string
  name: Bilingual
}

export const allergens: AllergenDef[] = [
  { id: 'gluten', name: { es: 'Gluten', en: 'Gluten' } },
  { id: 'crustaceans', name: { es: 'Crustáceos', en: 'Crustaceans' } },
  { id: 'eggs', name: { es: 'Huevos', en: 'Eggs' } },
  { id: 'fish', name: { es: 'Pescado', en: 'Fish' } },
  { id: 'peanuts', name: { es: 'Cacahuetes', en: 'Peanuts' } },
  { id: 'soy', name: { es: 'Soja', en: 'Soybeans' } },
  { id: 'milk', name: { es: 'Lácteos', en: 'Milk' } },
  { id: 'nuts', name: { es: 'Frutos de cáscara', en: 'Tree nuts' } },
  { id: 'celery', name: { es: 'Apio', en: 'Celery' } },
  { id: 'mustard', name: { es: 'Mostaza', en: 'Mustard' } },
  { id: 'sesame', name: { es: 'Granos de sésamo', en: 'Sesame seeds' } },
  { id: 'sulphites', name: { es: 'Sulfitos', en: 'Sulphites' } },
  { id: 'lupin', name: { es: 'Altramuces', en: 'Lupin' } },
  { id: 'molluscs', name: { es: 'Moluscos', en: 'Molluscs' } },
]

export const allergenById = new Map(allergens.map((a) => [a.id, a]))
