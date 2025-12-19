import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lehihjdhzndarctkqkjq.supabase.co'

// Пробуем получить ключ из окружения или используем стандартный формат
// Для получения реального ключа: Settings > API > anon public key в Supabase Dashboard
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Если ключ не указан, попробуем использовать базовый формат (может не работать без реального ключа)
if (!supabaseAnonKey) {
  console.warn('⚠️ Supabase ANON KEY не настроен. Установите переменную окружения VITE_SUPABASE_ANON_KEY')
  console.warn('Получите ключ в настройках проекта Supabase: Settings > API > anon public key')
  console.warn('Ссылка: https://supabase.com/dashboard/project/lehihjdhzndarctkqkjq/settings/api')
  // Временный заглушка, приложение будет работать только с реальным ключом
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NjE2MDAsImV4cCI6MjAxNzUzNzYwMH0.INVALID_KEY_PLEASE_REPLACE'
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

