#!/bin/bash

echo "🚀 Подготовка к деплою на Vercel..."
echo ""

# Проверка наличия Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Установка Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI готов"
echo ""
echo "🔐 Войдите в Vercel (откроется браузер)..."
vercel login

echo ""
echo "📤 Деплой проекта..."
vercel --prod

echo ""
echo "✅ Деплой завершен!"
echo "🌐 Ваше приложение доступно по ссылке выше"

