const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { saveLocation, getLocation } = require('../controllers/gpsController');
const router = express.Router();

router.post('/', protect, saveLocation);
router.get('/:userId', protect, getLocation);

module.exports = router;
