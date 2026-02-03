const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Remove Bearer if present
  const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  jwt.verify(tokenString, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'super_admin' && req.userRole !== 'hotel_admin') {
    return res.status(403).json({ message: 'Require Admin Role' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
