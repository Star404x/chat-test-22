# exp-api-test-2

Minimal Express API with example requests and deployment notes.

## What is included

- Minimal Express app (src/index.js)
- Example endpoints: `/`, `/health`, `/items` (GET, POST)
- Dockerfile for containerized deployment
- package.json with basic scripts

## Quick start (local)

1. Install dependencies:

   npm install

2. Run locally:

   npm start

By default the server listens on port 3000. Override with `PORT` env var.

## Endpoints and example requests

GET /health

curl:

curl -s http://localhost:3000/health

Response:

{ "status": "ok" }

GET /items

curl -s http://localhost:3000/items

Response example:

{ "items": [ { "id": 1, "name": "Sample Item" } ] }

POST /items

Create a new item (JSON body must include `name`):

curl -s -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New item"}'

Response (201):

{ "id": 2, "name": "New item" }

Error if `name` missing (400):

{ "error": "name is required" }

## Deployment

### Docker

Build image:

  docker build -t exp-api-test-2:latest .

Run container (maps port 3000):

  docker run -p 3000:3000 -e PORT=3000 exp-api-test-2:latest

### Heroku (example)

1. Create a Heroku app:

   heroku create my-exp-api

2. Push main branch:

   git push heroku main

Heroku will run `npm start` by default. Make sure `package.json` and `start` script are present.

### Environment variables

- PORT — port to bind (default 3000)
- NODE_ENV — environment (optional)

## Next steps

- Add automated tests (Jest / supertest)
- Add CI pipeline to run tests and linting
- Harden input validation and add persistence

