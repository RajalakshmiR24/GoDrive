const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');

router.post('/newtrip', tripController.createTrip);
router.get('/getalltrips', tripController.getAllTrips);
router.get('/gettrip/:id', tripController.getTripByIdMiddleware, tripController.getTripById);
router.patch('/updatetrip/:id', tripController.getTripByIdMiddleware, tripController.updateTrip);

module.exports = router;
