const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverListController');

// Route for creating a driver
router.post('/createDriver', driverController.createDriver);
router.get('/getDrivers', driverController.getDrivers)

module.exports = router;
