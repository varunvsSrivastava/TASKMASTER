// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// @desc    Protect routes
// @access  Private
exports.protect = (req, res, next) => {
  // Get token from header
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Split "Bearer <token>"
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};