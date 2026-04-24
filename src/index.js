const express = require('express');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const PORT = process.env.PORT || 3000;
const AUTH_TOKEN = process.env.API_TOKEN || 'test-token';

function loadData() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveData(items) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
}

const app = express();
app.use(express.json());

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Validation
function validateItemPayload(payload) {
  if (!payload || typeof payload !== 'object') return 'Payload must be an object';
  if (!payload.name || typeof payload.name !== 'string') return 'name is required and must be a string';
  if (payload.value === undefined || typeof payload.value !== 'number') return 'value is required and must be a number';
  return null;
}

// Routes
app.get('/items', requireAuth, (req, res) => {
  const items = loadData();
  res.json(items);
});

app.post('/items', requireAuth, (req, res) => {
  const err = validateItemPayload(req.body);
  if (err) return res.status(400).json({ error: err });
  const items = loadData();
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const item = { id, name: req.body.name, value: req.body.value };
  items.push(item);
  saveData(items);
  res.status(201).json(item);
});

app.get('/items/:id', requireAuth, (req, res) => {
  const items = loadData();
  const item = items.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.put('/items/:id', requireAuth, (req, res) => {
  const err = validateItemPayload(req.body);
  if (err) return res.status(400).json({ error: err });
  const items = loadData();
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { id: items[idx].id, name: req.body.name, value: req.body.value };
  saveData(items);
  res.json(items[idx]);
});

app.delete('/items/:id', requireAuth, (req, res) => {
  const items = loadData();
  const idx = items.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const deleted = items.splice(idx, 1)[0];
  saveData(items);
  res.json(deleted);
});

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;

if (require.main === module) {
  // Ensure data file exists
  if (!fs.existsSync(DATA_FILE)) saveData([]);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
