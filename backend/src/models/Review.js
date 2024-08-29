const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.ObjectId, ref: 'Service', required: true },
    homeowner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
