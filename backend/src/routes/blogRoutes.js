const express = require('express');
const router = express.Router();
const { updateBlog, getBlogs, getBlog } = require('../controllers/blogController');

router.post('/update', updateBlog);
router.get('/all', getBlogs);
router.post('/blog', getBlog);

module.exports = router;