# simple-chat

Простой real-time чат на Node.js с использованием Socket.IO.

Требования
- Node.js >= 14
- npm или yarn

Установка
1. Клонируйте репозиторий:
   git clone <repo-url>
2. Перейдите в папку проекта:
   cd simple-chat
3. Установите зависимости:
   npm install
   или
   yarn

Запуск в режиме разработки
1. Запустите сервер:
   npm run start
   или
   node index.js
2. Откройте в браузере http://localhost:3000 (или порт, указанный в переменной окружения PORT)
3. Откройте второе окно/вкладку и подключитесь, чтобы проверить обмен сообщениями в реальном времени.

Пример npm-скриптов (если не настроены):
- start: node index.js
- dev: nodemon index.js

Развёртывание
Вариант 1 — PM2 (простая prod-опция):
1. Установите pm2 глобально: npm i -g pm2
2. Запустите: pm2 start index.js --name simple-chat
3. Просмотр логов: pm2 logs simple-chat

Вариант 2 — Docker (рекомендуется для контейнеризации):
1. Создайте Dockerfile (пример):
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3000
   CMD ["node", "index.js"]
2. Соберите образ: docker build -t simple-chat:latest .
3. Запустите контейнер: docker run -p 3000:3000 --env PORT=3000 simple-chat:latest

Переменные окружения
- PORT — порт, на котором слушает сервер (по умолчанию 3000)
- NODE_ENV — окружение (development/production)

Мониторинг и логирование
- Для production рекомендуется использовать PM2, Docker + лог-агрегатор или систему, совместимую с вашим хостинг-провайдером.

Примечания
- Убедитесь, что WebSocket/Socket.IO порты и прокси (nginx) сконфигурированы для проксирования WebSocket.
