/**
 * Inventory Routes
 * Handles inventory and stock management
 */

const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Sample inventory database
const inventory = [
  { productId: 1, quantity: 50, reserved: 10, available: 40, minStock: 5 },
  { productId: 2, quantity: 25, reserved: 5, available: 20, minStock: 5 },
  { productId: 3, quantity: 15, reserved: 3, available: 12, minStock: 10 }
];

/**
 * Get inventory for product
 * GET /api/inventory/:productId
 */

router.get('/:productId', (req, res) => {
  const item = inventory.find(i => i.productId === parseInt(req.params.productId));

  if (!item) {
    return res.status(404).json({ error: 'Inventory not found' });
  }

  res.json(item);
});

/**
 * Get all inventory (Admin)
 * GET /api/inventory
 */

router.get('/', verifyToken, verifyAdmin, (req, res) => {
  res.json({ inventory, total: inventory.length });
});

/**
 * Update inventory (Admin)
 * PATCH /api/inventory/:productId
 */

router.patch('/:productId', verifyToken, verifyAdmin, (req, res) => {
  try {
    const { quantity, reserved, minStock, maxStock } = req.body;
    const item = inventory.find(i => i.productId === parseInt(req.params.productId));

    if (!item) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    if (quantity !== undefined) item.quantity = quantity;
    if (reserved !== undefined) item.reserved = reserved;
    if (minStock !== undefined) item.minStock = minStock;
    if (maxStock !== undefined) item.maxStock = maxStock;

    item.available = item.quantity - item.reserved;
    item.updatedAt = new Date();

    res.json({ message: 'Inventory updated', item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get low stock alerts (Admin)
 * GET /api/inventory/alerts/low-stock
 */

router.get('/alerts/low-stock', verifyToken, verifyAdmin, (req, res) => {
  const lowStockItems = inventory.filter(i => i.available <= i.minStock);
  res.json({ alerts: lowStockItems, count: lowStockItems.length });
});

module.exports = router;
