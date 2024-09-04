const mongoose = require('mongoose');

const accessControlSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  driverFullName: {
    type: String,
    required: true,
  },
  driverEmail: {
    type: String,
    required: true,
  },
  driverPhone: {
    type: String,
    required: true,
  },
  driverVehicleRegistration: {
    type: String,
    required: true,
  },
  driverVehicleType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  reviewComments: {
    type: String,
    default: '',
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// Check if the model already exists, if not, create it
module.exports = mongoose.models.AccessControl || mongoose.model('AccessControl', accessControlSchema);
