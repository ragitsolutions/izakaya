/**
 * Capa mínima sobre localStorage usada por los servicios simulados
 * (reservas, emails). Centralizada aquí para que sustituir el almacenamiento
 * por una API real solo implique reescribir los servicios, no sus consumidores.
 */
const NAMESPACE = 'izakaya'

export function storageKey(name: string) {
  return `${NAMESPACE}:${name}`
}

export function readJSON<T>(name: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(storageKey(name))
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON<T>(name: string, value: T) {
  try {
    window.localStorage.setItem(storageKey(name), JSON.stringify(value))
  } catch {
    // Ignorado: almacenamiento no disponible (modo privado, cuota excedida, etc.).
  }
}

export function removeKey(name: string) {
  try {
    window.localStorage.removeItem(storageKey(name))
  } catch {
    // Ignorado.
  }
}

/** Elimina todas las claves de la demo (usado por el botón "reiniciar datos de prueba"). */
export function clearAllDemoData() {
  if (typeof window === 'undefined') return
  const toRemove: string[] = []
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i)
    if (key?.startsWith(`${NAMESPACE}:`)) toRemove.push(key)
  }
  toRemove.forEach((key) => window.localStorage.removeItem(key))
}
