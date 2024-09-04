const express = require('express');
const router = express.Router();

// Import controllers and middleware
const { createDriver, checkStatus , checkVerificationStatus} = require('../controllers/driverController');
const upload = require('../middlewares/multerConfig');
const { protect, authorizeAdmin } = require('../middlewares/authMiddleware');
const { driver } = require('../middlewares/driverMiddleware');

// Routes for driver profile management
router.post('/createDriver', protect, upload.single('profilePicture'), createDriver); // POST create driver profile

router.get('/checkStatus', protect, driver, checkStatus); // GET check driver status

// Route to check driver verification status by ID
router.get("/checkVerification/:driverId", protect, checkVerificationStatus);

module.exports = router;
