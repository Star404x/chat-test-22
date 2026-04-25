"use strict";

// Простая in-memory реализация для тестирования: аутентификация, отправка сообщений и получение чатов
const messages = []; // { chatId, from, to, text, ts }
const users = new Map();

// Предзаполненные тестовые пользователи (для unit-тестов / dev)
users.set('alice', 'password123');
users.set('bob', 'hunter2');

function _chatIdFor(a, b) {
  return [a, b].sort().join(':');
}

function authenticate(username, password) {
  if (!username || !password) return false;
  const pw = users.get(username);
  return pw === password;
}

function sendMessage(from, to, text) {
  if (!from || !to || typeof text !== 'string') {
    throw new Error('Invalid sendMessage arguments');
  }
  const chatId = _chatIdFor(from, to);
  const msg = { chatId, from, to, text, ts: Date.now() };
  messages.push(msg);
  return msg;
}

function getMessages(chatIdOrA, maybeB) {
  let chatId = chatIdOrA;
  if (maybeB) chatId = _chatIdFor(chatIdOrA, maybeB);
  return messages.filter(m => m.chatId === chatId).slice();
}

function resetStore() {
  // helper for tests
  messages.length = 0;
}

// Minimal HTTP interface for manual dev usage (no external deps)
if (require.main === module) {
  const http = require('http');
  const url = require('url');

  const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    res.setHeader('Content-Type', 'application/json');

    if (parsed.pathname === '/health') {
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    if (req.method === 'POST' && parsed.pathname === '/auth') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { username, password } = JSON.parse(body);
          res.end(JSON.stringify({ ok: authenticate(username, password) }));
        } catch (e) {
          res.statusCode = 400; res.end(JSON.stringify({ error: 'bad_request' }));
        }
      });
      return;
    }

    if (req.method === 'POST' && parsed.pathname === '/send') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { from, to, text } = JSON.parse(body);
          const m = sendMessage(from, to, text);
          res.end(JSON.stringify({ ok: true, message: m }));
        } catch (e) {
          res.statusCode = 400; res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    if (req.method === 'GET' && parsed.pathname === '/messages') {
      // ?a=alice&b=bob  OR ?chat=alice:bob
      const q = parsed.query;
      try {
        let msgs = [];
        if (q.chat) msgs = getMessages(q.chat);
        else if (q.a && q.b) msgs = getMessages(q.a, q.b);
        else throw new Error('missing_query');
        res.end(JSON.stringify({ ok: true, messages: msgs }));
      } catch (e) {
        res.statusCode = 400; res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    res.statusCode = 404; res.end(JSON.stringify({ error: 'not_found' }));
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`chat-test-40 dev server listening on http://localhost:${PORT}`);
  });
}

module.exports = { authenticate, sendMessage, getMessages, resetStore };
