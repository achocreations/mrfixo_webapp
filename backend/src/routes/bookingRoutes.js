const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getAllBookings);

module.exports = router;
