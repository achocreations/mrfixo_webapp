const Service = require('../models/Service');
const { errorHandler } = require('../utils/errorHandler');

exports.createService = async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json({ success: true, data: newService });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('worker');
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        errorHandler(error, res);
    }
};

// Add more methods as needed
