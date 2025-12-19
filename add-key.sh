#!/bin/bash

echo "═══════════════════════════════════════════════════════════"
echo "  Добавление Supabase ANON KEY в .env.local"
echo "═══════════════════════════════════════════════════════════"
echo ""

if [ -z "$1" ]; then
    echo "Использование: ./add-key.sh <ваш-anon-key>"
    echo ""
    echo "Пример:"
    echo "./add-key.sh eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    echo ""
    echo "Или введите ключ сейчас:"
    read -p "Введите ANON KEY: " KEY
else
    KEY=$1
fi

if [ -z "$KEY" ]; then
    echo "❌ Ключ не указан!"
    exit 1
fi

# Обновляем .env.local
if [ -f .env.local ]; then
    # Удаляем старую строку с VITE_SUPABASE_ANON_KEY если есть
    sed -i.bak '/^VITE_SUPABASE_ANON_KEY=/d' .env.local
fi

# Добавляем новый ключ
echo "VITE_SUPABASE_ANON_KEY=$KEY" >> .env.local

echo "✅ Ключ добавлен в .env.local!"
echo ""
echo "Теперь перезапустите сервер:"
echo "  npm run dev"
echo ""


