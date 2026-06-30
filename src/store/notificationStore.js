import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  notifications: [], unreadCount: 0,

  addNotification: (notification) => {
    const newNotification = { id: crypto.randomUUID(), ...notification, createdAt: new Date().toISOString() }
    set((state) => ({ notifications: [newNotification, ...state.notifications], unreadCount: state.unreadCount + 1 }))
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: () => set((state) => ({ notifications: state.notifications.map((n) => ({ ...n, isRead: true })), unreadCount: 0 })),

  removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}))