const io = require('socket.io-client');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io(SERVER_URL, { reconnectionDelayMax: 10000 });

let received = false;
const TEST_MESSAGE = { user: 'smoke-test', text: 'hello from smoke test' };

socket.on('connect', () => {
  console.log('Connected to', SERVER_URL);
  socket.emit('chat message', TEST_MESSAGE);
  console.log('Sent test message:', TEST_MESSAGE);
});

socket.on('chat message', (msg) => {
  console.log('Received chat message:', msg);
  if (msg && msg.text === TEST_MESSAGE.text) {
    received = true;
    console.log('Smoke test passed');
    socket.disconnect();
    process.exit(0);
  }
});

socket.on('connect_error', (err) => {
  console.error('Connection error:', err && err.message ? err.message : err);
});

socket.on('disconnect', (reason) => {
  if (!received) {
    console.error('Disconnected before receiving test message:', reason);
    process.exit(2);
  }
});

// Timeout to fail the test if no response
setTimeout(() => {
  if (!received) {
    console.error('Smoke test failed: no response within timeout');
    socket.disconnect();
    process.exit(3);
  }
}, 5000);
