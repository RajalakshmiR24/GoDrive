const Trip = require('../models/trip');
const DriverRide = require('../models/driverRide');
const crypto = require('crypto');
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
    // console.log (savedTrip)
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
    console.log(trips)
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: error.message });
  }

};


// Get a specific trip
exports.getTripById = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Debug: Log the received tripId
    // console.log('Fetching trip with ID:', tripId);

    const trip = await Trip.findById(tripId).populate('user');

    if (!trip) {
      // Debug: Log if trip is not found
      // console.log('Trip not found with ID:', tripId);
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Debug: Log the trip data
    // console.log('Trip data:', trip);

    return res.status(200).json(trip);
  } catch (error) {
    // Debug: Log the error
    console.error('Error fetching trip:', error);
    res.status(500).json({ message: 'Error fetching trip', error: error.stack });
  }
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

// / Driver accepts the trip
exports.acceptTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Log the req.user to ensure it's defined
    console.log('Authenticated User:', req.user);

    // Check if req.user is populated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Driver not authenticated' });
    }

    const driver = req.user._id; // Assuming the driver is authenticated

    console.log('Driver:', driver, 'is accepting Trip:', tripId);

    // Find the trip
    const trip = await Trip.findById(tripId);
    if (!trip) {
      console.log('Trip not found with ID:', tripId);
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Generate a random 6-digit OTP
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
    console.log('Generated OTP:', otp);

    // Update the trip with OTP and status to 'Accepted'
    trip.otp = otp;
    trip.status = 'Accepted';
    await trip.save();
    console.log('Updated Trip:', trip);

    // Create a new driver ride
    const driverRide = new DriverRide({
      trip: trip._id,
      driver,
      pin: otp,
      status: 'Accepted',
    });
    await driverRide.save();
    console.log('Driver Ride created:', driverRide);

    return res.status(200).json({ message: 'Trip accepted by driver', trip, driverRide });
  } catch (error) {
    console.error('Error accepting trip:', error);
    res.status(500).json({ message: 'Error accepting trip', error: error.stack });
  }
};

// / Driver reject the trip

exports.rejectTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { reason } = req.body;
    const driver = req.user._id; // Assuming the driver is authenticated

    // Debug: Log the driver and trip information
    // console.log('Driver:', driver, 'is rejecting Trip:', tripId);

    // Find the trip
    const trip = await Trip.findById(tripId);
    if (!trip) {
      // Debug: Log if the trip is not found
      // console.log('Trip not found with ID:', tripId);
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Update the trip status to 'Rejected' and add the reason
    trip.status = 'Rejected';
    trip.rejectionReason = reason;
    await trip.save();

    // Debug: Log the trip rejection
    // console.log('Trip rejected:', trip);

    return res.status(200).json({ message: 'Trip rejected successfully', trip });
  } catch (error) {
    // Debug: Log the error
    console.error('Error rejecting trip:', error);
    res.status(500).json({ message: 'Error rejecting trip', error: error.stack });
  }
};
