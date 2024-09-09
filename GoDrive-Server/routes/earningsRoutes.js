const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure `protect` is a function
const { driver } = require('../middlewares/driverMiddleware'); // Ensure `driver` is a function

// GET earnings for the authenticated driver
router.get('/get-earnings', protect, earningsController.getDriverEarnings);

// PUT to update earnings for the authenticated driver
router.put('/update-earnings', protect, earningsController.updateDriverEarnings);

module.exports = router;
