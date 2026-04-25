'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Простая in-memory реализация
const messages = [];
const users = {}; // username -> token (mock)

function generateToken(username) {
  return `token-${username}-${Date.now()}`;
}

// Auth: simple login that returns a mock token
app.post('/auth/login', (req, res) => {
  const { username } = req.body || {};
  if (!username) {
    return res.status(400).json({ error: 'username required' });
  }
  const token = generateToken(username);
  users[username] = token;
  return res.json({ token });
});

function authorize(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const m = auth.match(/^Bearer\s+(.*)$/i);
  if (!m) return res.status(401).json({ error: 'missing token' });
  const token = m[1];
  // very simple validation: check token exists in users
  const ok = Object.values(users).includes(token);
  if (!ok) return res.status(401).json({ error: 'invalid token' });
  next();
}

app.get('/messages', authorize, (req, res) => {
  res.json({ messages });
});

app.post('/messages', authorize, (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text required' });
  const msg = {
    id: messages.length + 1,
    text,
    timestamp: new Date().toISOString()
  };
  messages.push(msg);
  res.status(201).json(msg);
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`chat-test-40 server listening on port ${port}`);
  });
}

module.exports = app;
