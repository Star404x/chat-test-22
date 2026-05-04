# mini site portfolio2

Краткое описание

Небольшой адаптивный персональный портфолио-сайт (статический), готовый для деплоя на GitHub Pages или Netlify.

Установка и локальная отладка

1. Клонируйте репозиторий и перейдите в папку проекта:

   git clone <repo-url>
   cd <repo-folder>

2. Установите зависимости:

   npm install

3. Запустить локальный сервер разработки (live-server):

   npm start

   Откроется http://localhost:3000/index.html

Структура

- src/ - статические файлы сайта (index.html, index.js и т.д.)
- package.json - npm-скрипты для локального старта и деплоя

Деплой на GitHub Pages

1. В package.json замените поле "homepage" на реальный URL вашего GitHub Pages (например: https://your-username.github.io/your-repo).

2. Убедитесь, что репозиторий закоммичен и запушен в GitHub.

3. Установите зависимости (если ещё не сделали):

   npm install

4. Выполните деплой в ветку gh-pages:

   npm run deploy:gh

Это воспользуется пакетом gh-pages и опубликует содержимое папки src на ветке gh-pages.

После успешного выполнения откройте https://<your-username>.github.io/<your-repo>

Деплой на Netlify

Вариант A — быстрый (Drag & Drop):
- Заархивируйте содержимое папки src или просто перетащите папку src в Netlify Drop (https://app.netlify.com/drop).

Вариант B — через Netlify CLI (подходит для программного деплоя):

1. Установите netlify-cli глобально или используйте npx:

   npm install -g netlify-cli
   # или
   npx netlify-cli login

2. Авторизуйтесь:

   netlify login

3. Выполните команду деплоя (папка src будет опубликована):

   npm run deploy:netlify

Для CI/CD (рекомендуется):
- Подключите репозиторий к Netlify через UI (New site from Git). В настройках укажите: Build command — (оставить пустым), Publish directory — src.

Советы и примечания

- Если вы используете GitHub Pages и хотите, чтобы корень сайта был корректным, обязательно установите поле "homepage" в package.json.
- В gh-pages публикация создаёт ветку gh-pages и пушит в неё статические файлы.
- Для приватных репозиториев GitHub Pages и некоторых настроек может потребоваться включить Pages в настройках репозитория.

Если нужно, могу добавить CI-скрипт (GitHub Actions) для автодеплоя в gh-pages или файл netlify.toml для тонкой настройки Netlify.
