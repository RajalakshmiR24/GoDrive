const express = require('express');
const router = express.Router();
const { getBlogs, getAllBlogs } = require('../controllers/blogController');

router.get('/getblogs', getBlogs);
router.get('/getallblogs/:id', getAllBlogs);

module.exports = router;
