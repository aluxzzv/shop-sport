#!/usr/bin/env node

/**
 * Скрипт для автоматического деплоя на Vercel
 * Использование: node vercel-deploy.js
 */

import { execSync } from 'child_process';

console.log('🚀 Подготовка к деплою на Vercel...\n');

// Проверка наличия Vercel CLI
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Установка Vercel CLI через npm
function installVercelCLI() {
  console.log('📦 Установка Vercel CLI...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI установлен\n');
    return true;
  } catch (e) {
    console.error('❌ Ошибка при установке Vercel CLI');
    console.error('Попробуйте установить вручную: npm install -g vercel\n');
    return false;
  }
}

// Деплой через Vercel CLI
function deploy() {
  console.log('📤 Запуск деплоя...\n');
  try {
    execSync('vercel --prod --yes', { stdio: 'inherit', cwd: __dirname });
    console.log('\n✅ Деплой завершен успешно!');
  } catch (e) {
    console.error('\n❌ Ошибка при деплое');
    console.error('Убедитесь, что вы авторизованы: vercel login');
    process.exit(1);
  }
}

// Основная функция
async function main() {
  if (!checkVercelCLI()) {
    console.log('Vercel CLI не найден.');
    if (!installVercelCLI()) {
      console.log('\n📋 Альтернативный способ:');
      console.log('1. Установите Vercel CLI: npm install -g vercel');
      console.log('2. Войдите: vercel login');
      console.log('3. Запустите деплой: vercel --prod\n');
      process.exit(1);
    }
  }

  console.log('🔐 Проверка авторизации...');
  try {
    execSync('vercel whoami', { stdio: 'ignore' });
    console.log('✅ Авторизация подтверждена\n');
  } catch (e) {
    console.log('⚠️  Требуется авторизация');
    console.log('Запустите: vercel login\n');
    process.exit(1);
  }

  deploy();
}

main();

