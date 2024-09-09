const express = require('express');
const router = express.Router();

// Import controllers and middleware
const { createDriver, getDriverById, getDrivers, updateDriverProfile, checkStatus, checkVerificationStatus } = require('../controllers/driverController');
const upload = require('../middlewares/multerConfig');
const { protect } = require('../middlewares/authMiddleware');
const { driver } = require('../middlewares/driverMiddleware');
const authorizeAdmin = require('../middlewares/adminMiddleware');

// Routes for driver profile management
router.post('/createDriver', protect, upload.single('profilePicture'), createDriver);

// Admins can access any driver's details; drivers can only access their own
router.get('/getdrivers/:driverId', protect, getDriverById);

// Get all drivers (admin only)
router.get('/getdrivers', protect, authorizeAdmin, getDrivers);

router.put('/update/:driverId', protect, updateDriverProfile);
router.get('/checkStatus', protect, checkStatus); // GET check driver status

// Route to check driver verification status by ID
router.get('/checkVerification/:driverId', protect, checkVerificationStatus);

module.exports = router;
