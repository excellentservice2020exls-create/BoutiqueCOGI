import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

const isPlaceholderUrl = (url) => {
  if (!url) return true
  const lower = url.toLowerCase()
  return lower.includes('votre-projet') || lower.includes('your-project') || lower.includes('example') || lower.includes('supabase.co') && lower.match(/your|example|votre/)
}

if (!supabaseUrl || !supabaseKey || isPlaceholderUrl(supabaseUrl) || supabaseKey.toLowerCase().includes('votre') || supabaseKey.toLowerCase().includes('your')) {
  console.error(
    'Supabase environment variables appear to be placeholder or missing.\nSet VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your project values in .env and restart the dev server.'
  )
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
  }
}

export { supabase }
export default supabase