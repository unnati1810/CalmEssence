const express = require('express');
const router = express.Router();
const { createSession, editSession, getSessionList, contactUS} = require('../controllers/sessionController');

router.post('/create', createSession);
router.post('/edit', editSession);
router.get('/list', getSessionList);
router.post('/contact-us', contactUS);

module.exports = router;
