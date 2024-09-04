const asyncHandler = require('express-async-handler');
const Driver = require('../models/Driver');

// Middleware to verify if user is a driver
const driver = asyncHandler(async (req, res, next) => {
    try {
        // Check if a driver exists for the authenticated user
        const isDriver = await Driver.findOne({ user: req.user._id });

        if (isDriver) {
            // User is a driver, proceed to next middleware or route handler
            next();
        } else {
            // User is not a driver, respond with a false status
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        // Log error and respond with a server error status
        console.error('Driver verification error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { driver };
