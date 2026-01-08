# Wow Market Backend - Quick Start Guide

## 🚀 Get Backend Running in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- PostgreSQL installed and running
- Git installed

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wow_market_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email (for testing, use Mailtrap or Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Stripe
STRIPE_KEY=sk_test_your_stripe_key_here
STRIPE_PUBLIC_KEY=pk_test_your_public_key_here

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret

# App URLs
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:8000
```

### Step 3: Create Database
```bash
# Login to PostgreSQL
psql -U postgres

# In PostgreSQL terminal:
CREATE DATABASE wow_market_db;
\c wow_market_db
```

### Step 4: Initialize Database Schema
```bash
# Run the database initialization script (create this file next)
# For now, connect to the database and run the SQL from backend/models/schema.js
```

### Step 5: Start Backend Server
```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║          WOW MARKET API SERVER STARTED                     ║
║          Version: 1.0.0                                    ║
║          Environment: development                          ║
║          Port: 5000                                        ║
║          URL: http://localhost:5000                        ║
╚════════════════════════════════════════════════════════════╝
```

### Step 6: Test API
```bash
# Health Check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Step 7: Connect Frontend to Backend
Update frontend pages to call the backend API. Example for Wow-Market.html:

```javascript
// Add to Wow-Market.html in a <script> tag
async function searchProducts(query) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/products/search?q=${query}`
    );
    const data = await response.json();
    console.log('Search results:', data);
    // Display results on page
  } catch (error) {
    console.error('Search failed:', error);
  }
}
```

---

## 📁 Project Structure

```
backend/
├── server.js                 # Express server
├── package.json              # Dependencies
├── .env                      # Environment config (create from .env.example)
├── .env.example              # Environment template
├── API_DOCUMENTATION.md      # Full API docs
├── QUICKSTART.md            # This file
│
├── models/
│   └── schema.js            # Database schemas
│
├── routes/
│   ├── auth.js              # Authentication endpoints
│   ├── products.js          # Product CRUD & search
│   ├── orders.js            # Order management
│   ├── users.js             # User profiles
│   ├── reviews.js           # Reviews & ratings
│   ├── inventory.js         # Stock management
│   └── payments.js          # Payment processing
│
├── middleware/
│   └── auth.js              # JWT verification
│
├── config/
│   └── (database config)
│
└── database.sql            # SQL schema (create tables)

admin/
└── dashboard.html          # Admin panel
```

---

## 🔑 API Key Setup

### Stripe
1. Go to https://dashboard.stripe.com/apikeys
2. Copy your test API key
3. Add to `.env` as `STRIPE_KEY=sk_test_...`

### PayPal
1. Go to https://developer.paypal.com/dashboard
2. Create a new app
3. Copy Client ID and Secret
4. Add to `.env`

### Gmail SMTP
1. Go to https://myaccount.google.com/security
2. Enable 2-factor authentication
3. Create an "App Password" for Gmail
4. Add to `.env` as `SMTP_PASS=...`

---

## 📊 Database Schema

The system uses 7 main tables:

1. **users** - User accounts and profiles
2. **products** - Product catalog
3. **orders** - Customer orders
4. **reviews** - Product reviews and ratings
5. **inventory** - Stock management
6. **carts** - Shopping carts
7. **payments** - Transaction records

See `backend/models/schema.js` for detailed field definitions.

---

## 🧪 Testing Endpoints

### Admin Login (Create Admin User First)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get Orders (Requires Token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/orders
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": 1,
        "quantity": 2,
        "price": 50
      }
    ],
    "totalAmount": 100,
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Kingston",
      "country": "Jamaica",
      "zipCode": "12345"
    },
    "paymentMethod": "stripe"
  }'
```

---

## 🐛 Common Issues

**Port 5000 already in use:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with the number)
taskkill /PID 12345 /F
```

**Database connection failed:**
- Ensure PostgreSQL is running
- Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD in `.env`
- Verify database exists: `CREATE DATABASE wow_market_db;`

**JWT token errors:**
- Regenerate JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Add to `.env`

---

## 📚 Next Steps

1. **Create Frontend Login Page** - `login.html`
2. **Add Product Filtering** - Update Wow-Market.html with category/price filters
3. **Implement Shopping Cart** - Use localStorage + API calls
4. **Add Checkout Flow** - Connect purchase.html to orders API
5. **Admin Dashboard** - Implement JavaScript for admin/dashboard.html

---

## 🔗 Resources

- API Docs: `/backend/API_DOCUMENTATION.md`
- GitHub: https://github.com/jennisha876/Wow-Market
- Frontend URL: http://localhost:8000
- Backend URL: http://localhost:5000

---

**Version:** 1.0.0  
**Created:** 2022 | **Updated:** 2026  
**Authors:** Jennisha Smith, Shani Parchment, Alethea Robinson, Lemard Sterling
