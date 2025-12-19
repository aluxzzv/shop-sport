import { createClient } from '@supabase/supabase-js'

// Получаем переменные окружения
const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Используем значения по умолчанию, если переменные не заданы
const supabaseUrl = envUrl && envUrl.trim() !== '' 
  ? envUrl.trim() 
  : 'https://lehihjdhzndarctkqkjq.supabase.co'

const supabaseAnonKey = envKey && envKey.trim() !== ''
  ? envKey.trim()
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDU1NjAsImV4cCI6MjA4MTIyMTU2MH0.PHhoU-1RTo3_TAUKjSem9B3hK13EaDAy2a67uPc1yyg'

// Валидация URL
if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  console.error('❌ Неверный формат URL Supabase:', supabaseUrl)
  throw new Error(`Invalid supabaseUrl: "${supabaseUrl}". Must be a valid HTTP or HTTPS URL.`)
}

// Логирование для отладки
console.log('🔗 Подключение к Supabase:', {
  url: supabaseUrl,
  urlFromEnv: !!envUrl,
  keyFromEnv: !!envKey,
  hasKey: !!supabaseAnonKey && supabaseAnonKey.length > 50
})

if (!envUrl) {
  console.warn('⚠️ Переменная окружения VITE_SUPABASE_URL не найдена. Используется URL по умолчанию.')
}

if (!envKey) {
  console.warn('⚠️ Переменная окружения VITE_SUPABASE_ANON_KEY не найдена. Используется ключ по умолчанию.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

