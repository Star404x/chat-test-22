# dockertest

Краткое описание

Минимальный проект для тестирования контейнеризации и CI с Docker.

Prerequisites

- Node.js >= 14
- npm
- Docker

Local development

Установить зависимости:

bash
npm install


Запустить приложение локально:

bash
npm start
# или
node index.js


Запустить тесты локально:

bash
npm test


Docker

Собрать образ:

bash
docker build -t dockertest:latest .


Запустить контейнер (проброс порта 3000):

bash
docker run --rm -p 3000:3000 dockertest:latest


Запуск с переменными окружения:

bash
docker run --rm -p 3000:3000 -e NODE_ENV=production -e PORT=3000 dockertest:latest


Запустить тесты внутри контейнера:

bash
docker run --rm dockertest:latest npm test


Bind-mount для разработки внутри контейнера (использует официальный образ Node):

bash
docker run --rm -it -p 3000:3000 -v $(pwd):/usr/src/app -w /usr/src/app node:18 sh -c "npm install && npm start"


Docker Compose (пример)

yaml
version: '3.8'
services:
  app:
    image: dockertest:latest
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production


CI (GitHub Actions) — пример workflow

yaml
name: CI
on: [push, pull_request]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install deps
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build Docker image
        run: docker build -t ${{ github.repository }}:${{ github.sha }} .


Troubleshooting

- Если порт уже занят, измените проброс хоста в команде docker run.
- Просмотр логов контейнера: `docker logs <container_id>`

Примечания

- Предполагается, что в проекте есть package.json с командами `start` и `test`, а также Dockerfile в корне репозитория.

