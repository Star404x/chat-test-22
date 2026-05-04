const request = require('supertest');
const app = require('../src/index');

describe('API tests', () => {
  test('GET /api/products returns products list', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  test('POST /api/cart calculates total correctly', async () => {
    // pick two items
    const payload = { items: [ { id: 1, qty: 2 }, { id: 2, qty: 1 } ] };
    const res = await request(app).post('/api/cart').send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(typeof res.body.total).toBe('number');
    // total should match calculation from src data
    const expectedTotal = Math.round(((79.99 * 2) + (99.99 * 1)) * 100) / 100;
    expect(res.body.total).toBeCloseTo(expectedTotal, 2);
    expect(res.body.count).toBe(3);
  });

  test('POST /api/cart rejects invalid body', async () => {
    const res = await request(app).post('/api/cart').send({ items: 'not-an-array' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
