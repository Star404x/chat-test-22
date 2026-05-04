# Minimal Portfolio

A minimalist single-page portfolio with responsive layout, basic SEO metadata and a small Node.js server for local testing.

## Structure

- public/ - static site (index.html, assets)
- src/index.js - minimal Express server to serve `public`
- package.json - scripts and dependencies

## Run locally

1. Install dependencies:

   npm install

2. Start the server:

   npm start

   The site will be available at http://localhost:3000

3. For development with auto-reload (requires nodemon):

   npm run dev

## SEO

SEO-related metadata is included in `public/index.html`:

- title, description
- canonical link
- Open Graph and Twitter Card tags
- JSON-LD Person schema

Edit those tags in `public/index.html` to match your name, description, and URLs. Replace `/og-image.png` with an actual image path for richer cards.

## Deploy

This project is a static site (contents of `public/`), so it can be deployed to Netlify or Vercel as a static site. Alternatively, you can deploy the Node server to platforms that support Node (Heroku, Render).

### Netlify (recommended for static)

- Option A (drag & drop): Drag the `public/` folder into Netlify's Sites dashboard – this will publish the site.

- Option B (from Git): Connect your Git repository to Netlify. In the site settings set:
  - Build command: (leave empty)
  - Publish directory: public

### Vercel (recommended for static)

- Install Vercel CLI or use the dashboard. From the repo root run:

  vercel

  When prompted, select "Other" for framework and set the Output Directory to `public`. Or connect the repo in the Vercel dashboard and set the same output dir.

### Deploying the Node server

If you prefer to run the Node server (src/index.js) on a Node-capable host (Heroku, Render, Railway):

- Ensure `PORT` is provided by the host (the server uses process.env.PORT)
- Push the repo, and follow the host's Node deployment instructions (start script uses `node src/index.js`).

## Notes & Next steps

- Replace placeholder texts, links and images in `public/index.html` with your actual content.
- Add performance optimizations (minified assets, image optimization) and a real build pipeline if needed.
- Optionally add CI (GitHub Actions) to auto-deploy on push to main.
