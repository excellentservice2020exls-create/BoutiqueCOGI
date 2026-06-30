/**
 * API Routes pour les produits
 */
import { supabase } from '../lib/supabase/supabaseClient'

export async function getProducts(filters = {}) {
  let query = supabase
    .from('products')
    .select(`*, variants:product_variants(*), images:product_images(*), categories(*), catalogs(*)`)
    .eq('isActive', true)

  if (filters.category) {
    query = query.eq('categories.slug', filters.category)
  }
  if (filters.catalog) {
    query = query.eq('catalogs.slug', filters.catalog)
  }
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select(`*, variants:product_variants(*), images:product_images(*), categories(*), catalogs(*)`)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('isActive', true)
    .order('sortOrder')

  if (error) throw error
  return data
}

export async function getCatalogs() {
  const { data, error } = await supabase
    .from('catalogs')
    .select('*')
    .eq('isActive', true)
    .order('sortOrder')

  if (error) throw error
  return data
}