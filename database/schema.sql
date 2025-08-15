-- Frame E-commerce Database Schema (PostgreSQL)
-- Simplified schema for frame business with users, products, and cart

-- Enable UUID extension for better primary keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full text search extension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create ENUM types for better data integrity
CREATE TYPE user_role AS ENUM ('customer', 'admin');

CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending_verification');

CREATE TYPE frame_category AS ENUM ('wooden', 'metal', 'vintage', 'modern', 'custom');

CREATE TYPE frame_size AS ENUM ('4x6', '5x7', '8x10', '11x14', '16x20', '18x24', '24x36', 'custom');

-- ========================================
-- USERS TABLE
-- ========================================

-- Users table for customer and admin management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    email CITEXT VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role user_role DEFAULT 'customer',
    status user_status DEFAULT 'pending_verification',
    email_verified BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- PRODUCTS TABLE (FRAMES)
-- ========================================

-- Products table specifically designed for frame business
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category frame_category NOT NULL,

-- Pricing
price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
original_price DECIMAL(10, 2), -- For showing discounts

-- Frame-specific attributes
default_size frame_size DEFAULT '8x10',
    available_sizes frame_size[] DEFAULT ARRAY['4x6', '5x7', '8x10', '11x14']::frame_size[],
    material VARCHAR(100), -- e.g., 'Oak Wood', 'Aluminum', 'Stainless Steel'
    color VARCHAR(50), -- e.g., 'Natural', 'Black', 'White', 'Gold'
    frame_width DECIMAL(5,2), -- Frame width in inches

-- Product features
is_new BOOLEAN DEFAULT FALSE,
is_bestseller BOOLEAN DEFAULT FALSE,
is_featured BOOLEAN DEFAULT TRUE,

-- Inventory and status
stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
in_stock BOOLEAN GENERATED ALWAYS AS (stock_quantity > 0) STORED,
is_active BOOLEAN DEFAULT TRUE,

-- Customer feedback
rating DECIMAL(3, 2) DEFAULT 0.0 CHECK (
    rating >= 0
    AND rating <= 5
),
review_count INTEGER DEFAULT 0,

-- Media
image_url VARCHAR(500), image_alt TEXT,

-- SEO
seo_title VARCHAR(160), seo_description VARCHAR(320),

-- Timestamps
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- SHOPPING CART
-- ========================================

-- Shopping cart table (supports both authenticated users and guest sessions)
CREATE TABLE cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255), -- For guest users
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days'),

-- Ensure either user_id or session_id is provided
CHECK ((user_id IS NOT NULL) OR (session_id IS NOT NULL)) );

-- Cart items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

-- Frame customization
selected_size frame_size NOT NULL,
custom_dimensions_width DECIMAL(8, 2), -- For custom sizes
custom_dimensions_height DECIMAL(8, 2), -- For custom sizes

-- Quantity and pricing
quantity INTEGER NOT NULL CHECK (quantity > 0),
unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
total_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,

-- Timestamps
created_at TIMESTAMP
WITH
    TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
WITH
    TIME ZONE DEFAULT CURRENT_TIMESTAMP,

-- Ensure unique combination of cart, product, and size
UNIQUE(cart_id, product_id, selected_size) );

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- User indexes
CREATE INDEX idx_users_email ON users (email);

CREATE INDEX idx_users_status ON users (status);

CREATE INDEX idx_users_role ON users (role);

-- Product indexes
CREATE INDEX idx_products_category ON products (category);

CREATE INDEX idx_products_is_active ON products (is_active);

CREATE INDEX idx_products_is_featured ON products (is_featured);

CREATE INDEX idx_products_slug ON products (slug);

CREATE INDEX idx_products_sku ON products (sku);

CREATE INDEX idx_products_price ON products (price);

CREATE INDEX idx_products_rating ON products (rating);

CREATE INDEX idx_products_stock ON products (stock_quantity);

-- Full text search on products
CREATE INDEX idx_products_search ON products USING gin (
    to_tsvector (
        'english',
        name || ' ' || COALESCE(description, '') || ' ' || COALESCE(material, '') || ' ' || COALESCE(color, '')
    )
);

