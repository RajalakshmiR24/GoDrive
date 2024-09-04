const Driver = require('../models/driverList');

exports.createDriver = async (req, res) => {
  const { id, name, contact, vehicleNumber, vehicleType, joiningDate } = req.body;

  // Check if all required fields are present
  if (!id || !name || !contact || !vehicleNumber || !vehicleType || !joiningDate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newDriver = new Driver({
      id,
      name,
      contact,
      vehicleNumber,
      vehicleType,
      joiningDate: new Date(joiningDate),
    });

    await newDriver.save();
    res.status(201).json({ message: "Driver created successfully", driver: newDriver });
  } catch (error) {
    console.error('Error creating driver:', error);
    if (error.code === 11000) { // Duplicate key error
      res.status(400).json({ error: "Driver with this ID already exists" });
    } else {
      res.status(500).json({ error: "Failed to create driver", details: error.message });
    }
  }
};

// Controller to handle fetching all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find(); // Fetch all drivers from the database
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: "Failed to fetch drivers", details: error.message });
  }
};
