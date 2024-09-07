// models/Earnings.js
const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver', // Reference to the Driver model
    required: true,
  },
  date: { type: Date, default: Date.now }, // Date of the earnings entry
  dailyEarnings: { type: Number, default: 0 }, // Daily earnings
  weeklyEarnings: { type: Number, default: 0 }, // Weekly earnings
  totalOrderEarnings: { type: Number, default: 0 }, // Total order earnings
  walletBalance: { type: Number, default: 0 }, // GoDrive wallet balance
});

module.exports = mongoose.model('Earnings', earningsSchema);
