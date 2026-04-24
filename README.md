# dockertest

Краткий проект для тестирования контейнеризации и CI с Docker (Node.js).

Содержит минимальные инструкции для сборки, запуска и тестирования как локально, так и в контейнере.

Prerequisites
- Node.js >= 14
- npm или yarn
- Docker

Структура проекта (ожидается)
- package.json (скрипты: start, test)
- index.js или app.js (сервер)
- Dockerfile

Основные команды

1) Установка зависимостей (локально)

npm install
# или
# yarn

2) Локальный запуск приложения

npm start
# по умолчанию приложение доступно на http://localhost:3000 (если в коде используется PORT=3000)

3) Запуск тестов локально

npm test

Docker: сборка и запуск

1) Сборка Docker-образа

docker build -t dockertest:latest .

2) Запуск контейнера

# Проброс порта 3000 (пример)
docker run --rm -p 3000:3000 --name dockertest_app dockertest:latest

3) Запуск с переменными окружения

docker run --rm -p 3000:3000 -e PORT=4000 dockertest:latest

Запуск тестов внутри контейнера

# собрать образ, затем выполнить npm test внутри контейнера
docker build -t dockertest:latest .

docker run --rm dockertest:latest npm test

# или запустить одноразовый контейнер, монтируя код (полезно для локальной отладки)

docker run --rm -v "$PWD":/app -w /app node:14 npm test

Примеры команд (сокращённо)
- Установка: npm install
- Локальный запуск: npm start
- Тесты: npm test
- Сборка Docker: docker build -t dockertest:latest .
- Запуск Docker: docker run --rm -p 3000:3000 dockertest:latest
- Тесты в Docker: docker run --rm dockertest:latest npm test

Советы и отладка
- Проверьте, что в package.json есть скрипты "start" и "test".
- Если порт отличается, указывайте PORT при запуске: PORT=4000 npm start или -e PORT=4000 при docker run.
- Для CI полезно запускать: docker build ... && docker run --rm dockertest:latest npm test

Опционально: docker-compose

Если хотите добавить docker-compose.yml, можно использовать пример:

version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

CI/CD
- В CI настроить шаги: установка (или кеш npm), сборка Docker-образа, запуск тестов (в образе или в окружении CI).
- Примерный pipeline: checkout -> npm ci -> npm test -> docker build -> push

Контакты
- Этот README предназначен для быстрого старта. Дальше можно добавить подробности по конфигурации, тестам и образам.
