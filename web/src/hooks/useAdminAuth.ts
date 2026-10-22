import { useCallback, useState } from 'react'
import { adminAuthService } from '@/services/adminAuthService'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => adminAuthService.isAuthenticated())

  const login = useCallback((username: string, password: string) => {
    const ok = adminAuthService.login(username, password)
    if (ok) setIsAuthenticated(true)
    return ok
  }, [])

  const logout = useCallback(() => {
    adminAuthService.logout()
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout }
}
