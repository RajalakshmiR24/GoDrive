// controllers/earningsController.js
const Earnings = require('../models/Earnings');
const Driver = require('../models/Driver');

// Controller to fetch the earnings for the logged-in driver
const getDriverEarnings = async (req, res) => {
    const userId = req.user._id; // Extract user ID from JWT
  
    try {
      // Find the driver associated with the authenticated user
      const driver = await Driver.findOne({ user: userId });
      if (!driver) {
        return res.status(404).json({ message: 'Driver not found' });
      }
  
      // Fetch earnings associated with the driver
      const earnings = await Earnings.findOne({ driver: driver._id });
      if (!earnings) {
        return res.status(404).json({ message: 'Earnings not found for this driver' });
      }
  
      // Check if earnings are zero
      if (earnings.walletBalance === 0 && 
          earnings.dailyEarnings === 0 && 
          earnings.totalOrderEarnings === 0) {
        return res.status(200).json({
          message: 'Driver has no earnings',
          earnings,
          status: 'No earnings',
        });
      }
  
      // If earnings are not zero, return earnings as normal
      res.status(200).json(earnings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching earnings', error: error.message });
    }
  };
  

// Controller to update earnings for the logged-in driver (e.g., after completing an order)
const updateDriverEarnings = async (req, res) => {
  const userId = req.user._id; // Extract user ID from JWT
  const { dailyEarnings, weeklyEarnings, totalOrderEarnings, walletBalance } = req.body;

  try {
    // Find the driver associated with the authenticated user
    const driver = await Driver.findOne({ user: userId });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Find the earnings record for the driver and update the values
    const earnings = await Earnings.findOneAndUpdate(
      { driver: driver._id },
      {
        dailyEarnings,
        weeklyEarnings,
        totalOrderEarnings,
        walletBalance,
      },
      { new: true, upsert: true }
    );

    res.status(200).json(earnings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating earnings', error: error.message });
  }
};

module.exports = {
  getDriverEarnings,
  updateDriverEarnings,
};
