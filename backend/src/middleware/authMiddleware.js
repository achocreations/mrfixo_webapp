const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { promisify } = require('util');
const { jwtSecret } = require('../utils/authConfig');
const logger = require('../utils/logger');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ success: false, message: 'You are not logged in' });
        }
        const decoded = await promisify(jwt.verify)(token, jwtSecret);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({ success: false, message: 'The user no longer exists' });
        }
        req.user = currentUser;
        next();
    } catch (error) {
        logger.error('Not authorized, token failed:', error);
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};
