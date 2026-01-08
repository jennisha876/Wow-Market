# 🛒 Wow Market - E-Commerce Platform

## Project Overview
Wow Market is a modern, fully-responsive e-commerce platform featuring multiple product categories including shoes, electronics, pharmacy items, and pet supplies.

---

## 📋 Project Information

**Project Name:** Wow Market  
**Repository:** https://github.com/jennisha876/Wow-Market  
**Logo:** Business_Logo-removebg-preview.png

### Timeline
- **Created:** 2022
- **Original Creators:** 
  - Jennisha Smith
  - Shani Parchment
  - Alethea Robinson
  - Lemard Sterling

- **Updated:** 2026
- **Current Maintainer:** Jennisha Smith

---

## 🎨 Design Features

### Modern Dark Theme
- **Primary Background:** #0b1224 (Deep Navy)
- **Primary Accent:** #22c55e (Fresh Green)
- **Secondary Accent:** #06b6d4 (Cyan)
- **Text Color:** #e5e7eb (Light Gray)
- **Cards Background:** rgba(31, 41, 55, 0.5)

### Typography
- **Headers:** Space Grotesk (Google Fonts)
- **Body:** DM Sans (Google Fonts)

### Icons & Libraries
- **Font Awesome:** 6.5.2 (CDN)
- **Bootstrap:** 5.2.2+ (CSS Framework)

---

## 📄 Pages & Features

### 1. **Wow-Market.html** (Homepage)
- Modern hero section with promo banner
- Featured product grid
- Category navigation
- Search functionality
- Professional footer with social links
- Creator credits & timeline

### 2. **clothing-shoes-accessories.html** (Shoes Category)
- 10+ shoe products
- Dynamic product grid
- Responsive design
- Add-to-cart functionality
- Product ratings & pricing

### 3. **ELECTRONICS.html** (Electronics Category)
- 8+ electronics products
- Gaming console & computer section
- Modern product cards
- Inventory display

### 4. **pharmacy.html** (Pharmacy)
- 8 health & wellness products
- Vitamin & supplement listings
- Professional healthcare presentation
- Detailed product information

### 5. **Pet&Toys.html** (Pets & Toys)
- 10 pet supplies & toys
- Pet food, beds, toys, and accessories
- Kid-friendly toy selection

### 6. **purchase.html** (Checkout)
- Multi-section checkout form
- Personal Information section
- Shipping Address section
- Payment methods (Credit Card, PayPal, Apple Pay)
- Form validation
- Order confirmation

### 7. **Contact.html** (Contact Page)
- Contact form with validation
- Business information
- 3 info cards (locations, hours, support)
- Professional layout

### 8. **History.html** (Company History)
- Timeline of company milestones
- Company achievements
- Growth statistics
- Historical context

### 9. **MissionVision.html** (Mission & Vision)
- Mission statement
- Vision statement
- 6 core company values
- Interactive value cards

### 10. **Group assignment.html** (Featured Products Hub)
- Alternative homepage style
- Category cards with icons
- Featured product showcase
- Navigation hub

---

## 🚀 Getting Started

### Prerequisites
- Python 3.x (for local server)
- Modern web browser
- Internet connection (for CDN assets)

### Running Locally

```bash
# Navigate to project directory
cd "path/to/Wow Market"

# Start Python HTTP server
python -m http.server 8000

# Open browser
# http://localhost:8000/Wow-Market.html
```

---

## 🎯 Design Highlights

✨ **Modern Features:**
- Responsive grid layouts
- Smooth hover animations
- Dark theme optimization
- Search functionality
- Product filtering
- Social media integration
- Professional footer

📱 **Mobile Responsive:**
- Adaptive grid systems
- Touch-friendly navigation
- Optimized images
- Flexible layouts

🔒 **User Experience:**
- Intuitive navigation
- Clear product information
- Easy checkout process
- Form validation
- Accessibility features

---

## 📁 Directory Structure

```
Wow Market/
├── Wow-Market.html                      (Homepage)
├── clothing-shoes-accessories.html      (Shoes)
├── ELECTRONICS.html                     (Electronics)
├── pharmacy.html                        (Pharmacy)
├── Pet&Toys.html                        (Pets & Toys)
├── Contact.html                         (Contact)
├── History.html                         (Company History)
├── MissionVision.html                   (Mission & Vision)
├── purchase.html                        (Checkout)
├── Group assignment.html                (Featured Hub)
├── Business_Logo-removebg-preview.png   (Logo)
├── style1.css                           (Legacy CSS)
├── Assets/                              (Images & Resources)
└── .git/                                (Git Repository)
```

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients & animations
- **JavaScript** - Interactive features & search
- **Bootstrap 5** - Responsive framework
- **Font Awesome 6.5.2** - Icon library
- **Google Fonts** - Typography

---

## 🔗 External Resources

- **Repository:** https://github.com/jennisha876/Wow-Market
- **Logo File:** Business_Logo-removebg-preview.png
- **Contact Email:** customerservice@wow.com.jm
- **Phone:** (876) 969-1329

---

## 📞 Contact Information

**Wow Market**
- 📍 28 Manchester Road, Manchester, Jamaica
- 📧 customerservice@wow.com.jm
- ☎️ (876) 969-1329
- 📠 (876) 969-1289

---

## 📄 Credits

**Created by (2022):**
- Jennisha Smith
- Shani Parchment
- Alethea Robinson
- Lemard Sterling

**Updated by (2026):**
- Jennisha Smith

---

## 📝 License

© 2022-2026 Wow Market. All rights reserved.

---

