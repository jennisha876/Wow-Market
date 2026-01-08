/**
 * Payments Routes
 * Handles payment processing and transactions
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Sample transactions database
const transactions = [];

/**
 * Create payment intent (Stripe/PayPal)
 * POST /api/payments/create-intent
 */

router.post('/create-intent', verifyToken, (req, res) => {
  try {
    const { amount, currency, orderId, paymentMethod } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({ error: 'Amount and order ID are required' });
    }

    // Simulate Stripe/PayPal intent
    const paymentIntent = {
      id: 'pi_' + Math.random().toString(36).substr(2, 9),
      amount,
      currency: currency || 'USD',
      orderId,
      paymentMethod,
      status: 'requires_payment_method',
      clientSecret: 'sk_' + Math.random().toString(36).substr(2, 32)
    };

    res.json({
      message: 'Payment intent created',
      paymentIntent
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Process payment
 * POST /api/payments/process
 */

router.post('/process', verifyToken, (req, res) => {
  try {
    const { orderId, amount, paymentMethod, paymentDetails } = req.body;

    const transaction = {
      id: 'txn_' + Date.now(),
      orderId,
      userId: req.user.id,
      amount,
      currency: 'USD',
      paymentMethod,
      transactionId: 'ch_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'completed',
      createdAt: new Date()
    };

    transactions.push(transaction);

    res.status(201).json({
      message: 'Payment processed successfully',
      transaction
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get transaction history
 * GET /api/payments/history
 */

router.get('/history', verifyToken, (req, res) => {
  const userTransactions = transactions.filter(t => t.userId === req.user.id);
  res.json({ transactions: userTransactions, total: userTransactions.length });
});

/**
 * Refund payment
 * POST /api/payments/refund
 */

router.post('/refund', verifyToken, (req, res) => {
  try {
    const { transactionId, amount, reason } = req.body;

    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }

    const refund = {
      id: 'ref_' + Date.now(),
      transactionId,
      amount,
      reason,
      status: 'completed',
      createdAt: new Date()
    };

    res.json({
      message: 'Refund processed successfully',
      refund
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
