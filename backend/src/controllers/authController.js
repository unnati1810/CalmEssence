
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ userId: user.id }, config.secret, { expiresIn: '1h' });

    const confirmationLink = `http://localhost:8080/api/auth/confirm/${token}`;

    await sendEmail(email, 'Email Confirmation', `Click this link to confirm your email: ${confirmationLink}`);

    res.status(201).send({ message: 'Registration successful. Please check your email to confirm your account.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.is_active = true;
    await user.save();

    res.status(200).send({ message: 'Email confirmed successfully. You can now log in.' });
  } catch (error) {
    res.status(500).send({ message: 'Invalid or expired token' });
  }
};

module.exports = { register, confirmEmail };
