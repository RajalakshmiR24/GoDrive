const asyncHandler = require('express-async-handler');

// Middleware to authorize admin users
const adminAuthorization = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, respond with a 403 Forbidden status
    res.status(403).json({ authorized: false, message: 'Access denied' });
  }
});

module.exports = adminAuthorization;
