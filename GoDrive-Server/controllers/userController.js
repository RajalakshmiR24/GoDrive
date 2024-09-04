const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Auth = require('../models/Auth');

// Get user profile by ID (GET)
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('_id', 'name email role');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create new user profile (POST)
exports.createUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, phone } = req.body;

  // Ensure that the user ID exists in the request
  const userExists = await User.findById(req.user._id);
  if (userExists) {
    return res.status(400).json({ message: 'User profile already exists' });
  }

  // Create a new user profile with all required fields
  const newUser = new User({
    _id: req.user._id,  // This assumes the auth record is already created
    firstName,
    lastName,
    address,
    phone,
  });

  const createdUser = await newUser.save();

  res.status(201).json({
    message: 'User profile created',
    user: createdUser,
  });
});


// Update user profile by ID (PUT)
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // Update fields only if provided in the request, otherwise keep existing values
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;

    await user.save();

    const auth = await Auth.findById(req.user._id);
    auth.name = `${user.firstName} ${user.lastName}`;
    auth.email = req.body.email || auth.email;
    if (req.body.password) {
      auth.password = req.body.password;
    }
    await auth.save();

    res.status(200).json({
      message: 'User profile updated',
      user,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

