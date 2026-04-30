import { createClient } from '@supabase/supabase-js'

/**
 * CONFIGURE in .env (never commit real keys):
 * VITE_SUPABASE_URL=https://xxxx.supabase.co
 * VITE_SUPABASE_ANON_KEY=eyJ...
 */
const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const supabaseConfigured = Boolean(url && anonKey)

export const supabase = supabaseConfigured
  ? createClient(url, anonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key')
