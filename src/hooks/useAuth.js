import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'

export function useAuth() {
  const { user, isAuthenticated, isLoading, refreshSession, logout } = useAuthStore()
  useEffect(() => { refreshSession() }, [])
  return { user, isAuthenticated, isLoading, isAdmin: user?.role === 'ADMIN', isManager: user?.role === 'MANAGER' || user?.role === 'ADMIN', logout }
}