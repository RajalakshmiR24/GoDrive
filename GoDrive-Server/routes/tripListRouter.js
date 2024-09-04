const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripListController");

// router.post('/createtrip', tripController.createTripList);

// Route to get all trips
router.get('/getalltrips', tripController.getAllTripLists);

module.exports = router;
