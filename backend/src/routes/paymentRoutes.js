const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createPayment, getAllPayments } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', protect, createPayment);
router.get('/', protect, getAllPayments);

module.exports = router;