## 🚀 Backend Features - ALL 8 IMPLEMENTED ✅

### 1. Backend Database Integration ✅
- **PostgreSQL** with Sequelize ORM
- 7 complete tables (users, products, orders, reviews, inventory, carts, payments)
- Sample data included (8 products, admin user)
- File: `backend/database.sql`

### 2. User Authentication System ✅
- **JWT tokens** + bcrypt password hashing
- Register, login, logout, token refresh
- Admin role-based access control
- Files: `backend/routes/auth.js`, `backend/middleware/auth.js`

### 3. Order Tracking ✅
- Real-time order status (pending → processing → shipped → delivered)
- Order timeline with timestamps
- Admin order management
- File: `backend/routes/orders.js`

### 4. Payment Gateway Integration ✅
- **Stripe + PayPal** ready
- Payment intents, processing, refunds
- Transaction history
- File: `backend/routes/payments.js`

### 5. Inventory Management ✅
- Stock tracking with low-stock alerts
- Multi-warehouse support
- Reserved quantity management
- File: `backend/routes/inventory.js`

### 6. Customer Reviews System ✅
- **1-5 star rating** with validation
- Review CRUD operations
- Average rating calculation
- File: `backend/routes/reviews.js`

### 7. Admin Dashboard ✅
- Professional UI with **7 sections**
- Dashboard, Products, Orders, Users, Inventory, Reviews, Settings
- File: `admin/dashboard.html`

### 8. Email Notifications ✅
- **Nodemailer** configured
- Order confirmations, shipping alerts
- SMTP ready in `.env`

---

## 📁 Backend Structure

```
backend/
├── server.js (Express server)
├── package.json (13 npm dependencies)
├── .env.example (21 environment variables)
├── database.sql (PostgreSQL schema)
├── API_DOCUMENTATION.md (Full API reference)
├── QUICKSTART.md (Setup guide)
├── models/schema.js (7 database schemas)
├── routes/
│   ├── auth.js (5 endpoints)
│   ├── products.js (3 endpoints)
│   ├── orders.js (5 endpoints)
│   ├── users.js (6 endpoints)
│   ├── reviews.js (4 endpoints)
│   ├── inventory.js (4 endpoints)
│   └── payments.js (4 endpoints)
├── middleware/auth.js (JWT verification)
└── config/

admin/
└── dashboard.html (Admin panel UI)
```

---

## 🔗 API Endpoints (25+ Routes)

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/verify` - Check token
- `POST /api/auth/refresh` - Renew token
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - List all
- `GET /api/products/:id` - Get one
- `GET /api/products/search` - Search

### Orders
- `POST /api/orders` - Create
- `GET /api/orders` - List user's
- `GET /api/orders/:id` - Details
- `GET /api/orders/:id/track` - Track
- `PATCH /api/orders/:id/status` - Update (admin)

### Users
- `GET/PUT /api/users/profile` - Profile
- `GET /api/users/orders` - Order history
- `GET/POST /api/users/wishlist` - Wishlist
- `GET /api/users/reviews` - Reviews

### Reviews
- `GET /api/reviews/product/:id` - Get reviews
- `POST /api/reviews` - Create
- `PUT /api/reviews/:id` - Update
- `DELETE /api/reviews/:id` - Delete

### Inventory
- `GET /api/inventory/:id` - Get stock
- `GET /api/inventory` - All (admin)
- `PATCH /api/inventory/:id` - Update (admin)
- `GET /api/inventory/alerts/low-stock` - Alerts

### Payments
- `POST /api/payments/create-intent` - Create
- `POST /api/payments/process` - Process
- `GET /api/payments/history` - History
- `POST /api/payments/refund` - Refund

### Health
- `GET /api/health` - API status

---

## ⚡ Quick Start - Backend

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create Database
```bash
psql -U postgres
CREATE DATABASE wow_market_db;
\c wow_market_db
\i database.sql
```

### Step 3: Configure Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### Step 4: Start Backend
```bash
npm run dev  # Development with auto-reload
# Or: npm start
```

Expected output:
```
╔════════════════════════════════════════════════╗
║    WOW MARKET API SERVER STARTED               ║
║    Version: 1.0.0                              ║
║    Port: 5000                                  ║
╚════════════════════════════════════════════════╝
```

### Step 5: Start Frontend
```bash
python -m http.server 8000
```

### Step 6: Test API
```bash
curl http://localhost:5000/api/health
```

---

## 💾 Database Schema (7 Tables)

1. **users** - User accounts, profiles, roles
2. **products** - Product catalog with pricing
3. **orders** - Customer orders with tracking
4. **reviews** - Product reviews (1-5 stars)
5. **inventory** - Stock levels, alerts
6. **carts** - Shopping carts
7. **payments** - Transaction history

---

## 🔐 Security Features

✅ JWT authentication (7-day tokens)  
✅ bcrypt password hashing (10 rounds)  
✅ Role-based access (user/admin)  
✅ Input validation  
✅ CORS enabled  
✅ Environment variables (.env)  

---

## 📚 Documentation

- **API Reference:** `backend/API_DOCUMENTATION.md`
- **Setup Guide:** `backend/QUICKSTART.md`
- **Database Schema:** `backend/database.sql`
- **Admin Panel:** `admin/dashboard.html`

---

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5.2.2
- Font Awesome 6.5.2
- Google Fonts

### Backend
- Node.js + Express.js 4.18.2
- PostgreSQL + Sequelize ORM
- JWT + bcryptjs
- Nodemailer + Stripe
- express-validator

---

**Last Updated:** January 8, 2026  
**Status:** ✅ Production Ready - All Features Implemented
