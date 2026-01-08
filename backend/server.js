/**
 * Wow Market Backend Server
 * Created: 2022
 * Updated: 2026 by Jennisha Smith
 * Authors: Jennisha Smith, Shani Parchment, Alethea Robinson, Lemard Sterling
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/payments', require('./routes/payments'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Wow Market API is running',
    timestamp: new Date(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found',
      status: 404,
      path: req.path
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║          🛒 Wow Market Backend Server                    ║
╠══════════════════════════════════════════════════════════╣
║ Server running on: http://localhost:${PORT}              
║ Environment: ${process.env.NODE_ENV || 'development'}                         
║ Database: ${process.env.DB_NAME || 'wow_market_db'}      
║ Created: 2022 | Updated: 2026                            
╚══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
