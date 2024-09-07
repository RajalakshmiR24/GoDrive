const express = require('express');
const router = express.Router();
const driverRideController = require('../controllers/driverRideController');

// POST: Create a new ride (driver accepts the trip request)
router.post('/newride/create', driverRideController.createRide);

// PUT: Start the ride (update status to "In-Progress")
router.put('/start-ride/:rideId/start', driverRideController.startRide);

// PUT: Complete the ride (update status to "Completed" and calculate earnings)
router.put('/complete-ride/:rideId/complete', driverRideController.completeRide);

// PUT: Cancel the ride (update status to "Cancelled")
router.put('/cancel-ride/:rideId/cancel', driverRideController.cancelRide);

// GET: Get ride details by ID
router.get('/getallride/:rideId', driverRideController.getRideDetails);

module.exports = router;