-- Cart indexes
CREATE INDEX idx_cart_user_id ON cart (user_id);

CREATE INDEX idx_cart_session_id ON cart (session_id);

CREATE INDEX idx_cart_expires_at ON cart (expires_at);

CREATE INDEX idx_cart_items_cart_id ON cart_items (cart_id);

CREATE INDEX idx_cart_items_product_id ON cart_items (product_id);

-- ========================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ========================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at 
    BEFORE UPDATE ON cart 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at 
    BEFORE UPDATE ON cart_items 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to extend cart expiration when items are added/updated
CREATE OR REPLACE FUNCTION update_cart_expiration()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE cart 
    SET expires_at = CURRENT_TIMESTAMP + INTERVAL '30 days'
    WHERE id = NEW.cart_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cart_expiration_trigger 
    AFTER INSERT OR UPDATE ON cart_items 
    FOR EACH ROW EXECUTE FUNCTION update_cart_expiration();

-- ========================================
-- VIEWS FOR COMMON QUERIES
-- ========================================

-- Active products with full details
CREATE VIEW active_products AS
SELECT 
    id,
    sku,
    name,
    slug,
    description,
    category,
    price,
    original_price,
    CASE 
        WHEN original_price IS NOT NULL AND original_price > price 
        THEN ROUND(((original_price - price) / original_price * 100)::numeric, 0)
        ELSE 0
    END as discount_percentage,
    default_size,
    available_sizes,
    material,
    color,
    frame_width,
    is_new,
    is_bestseller,
    is_featured,
    stock_quantity,
    in_stock,
    rating,
    review_count,
    image_url,
    image_alt,
    created_at,
    updated_at
FROM products 
WHERE is_active = true;

-- Cart summary with item count and total
CREATE VIEW cart_summary AS
SELECT
    c.id as cart_id,
    c.user_id,
    c.session_id,
    COUNT(ci.id) as item_count,
    SUM(ci.quantity) as total_quantity,
    SUM(ci.total_price) as subtotal,
    c.created_at,
    c.updated_at,
    c.expires_at
FROM cart c
    LEFT JOIN cart_items ci ON c.id = ci.cart_id
GROUP BY
    c.id,
    c.user_id,
    c.session_id,
    c.created_at,
    c.updated_at,
    c.expires_at;

-- Cart items with product details
CREATE VIEW cart_items_detailed AS
SELECT
    ci.id,
    ci.cart_id,
    ci.product_id,
    p.name as product_name,
    p.sku as product_sku,
    p.slug as product_slug,
    p.image_url as product_image,
    p.category as product_category,
    p.material,
    p.color,
    ci.selected_size,
    ci.custom_dimensions_width,
    ci.custom_dimensions_height,
    ci.quantity,
    ci.unit_price,
    ci.total_price,
    ci.created_at,
    ci.updated_at
FROM cart_items ci
    JOIN products p ON ci.product_id = p.id;

-- ========================================
-- SAMPLE DATA FOR FRAME BUSINESS
-- ========================================

