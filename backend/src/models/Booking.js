const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.ObjectId, ref: 'Service', required: true },
    homeowner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    scheduledDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
