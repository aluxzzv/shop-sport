# 🚀 Быстрый деплой на Vercel

## Способ 1: Через веб-интерфейс (Рекомендуется)

1. **Откройте https://vercel.com**
2. **Войдите или зарегистрируйтесь**
3. **Нажмите "Add New..." → "Project"**
4. **Выберите "Upload" или перетащите папку проекта**
5. **Настройте переменные окружения:**
   - `VITE_SUPABASE_URL` = `https://lehihjdhzndarctkqkjq.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaGloamRoem5kYXJjdGtxa2pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDU1NjAsImV4cCI6MjA4MTIyMTU2MH0.PHhoU-1RTo3_TAUKjSem9B3hK13EaDAy2a67uPc1yyg`
6. **Нажмите "Deploy"**

## Способ 2: Через CLI (если npm работает)

```bash
./deploy.sh
```

Или вручную:

```bash
npm install -g vercel
vercel login
vercel --prod
```

## ✅ Проект готов к деплою!

Все настройки уже в `vercel.json`:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

