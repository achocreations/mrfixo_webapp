const express = require('express');
const {
  getWallet,
  addFunds,
  makePayment,
  getTransactionHistory,
} = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getWallet);
router.post('/add-funds', protect, addFunds);
router.post('/make-payment', protect, makePayment);
router.get('/transactions', protect, getTransactionHistory);

module.exports = router;
