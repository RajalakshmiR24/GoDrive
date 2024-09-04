// / Define TripList schema that references Trip
const mongoose = require('mongoose');

const tripListSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip', // Reference to the Trip schema
    required: true,
  },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  tripDate: { type: Date, required: true },
  tripTime: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'completed', 'canceled', 'confirmed'] },
}, { timestamps: true });

const TripList = mongoose.model('TripList', tripListSchema);

module.exports = TripList;