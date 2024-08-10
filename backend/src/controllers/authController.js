const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');



const register = async (req, res) => {
  const { fullName, email, password, confirmPassword, signupType } = req.body;

  if (!fullName || !email || !password || !confirmPassword || !signupType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const connection = getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (full_Name, email, password, user_type) VALUES (?, ?, ?, ?)`;

    // Using connection.execute for the query with await
    await connection.execute(query, [fullName, email, hashedPassword, signupType]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Email already in use' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const connection = getConnection();
    const sqlQuery = `SELECT * FROM users WHERE email = ${connection.escape(email)}`;

    console.log('SQL Query:', sqlQuery);
    const [results] = await connection.execute(sqlQuery);


    if (results.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        fullName: user.full_Name,
        email: user.email,
        userType: user.user_type,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};



// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: 'calmessence851@gmail.com', // replace with your email
    pass: 'bzer ddgm hrvn tztq', // replace with your email password
  },
});

const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const connection = getConnection();
    const query = `SELECT * FROM users WHERE email = ?`;
    const [results] = await connection.execute(query, [email]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const user = results[0];

    // Generate a new password
    const newPassword = crypto.randomBytes(8).toString('hex');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user’s password in the database
    const updateQuery = `UPDATE users SET password = ? WHERE email = ?`;
    await connection.execute(updateQuery, [hashedPassword, email]);

    // Send the new password via email
    const mailOptions = {
      from: 'calmessence851@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your new password is: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset successfully. Check your email for the new password.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error resetting password' });
  }
};

module.exports = { register, login, resetPassword };