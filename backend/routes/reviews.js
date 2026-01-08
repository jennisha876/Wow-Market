/**
 * Reviews Routes
 * Handles product reviews and ratings
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Sample reviews database
const reviews = [];

/**
 * Get product reviews
 * GET /api/reviews/product/:productId
 */

router.get('/product/:productId', (req, res) => {
  const productReviews = reviews.filter(r => r.productId === req.params.productId);
  const averageRating = productReviews.length > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : 0;

  res.json({
    productId: req.params.productId,
    reviews: productReviews,
    total: productReviews.length,
    averageRating
  });
});

/**
 * Create review
 * POST /api/reviews
 */

router.post('/', verifyToken, (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating || !title) {
      return res.status(400).json({ error: 'Product ID, rating, and title are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const review = {
      id: 'review_' + Date.now(),
      productId,
      userId: req.user.id,
      rating,
      title,
      comment,
      verified: false,
      helpful: 0,
      unhelpful: 0,
      createdAt: new Date()
    };

    reviews.push(review);

    res.status(201).json({
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update review
 * PUT /api/reviews/:id
 */

router.put('/:id', verifyToken, (req, res) => {
  const review = reviews.find(r => r.id === req.params.id && r.userId === req.user.id);

  if (!review) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const { rating, title, comment } = req.body;

  if (rating) review.rating = rating;
  if (title) review.title = title;
  if (comment) review.comment = comment;
  review.updatedAt = new Date();

  res.json({ message: 'Review updated', review });
});

/**
 * Delete review
 * DELETE /api/reviews/:id
 */

router.delete('/:id', verifyToken, (req, res) => {
  const index = reviews.findIndex(r => r.id === req.params.id && r.userId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Review not found' });
  }

  reviews.splice(index, 1);
  res.json({ message: 'Review deleted' });
});

module.exports = router;
