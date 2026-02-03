const request = require('supertest');
const app = require('../../server');
const { User } = require('../../models');

// Mock dependencies
jest.mock('../../models');
jest.mock('../../middleware/authJwt', () => ({
  verifyToken: (req, res, next) => {
    req.userId = 1;
    req.userRole = 'hotel_admin';
    next();
  },
  isAdmin: (req, res, next) => next()
}));

// Mock the controller indirectly by mocking the model it uses? 
// Or better, we can mock the controller functions if we want to isolate routes.
// But usually integration tests test the whole stack.
// Since we don't have a real DB, we mock the models.

describe('Auth API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/auth/login', () => {
    // We need to mock the login logic inside controller.
    // Since we are importing app, which imports routes, which imports controllers...
    // The controllers import models. So if we mock models, the controller logic will use mocked models.
    
    it('should return 400 for missing credentials', async () => {
       // We can test validation if we had it in middleware, or controller logic
       // For now, let's just see if the route exists and returns something expected
       
       // Mock User.findOne to return null
       User.findOne.mockResolvedValue(null);

       const res = await request(app)
         .post('/api/v1/auth/login')
         .send({ email: 'nonexistent@example.com', password: 'password' });
         
       expect(res.statusCode).toBe(400);
       expect(res.body.message).toBe('Invalid credentials');
    });
  });
});
