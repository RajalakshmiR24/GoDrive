const mongoose = require('mongoose');

const driverRideSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'In-Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
    required: true,
  },
  pin: {
    type: String,  // A 4 or 6 digit OTP for verification
    required: true,
  },
  startTime: {
    type: Date,  // Time when the ride starts
  },
  endTime: {
    type: Date,  // Time when the ride ends
  },
  driverEarnings: {
    type: Number,  // Driver's earnings for the ride
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('DriverRide', driverRideSchema);
