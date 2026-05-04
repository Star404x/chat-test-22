# Mini Photo Site - Backend

This repository contains a minimal Node.js backend for a small photo site: accepts uploads, stores files in an uploads folder, serves uploaded images and provides a simple API to list photos.

Quick start (local):

1. Install dependencies

   npm install

2. Create uploads folder (server will attempt to create it automatically, but you can manually create it if needed):

   mkdir -p uploads

3. Run server

   npm start

By default the server listens on port 3000. To change the port set the PORT environment variable:

   PORT=4000 npm start

Available endpoints:

- GET /         -> basic health/info
- POST /upload  -> multipart/form-data, field name: "photo" (single file). Returns JSON with file info and accessible URL.
- GET /photos   -> JSON array listing uploaded files with URLs
- GET /uploads/:filename -> serves uploaded image files

Scripts

- npm start   - run production server (node src/index.js)
- npm run build - placeholder build script (no build step for backend-only project)

Deployment

Vercel:

1. Install Vercel CLI (optional) and login: npm i -g vercel; vercel login
2. Deploy: vercel --prod

A vercel.json is included to run the Node server via @vercel/node.

Heroku:

Heroku can run this app using the start script. Example:

1. heroku create
2. git push heroku main

Make sure to set any environment variables (PORT is provided by Heroku automatically).

Netlify:

Netlify is optimized for static sites and serverless functions. For a similar deployment on Netlify consider extracting API endpoints into Netlify Functions or deploying the backend to another host and the frontend (static) to Netlify.

Next steps

- Implement frontend gallery UI that uploads photos to POST /upload and displays photos from GET /photos
- Add authentication or limits, thumbnails, and basic filtering

