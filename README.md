simple-chat

Простой real-time чат на Node.js с использованием Socket.IO.

Prerequisites
- Node.js >= 14
- npm

Запуск локально
1. Установите зависимости:
   npm install

2. Запустите сервер:
   - Если в package.json прописан скрипт start:
       npm start
   - Иначе (по умолчанию):
       node server.js
   - В режиме разработки (если установлен nodemon):
       npx nodemon server.js

3. Откройте клиентскую часть в браузере (если клиент статичен, откройте index.html в корне или используйте сервер, который раздаёт статические файлы).

Ручная проверка (quick checklist)
- Убедитесь, что сервер запускается без ошибок.
- Откройте два окна/вкладки браузера и подключитесь к серверу.
- Отправьте сообщение из одного окна — оно должно появиться в другом практически мгновенно.
- Проверьте подключение/отключение пользователей и корректность ошибок в логах.
- При необходимости проверьте работу при открытых нескольких соединениях и при отправке больших сообщений.

Deployment (примерные шаги)
- Heroku:
  1) Создайте Procfile в корне проекта: web: node server.js
  2) heroku create
  3) git push heroku main
  4) heroku config:set NODE_ENV=production

- PM2 (на собственном сервере):
  npm install -g pm2
  pm2 start server.js --name simple-chat
  pm2 save

- Railway / Render / Vercel: следуйте их документации, укажите команду старта node server.js или npm start.

Git / подготовка коммитов в dev и auto
- Вручную:
  git checkout -b dev
  git add -A
  git commit -m "chore(dev): manual check and docs"
  git push origin dev

  git checkout -b auto
  git add -A
  git commit -m "chore(auto): manual check and docs"
  git push origin auto

- С использованием helper-скрипта (node):
  node scripts/prepare_commits.js "chore(dev): message" "chore(auto): message"
  опция --push добавит пуш в origin: node scripts/prepare_commits.js "msg1" "msg2" --push

Примечания
- Скрипт prepare_commits.js не выполняет автоматическое мерджение — он переключается на ветки dev и auto, делает коммит при изменениях и (опционально) пушит.
- Убедитесь, что у вас есть доступ к репозиторию и правильно настроены удалённые origin.
