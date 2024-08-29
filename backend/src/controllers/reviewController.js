const Review = require('../models/Review');
const { errorHandler } = require('../utils/errorHandler');

exports.createReview = async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        res.status(201).json({ success: true, data: newReview });
    } catch (error) {
        errorHandler(error, res);
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('service homeowner');
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        errorHandler(error, res);
    }
};
