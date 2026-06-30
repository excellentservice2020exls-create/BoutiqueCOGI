import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase/supabaseClient'
import { toast } from 'react-toastify'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password })
          if (error) throw error
          set({ user: data.user, session: data.session, isAuthenticated: true })
          toast.success('Connexion reussie !')
          return { success: true }
        } catch (error) {
          toast.error(error.message || 'Erreur de connexion')
          return { success: false, error: error.message }
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (email, password, userData) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: userData },
          })
          if (error) throw error
          toast.success('Inscription reussie ! Verifiez votre email.')
          return { success: true }
        } catch (error) {
          toast.error(error.message || "Erreur d'inscription")
          return { success: false, error: error.message }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await supabase.auth.signOut()
          set({ user: null, session: null, isAuthenticated: false })
          toast.info('Deconnexion reussie')
        } catch (error) {
          toast.error('Erreur lors de la deconnexion')
        } finally {
          set({ isLoading: false })
        }
      },

      updateProfile: async (updates) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.updateUser({ data: updates })
          if (error) throw error
          set({ user: data.user })
          toast.success('Profil mis a jour !')
          return { success: true }
        } catch (error) {
          toast.error(error.message)
          return { success: false, error: error.message }
        } finally {
          set({ isLoading: false })
        }
      },

      refreshSession: async () => {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          const { data: userData } = await supabase.auth.getUser()
          set({ session: data.session, user: userData.user, isAuthenticated: true })
        }
      },
    }),
    {
      name: 'cogi-auth-storage',
      partialize: (state) => ({ user: state.user, session: state.session }),
    }
  )
)