const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createReview, getAllReviews } = require('../controllers/reviewController');
const router = express.Router();

router.post('/', protect, createReview);
router.get('/', protect, getAllReviews);

module.exports = router;
