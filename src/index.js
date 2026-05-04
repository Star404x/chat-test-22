const express = require('express');
const compression = require('compression');

// Simple in-memory product catalog for testing
const products = [
  { id: 1, name: 'Classic Sneaker', price: 79.99, size: [38, 39, 40, 41, 42] },
  { id: 2, name: 'Sport Runner', price: 99.99, size: [40, 41, 42, 43, 44] },
  { id: 3, name: 'Leather Boot', price: 129.99, size: [39, 40, 41, 42, 43] }
];

const app = express();
app.use(compression());
app.use(express.json());

// Cache static assets (if any) - exemplified
app.use((req, res, next) => {
  if (req.path.startsWith('/assets') || req.path.match(/\.(js|css|png|jpg|svg)$/)) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});

// API: list products
app.get('/api/products', (req, res) => {
  res.json({ products });
});

// API: simple cart calculation
app.post('/api/cart', (req, res) => {
  const { items } = req.body || {};
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'items must be an array' });
  }

  // items: [{ id, qty }]
  let total = 0;
  const detailed = [];

  for (const it of items) {
    const prod = products.find(p => p.id === it.id);
    if (!prod) continue;
    const qty = Math.max(1, Number(it.qty) || 1);
    total += prod.price * qty;
    detailed.push({ id: prod.id, name: prod.name, unit: prod.price, qty });
  }

  // Round to 2 decimals
  total = Math.round(total * 100) / 100;

  res.json({ total, items: detailed, count: detailed.reduce((s, i) => s + i.qty, 0) });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;

// Start server if run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Mini Shoes Site API listening on http://localhost:${port}`);
  });
}
