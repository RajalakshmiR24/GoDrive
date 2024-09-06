const express = require('express');
const router = express.Router();

// Import controllers and middleware
const { createDriver,getDriverById, updateDriverProfile, checkStatus , checkVerificationStatus} = require('../controllers/driverController');
const upload = require('../middlewares/multerConfig');
const { protect, authorizeAdmin } = require('../middlewares/authMiddleware');
const { driver } = require('../middlewares/driverMiddleware');

// Routes for driver profile management
router.post('/createDriver', protect, upload.single('profilePicture'), createDriver); 

router.get('/getdrivers/:driverId', protect, driver,getDriverById);
router.put('/update/:driverId', protect, driver, updateDriverProfile);
router.get('/checkStatus', protect, driver, checkStatus); // GET check driver status

// Route to check driver verification status by ID
router.get("/checkVerification/:driverId", protect, checkVerificationStatus);

module.exports = router;
