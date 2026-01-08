# Wow Market Backend API Documentation

## Overview
Complete RESTful API for Wow Market E-Commerce Platform with authentication, payments, inventory, and order management.

**Base URL:** `http://localhost:5000/api`  
**Version:** 1.0.0  
**Created:** 2022 | **Updated:** 2026

---

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: { user, token }
```

### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { user, token }
```

### Verify Token
```
GET /auth/verify
Authorization: Bearer {token}

Response: { valid: true, user }
```

### Refresh Token
```
POST /auth/refresh
Authorization: Bearer {token}

Response: { token }
```

---

## Products Endpoints

### Get All Products
```
GET /products?category=shoes&sort=price
```

### Get Product by ID
```
GET /products/:id
```

### Search Products
```
GET /products/search?q=heels
```

---

## Orders Endpoints

### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    { "productId": 1, "quantity": 2, "price": 50 }
  ],
  "totalAmount": 100,
  "shippingAddress": { ... },
  "paymentMethod": "credit_card"
}

Response: { order }
```

### Get User Orders
```
GET /orders
Authorization: Bearer {token}
```

### Get Order by ID
```
GET /orders/:id
Authorization: Bearer {token}
```

### Track Order
```
GET /orders/:id/track
```

### Update Order Status (Admin)
```
PATCH /orders/:id/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{ "status": "shipped" }
```

---

## Users Endpoints

### Get User Profile
```
GET /users/profile
Authorization: Bearer {token}
```

### Update User Profile
```
PUT /users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "Kingston",
  "country": "Jamaica",
  "zipCode": "12345"
}
```

### Get User Wishlist
```
GET /users/wishlist
Authorization: Bearer {token}
```

### Add to Wishlist
```
POST /users/wishlist/:productId
Authorization: Bearer {token}
```

---

## Reviews Endpoints

### Get Product Reviews
```
GET /reviews/product/:productId
```

### Create Review
```
POST /reviews
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1,
  "rating": 5,
  "title": "Great product!",
  "comment": "Excellent quality and fast shipping"
}
```

### Update Review
```
PUT /reviews/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "rating": 4,
  "title": "Good product",
  "comment": "Nice but a bit expensive"
}
```

### Delete Review
```
DELETE /reviews/:id
Authorization: Bearer {token}
```

---

## Inventory Endpoints

### Get Product Inventory
```
GET /inventory/:productId
```

### Get All Inventory (Admin)
```
GET /inventory
Authorization: Bearer {admin_token}
```

### Update Inventory (Admin)
```
PATCH /inventory/:productId
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "quantity": 100,
  "reserved": 20,
  "minStock": 10
}
```

### Get Low Stock Alerts (Admin)
```
GET /inventory/alerts/low-stock
Authorization: Bearer {admin_token}
```

---

## Payments Endpoints

### Create Payment Intent
```
POST /payments/create-intent
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 100,
  "currency": "USD",
  "orderId": "order_123",
  "paymentMethod": "stripe"
}

Response: { paymentIntent }
```

### Process Payment
```
POST /payments/process
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": "order_123",
  "amount": 100,
  "paymentMethod": "stripe",
  "paymentDetails": { ... }
}

Response: { transaction }
```

### Get Payment History
```
GET /payments/history
Authorization: Bearer {token}
```

### Refund Payment
```
POST /payments/refund
Authorization: Bearer {token}
Content-Type: application/json

{
  "transactionId": "txn_123",
  "amount": 100,
  "reason": "Customer request"
}

Response: { refund }
```

---

## Health Check

### API Status
```
GET /health

Response: {
  "status": "OK",
  "message": "Wow Market API is running",
  "timestamp": "2026-01-08T...",
  "version": "1.0.0"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "message": "Validation error message",
    "status": 400
  }
}
```

### 401 Unauthorized
```json
{
  "error": {
    "message": "Access denied. No token provided.",
    "status": 401
  }
}
```

### 403 Forbidden
```json
{
  "error": {
    "message": "Access denied. Admin privileges required.",
    "status": 403
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "message": "Resource not found",
    "status": 404
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "message": "Internal server error",
    "status": 500
  }
}
```

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

**Admin Endpoints** require a token from a user with `role: 'admin'`.

---

## Rate Limiting

- **Standard:** 100 requests per 15 minutes per user
- **Admin:** 500 requests per 15 minutes per user

---

## Pagination

List endpoints support pagination:

```
GET /products?page=1&limit=20
```

---

## Filter Examples

### Products
```
GET /products?category=electronics&minPrice=100&maxPrice=500&sort=price
```

### Orders
```
GET /orders?status=shipped&sort=createdAt
```

---

## Webhook Events

### Payment Completed
```json
{
  "event": "payment.completed",
  "data": {
    "transactionId": "txn_123",
    "orderId": "order_123",
    "amount": 100,
    "timestamp": "2026-01-08T..."
  }
}
```

### Order Shipped
```json
{
  "event": "order.shipped",
  "data": {
    "orderId": "order_123",
    "trackingNumber": "TRK...",
    "timestamp": "2026-01-08T..."
  }
}
```

---

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start Server:**
   ```bash
   npm run dev
   ```

4. **Access API:**
   ```
   http://localhost:5000/api
   ```

---

## Admin Dashboard

Access the admin panel:
```
http://localhost:8000/admin/dashboard.html
```

---

**Repository:** https://github.com/jennisha876/Wow-Market  
**Authors:** Jennisha Smith, Shani Parchment, Alethea Robinson, Lemard Sterling  
**Updated:** 2026
