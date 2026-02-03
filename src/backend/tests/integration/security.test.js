const request = require('supertest');
const app = require('../../server');

// Mock sequelize to avoid DB connection issues during test
jest.mock('../../models', () => ({
  sequelize: {
    sync: jest.fn(),
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn()
    })
  },
  User: { findOne: jest.fn() },
  Subscription: { findOne: jest.fn() },
  Hotel: { define: jest.fn() }
}));

describe('Security Headers', () => {
  it('should have security headers set by helmet', async () => {
    const res = await request(app).get('/');
    
    // Check for common security headers
    expect(res.headers['x-dns-prefetch-control']).toBeDefined();
    expect(res.headers['x-frame-options']).toBeDefined();
    expect(res.headers['strict-transport-security']).toBeDefined();
    expect(res.headers['x-download-options']).toBeDefined();
    expect(res.headers['x-content-type-options']).toBeDefined();
    expect(res.headers['x-xss-protection']).toBe('0'); // Helmet default for newer versions
  });

  it('should not expose X-Powered-By header', async () => {
    const res = await request(app).get('/');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
