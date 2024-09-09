const asyncHandler = require('express-async-handler');
const Driver = require('../models/Driver');

// Middleware to verify if user is a driver
const driverMiddleware = asyncHandler(async (req, res, next) => {
  try {
    // Check if a driver exists for the authenticated user
    const driver = await Driver.findOne({ user: req.user._id });

    if (driver) {
      // User is a driver, attach driver data to the request if needed
      req.driver = driver;
      next();
    } else {
      // User is not a driver, respond with a false status
      res.status(403).json({ exists: false, message: 'User is not a driver' });
    }
  } catch (error) {
    // Log error and respond with a server error status
    console.error('Driver verification error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = driverMiddleware;
