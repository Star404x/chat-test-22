# dockertest

Минимальный проект для тестирования контейнеризации и CI с Docker (Node.js).

## Обзор

Простой Node.js-приложение, которое можно запускать локально или в контейнере. README содержит команды для сборки, запуска и тестирования, а также примеры работы с Docker и docker-compose.

## Предпосылки

- Node.js (v14+)
- npm
- Docker
- (опционально) docker-compose

## Быстрый старт (локально)

1. Установите зависимости:

$ npm install

2. Запуск приложения локально:

$ npm start

По умолчанию приложение слушает порт 3000 (если проект настроен иначе — см. package.json/app).

3. Запуск тестов локально:

$ npm test

(Ожидается, что в package.json определён скрипт "test".)

## Сборка Docker-образа

В корне репозитория должен быть Dockerfile. Для сборки образа выполните:

$ docker build -t dockertest:latest .

Примеры вариантов тега: dockertest:1.0.0, registry.example.com/yourorg/dockertest:latest

## Запуск контейнера

Запустить контейнер и пробросить порт 3000:

$ docker run --rm -p 3000:3000 --name dockertest_container dockertest:latest

Запуск в фоне (detach):

$ docker run -d -p 3000:3000 --name dockertest_container dockertest:latest

Посмотреть логи:

$ docker logs -f dockertest_container

Остановить и удалить контейнер:

$ docker stop dockertest_container

## Пример с environment-переменными

$ docker run --rm -p 3000:3000 -e NODE_ENV=production -e PORT=3000 dockertest:latest

## docker-compose (опционально)

Пример docker-compose.yml (если добавите файл):

version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

Запуск:

$ docker-compose up --build

Запуск в фоне:

$ docker-compose up -d --build

Остановить и удалить контейнеры:

$ docker-compose down

## Команды для отладки образов и контейнеров

- Список образов: $ docker images
- Список контейнеров: $ docker ps -a
- Подключиться в работающий контейнер (если в образе есть sh/bash):
  $ docker exec -it <container_id_or_name> sh

## Тестирование в CI

Рекомендуется настроить CI (например, GitHub Actions / GitLab CI) для автоматической сборки Docker-образа и запуска тестов. Базовый pipeline должен:

1. Установить зависимости и запустить npm test
2. Собрать Docker-образ
3. (Опционально) Протестировать образ (запустить в контейнере и выполнить интеграционные проверки)
4. Запушить образ в реестра (если тесты пройдены)

## Полезные команды

- Сборка: $ docker build -t dockertest:latest .
- Запуск: $ docker run --rm -p 3000:3000 dockertest:latest
- Логи: $ docker logs -f <container>
- Тесты: $ npm test
- Установка: $ npm install

## Примечания

- Если ваш проект использует другой порт или дополнительные переменные окружения, адаптируйте команды соответствующим образом.
- Следующий шаг: добавить конфигурацию CI (например, .github/workflows/ci.yml) для автоматизации сборки и тестирования.
