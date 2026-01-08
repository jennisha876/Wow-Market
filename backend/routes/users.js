/**
 * Users Routes
 * Handles user profile management
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Sample users database
const users = {};

/**
 * Get user profile
 * GET /api/users/profile
 */

router.get('/profile', verifyToken, (req, res) => {
  const user = users[req.user.id] || {
    id: req.user.id,
    email: req.user.email,
    username: req.user.username,
    role: req.user.role,
    createdAt: new Date()
  };

  res.json(user);
});

/**
 * Update user profile
 * PUT /api/users/profile
 */

router.put('/profile', verifyToken, (req, res) => {
  try {
    const { firstName, lastName, phone, address, city, country, zipCode } = req.body;

    const user = users[req.user.id] || { id: req.user.id };

    Object.assign(user, { firstName, lastName, phone, address, city, country, zipCode, updatedAt: new Date() });
    users[req.user.id] = user;

    res.json({ message: 'Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user orders
 * GET /api/users/orders
 */

router.get('/orders', verifyToken, (req, res) => {
  // Orders would be queried from database
  res.json({ orders: [], total: 0 });
});

/**
 * Get user wishlist
 * GET /api/users/wishlist
 */

router.get('/wishlist', verifyToken, (req, res) => {
  res.json({ wishlist: [], total: 0 });
});

/**
 * Add to wishlist
 * POST /api/users/wishlist/:productId
 */

router.post('/wishlist/:productId', verifyToken, (req, res) => {
  res.json({ message: 'Item added to wishlist' });
});

/**
 * Get user reviews
 * GET /api/users/reviews
 */

router.get('/reviews', verifyToken, (req, res) => {
  res.json({ reviews: [], total: 0 });
});

module.exports = router;
