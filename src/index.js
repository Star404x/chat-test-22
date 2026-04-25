// Minimal in-memory implementations for testing purposes

const users = new Map(); // username -> password
const sessions = new Map(); // token -> username
const messages = []; // array of {id, from, to, text, ts}

function registerUser(username, password) {
  if (!username || !password) throw new Error('username and password required');
  if (users.has(username)) return false;
  users.set(username, password);
  return true;
}

function login(username, password) {
  if (!username || !password) return null;
  const pw = users.get(username);
  if (pw && pw === password) {
    const token = 'tok_' + Math.random().toString(36).slice(2);
    sessions.set(token, username);
    return token;
  }
  return null;
}

function sendMessage(token, to, text) {
  const from = sessions.get(token);
  if (!from) throw new Error('Invalid token');
  if (!users.has(to)) throw new Error('Recipient not found');
  const msg = { id: messages.length + 1, from, to, text, ts: Date.now() };
  messages.push(msg);
  return msg;
}

function getMessagesFor(username) {
  return messages.filter(m => m.to === username || m.from === username);
}

function clearAll() {
  users.clear();
  sessions.clear();
  messages.length = 0;
}

module.exports = {
  registerUser,
  login,
  sendMessage,
  getMessagesFor,
  // test helper
  _internal: { users, sessions, messages, clearAll }
};

if (require.main === module) {
  console.log('Chat Test 40 - minimal module loaded. Use exported functions or run tests.');
}
