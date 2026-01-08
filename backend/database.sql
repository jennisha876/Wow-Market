-- Wow Market Database Schema
-- Created: 2022 | Updated: 2026
-- Database: wow_market_db

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    city VARCHAR(100),
    country VARCHAR(100),
    zipCode VARCHAR(20),
    profileImage VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    isEmailVerified BOOLEAN DEFAULT FALSE,
    lastLogin TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role)
);

-- ============================================
-- 2. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    discountPrice DECIMAL(10, 2),
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    image VARCHAR(255),
    images JSON,
    sku VARCHAR(100) UNIQUE NOT NULL,
    stock INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviewsCount INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_sku (sku),
    INDEX idx_active (isActive)
);

-- ============================================
-- 3. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    orderNumber VARCHAR(50) UNIQUE NOT NULL,
    items JSON NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 0.00,
    shippingFee DECIMAL(10, 2) DEFAULT 0.00,
    discountAmount DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    paymentStatus VARCHAR(20) DEFAULT 'pending' CHECK (paymentStatus IN ('pending', 'completed', 'failed', 'refunded')),
    paymentMethod VARCHAR(50),
    shippingAddress JSON NOT NULL,
    billingAddress JSON,
    trackingNumber VARCHAR(100),
    deliveredAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_orderNumber (orderNumber),
    INDEX idx_status (status),
    INDEX idx_createdAt (createdAt)
);

-- ============================================
-- 4. REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    productId INT NOT NULL,
    userId INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    verified BOOLEAN DEFAULT FALSE,
    helpfulCount INT DEFAULT 0,
    unhelpfulCount INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_productId (productId),
    INDEX idx_userId (userId),
    INDEX idx_rating (rating),
    UNIQUE KEY unique_review (productId, userId)
);

-- ============================================
-- 5. INVENTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    productId INT NOT NULL UNIQUE,
    warehouseId INT DEFAULT 1,
    quantity INT DEFAULT 0,
    reserved INT DEFAULT 0,
    available INT GENERATED ALWAYS AS (quantity - reserved) STORED,
    minStock INT DEFAULT 10,
    maxStock INT DEFAULT 1000,
    lastRestocked TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_productId (productId),
    INDEX idx_available (available),
    INDEX idx_warehouseId (warehouseId)
);

-- ============================================
-- 6. CARTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL UNIQUE,
    items JSON NOT NULL DEFAULT '[]',
    totalItems INT DEFAULT 0,
    totalPrice DECIMAL(10, 2) DEFAULT 0.00,
    expiresAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_expiresAt (expiresAt)
);

-- ============================================
-- 7. PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    orderId INT NOT NULL,
    userId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    paymentMethod VARCHAR(50),
    transactionId VARCHAR(255) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    metadata JSON,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_orderId (orderId),
    INDEX idx_userId (userId),
    INDEX idx_transactionId (transactionId),
    INDEX idx_status (status)
);

-- ============================================
-- 8. WISHLIST TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS wishlist (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    productId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist (userId, productId),
    INDEX idx_userId (userId),
    INDEX idx_productId (productId)
);

-- ============================================
-- SAMPLE DATA - PRODUCTS
-- ============================================

-- Shoes
INSERT INTO products (name, description, price, discountPrice, category, subcategory, image, sku, stock, rating, isActive) 
VALUES 
('Air Jordan 1 Retro', 'Classic basketball shoe', 129.99, 99.99, 'shoes', 'sneakers', '/images/shoes/jordan1.jpg', 'SHOE001', 50, 4.8, TRUE),
('Nike Air Max 90', 'Comfortable everyday shoe', 99.99, 79.99, 'shoes', 'sneakers', '/images/shoes/airmax90.jpg', 'SHOE002', 75, 4.6, TRUE),
('Adidas Ultraboost', 'Premium running shoe', 179.99, 139.99, 'shoes', 'running', '/images/shoes/ultraboost.jpg', 'SHOE003', 30, 4.9, TRUE);

-- Electronics
INSERT INTO products (name, description, price, discountPrice, category, subcategory, image, sku, stock, rating, isActive) 
VALUES 
('Xbox Series X', 'Next-gen gaming console', 499.99, 449.99, 'electronics', 'gaming', '/images/electronics/xbox.jpg', 'ELEC001', 15, 4.8, TRUE),
('PlayStation 5', 'Premium gaming console', 499.99, 449.99, 'electronics', 'gaming', '/images/electronics/ps5.jpg', 'ELEC002', 12, 4.9, TRUE),
('Samsung 65" 4K TV', 'Ultra HD Smart TV', 899.99, 699.99, 'electronics', 'tv', '/images/electronics/samsung_tv.jpg', 'ELEC003', 8, 4.7, TRUE);

