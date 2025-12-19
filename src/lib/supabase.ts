import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lehihjdhzndarctkqkjq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDU1NjAsImV4cCI6MjA4MTIyMTU2MH0.PHhoU-1RTo3_TAUKjSem9B3hK13EaDAy2a67uPc1yyg'

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Переменная окружения VITE_SUPABASE_ANON_KEY не найдена. Используется ключ по умолчанию.')
  console.warn('Для продакшена добавь переменные окружения в Vercel:')
  console.warn('- VITE_SUPABASE_URL')
  console.warn('- VITE_SUPABASE_ANON_KEY')
}

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn('⚠️ Переменная окружения VITE_SUPABASE_URL не найдена. Используется URL по умолчанию.')
}

console.log('🔗 Подключение к Supabase:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey && supabaseAnonKey.length > 50
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

