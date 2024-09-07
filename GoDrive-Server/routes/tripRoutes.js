const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { protect } = require('../middlewares/authMiddleware');


// Create a new trip
router.post('/newtrip', tripController.createTrip);

// Get all trips
router.get('/getalltrips', tripController.getAllTrips);

// Get a trip by ID (with middleware to validate the ID)
router.get('/gettrip/:id', tripController.getTripByIdMiddleware, tripController.getTripById);

// Update a trip by ID
router.patch('/updatetrip/:id', tripController.getTripByIdMiddleware, tripController.updateTrip);

// Accept a trip by ID (driver side)
router.post('/accepttrip/:id/accept', protect, tripController.acceptTrip);

// Reject a trip by ID (driver side)
router.post('/rejecttrip/:id', protect, tripController.getTripByIdMiddleware, tripController.rejectTrip);


module.exports = router;
