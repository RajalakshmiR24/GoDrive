const Trip = require('../models/trip');
const { getGeocodeData } = require('../Services/apiServices');
const haversineDistance = require('../utils/distanceCalculator');

const PRICE_PER_KM = 12; // Price per kilometer in INR

const calculateDistance = async (pickupLocation, dropLocation) => {
  try {
    const pickupData = await getGeocodeData(pickupLocation);
    const dropData = await getGeocodeData(dropLocation);

    if (pickupData.length === 0 || dropData.length === 0) {
      throw new Error('Invalid location data');
    }

    const pickupLat = parseFloat(pickupData[0].lat);
    const pickupLon = parseFloat(pickupData[0].lon);
    const dropLat = parseFloat(dropData[0].lat);
    const dropLon = parseFloat(dropData[0].lon);

    return haversineDistance(pickupLat, pickupLon, dropLat, dropLon);
  } catch (error) {
    console.error('Error calculating distance:', error);
    throw error;
  }
};

exports.createTrip = async (req, res) => {
  try {
    const { pickupLocation, dropLocation, pickupTime, forWhom, userId, name } = req.body;

    // Debug: Log the received data
    // console.log('Received data:', { pickupLocation, dropLocation, pickupTime, forWhom, userId, name });

    if (!pickupLocation || !dropLocation || !pickupTime || !forWhom || !userId || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Calculate distance (in km)
    const distance = await calculateDistance(pickupLocation, dropLocation);
    const price = distance * PRICE_PER_KM;

    // Debug: Log the trip data before saving
  //   console.log('Trip data to be saved:', {
  //     pickupLocation,
  //     dropLocation,
  //     pickupTime,
  //     forWhom,
  //     user: userId, // Ensure userId is passed correctly
  //     name,
  //     distance,
  //     price,
  //   }
  // );

    const newTrip = new Trip({
      pickupLocation,
      dropLocation,
      pickupTime,
      forWhom,
      user: userId, // Ensure correct mapping here
      name,
      distance,
      price,
    });

    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ message: 'Server error', error: error.stack });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a specific trip
exports.getTripById = (req, res) => {
  res.json(res.trip);
};

// Middleware to get trip by ID
exports.getTripByIdMiddleware = async (req, res, next) => {
  let trip;
  try {
    trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
  } catch (err) {
    console.error('Error fetching trip by ID:', err);
    return res.status(500).json({ message: err.message });
  }

  res.trip = trip;
  next();
};

// Update a specific trip by ID
exports.updateTrip = async (req, res) => {
  const { pickupLocation, dropLocation, pickupTime, forWhom } = req.body;

  if (!pickupLocation || !dropLocation || !pickupTime || !forWhom) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { pickupLocation, dropLocation, pickupTime, forWhom },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(updatedTrip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



