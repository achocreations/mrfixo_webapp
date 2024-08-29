// utils/authConfig.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'your-default-secret',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',  // Default to 1 hour if not specified
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',  // Default to 7 days
};

module.exports = authConfig;