-- Pharmacy
INSERT INTO products (name, description, price, discountPrice, category, subcategory, image, sku, stock, rating, isActive) 
VALUES 
('Vitamin D3 2000IU', 'Essential vitamin supplement', 12.99, 9.99, 'pharmacy', 'vitamins', '/images/pharmacy/vitd.jpg', 'PHARM001', 200, 4.5, TRUE),
('Ibuprofen 200mg', 'Pain relief tablets (100 count)', 7.99, 5.99, 'pharmacy', 'painrelief', '/images/pharmacy/ibuprofen.jpg', 'PHARM002', 500, 4.6, TRUE);

-- Pets & Toys
INSERT INTO products (name, description, price, discountPrice, category, subcategory, image, sku, stock, rating, isActive) 
VALUES 
('Dog Bed Orthopedic', 'Comfortable pet bed', 59.99, 39.99, 'pets', 'pet-beds', '/images/pets/dogbed.jpg', 'PET001', 40, 4.8, TRUE),
('LEGO Star Wars Set', 'Limited edition building set', 149.99, 119.99, 'toys', 'lego', '/images/toys/lego_starwars.jpg', 'TOY001', 25, 4.9, TRUE);

-- ============================================
-- SAMPLE DATA - ADMIN USER
-- ============================================

-- Create admin user (password: admin123 hashed with bcrypt)
-- Hash: $2a$10$YourHashedPasswordHere
INSERT INTO users (email, username, password, firstName, lastName, role, isEmailVerified, createdAt, updatedAt) 
VALUES 
('admin@wowmarket.com', 'admin', '$2a$10$CIxZZAA.UaAE6nf.4C2EpuS.Vbqk7b7F.X6kNH3w7LgA8V6sYqc5e', 'Admin', 'User', 'admin', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- SAMPLE DATA - REGULAR USER
-- ============================================

INSERT INTO users (email, username, password, firstName, lastName, phone, city, country, isEmailVerified, createdAt, updatedAt) 
VALUES 
('customer@example.com', 'customer', '$2a$10$CIxZZAA.UaAE6nf.4C2EpuS.Vbqk7b7F.X6kNH3w7LgA8V6sYqc5e', 'John', 'Doe', '+1 (876) 555-0100', 'Kingston', 'Jamaica', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- ============================================
-- SAMPLE DATA - INVENTORY
-- ============================================

INSERT INTO inventory (productId, warehouseId, quantity, minStock, maxStock, lastRestocked)
VALUES 
(1, 1, 50, 10, 100, CURRENT_TIMESTAMP),
(2, 1, 75, 10, 150, CURRENT_TIMESTAMP),
(3, 1, 30, 5, 50, CURRENT_TIMESTAMP),
(4, 1, 15, 5, 30, CURRENT_TIMESTAMP),
(5, 1, 12, 5, 25, CURRENT_TIMESTAMP);

-- ============================================
-- SAMPLE DATA - SAMPLE ORDER
-- ============================================

INSERT INTO orders (userId, orderNumber, items, totalAmount, tax, shippingFee, status, paymentStatus, paymentMethod, shippingAddress, createdAt, updatedAt)
VALUES 
(2, 'ORD-2026-001', 
 '[{"productId": 1, "name": "Air Jordan 1 Retro", "quantity": 1, "price": 99.99}]',
 99.99, 10.00, 5.00, 'shipped', 'completed', 'stripe',
 '{"street": "123 Main St", "city": "Kingston", "country": "Jamaica", "zipCode": "12345"}',
 CURRENT_TIMESTAMP - INTERVAL 5 DAY, CURRENT_TIMESTAMP - INTERVAL 2 DAY);

-- ============================================
-- HELPFUL QUERIES
-- ============================================

-- Get all products in stock
-- SELECT * FROM products WHERE isActive = TRUE AND stock > 0;

-- Get low stock items (below minimum)
-- SELECT p.*, i.available FROM products p JOIN inventory i ON p.id = i.productId WHERE i.available <= i.minStock;

-- Get top rated products
-- SELECT * FROM products ORDER BY rating DESC LIMIT 10;

-- Get order details with user info
-- SELECT o.*, u.email, u.firstName, u.lastName FROM orders o JOIN users u ON o.userId = u.id;

-- Get product reviews with average rating
-- SELECT productId, AVG(rating) as avgRating, COUNT(*) as totalReviews FROM reviews GROUP BY productId;

-- ============================================
-- END OF SCHEMA
-- ============================================
