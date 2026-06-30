import { useEffect } from 'react'
import { useProductStore } from '@store/productStore'

export function useProducts(filters = {}) {
  const store = useProductStore()
  useEffect(() => { store.fetchProducts(filters) }, [filters.category, filters.catalog, filters.search, filters.status])
  return { products: store.products, isLoading: store.isLoading, error: store.error, categories: store.categories, catalogs: store.catalogs, fetchCategories: store.fetchCategories, fetchCatalogs: store.fetchCatalogs }
}