import { useCartStore } from '@store/cartStore'

export function useCart() {
  const store = useCartStore()
  return { items: store.items, totalItems: store.getTotalItems(), totalPrice: store.getTotalPrice(), itemCount: store.getItemCount(), isLoading: store.isLoading, addItem: store.addItem, removeItem: store.removeItem, updateQuantity: store.updateQuantity, clearCart: store.clearCart }
}