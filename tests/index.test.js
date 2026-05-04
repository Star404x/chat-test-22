const { getCatalog, formatPrice } = require('../src/index.js');

describe('Catalog helpers', () => {
  test('getCatalog returns an array with items having id, name and price', () => {
    const catalog = getCatalog();
    expect(Array.isArray(catalog)).toBe(true);
    expect(catalog.length).toBeGreaterThan(0);
    const item = catalog[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('price');
  });

  test('formatPrice formats numbers to currency string', () => {
    expect(formatPrice(10)).toBe('$10.00');
    expect(formatPrice(0)).toBe('$0.00');
    expect(formatPrice(99.955)).toBe('$99.96');
  });
});
