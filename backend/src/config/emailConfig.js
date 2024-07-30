module.exports = {
    secret: process.env.JWT_SECRET, 
    email: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  };
  