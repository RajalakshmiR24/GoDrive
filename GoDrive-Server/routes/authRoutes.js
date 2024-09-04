const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  authUser, 
  verifyOTP, 
  resendOTP,  
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/verify-otp').post(verifyOTP);
router.route('/resend-otp').post(resendOTP);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;
