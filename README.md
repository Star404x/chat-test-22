# Mini Portfolio Site

This repository contains a responsive one-page portfolio project. At this stage there is a minimal Node.js static server and instructions for running and deploying the site.

Project structure (expected):

- public/             # static site files (index.html, css/, js/, images/)
- src/index.js        # local Node static server
- package.json

If you don't yet have your site files, create public/index.html and other assets first.

Local development
-----------------

1. Install dependencies:

   npm install

2. Place your site files into the public/ folder. The server serves files from public/ and falls back to public/index.html for SPA routing.

3. Start the local server:

   npm start

4. Open http://localhost:3000 in your browser.

Deploy options
--------------

You can deploy this site using several hosts. Choose the one that fits your workflow.

Option A — Vercel (recommended for Node or static):

- If you want to deploy the Node server directly, Vercel will use "npm start" automatically.
- From the Vercel dashboard, import the Git repository. No additional config is necessary for this simple server.
- Or use the CLI:

  npm i -g vercel
  vercel

Option B — Netlify (static recommended):

- If your site is purely static, ensure all generated files are in the public/ folder (index.html plus assets).
- From Netlify dashboard, "New site from Git" and point to this repo. Set the publish directory to public/.
- Or use drag-and-drop of the public/ folder into Netlify's deploy area for a quick test.

Option C — GitHub Pages (static only):

- If you prefer GitHub Pages and have static files in public/, you can deploy to GitHub Pages using gh-pages.
- Example:

  npm run deploy:gh

  (This runs the build script which currently is a no-op; ensure the static files are in public/ before running.)

Notes about GitHub Pages vs Node server:
- GitHub Pages only serves static files. If you rely on the Node server (src/index.js) for SSR or API endpoints, deploy to a Node-friendly host (Vercel, Render, Heroku, etc.).
- For a purely static site, skip the Node server and deploy public/ directly to a static host.

Next steps
----------

1. Create your site content in public/index.html and related assets (css, js, images).
2. Test locally with npm start.
3. Choose a host and follow the corresponding section above to deploy.

If you want, I can:
- Create a starter public/index.html + CSS + JS skeleton for the portfolio,
- Add a build pipeline (Webpack/Rollup) for asset bundling,
- Add automated deployment scripts for a specific host (e.g., fully wired gh-pages workflow).