-- Insert sample frame products
INSERT INTO products (
    sku, name, slug, description, category, price, original_price,
    default_size, available_sizes, material, color, frame_width,
    is_new, is_bestseller, is_featured, stock_quantity, rating, review_count,
    image_url, image_alt
) VALUES 
(
    'WF-001', 'Classic Oak Wooden Frame', 'classic-oak-wooden-frame',
    'Beautiful handcrafted oak frame with natural wood grain finish. Perfect for family photos and artwork.',
    'wooden', 89.99, 120.00,
    '8x10', ARRAY['4x6', '5x7', '8x10', '11x14', '16x20']::frame_size[],
    'Oak Wood', 'Natural', 2.5,
    false, true, true, 25, 4.8, 124,
    '/images/oak-frame-1.jpg', 'Classic oak wooden frame with natural finish'
),
(
    'MF-001', 'Modern Aluminum Frame', 'modern-aluminum-frame',
    'Sleek and contemporary aluminum frame with clean lines. Ideal for modern homes and offices.',
    'metal', 65.99, null,
    '8x10', ARRAY['5x7', '8x10', '11x14', '16x20', '18x24']::frame_size[],
    'Aluminum', 'Silver', 1.5,
    true, false, true, 40, 4.9, 89,
    '/images/aluminum-frame-1.jpg', 'Modern silver aluminum frame'
),
(
    'VF-001', 'Vintage Brass Frame', 'vintage-brass-frame',
    'Ornate vintage-style brass frame with decorative corners. Perfect for classic portraits and artwork.',
    'vintage', 145.99, 180.00,
    '8x10', ARRAY['5x7', '8x10', '11x14']::frame_size[],
    'Brass', 'Antique Gold', 3.0,
    false, false, true, 15, 4.6, 67,
    '/images/brass-frame-1.jpg', 'Vintage ornate brass frame with decorative details'
),
(
    'WF-002', 'Rustic Pine Frame', 'rustic-pine-frame',
    'Handmade rustic pine frame with distressed finish. Great for farmhouse and cottage decor.',
    'wooden', 72.99, null,
    '8x10', ARRAY['4x6', '5x7', '8x10', '11x14', '16x20']::frame_size[],
    'Pine Wood', 'Rustic Brown', 3.5,
    false, true, true, 30, 4.7, 156,
    '/images/pine-frame-1.jpg', 'Rustic pine wooden frame with distressed brown finish'
),
(
    'MF-002', 'Black Steel Frame', 'black-steel-frame',
    'Minimalist black steel frame with matte finish. Perfect for contemporary art and photography.',
    'metal', 55.99, 75.00,
    '8x10', ARRAY['5x7', '8x10', '11x14', '16x20', '18x24', '24x36']::frame_size[],
    'Steel', 'Matte Black', 1.0,
    true, false, true, 50, 4.5, 203,
    '/images/steel-frame-1.jpg', 'Minimalist black steel frame with matte finish'
);

-- Insert sample users
INSERT INTO
    users (
        email,
        password_hash,
        first_name,
        last_name,
        phone,
        role,
        status,
        email_verified
    )
VALUES (
        'john.doe@example.com',
        '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiGDObMZz1Cy',
        'John',
        'Doe',
        '+1234567890',
        'customer',
        'active',
        true
    ),
    (
        'admin@framestore.com',
        '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiGDObMZz1Cy',
        'Admin',
        'User',
        '+1987654321',
        'admin',
        'active',
        true
    ),
    (
        'jane.smith@example.com',
        '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiGDObMZz1Cy',
        'Jane',
        'Smith',
        '+1555123456',
        'customer',
        'active',
        true
    );

-- ========================================
-- MAINTENANCE QUERIES
-- ========================================

-- Clean up expired carts (run periodically)
-- DELETE FROM cart WHERE expires_at < CURRENT_TIMESTAMP;

-- Update product ratings (run after new reviews)
-- UPDATE products SET rating = (
--     SELECT COALESCE(AVG(rating), 0)
--     FROM product_reviews
--     WHERE product_id = products.id AND is_approved = true
-- );

-- ========================================
-- USEFUL QUERIES FOR YOUR FRONTEND
-- ========================================

-- Get all active products with discount info
-- SELECT * FROM active_products ORDER BY is_featured DESC, rating DESC;

-- Get products by category
-- SELECT * FROM active_products WHERE category = 'wooden' ORDER BY price ASC;

-- Get cart items for a user
-- SELECT * FROM cart_items_detailed WHERE cart_id = (
--     SELECT id FROM cart WHERE user_id = $1 AND expires_at > CURRENT_TIMESTAMP
-- );

-- Search products
-- SELECT * FROM active_products
-- WHERE to_tsvector('english', name || ' ' || description || ' ' || material || ' ' || color)
--       @@ plainto_tsquery('english', $1);

COMMENT ON SCHEMA public IS 'Frame e-commerce database schema optimized for picture frame business';