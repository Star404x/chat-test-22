const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

app.use(compression());

// Serve static assets with cache-control for optimization
app.use(express.static(PUBLIC_DIR, {
  maxAge: '7d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      // no-cache for html so updates are visible
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Leather mini-site server listening on http://localhost:${PORT}`);
});
