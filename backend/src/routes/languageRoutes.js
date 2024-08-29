const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { translate, getAllTranslations } = require('../controllers/languageController');
const router = express.Router();

router.post('/translate', protect, translate);
router.get('/', protect, getAllTranslations);

module.exports = router;
