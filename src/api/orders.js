/**
 * API Routes pour les commandes
 */
import { supabase } from '../lib/supabase/supabaseClient'

export async function createOrder(orderData) {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })

  if (error) throw error
  return data
}