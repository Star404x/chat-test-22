const express = require('express');
const app = express();

app.use(express.json());

// Basic root
app.get('/', (req, res) => {
  res.json({ message: 'ExpressAPI Test 2' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Simple in-memory items resource for demo/testing
let nextId = 1;
const items = [];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const { name, data } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const item = { id: String(nextId++), name, data: data || null, createdAt: new Date().toISOString() };
  items.push(item);
  res.status(201).json(item);
});

app.get('/items/:id', (req, res) => {
  const found = items.find(i => i.id === req.params.id);
  if (!found) return res.status(404).json({ error: 'not_found' });
  res.json(found);
});

// Export app for testing
module.exports = app;

// Start server if run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`ExpressAPI Test 2 listening on port ${port}`);
  });
}
