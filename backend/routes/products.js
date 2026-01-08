/**
 * Products Routes
 * Handles product listing, details, search, and filtering
 */

const express = require('express');
const router = express.Router();

// Sample products database
const products = [
  { id: 1, name: 'Black Laced Heels', price: 20, category: 'shoes', rating: 5, reviews: 42 },
  { id: 2, name: 'Nike Air Max Pro', price: 129.99, category: 'shoes', rating: 4.8, reviews: 128 },
  { id: 3, name: 'PlayStation 5', price: 499.99, category: 'electronics', rating: 4.9, reviews: 245 },
  { id: 4, name: 'Gaming Laptop', price: 899.99, category: 'electronics', rating: 4.7, reviews: 89 },
  { id: 5, name: 'Multivitamin Pack', price: 22.99, category: 'pharmacy', rating: 4.5, reviews: 156 }
];

/**
 * Get all products with filters
 * GET /api/products?category=shoes&sort=price
 */

router.get('/', (req, res) => {
  let filtered = [...products];

  // Filter by category
  if (req.query.category) {
    filtered = filtered.filter(p => p.category === req.query.category);
  }

  // Sort
  if (req.query.sort === 'price') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (req.query.sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  res.json({ products: filtered, total: filtered.length });
});

/**
 * Get product by ID
 * GET /api/products/:id
 */

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

/**
 * Search products
 * GET /api/products/search?q=heels
 */

router.get('/search', (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ error: 'Search query required' });
  }

  const results = products.filter(p => p.name.toLowerCase().includes(query));
  res.json({ results, total: results.length });
});

module.exports = router;
