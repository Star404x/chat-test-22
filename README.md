Mini Shoes Site — Тестирование, оптимизация и развёртывание

Кратко
Проект — мини-сайт для демонстрации и продажи обуви (Node.js + Express). Этот документ дополняет ранее созданный README и даёт пошаговые инструкции по: запуску тестов, базовой оптимизации и развёртыванию на Vercel / Netlify. Также добавлена CI-конфигурация для автоматического прогона тестов.

1) Тестирование
- Убедитесь, что зависимости установлены:
  npm ci

- Запуск тестов (Jest + Supertest):
  npm test

- Локальное покрытие/отчёты (если настроено):
  npm run test:coverage

Если тесты падают — проверьте логи и запустите отдельные тесты через jest <file>

2) Минимальная оптимизация
- Сжатие ответов: в проект уже подключён compression middleware — это уменьшает трафик для статических/динамических ответов.

- HTTP заголовки безопасности: рекомендуется подключить helmet для базовых заголовков
  npm install helmet --save
  затем app.use(require('helmet')())

- Статические ассеты: отдавайте через CDN или используйте заголовки cache-control. Для статических файлов в Express:
  app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }))

- Минификация и бандлинг фронтенда: если у вас есть сборка фронтенда, используйте инструмент (esbuild/webpack/rollup) и публикуйте готовые файлы в папку public или dist.

- Анализ: можно добавить npm script для анализа бандла (если есть фронтенд-бандл): пример с webpack-bundle-analyzer.

3) CI (GitHub Actions)
Файл .github/workflows/ci.yml добавлён в проект и запускается на push/pull_request. Он выполняет:
- npm ci
- npm test
- npm run build (если есть)

Это даёт автоматическую проверку перед слиянием/деплоем.

4) Развёртывание на Vercel
Варианты:
  a) Простая рекомендация (Git интеграция): подключите репозиторий к Vercel — Vercel будет автоматически запускать сборку и деплой.
  b) Если ваш сервер — обычный Express, потребуется адаптация к serverless (рекомендуется) или использовать платформу, которая запускает постоянный Node-процесс.

Пример: перевод серверного кода на serverless-wrapper (рекомендуется для Vercel/Netlify Functions)
- Установите serverless-http:
  npm install serverless-http --save

- Создайте файл api/index.js (или functions/server.js для Netlify) с обёрткой:
  const serverless = require('serverless-http');
  const app = require('../src/app'); // файл, который экспортирует express app, без app.listen
  module.exports = serverless(app);

Важно: выделите создание express-app и запуск сервера в разные файлы:
- src/app.js — создаёт и экспортирует express app
- src/server.js — импортирует app и запускает app.listen для локальной разработки

Пример структуры:
- src/app.js  (module.exports = app)
- src/server.js (const app = require('./app'); app.listen(PORT,...))

Vercel config (в проекте): vercel.json. Vercel будет использовать @vercel/node для сборки serverless-функции.

Развёртывание через Vercel CLI:
  npm i -g vercel
  vercel login
  vercel --prod

Если используете Git-интеграцию — просто подключите репозиторий и укажите root как папку с проектом.

5) Развёртывание на Netlify
Netlify поддерживает функции (Netlify Functions). Подготовьте функции в папке netlify/functions, например netlify/functions/server.js — обёртка serverless-http, как указано выше.
netlify.toml (в репозитории) настроен на использование функций и выполняет редиректы /api/* → /.netlify/functions/server

Развёртывание:
  - Через Netlify UI: подключите репозиторий, укажите команду сборки (npm run build) и папку публикации (public или dist).
  - Через Netlify CLI для локальной проверки функций:
    npm i -g netlify-cli
    netlify dev

6) Примеры команд (резюме)
- Установить deps: npm ci
- Локальная разработка: npm run dev (если есть) или node src/server.js
- Тесты: npm test
- Сборка: npm run build
- Запуск в проде (локально): npm start
- Деплой на Vercel: vercel --prod
- Деплой на Netlify: netlify deploy --prod (или через UI)

7) Перечень файлов, добавленных в этом шаге
- .github/workflows/ci.yml — CI для прогонки тестов и сборки
- vercel.json — рекомендации для деплоя на Vercel (builds/routes)
- netlify.toml — базовая конфигурация для Netlify (functions и redirects)
- README.md — этот файл (обновлён с инструкциями)

8) Отладка и советы
- Если endpoint /api/health работает локально, проверьте, что при переводе в serverless-обёртку приложение не пытается слушать порт (уберите app.listen из app.js).
- Логи: в serverless-функциях используйте console.log — провайдер покажет логи в UI.

Если вы хотите, могу:
- помочь создать пример api/index.js (serverless-wrapper) и переработать src/index.js на src/app.js + src/server.js,
- добавить ESLint/Prettier и npm scripts для автоматического исправления/форматирования.
