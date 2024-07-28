const express = require('express');
const router = express.Router();
const { getBreathingList, createBreathing, updateBreathing } = require('../controllers/breathingController');

router.get('/list', getBreathingList);
router.post('/create', createBreathing);
router.put('/update', updateBreathing);

module.exports = router;
