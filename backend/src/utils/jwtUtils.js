const jwt = require('jsonwebtoken');
const logger = require('./logger');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error('Error in verifyToken:', error);
    throw new Error('Invalid token');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
