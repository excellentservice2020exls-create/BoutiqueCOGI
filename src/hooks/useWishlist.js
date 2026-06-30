import { useWishlistStore } from '@store/wishlistStore'

export function useWishlist() {
  const store = useWishlistStore()
  return { items: store.items, totalItems: store.getTotalItems(), isInWishlist: store.isInWishlist, addItem: store.addItem, removeItem: store.removeItem, toggleItem: store.toggleItem, clearWishlist: store.clearWishlist }
}