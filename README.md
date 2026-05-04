# Mini Photo Site — Backend

This repository contains a minimal Node.js/Express backend skeleton for the Mini Photo Site. It is intended to be run locally for development and deployed to Heroku for production.

## Requirements

- Node.js (>=14)
- npm
- (Optional) Heroku CLI for deployment

## Environment variables

Recommended env variables (set locally in a .env file or in Heroku config vars):

- PORT — port for the server (defaults to 3000)
- MONGO_URI — connection string for MongoDB (if you add DB integration)
- STORAGE_DIR — local path for storing uploads (or configure S3/AWS creds if using remote storage)
- AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET — if using S3


## Run locally

1. Install dependencies:

   npm install

2. Start the server:

   npm start

   For development with auto-restart (requires nodemon):

   npm run start:dev

3. Open http://localhost:3000/ and check health endpoint: http://localhost:3000/health

> Note: The `public/` directory (if present) is served as static files. Place frontend build there for simple integration.

## Deploy to Heroku

This backend is ready for deployment to Heroku. Steps:

1. Install and login to the Heroku CLI:

   https://devcenter.heroku.com/articles/heroku-cli

   heroku login

2. Create a Heroku app (or use an existing one):

   heroku create your-app-name

3. Set required config vars (example):

   heroku config:set MONGO_URI="<your_mongo_uri>" STORAGE_DIR="/tmp/uploads"

4. Push to Heroku (assuming your main branch is `main`):

   git push heroku main

   If your default branch is `master`, use `git push heroku master`.

5. Open the app:

   heroku open

6. (Optional) Scale web dyno if needed:

   heroku ps:scale web=1

Notes:
- Heroku will use the `start` script from package.json to run the server.
- For persistent file storage consider using AWS S3 or another external storage — Heroku filesystem is ephemeral.

## About frontend deployment

The frontend is typically deployed separately (Netlify, GitHub Pages, etc.). This backend README focuses on running/deploying the server. If you deploy the frontend to Netlify/GitHub Pages, configure the frontend to call the backend API (set the API base URL appropriately).

## Next steps

- Implement photo upload endpoint and storage (local or S3).
- Add authentication (optional) and DB integration (MongoDB recommended).
- Add integration tests and CI/CD pipeline (Heroku GitHub integration or GitHub Actions).
