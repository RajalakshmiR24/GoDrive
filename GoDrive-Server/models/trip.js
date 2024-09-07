const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  forWhom: {
    type: String,
    enum: ['For me', 'For someone else'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Requested', 'Accepted', 'In-Progress', 'Completed', 'Cancelled'],
    default: 'Requested',
    required: true,
  },
  otp: {
    type: String,
    default: null, // OTP will be generated when the driver accepts the ride
  },
});

module.exports = mongoose.model('Trip', tripSchema);
