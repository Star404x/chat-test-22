# exp-api-test

Minimal Express API with instructions for usage, testing and releasing.

## Requirements

- Node.js >= 14
- npm

## Install

1. Clone the repository
2. Install dependencies:


npm install


## Run

Start the server locally:


npm start


The server listens on PORT (default 3000).

Available endpoints:
- GET /health -> { "status": "ok" }
- GET /hello -> { "message": "Hello, world!" }

## Development

Run in dev mode with auto-reload (requires nodemon):


npm run dev


## Testing

This project uses Jest and Supertest for endpoint testing. To run tests:


npm test


CI should run `npm ci` and then `npm test` to validate the API on every push/PR.

## Tagging a release

This repository is prepared to use npm version for simple release tagging. To create a new patch release and push the tag:


npm run release


This script runs `npm version patch` which increments package.json version, creates a git commit and a tag, and then pushes the commit and tags to the remote. Adjust to `minor` or `major` as needed.

Manual alternative:


# bump version
npm version patch
# push commits and tags
git push --follow-tags origin main


After tagging you can build/publish artifacts or Docker images referencing the new tag.

## Prepare deployment (example with Docker)

Create a Dockerfile (not included here) and build:


# replace USERNAME and version/tag as appropriate
docker build -t USERNAME/exp-api-test:v0.1.0 .
docker push USERNAME/exp-api-test:v0.1.0


In production you can run the container exposing the port:


docker run -e PORT=3000 -p 3000:3000 USERNAME/exp-api-test:v0.1.0


## CI / CD notes

Recommended next steps:
- Add GitHub Actions workflow to run tests on PRs and pushes (.github/workflows/ci.yml)
- Add a release workflow that builds/publishes Docker images on new tags

## Next

Add automated tests (Jest + Supertest) for endpoints and create CI workflow to run them and optionally publish Docker images on release tags.
