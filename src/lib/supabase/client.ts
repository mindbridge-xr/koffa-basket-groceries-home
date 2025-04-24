
import { createClient } from '@supabase/supabase-js'
import { Tables } from './types'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Add fallback error handling
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.')
}

// Create Supabase client with proper error handling
export const supabase = createClient<Tables>(
  supabaseUrl || 'https://placeholder-url.supabase.co',  // Fallback value to prevent runtime error
  supabaseAnonKey || 'placeholder-key'                   // Fallback value to prevent runtime error
)
