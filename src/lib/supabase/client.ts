
import { createClient } from '@supabase/supabase-js'
import { Tables } from './types'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly set
const isConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://placeholder-url.supabase.co' && 
  supabaseAnonKey !== 'placeholder-key'

if (!isConfigured) {
  console.warn('Supabase not configured. Please set up your Supabase integration.')
}

// Create Supabase client
export const supabase = createClient<Tables>(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export const isSupabaseConfigured = isConfigured
