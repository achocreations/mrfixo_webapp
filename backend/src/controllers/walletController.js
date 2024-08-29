const Wallet = require('../models/Wallet');
const logger = require('../utils/logger');
const { ErrorResponse } = require('../utils/errorHandler');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.status(200).json(wallet);
  } catch (error) {
    logger.error(`Error in getWallet: ${error.message}`);
    next(new ErrorResponse(`Server error: ${error.message}`, 500))
  }
};

exports.addFunds = async (req, res) => {
  try {
    const { amount, transactionId } = req.body;

    let wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      wallet = await Wallet.create({
        user: req.user._id,
        balance: amount,
        transactions: [{
          transactionId,
          amount,
          type: 'credit',
          status: 'completed',
        }],
      });
    } else {
      wallet.balance += amount;
      wallet.transactions.push({
        transactionId,
        amount,
        type: 'credit',
        status: 'completed',
      });
      await wallet.save();
    }

    res.status(200).json(wallet);
  } catch (error) {
    logger.error(`Error in addFunds: ${error.message}`);
    next(new ErrorResponse(`Server error: ${error.message}`, 500))
  }
};

exports.makePayment = async (req, res) => {
  try {
    const { amount, transactionId } = req.body;

    let wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    wallet.balance -= amount;
    wallet.transactions.push({
      transactionId,
      amount,
      type: 'debit',
      status: 'completed',
    });
    await wallet.save();

    res.status(200).json(wallet);
  } catch (error) {
    logger.error(`Error in makePayment: ${error.message}`);
    next(new ErrorResponse(`Server: ${error.message}`, 500))
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.status(200).json(wallet.transactions);
  } catch (error) {
    logger.error('Error in getTransactionHistory:', error);
    next(new ErrorResponse(`Server: ${error.message}`, 500))
  }
};
