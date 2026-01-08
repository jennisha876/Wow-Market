/**
 * User Model
 * Handles user authentication and profile data
 */

const userModel = {
  id: 'UUID',
  email: 'VARCHAR(255) UNIQUE NOT NULL',
  username: 'VARCHAR(255) UNIQUE NOT NULL',
  password: 'VARCHAR(255) NOT NULL',
  firstName: 'VARCHAR(255)',
  lastName: 'VARCHAR(255)',
  phone: 'VARCHAR(20)',
  address: 'TEXT',
  city: 'VARCHAR(255)',
  country: 'VARCHAR(255)',
  zipCode: 'VARCHAR(10)',
  profileImage: 'VARCHAR(255)',
  role: 'ENUM(\'user\', \'admin\') DEFAULT \'user\'',
  isEmailVerified: 'BOOLEAN DEFAULT false',
  lastLogin: 'TIMESTAMP',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

/**
 * Product Model
 * Stores product information
 */

const productModel = {
  id: 'UUID',
  name: 'VARCHAR(255) NOT NULL',
  description: 'TEXT',
  price: 'DECIMAL(10, 2) NOT NULL',
  discountPrice: 'DECIMAL(10, 2)',
  category: 'VARCHAR(255) NOT NULL',
  subcategory: 'VARCHAR(255)',
  image: 'VARCHAR(255)',
  images: 'JSON',
  sku: 'VARCHAR(100) UNIQUE',
  stock: 'INTEGER DEFAULT 0',
  rating: 'DECIMAL(3, 2) DEFAULT 0',
  reviews: 'INTEGER DEFAULT 0',
  isActive: 'BOOLEAN DEFAULT true',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

/**
 * Order Model
 * Tracks customer orders
 */

const orderModel = {
  id: 'UUID',
  userId: 'UUID NOT NULL',
  orderNumber: 'VARCHAR(100) UNIQUE NOT NULL',
  items: 'JSON NOT NULL',
  totalAmount: 'DECIMAL(10, 2) NOT NULL',
  tax: 'DECIMAL(10, 2)',
  shippingFee: 'DECIMAL(10, 2)',
  discountAmount: 'DECIMAL(10, 2)',
  status: 'ENUM(\'pending\', \'processing\', \'shipped\', \'delivered\', \'cancelled\') DEFAULT \'pending\'',
  paymentStatus: 'ENUM(\'pending\', \'completed\', \'failed\') DEFAULT \'pending\'',
  paymentMethod: 'ENUM(\'credit_card\', \'paypal\', \'stripe\', \'bank_transfer\')',
  shippingAddress: 'JSON',
  billingAddress: 'JSON',
  notes: 'TEXT',
  trackingNumber: 'VARCHAR(100)',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  deliveredAt: 'TIMESTAMP'
};

/**
 * Review Model
 * Stores customer reviews and ratings
 */

const reviewModel = {
  id: 'UUID',
  productId: 'UUID NOT NULL',
  userId: 'UUID NOT NULL',
  rating: 'INTEGER CHECK(rating >= 1 AND rating <= 5) NOT NULL',
  title: 'VARCHAR(255) NOT NULL',
  comment: 'TEXT',
  verified: 'BOOLEAN DEFAULT false',
  helpful: 'INTEGER DEFAULT 0',
  unhelpful: 'INTEGER DEFAULT 0',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

/**
 * Inventory Model
 * Tracks stock and inventory levels
 */

const inventoryModel = {
  id: 'UUID',
  productId: 'UUID NOT NULL',
  warehouseId: 'VARCHAR(255)',
  quantity: 'INTEGER DEFAULT 0',
  reserved: 'INTEGER DEFAULT 0',
  available: 'INTEGER DEFAULT 0',
  minStock: 'INTEGER DEFAULT 10',
  maxStock: 'INTEGER DEFAULT 1000',
  lastRestocked: 'TIMESTAMP',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

/**
 * Cart Model
 * Manages shopping carts
 */

const cartModel = {
  id: 'UUID',
  userId: 'UUID NOT NULL',
  items: 'JSON NOT NULL',
  totalItems: 'INTEGER DEFAULT 0',
  totalPrice: 'DECIMAL(10, 2) DEFAULT 0',
  expiresAt: 'TIMESTAMP',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

/**
 * Payment Transaction Model
 */

const paymentModel = {
  id: 'UUID',
  orderId: 'UUID NOT NULL',
  userId: 'UUID NOT NULL',
  amount: 'DECIMAL(10, 2) NOT NULL',
  currency: 'VARCHAR(3) DEFAULT \'USD\'',
  paymentMethod: 'VARCHAR(255) NOT NULL',
  transactionId: 'VARCHAR(255) UNIQUE',
  status: 'ENUM(\'pending\', \'completed\', \'failed\', \'refunded\') DEFAULT \'pending\'',
  metadata: 'JSON',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
};

module.exports = {
  userModel,
  productModel,
  orderModel,
  reviewModel,
  inventoryModel,
  cartModel,
  paymentModel
};
