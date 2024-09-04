const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  joiningDate: { type: Date, required: true }
});

const DriverList = mongoose.model('DriverList', driverSchema);

module.exports = DriverList;
