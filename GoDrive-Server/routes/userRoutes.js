const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Routes for user profile management
router.route('/')
  .get(protect, getUserProfile)  // GET user profile
  .post(protect, createUserProfile)  // POST (create) user profile
  .put(protect, updateUserProfile);  // PUT (update) user profile

module.exports = router;
