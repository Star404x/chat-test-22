const { authenticate, sendMessage, getMessages, resetStore } = require('../src/index');

beforeEach(() => {
  resetStore();
});

test('authenticate: valid credentials pass', () => {
  expect(authenticate('alice', 'password123')).toBe(true);
});

test('authenticate: invalid credentials fail', () => {
  expect(authenticate('alice', 'badpass')).toBe(false);
  expect(authenticate('unknown', 'x')).toBe(false);
});

test('sendMessage and getMessages between two users', () => {
  const m1 = sendMessage('alice', 'bob', 'Hello Bob');
  const m2 = sendMessage('bob', 'alice', 'Hi Alice');

  const chatId = 'alice:bob';
  const msgs = getMessages(chatId);

  expect(msgs.length).toBe(2);
  expect(msgs[0].text).toBe('Hello Bob');
  expect(msgs[1].text).toBe('Hi Alice');
  expect(msgs).toEqual(expect.arrayContaining([expect.objectContaining({ text: 'Hello Bob' })]));
});

test('sendMessage validation rejects bad args', () => {
  expect(() => sendMessage(null, 'bob', 'x')).toThrow();
  expect(() => sendMessage('alice', null, 'x')).toThrow();
  expect(() => sendMessage('alice', 'bob', null)).toThrow();
});
