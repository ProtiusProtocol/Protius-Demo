// js/auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
