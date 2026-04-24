# dockertest

Минимальный проект для тестирования контейнеризации и CI с Docker.

## Описание

Простое Node.js-приложение. Этот репозиторий содержит инструкции по локальной разработке, сборке Docker-образа, запуску контейнера и тестированию.

## Требования

- Node.js >= 14
- npm
- Docker
- (опционально) docker-compose

## Установка и локальный запуск

1. Установите зависимости:


npm install


2. Запустите приложение локально:


npm start


По умолчанию приложение слушает порт 3000 (http://localhost:3000).

## Тестирование

Запуск тестов локально:


npm test


Если в проекте используются дополнительные тестовые утилиты, убедитесь, что они прописаны в package.json.

## Docker — сборка и запуск

1. Сборка образа:


docker build -t dockertest:latest .


2. Запуск контейнера (порт 3000):


docker run --rm -p 3000:3000 --name dockertest_local dockertest:latest


Флаг `--rm` удалит контейнер после остановки. Для фонового режима добавьте `-d`.

3. Пример с переменными окружения:


docker run --rm -p 3000:3000 -e NODE_ENV=production -e PORT=3000 dockertest:latest


4. Просмотр логов запущенного контейнера:


docker logs -f dockertest_local


5. Остановка контейнера:


docker stop dockertest_local


## Тестирование в контейнере

Можно запустить тесты внутри контейнера (если образ содержит dev-зависимости или multistage поддерживает тесты):


docker run --rm dockertest:latest npm test


Если в образе нет dev-зависимостей, можно собрать отдельный образ для тестов или монтировать код и запускать `npm test` в контейнере с образом node:


docker run --rm -v "$(pwd)":/app -w /app node:16 npm install && npm test


## Docker Compose

Пример docker-compose-команды для быстрого запуска (если в проекте есть docker-compose.yml):


docker-compose up --build


Остановка и удаление ресурсов:


docker-compose down


## CI (пример для GitHub Actions)

Ниже — минимальный пример workflow для запуска сборки и тестов в CI. Создайте файл `.github/workflows/ci.yml` и используйте:


name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build Docker image
        run: docker build -t myorg/dockertest:${{ github.sha }} .
      # опционально: push to registry (требует настроенных secrets)
      # - name: Login to DockerHub
      #   run: echo ${{ secrets.DOCKERHUB_PASSWORD }} | docker login -u ${{ secrets.DOCKERHUB_USERNAME }} --password-stdin
      # - name: Push image
      #   run: docker push myorg/dockertest:${{ github.sha }}


Этот пример выполняет установку зависимостей, тесты и сборку образа. Для публикации образа добавьте шаги логина и push.

## Полезные команды

- Просмотр образов:


docker images


- Удаление образа:


docker rmi <image-id-or-name>


- Удаление остановленных контейнеров:


docker container prune


## Рекомендации

- Используйте multistage Dockerfile для уменьшения размера финального образа.
- В CI выполняйте `npm ci` вместо `npm install` для воспроизводимости.
- Настройте workflow для сборки и пуша образов в приватный/публичный реестр при успешной сборке на main.

## Контакты

Если что-то не работает — откройте issue с описанием шага воспроизведения и логами.
