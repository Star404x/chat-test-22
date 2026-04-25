const { echo, sum } = require('../src/utils');

describe('src/utils', () => {
  test('echo returns a string representation of the input', () => {
    expect(echo('hello')).toBe('hello');
    expect(echo(123)).toBe('123');
    expect(typeof echo(null)).toBe('string');
  });

  test('sum returns numeric sum for numeric inputs and numeric strings', () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum('4', '5')).toBe(9);
    expect(sum('6', 7)).toBe(13);
  });
});
