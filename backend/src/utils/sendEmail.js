const nodemailer = require('nodemailer');
const config = require('../config/emailConfig');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: config.email.user,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
