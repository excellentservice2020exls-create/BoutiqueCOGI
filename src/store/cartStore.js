import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getItemCount: () => get().items.length,

      addItem: (product, variant, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find((item) => item.variantId === variant.id)
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity
          if (newQuantity > variant.stock) { toast.warning('Stock insuffisant'); return }
          set({ items: items.map((item) => item.variantId === variant.id ? { ...item, quantity: newQuantity } : item) })
        } else {
          if (quantity > variant.stock) { toast.warning('Stock insuffisant'); return }
          set({ items: [...items, {
            id: crypto.randomUUID(), productId: product.id, variantId: variant.id,
            name: product.name, sku: variant.sku, price: variant.price, quantity,
            color: variant.color, size: variant.size, image: product.images?.[0]?.url || '/placeholder.jpg',
          }] })
        }
        toast.success('Produit ajoute au panier !')
      },

      removeItem: (variantId) => {
        set({ items: get().items.filter((item) => item.variantId !== variantId) })
        toast.info('Produit retire du panier')
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity < 1) { get().removeItem(variantId); return }
        set({ items: get().items.map((item) => item.variantId === variantId ? { ...item, quantity } : item) })
      },

      clearCart: () => { set({ items: [] }); toast.info('Panier vide') },
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: 'cogi-cart-storage' }
  )
)