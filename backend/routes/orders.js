/**
 * Orders Routes
 * Handles order creation, tracking, and management
 */

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Sample orders database
const orders = [];

/**
 * Create new order
 * POST /api/orders
 */

router.post('/', verifyToken, (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, billingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain items' });
    }

    const order = {
      id: 'order_' + Date.now(),
      orderNumber: `WOW-${Date.now()}`,
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending',
      trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      createdAt: new Date()
    };

    orders.push(order);

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user orders
 * GET /api/orders
 */

router.get('/', verifyToken, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json({ orders: userOrders, total: userOrders.length });
});

/**
 * Get order by ID
 * GET /api/orders/:id
 */

router.get('/:id', verifyToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
});

/**
 * Update order status (Admin only)
 * PATCH /api/orders/:id/status
 */

router.patch('/:id/status', verifyToken, (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  order.updatedAt = new Date();

  res.json({ message: 'Order status updated', order });
});

/**
 * Track order
 * GET /api/orders/:id/track
 */

router.get('/:id/track', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const tracking = {
    orderNumber: order.orderNumber,
    trackingNumber: order.trackingNumber,
    status: order.status,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    timeline: [
      { status: 'Order Placed', date: order.createdAt, completed: true },
      { status: 'Processing', date: new Date(Date.now() + 1 * 60 * 60 * 1000), completed: order.status !== 'pending' },
      { status: 'Shipped', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: order.status === 'shipped' || order.status === 'delivered' },
      { status: 'Delivered', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), completed: order.status === 'delivered' }
    ]
  };

  res.json(tracking);
});

module.exports = router;
