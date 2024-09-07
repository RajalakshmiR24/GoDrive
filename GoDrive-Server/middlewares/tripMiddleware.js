const Trip = require('../models/trip');

// Middleware to get trip by ID
exports.getTripByIdMiddleware = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    req.trip = trip; // Attach the trip to the request object
    next(); // Proceed to the next middleware/handler
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a specific trip by ID
exports.updateTrip = async (req, res) => {
  const { pickupLocation, dropLocation } = req.body;

  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      { pickupLocation, dropLocation },
      { new: true } // Return the updated document
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
