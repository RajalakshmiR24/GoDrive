// accessRoutes.js

const express = require('express');
const { protect, authorizeAdmin } = require('../middlewares/authMiddleware'); // Middleware to protect routes and authorize admin
const accessController  = require('../controllers/accessController'); // Import access control controllers

const router = express.Router();

// Route to get all driver applications (only accessible by admin)
router.get('/applications', protect, authorizeAdmin, accessController.getApplications);

// Route to update the status of a specific application (only accessible by admin)
router.put('/applications/update/:id', protect, authorizeAdmin, accessController.updateApplication);


module.exports = router;
