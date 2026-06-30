import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      getTotalItems: () => get().items.length,
      isInWishlist: (productId) => get().items.some((item) => item.productId === productId),

      addItem: (product) => {
        const { items } = get()
        if (items.some((item) => item.productId === product.id)) { toast.info('Deja dans vos favoris'); return }
        set({ items: [...items, {
          id: crypto.randomUUID(), productId: product.id, name: product.name,
          price: product.variants?.[0]?.price || 0, image: product.images?.[0]?.url || '/placeholder.jpg', slug: product.slug,
        }] })
        toast.success('Ajoute aux favoris !')
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) })
        toast.info('Retire des favoris')
      },

      toggleItem: (product) => {
        if (get().isInWishlist(product.id)) get().removeItem(product.id)
        else get().addItem(product)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'cogi-wishlist-storage' }
  )
)