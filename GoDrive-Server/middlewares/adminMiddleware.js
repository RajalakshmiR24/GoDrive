const asyncHandler = require('express-async-handler');

// Middleware to authorize admin users
const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        // User is an admin, proceed to next middleware or route handler
        next();
    } else {
        // User is not an admin, respond with a false status
        res.status(200).json({ authorized: false });
    }
});

module.exports = { authorizeAdmin };
