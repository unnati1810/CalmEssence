const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);


//
// router.get('/confirm/:token', async (req, res) => {
//     try {
//       const { token } = req.params;
//       const { email } = jwt.verify(token, config.secret);
//
//       await db.query('UPDATE Users SET is_active = true WHERE email = ?', [email]);
//
//       res.status(200).send('Email confirmed. You can now login.');
//     } catch (error) {
//       console.error(error);
//       res.status(400).send('Invalid or expired token.');
//     }
//   });

module.exports = router;