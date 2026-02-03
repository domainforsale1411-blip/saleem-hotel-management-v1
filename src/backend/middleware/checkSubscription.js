const { Subscription } = require('../models');

const checkSubscription = async (req, res, next) => {
  try {
    const userId = req.userId; // Set by authJwt middleware
    
    const subscription = await Subscription.findOne({
      where: { userId }
    });

    if (!subscription) {
      return res.status(403).json({ message: 'No active subscription found.' });
    }

    const now = new Date();
    if (subscription.endDate < now) {
      return res.status(403).json({ message: 'Subscription expired. Please upgrade your plan.' });
    }

    // Attach subscription to request for further use if needed
    req.subscription = subscription;
    next();
  } catch (error) {
    console.error('Subscription check error:', error);
    res.status(500).json({ message: 'Server error checking subscription.' });
  }
};

module.exports = checkSubscription;
