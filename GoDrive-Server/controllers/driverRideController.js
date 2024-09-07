const DriverRide = require('../models/driverRide');  // The DriverRide model
const Trip = require('../models/trip');  // The Trip model
const Driver = require('../models/Driver');  // The Driver model

// Create a new ride (accept a trip request)
exports.createRide = async (req, res) => {
  try {
    const { tripId, driverId, userId, pin } = req.body;

    // Ensure the Trip and Driver exist
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    const driver = await Driver.findById(driverId);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    // Create a new DriverRide
    const newRide = new DriverRide({
      trip: tripId,
      driver: driverId,
      userId,  // Include the user ID
      pin,  // You could generate this dynamically if needed
      status: 'Pending',
    });

    await newRide.save();
    res.status(201).json(newRide);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Start the ride by verifying the OTP
exports.startRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { otp } = req.body; // Driver enters the OTP

    // Find the ride
    const driverRide = await DriverRide.findById(rideId).populate('trip');
    if (!driverRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Check if the OTP matches
    if (driverRide.pin !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Update ride and trip status to "In-Progress"
    driverRide.status = 'In-Progress';
    driverRide.startTime = Date.now();
    await driverRide.save();

    const trip = await Trip.findById(driverRide.trip._id);
    trip.status = 'In-Progress';
    await trip.save();

    return res.status(200).json({ message: 'Ride started successfully', driverRide });
  } catch (error) {
    return res.status(500).json({ message: 'Error starting ride', error });
  }
};

// Complete the ride
exports.completeRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    // Find the ride
    const driverRide = await DriverRide.findById(rideId).populate('trip');
    if (!driverRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Update ride and trip status to "Completed"
    driverRide.status = 'Completed';
    driverRide.endTime = Date.now();
    driverRide.driverEarnings = req.body.driverEarnings || driverRide.driverEarnings;
    await driverRide.save();

    const trip = await Trip.findById(driverRide.trip._id);
    trip.status = 'Completed';
    await trip.save();

    return res.status(200).json({ message: 'Ride completed successfully', driverRide });
  } catch (error) {
    return res.status(500).json({ message: 'Error completing ride', error });
  }
};

// Cancel the ride
exports.cancelRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    // Find the ride
    const driverRide = await DriverRide.findById(rideId).populate('trip');
    if (!driverRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    // Update ride and trip status to "Cancelled"
    driverRide.status = 'Cancelled';
    await driverRide.save();

    const trip = await Trip.findById(driverRide.trip._id);
    trip.status = 'Cancelled';
    await trip.save();

    return res.status(200).json({ message: 'Ride cancelled successfully', driverRide });
  } catch (error) {
    return res.status(500).json({ message: 'Error cancelling ride', error });
  }
};

// Get ride details by ID
exports.getRideDetails = async (req, res) => {
  try {
    const { rideId } = req.params;

    // Find the ride and populate related trip and driver data
    const driverRide = await DriverRide.findById(rideId)
      .populate('trip')
      .populate('driver');

    if (!driverRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    return res.status(200).json(driverRide);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching ride details', error });
  }
};
