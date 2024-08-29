const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { jwtSecret } = require('../utils/authConfig');
const { errorHandler } = require('../utils/errorHandler');

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '7d' });
        res.status(201).json({ success: true, token, data: newUser });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        errorHandler(error, res);
    }
};
