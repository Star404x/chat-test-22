const { registerUser, login, sendMessage, getMessagesFor, _internal } = require('../src/index');

beforeEach(() => {
  _internal.clearAll();
});

describe('Authentication', () => {
  test('register and login success', () => {
    const ok = registerUser('alice', 'password123');
    expect(ok).toBe(true);
    const token = login('alice', 'password123');
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('duplicate registration fails', () => {
    expect(registerUser('bob', 'x')).toBe(true);
    expect(registerUser('bob', 'x')).toBe(false);
  });

  test('invalid login returns null', () => {
    registerUser('carol', 'pw');
    expect(login('carol', 'wrong')).toBeNull();
    expect(login('nonexistent', 'pw')).toBeNull();
  });
});

describe('Messaging', () => {
  test('send message between users', () => {
    registerUser('alice', 'a');
    registerUser('bob', 'b');
    const tA = login('alice', 'a');
    const tB = login('bob', 'b');
    const msg = sendMessage(tA, 'bob', 'Hello Bob');
    expect(msg).toHaveProperty('id');
    expect(msg.from).toBe('alice');
    expect(msg.to).toBe('bob');
    expect(msg.text).toBe('Hello Bob');

    const bobMsgs = getMessagesFor('bob');
    expect(bobMsgs.length).toBe(1);
    expect(bobMsgs[0].text).toBe('Hello Bob');
  });

  test('sending with invalid token throws', () => {
    registerUser('alice', 'a');
    registerUser('bob', 'b');
    expect(() => sendMessage('badtoken', 'bob', 'x')).toThrow();
  });
});
