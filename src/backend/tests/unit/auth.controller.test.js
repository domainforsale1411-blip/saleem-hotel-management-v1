const { register } = require('../../controllers/auth.controller');
const { User, Subscription, sequelize } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../models');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller - Register', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        companyName: 'Test Hotel',
        phone: '1234567890',
        whatsapp: '1234567890'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock transaction
    sequelize.transaction.mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn()
    });
  });

  it('should register a new user successfully', async () => {
    // Mock User.findOne to return null (user doesn't exist)
    User.findOne.mockResolvedValue(null);
    
    // Mock bcrypt
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
    
    // Mock User.create
    const mockUser = {
      id: 1,
      fullName: 'Test User',
      email: 'test@example.com',
      role: 'hotel_admin'
    };
    User.create.mockResolvedValue(mockUser);
    
    // Mock Subscription.create
    Subscription.create.mockResolvedValue({});
    
    // Mock jwt
    jwt.sign.mockReturnValue('validToken');

    await register(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
    expect(User.create).toHaveBeenCalled();
    expect(Subscription.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'User registered successfully',
      token: 'validToken'
    }));
  });

  it('should return 400 if user already exists', async () => {
    User.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });
});
