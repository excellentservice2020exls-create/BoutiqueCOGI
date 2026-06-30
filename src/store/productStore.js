import { create } from 'zustand'
import { supabase } from '../lib/supabase/supabaseClient'

export const useProductStore = create((set, get) => ({
  products: [], categories: [], catalogs: [],
  featuredProducts: [], newArrivals: [], promotions: [],
  isLoading: false, error: null, selectedProduct: null,

  fetchProducts: async (filters = {}) => {
    set({ isLoading: true, error: null })
    try {
      let query = supabase.from('products').select(`*, variants:product_variants(*), images:product_images(*), categories(*), catalogs(*)`)
      if (filters.category) query = query.eq('categories.slug', filters.category)
      if (filters.catalog) query = query.eq('catalogs.slug', filters.catalog)
      if (filters.search) query = query.ilike('name', `%${filters.search}%`)
      const { data, error } = await query
      if (error) throw error
      set({ products: data || [] })
    } catch (error) { set({ error: error.message }) }
    finally { set({ isLoading: false }) }
  },

  fetchProductBySlug: async (slug) => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase.from('products').select(`*, variants:product_variants(*), images:product_images(*), categories(*), catalogs(*)`).eq('slug', slug).single()
      if (error) throw error
      set({ selectedProduct: data })
      return data
    } catch (error) { set({ error: error.message }); return null }
    finally { set({ isLoading: false }) }
  },

  fetchCategories: async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*').eq('isActive', true).order('sortOrder')
      if (error) throw error
      set({ categories: data || [] })
    } catch (error) { set({ error: error.message }) }
  },

  fetchCatalogs: async () => {
    try {
      const { data, error } = await supabase.from('catalogs').select('*').eq('isActive', true).order('sortOrder')
      if (error) throw error
      set({ catalogs: data || [] })
    } catch (error) { set({ error: error.message }) }
  },

  fetchFeatured: async () => {
    try {
      const { data, error } = await supabase.from('products').select(`*, variants:product_variants(*), images:product_images(*)`).eq('isFeatured', true).eq('isActive', true).limit(8)
      if (error) throw error
      set({ featuredProducts: data || [] })
    } catch (error) { console.error(error) }
  },

  fetchNewArrivals: async () => {
    try {
      const { data, error } = await supabase.from('products').select(`*, variants:product_variants(*), images:product_images(*)`).eq('isNew', true).eq('isActive', true).order('createdAt', { ascending: false }).limit(8)
      if (error) throw error
      set({ newArrivals: data || [] })
    } catch (error) { console.error(error) }
  },

  fetchPromotions: async () => {
    try {
      const { data, error } = await supabase.from('products').select(`*, variants:product_variants(*), images:product_images(*)`).eq('isOnSale', true).eq('isActive', true).limit(8)
      if (error) throw error
      set({ promotions: data || [] })
    } catch (error) { console.error(error) }
  },

  setSelectedProduct: (product) => set({ selectedProduct: product }),
}))