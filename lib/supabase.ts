import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lehihjdhzndarctkqkjq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.example'

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase ANON KEY не настроен. Установите переменную окружения NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.warn('Получите ключ в настройках проекта Supabase: Settings > API > anon public key')
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey || 'dummy-key-for-initialization'
)

