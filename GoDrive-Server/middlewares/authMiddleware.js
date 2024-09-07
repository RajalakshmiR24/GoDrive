const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/Auth'); // Ensure this points to your user/auth model

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if Authorization header is present and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token from the Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token using the secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user from the database (excluding the password field)
            req.user = await User.findById(decoded.id).select('-password');

            // If the user is not found, return an unauthorized response
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        // Return unauthorized response if token is not present
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
});



// Middleware to authorize admin users
const authorizeAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
});

module.exports = { protect, authorizeAdmin };
