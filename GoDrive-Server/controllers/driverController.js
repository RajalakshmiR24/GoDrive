const asyncHandler = require("express-async-handler");
const Driver = require("../models/Driver");
const Auth = require("../models/Auth");
const AccessControl = require('../models/accessControl'); // Adjust the path as needed

// Function to create a driver profile
const createDriver = asyncHandler(async (req, res) => {
  const { _id } = req.user; // Extract user ID from JWT
  const driverExists = await Driver.findOne({ user: _id }); // Check if driver already exists for this user

  if (driverExists) {
    return res.status(400).json({ message: "Driver already exists" });
  }

  const profilePicture = req.file ? req.file.path : null; // Get the file path of the uploaded profile picture
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    licenseNumber,
    licenseExpiry,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehicleRegistration,
    insurancePolicy,
    drivingExperience,
    accidents,
    trafficViolations,
  } = req.body;

  const newDriverData = {
    user: _id, // Link the driver to the authenticated user
    firstName,
    lastName,
    email,
    phone,
    dob,
    licenseNumber,
    licenseExpiry,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    vehicleRegistration,
    insurancePolicy,
    drivingExperience,
    accidents,
    trafficViolations,
    profilePicture,
  };

  try {
    // Create and save the new driver profile
    const newDriver = new Driver(newDriverData);
    const driver = await newDriver.save();

    // Return the driver's ID to the frontend
    res.status(201).json({ driverId: driver._id });

    // Create and save a new access control record for this driver
    const newAccessControl = new AccessControl({
      driver: driver._id,
      driverFullName: `${firstName} ${lastName}`,
      driverEmail: email,
      driverPhone: phone,
      driverVehicleRegistration: vehicleRegistration,
      driverVehicleType: `${vehicleMake} ${vehicleModel}`,
      status: "Pending",
    });
    await newAccessControl.save();
  } catch (error) {
    res.status(500).json({
      message: "Failed to create driver profile",
      error: error.message,
    });
  }
});

const getDriverById = async (req, res) => {
  console.log(req.params, req.user);
  
  const userId = req.user._id; // Extract user ID from JWT

  try {
    const driver = await Driver.findOne({ user: userId }); // Find the driver by the associated user ID
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver data', error: error.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find(); // Find all drivers in the database
    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ message: 'No drivers found' });
    }
    res.status(200).json(drivers); // Return the list of drivers
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers data', error: error.message });
  }
};


const updateDriverProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from JWT
    const updatedData = req.body; // Get updated data from request body

    // Find the driver by the associated user ID and update with new data
    const updatedDriver = await Driver.findOneAndUpdate(
      { user: userId },
      {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        phone: updatedData.phone,
        email: updatedData.email,
        licenseNumber: updatedData.licenseNumber,
        vehicleMake: updatedData.vehicleMake,
        vehicleModel: updatedData.vehicleModel,
        vehicleYear: updatedData.vehicleYear,
        vehicleRegistration: updatedData.vehicleRegistration,
        insurancePolicy: updatedData.insurancePolicy,
        drivingExperience: updatedData.drivingExperience,
        accidents: updatedData.accidents,
        trafficViolations: updatedData.trafficViolations,
        verified: updatedData.verified, // Update verification status if necessary
      },
      { new: true } // Option to return the updated document
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    return res.status(200).json({
      message: 'Driver profile updated successfully',
      driver: updatedDriver,
    });
  } catch (error) {
    console.error('Error updating driver profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};



const checkStatus = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from authenticated user
    const driver = await Driver.findOne({ user: userId });

    if (driver) {
      // If the driver application exists, return the driverId with a status of 201
      res.status(201).json({ exists: true, driverId: driver._id });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking driver status:", error);
    res.status(500).json({ message: "Server error" });
  }
});



const checkVerificationStatus = asyncHandler(async (req, res) => {
  
  try {
    const driver = await Driver.findById(req.params.driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver application not verified" });
    }
    
    if (driver.verified) {
      res.json({ verified: driver.verified });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// const checkVerificationStatus = asyncHandler(async (req, res) => {
//   try {
//     const driver = await Driver.findById(req.params.driverId);

//     if (!driver) {
//       return res.status(404).json({ message: "Driver application not found" });
//     }

//     if (driver.verified) {
//       res.json({ verified: driver.verified = true });
//     } else {
//       res.json({
//         verified: driver.verified = false,
//         rejectionComments: driver.rejectionComments || 'No comments available',
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


module.exports = {
  createDriver,
  getDriverById,
  getDrivers,
  updateDriverProfile,
  checkStatus,
  checkVerificationStatus,
};
