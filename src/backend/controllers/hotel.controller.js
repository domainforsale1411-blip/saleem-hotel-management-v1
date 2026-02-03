const { Hotel } = require('../models');

const createHotel = async (req, res) => {
  try {
    const { nameEn, nameAr, address, city, country } = req.body;
    
    const hotel = await Hotel.create({
      userId: req.userId,
      nameEn,
      nameAr,
      address,
      city,
      country
    });

    res.status(201).json({ message: 'Hotel created successfully', hotel });
  } catch (error) {
    console.error('Create Hotel Error:', error);
    res.status(500).json({ message: 'Server error creating hotel' });
  }
};

const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({ where: { userId: req.userId } });
    res.json(hotels);
  } catch (error) {
    console.error('Get Hotels Error:', error);
    res.status(500).json({ message: 'Server error fetching hotels' });
  }
};

module.exports = {
  createHotel,
  getMyHotels
};
