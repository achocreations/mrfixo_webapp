const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createService, getAllServices } = require('../controllers/serviceController');
const router = express.Router();

router.post('/', protect, createService);
router.get('/', protect, getAllServices);

module.exports = router;
