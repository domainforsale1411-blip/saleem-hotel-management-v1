const bcrypt = require('bcryptjs');
const { sequelize, User, Subscription } = require('../models');
const generateMockData = require('../utils/mockDataGenerator');

async function seed() {
  try {
    console.log('Connecting to database...');
    // Sync models to ensure tables exist
    await sequelize.sync(); 

    const email = 'admin@staging.com';
    const password = 'password123';
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(`Seeding user: ${email}`);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        fullName: 'Staging Admin',
        passwordHash,
        companyName: 'Staging Corp',
        role: 'super_admin',
        isVerified: true
      }
    });

    if (created) {
      console.log('User created successfully.');
      
      // Create Subscription
      await Subscription.create({
        userId: user.id,
        planId: 3, // Enterprise
        status: 'active',
        isDemo: true
      });
      console.log('Subscription created.');
      
      // Generate Mock Hotels
      await generateMockData(user.id);
      console.log('Mock hotels generated.');
    } else {
      console.log('User already exists. Skipping seed.');
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
