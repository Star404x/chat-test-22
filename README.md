# express-api-test-3

Minimal Express API intended for automated endpoint tests and CI integration.

Prerequisites
- Node.js 18+ (for local run)
- npm
- Docker (to run containerized)

Local usage
1. Install dependencies:

   npm install

2. Start the app:

   npm start

   The server listens on port 3000 by default. To change the port:

   PORT=4000 npm start

3. Endpoints:
- GET / -> { message: 'Hello from express-api-test-3' }
- GET /health -> { status: 'ok' }

Example:

   curl http://localhost:3000/

Docker
1. Build the image:

   docker build -t express-api-test-3 .

2. Run the container (exposes port 3000):

   docker run -p 3000:3000 --rm --name express-api-test-3 express-api-test-3

3. Optional: change the port mapping:

   docker run -p 8080:3000 --rm express-api-test-3

Notes
- The app exports the Express `app` instance from src/index.js to make it easy to add automated tests.
- Next steps: add automated tests (e.g., using Jest + Supertest) and CI workflow (e.g., GitHub Actions) to validate endpoints.
