// js/auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://oaecaccsvnxhqhhbuiqm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWNhY2Nzdm54aHFoaGJ1aXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3NTAzNDEsImV4cCI6MjA3NDMyNjM0MX0.wD3ccet4TPdpzZQA1k78v82nTQMdTaPyIlWxkqV35zQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
