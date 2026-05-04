Leather — мини-сайт для демонстрации и продажи кожаных изделий.

Что сделано на этом шаге
- Добавлены кроссбраузерные e2e тесты с Playwright (Chromium, Firefox, WebKit).
- Добавлен CI workflow, который запускает линт/сборку/e2e тесты и Lighthouse CI.
- Описаны шаги по локальному запуску тестов, оптимизации и деплою.

Требования
- Node.js 16+ (рекомендуется 18)
- В проекте уже должен быть скрипт npm run start (локальный сервер) и npm run build.

Локальное тестирование (E2E)
1) Установите зависимости:
   npm ci

2) Установите зависимости Playwright (браузеры):
   npx playwright install --with-deps

3) Запустите e2e тесты (конфиг находится в tests/playwright.config.js):
   npx playwright test --config=tests/playwright.config.js

Примеры полезных скриптов (добавьте в package.json, если нужно):
{
  "scripts": {
    "test:e2e": "npx playwright test --config=tests/playwright.config.js",
    "test:e2e:headed": "npx playwright test --config=tests/playwright.config.js --headed",
    "playwright:install": "npx playwright install --with-deps",
    "optimize": "npm run build && node scripts/optimize.js"
  }
}

Оптимизация и производительность
- Минифицируйте JS/CSS при сборке (обычно handled by bundler).
- Включите gzip/Brotli на сервере/провайдере хостинга.
- Настройте длительное кэширование для статических ресурсов и fingerprinting (hash в именах файлов).
- Используйте Lighthouse (LHCI) в CI для мониторинга производительности и доступности.

CI/CD (GitHub Actions)
- Workflow .github/workflows/ci.yml запускает: npm ci, lint (если есть), npm run build (если есть), playwright tests и LHCI.
- В CI рекомендуется установить секреты/переменные окружения для production deploy (например, NETLIFY_AUTH_TOKEN, VERCEL_TOKEN или SSH keys).

Lighthouse CI
- В CI workflow запускается lhci autorun и публикует временный публичный отчет. Для постоянного хранения настройте сервер LHCI или интеграцию с внешними сервисами.
- Быстрый запуск локально:
   npx @lhci/cli autorun --upload.target=temporary-public-storage

Дальнейшие рекомендации
- Прогонять тесты в PR: настроить ветки protection и требовать прохождения CI.
- Автоматически деплоить main -> production и develop -> staging.
- Улучшать охват тестами: добавить проверки корзины, процесса заказа, платежных шагов (с моками).

Полезные команды
- npm ci
- npm run build
- npm run start
- npx playwright test --config=tests/playwright.config.js
- npx @lhci/cli autorun --upload.target=temporary-public-storage

Контакты
- Если CI уже настроен ранее, проверьте, чтобы в workflow были шаги сборки, тестов и perf-анализа. Если понадобится — можно расширить workflow добавлением деплоя в конце.
