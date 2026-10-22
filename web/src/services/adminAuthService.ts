import { adminConfig } from '@/config/admin.config'
import { readJSON, removeKey, writeJSON } from './storage'

/**
 * Sesión de admin simulada: sin tokens ni backend real, solo una bandera en
 * localStorage. No usar este patrón en producción; ver README ("Paso a
 * producción") para cómo sustituirlo por autenticación real.
 */
const SESSION_KEY = 'admin-session'

export const adminAuthService = {
  isAuthenticated(): boolean {
    return readJSON<boolean>(SESSION_KEY, false)
  },

  login(username: string, password: string): boolean {
    const ok = username === adminConfig.demoUsername && password === adminConfig.demoPassword
    if (ok) writeJSON(SESSION_KEY, true)
    return ok
  },

  logout() {
    removeKey(SESSION_KEY)
  },
}
