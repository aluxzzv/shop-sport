#!/bin/bash

echo "🚀 Загрузка проекта на GitHub..."
echo ""

# Проверка наличия git
if ! command -v git &> /dev/null; then
    echo "❌ Git не установлен. Установите Git: https://git-scm.com/"
    exit 1
fi

# Переход в директорию проекта
cd "$(dirname "$0")"

# Проверка, что мы в git репозитории
if [ ! -d .git ]; then
    echo "📦 Инициализация git репозитория..."
    git init
fi

# Добавление remote (если еще не добавлен)
if ! git remote | grep -q origin; then
    echo "🔗 Добавление remote репозитория..."
    git remote add origin https://github.com/aluxzzv/shop-sport.git
else
    echo "✅ Remote уже настроен"
fi

# Добавление всех файлов
echo "📝 Добавление файлов..."
git add .

# Коммит
echo "💾 Создание коммита..."
git commit -m "Initial commit: Sports shop app ready for Vercel deployment" || echo "⚠️  Нет изменений для коммита"

# Переключение на main ветку
git branch -M main

# Push на GitHub
echo "📤 Загрузка на GitHub..."
echo "⚠️  Вам будет предложено ввести логин и пароль GitHub"
echo "   Или используйте Personal Access Token вместо пароля"
echo ""
git push -u origin main

echo ""
echo "✅ Готово! Проект загружен на GitHub"
echo "🌐 Репозиторий: https://github.com/aluxzzv/shop-sport"

