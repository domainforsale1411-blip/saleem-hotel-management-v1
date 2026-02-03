const { Hotel } = require('../models');

const generateMockData = async (userId, transaction) => {
  const mockHotels = [
    {
      userId,
      nameEn: 'Saleem Grand Hotel',
      nameAr: 'فندق سليم الكبير',
      address: '123 King Fahd Road',
      city: 'Riyadh',
      country: 'Saudi Arabia'
    },
    {
      userId,
      nameEn: 'Red Sea Resort',
      nameAr: 'منتجع البحر الأحمر',
      address: '456 Corniche Road',
      city: 'Jeddah',
      country: 'Saudi Arabia'
    },
    {
      userId,
      nameEn: 'Desert Oasis Inn',
      nameAr: 'نزل واحة الصحراء',
      address: '789 Prince Sultan Street',
      city: 'Dammam',
      country: 'Saudi Arabia'
    }
  ];

  try {
    // Create hotels in bulk
    // Note: If using a transaction, pass it in the options
    const options = transaction ? { transaction } : {};
    await Hotel.bulkCreate(mockHotels, options);
    console.log(`Generated ${mockHotels.length} mock hotels for user ${userId}`);
  } catch (error) {
    console.error('Error generating mock data:', error);
    // Don't throw error to avoid failing the registration just because mock data failed
  }
};

module.exports = generateMockData;
