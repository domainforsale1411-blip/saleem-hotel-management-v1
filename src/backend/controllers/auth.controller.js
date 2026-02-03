const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Subscription, sequelize } = require('../models');
const generateMockData = require('../utils/mockDataGenerator');

const register = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      fullName,
      email,
      password,
      companyName,
      phone,
      whatsapp,
      isDemo = true
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      await t.rollback();
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      fullName,
      email,
      passwordHash,
      companyName,
      phone,
      whatsappNumber: whatsapp,
      role: 'hotel_admin',
      isVerified: false
    }, { transaction: t });

    // Calculate subscription dates (7 days for demo)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (isDemo ? 7 : 30));

    // Create Subscription (Default to Plan ID 1 - Starter/Trial)
    await Subscription.create({
      userId: user.id,
      planId: 1, // Assuming 1 is the default starter plan
      status: 'trial',
      startDate,
      endDate,
      isDemo
    }, { transaction: t });

    // Generate Mock Data if isDemo is true
    if (isDemo) {
      await generateMockData(user.id, t);
    }

    await t.commit();

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    await t.rollback();
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  register,
  login
};
