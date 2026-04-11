require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};
