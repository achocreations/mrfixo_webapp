const GPSLocation = require('../models/GPSLocation');
const { errorHandler } = require('../utils/errorHandler');

exports.saveLocation = async (req, res) => {
    try {
        const newLocation = await GPSLocation.create(req.body);
        res.status(201).json({ success: true, data: newLocation });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.getLocation = async (req, res) => {
    try {
        const location = await GPSLocation.findOne({ user: req.params.userId });
        res.status(200).json({ success: true, data: location });
    } catch (error) {
        errorHandler(error, res);
    }
};
