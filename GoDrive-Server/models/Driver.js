const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth', // Reference to the Auth model for user authentication
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  dob: { type: Date },
  licenseNumber: { type: String },
  licenseExpiry: { type: Date },
  vehicleMake: { type: String },
  vehicleModel: { type: String },
  vehicleYear: { type: Number },
  vehicleRegistration: { type: String },
  insurancePolicy: { type: String },
  drivingExperience: { type: Number },
  accidents: { type: Number },
  trafficViolations: { type: Number },
  profilePicture: { type: String }, // Path to the uploaded profile picture
  verified: { type: Boolean, default: false }, // Indicates if the application is verified
  rejectionComments: { type: String, default: '' }, // Field to store rejection comments
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Driver', driverSchema);
