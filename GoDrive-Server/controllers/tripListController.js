const TripList = require('../models/tripList'); // Adjust the path to your model

// Controller function to get all trip lists
async function getAllTripLists(req, res) {
  try {
    // Find all trip lists and populate the referenced trip data
    const tripLists = await TripList.find().populate('trip').exec();

    // Send the retrieved trip lists as a JSON response
    res.status(200).json(tripLists);
  } catch (error) {
    // Handle errors and send a response with an error message
    console.error('Error fetching trip lists:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getAllTripLists,
};
