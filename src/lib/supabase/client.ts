
import { createClient } from '@supabase/supabase-js'
import { Tables } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Tables>(supabaseUrl, supabaseAnonKey)
