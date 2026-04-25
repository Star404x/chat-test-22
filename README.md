# Минимальный проект

Простейшее Node.js приложение и инструкции по запуску локально и в Docker.

Особенности:
- Минимальный HTTP-сервер (порт по умолчанию 3000)
- Dockerfile для контейнеризации

Предварительные требования:
- Node.js 14+ / npm
- Docker (если хотите запускать в контейнере)

Локальный запуск:
1. Установите зависимости:

   npm install

2. Запустите приложение:

   npm start

3. Откройте в браузере или выполните curl:

   http://localhost:3000

Запуск в режиме разработки (среда DEVELOPMENT):

   npm run dev

Docker

Сборка образа:

   docker build -t minimal-project .

Запуск контейнера (порт 3000):

   docker run -p 3000:3000 minimal-project

Переопределение порта через переменную окружения:

   docker run -e PORT=4000 -p 4000:4000 minimal-project

Описание ответа:
GET / -> JSON { "message": "Minimal Project", "uptime": <seconds> }

Дальнейшие шаги:
- Добавить тесты и CI
- Развернуть простую маршрутизацию/health endpoint

