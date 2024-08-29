const express = require('express');
const {
  setAvailability,
  updateAvailability,
  getAvailabilityByProvider,
} = require('../controllers/availabilityController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, setAvailability);
router.put('/:id', protect, updateAvailability);
router.get('/:providerId', getAvailabilityByProvider);

module.exports = router;
