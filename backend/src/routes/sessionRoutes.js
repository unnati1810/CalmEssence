const express = require('express');
const router = express.Router();
const { createSession, editSession, getSessionList } = require('../controllers/sessionController');

router.post('/create', createSession);
router.post('/edit', editSession);
router.get('/list', getSessionList);

module.exports = router;
