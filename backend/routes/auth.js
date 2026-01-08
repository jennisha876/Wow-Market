/**
 * Authentication Routes
 * Handles user registration, login, and session management
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * User Registration
 * POST /api/auth/register
 */

router.post('/register', async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // In production, save to database
    const user = {
      id: 'user_' + Date.now(),
      email,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user',
      createdAt: new Date()
    };

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email, username, firstName, lastName },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * User Login
 * POST /api/auth/login
 */

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // In production, query database
    // For demo: simulate user
    const user = {
      id: 'user_123',
      email: email,
      username: email.split('@')[0],
      role: 'user'
    };

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * User Logout
 * POST /api/auth/logout
 */

router.post('/logout', (req, res) => {
  // Token is typically invalidated on client-side by removing from localStorage
  res.json({ message: 'Logout successful' });
});

/**
 * Verify Token
 * GET /api/auth/verify
 */

router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

/**
 * Refresh Token
 * POST /api/auth/refresh
 */

router.post('/refresh', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, username: decoded.username, role: decoded.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
