const Payment = require('../models/Payment');
const { errorHandler } = require('../utils/errorHandler');

exports.createPayment = async (req, res) => {
    try {
        const newPayment = await Payment.create(req.body);
        res.status(201).json({ success: true, data: newPayment });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('booking');
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        errorHandler(error, res);
    }
};
