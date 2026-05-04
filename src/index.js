const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use(express.json());

// Serve static assets from public (create public/ with your frontend files)
app.use(express.static(path.join(__dirname, '..', 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      // Always revalidate HTML
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Healthcheck for CI and uptime monitoring
app.get('/api/health', (req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

// Contact form endpoint (mock)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  console.log('Contact form received:', { name, email });
  // In production forward to email service (SendGrid/Mailgun) or CRM
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

// Basic cart endpoint (mock)
app.post('/api/cart', (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid cart data' });
  const total = items.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0);
  res.json({ success: true, total });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
