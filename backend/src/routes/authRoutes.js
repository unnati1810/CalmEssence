const express = require('express');
const router = express.Router();
const { register, confirmEmail } = require('../controllers/authController');


router.post('/register', register);
router.get('/confirm/:token', confirmEmail);

module.exports = router;