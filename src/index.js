const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Simple in-memory store for demonstration
let items = [ { id: 1, name: 'Sample Item' } ];

app.get('/', (req, res) => {
  res.json({ message: 'exp-api-test-2 API', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/items', (req, res) => {
  res.json({ items });
});

app.post('/items', (req, res) => {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'name is required' });
  }
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
