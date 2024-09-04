const asyncHandler = require('express-async-handler');
const User = require('../models/Auth');
const Driver = require('../models/Driver');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/emailService');
const { verifyEmailTemplate, passwordResetTemplate } = require('../emails/templates/verifyEmailTemplate');
const crypto = require('crypto');
const { validatePassword } = require('../utils/validation');
const dotenv = require('dotenv');
dotenv.config();


// Function to generate a 4-digit OTP
const generateOTP = () => crypto.randomInt(1000, 9999).toString();
const generateResetToken = () => crypto.randomBytes(32).toString('hex');

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate password format
  if (!validatePassword(password)) {
    return res.status(400).json({
      message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character',
    });
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(200).json({ message: 'User already exists, please sign in', userExists: true });
  }

  // Generate OTP and create user with initial verification status
  const otp = generateOTP();
  const user = await User.create({
    name,
    email,
    password, // Password will be hashed in the schema pre-save hook
    role,
    otp,
    otpCreatedAt: Date.now(),
    isVerified: false, // Initial verification status
  });

  if (user) {
    // Send verification email
    await sendEmail(user.email, 'Email Verification', verifyEmailTemplate(otp, role));

    // Respond with success message and token
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role, user.name, user.email),
      message: 'A verification email has been sent to your email address.',
    });
  } else {
    return res.status(400).json({ message: 'Invalid user data' });
  }
});


// @desc Verify OTP
// @route POST /api/auth/verify-otp
// @access Public
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If user is already verified
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: 'User is already verified' });
    }

    // If OTP does not match or expired
    const otpExpiration = new Date(user.otpCreatedAt).getTime() + 2 * 60 * 1000;
    if (user.otp !== otp || Date.now() > otpExpiration) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Clear OTP and mark user as verified
    user.otp = null;
    user.isVerified = true;
    await user.save();

    // Respond with success message
    res.json({ success: true, message: 'OTP verified successfully', role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @desc Authenticate user
// @route POST /api/auth/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists and is verified
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "User not registered or not verified" });
    }

    // Validate the plain text password against the hashed password
    if (!(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Additional logic for driver verification
    let verified = true;
    if (user.role === 'driver') {
      const driver = await Driver.findOne({ user: user._id });
      if (!driver || !driver.verified) {
        verified = false;
      }
    }

    // Generate the auth token and send the response
    const token = generateToken(user._id, user.role, user.name, user.email);
    res.json({
      message: "Login successful",
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      id: user._id,
      verified,
      redirectTo: verified ? "dutyPage" : "driverPage",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// @desc Forgot Password
// @route POST /api/auth/forgot-password
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    // Ensure CLIENT_URL is set in environment variables, or fallback to a default URL
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetURL = `${clientUrl}/resetpassword/${resetToken}`;
    await sendEmail(user.email, "Password Reset", passwordResetTemplate(resetURL));

    res.json({ message: "Password reset link sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Reset Password
// @route POST /api/auth/reset-password
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check if the new password is the same as the old password
    if (newPassword === user.password) {
      return res.status(400).json({ message: "New password must be different from the old password" });
    }

    // Save the new password directly (as plain text)
    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save(); // Update user's password in the database

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc Resend OTP
// @route POST /api/auth/resend-otp
// @access Public
const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpCreatedAt = Date.now();
    await user.save();

    await sendEmail(user.email, "Resend OTP", verifyEmailTemplate(otp));

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { registerUser, forgotPassword, verifyOTP, authUser, resetPassword, resendOTP };
