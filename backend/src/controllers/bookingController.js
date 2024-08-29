const Booking = require('../models/Booking');
const Availability = require('../models/Availability');
const { ErrorResponse } = require('../utils/errorHandler');
const logger = require('../utils/logger');

exports.createBooking = async (req, res) => {
    try {
        const { serviceId, providerId, date, time } = req.body;
    
        const availability = await Availability.findOne({
          provider: providerId,
          dayOfWeek: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
          startTime: { $lte: time },
          endTime: { $gte: time },
        });
    
        if (!availability) {
          return res.status(400).json({ message: 'Provider is not available at this time' });
        }
    
        const booking = await Booking.create({
          user: req.user._id,
          service: serviceId,
          provider: providerId,
          date,
          time,
        });
    
        res.status(201).json({success: true, data: booking });
      } catch (error) {
        logger.error(`Error in createBooking:, ${error.message}`);
        next(new ErrorResponse(`Error setting availability: ${error.message}`, 500))
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('service homeowner');
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        errorHandler(error, res);
    }
};

