import { createClient } from '@supabase/supabase-js'

const runtimeEnv = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}
const supabaseUrl = (runtimeEnv.VITE_SUPABASE_URL || '').trim()
const supabaseKey = (runtimeEnv.VITE_SUPABASE_ANON_KEY || runtimeEnv.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim()
const configErrorMessage = 'Supabase n\'est pas configuré. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY (ou VITE_SUPABASE_PUBLISHABLE_KEY) dans votre fichier .env.'

export const isPlaceholderUrl = (url) => {
  if (!url) return true
  const lower = url.toLowerCase()
  return (
    lower.includes('votre-projet') ||
    lower.includes('your-project') ||
    lower.includes('example') ||
    (lower.includes('supabase.co') && /your|example|votre/.test(lower))
  )
}

export const createFallbackSupabaseClient = () => ({
  auth: {
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: configErrorMessage } }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: configErrorMessage } }),
    signOut: async () => ({ error: null }),
    updateUser: async () => ({ data: { user: null }, error: { message: configErrorMessage } }),
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        ilike: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        single: () => ({ data: null, error: { message: configErrorMessage } }),
      }),
      ilike: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
      limit: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: { message: configErrorMessage } }),
    }),
  }),
})

const isSupabaseKeyPlaceholder = (value) => {
  if (!value) return true
  const lower = value.toLowerCase()
  return lower.includes('votre') || lower.includes('your') || lower.includes('example')
}

const hasValidSupabaseConfig = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !isPlaceholderUrl(supabaseUrl) &&
  !isSupabaseKeyPlaceholder(supabaseKey)
)

let supabase = null

if (hasValidSupabaseConfig) {
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
    supabase = createFallbackSupabaseClient()
  }
} else {
  console.warn(
    'Supabase environment variables are missing or still using placeholders. The app is running in safe fallback mode.'
  )
  supabase = createFallbackSupabaseClient()
}

export const isSupabaseConfigured = hasValidSupabaseConfig
export { supabase }
export default supabase