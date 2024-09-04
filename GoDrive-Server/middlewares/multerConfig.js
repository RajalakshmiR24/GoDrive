const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename using the current timestamp
  },
});

// Set up Multer filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file if it's an image
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false); // Reject the file otherwise
  }
};

// Initialize Multer middleware with storage, filter, and size limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
});

module.exports = upload;
