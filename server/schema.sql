-- MySQL Schema Creation Script for Cart Rescue
CREATE DATABASE IF NOT EXISTS cart_rescue_db;
USE cart_rescue_db;

-- 1. Main Carts Table
CREATE TABLE IF NOT EXISTS carts (
    id VARCHAR(255) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    total_value DOUBLE PRECISION DEFAULT 0.0,
    status VARCHAR(50) DEFAULT 'abandoned',
    abandoned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rescued_at TIMESTAMP NULL,
    last_notification_sent VARCHAR(255),
    discount_applied INT DEFAULT 0
);

-- 2. Dedicated Abandoned Carts Table
CREATE TABLE IF NOT EXISTS abandoned_carts (
    id VARCHAR(255) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    total_value DOUBLE PRECISION DEFAULT 0.0,
    status VARCHAR(50) DEFAULT 'abandoned',
    abandoned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Dedicated Rescued Sales Table
CREATE TABLE IF NOT EXISTS rescued_sales (
    id VARCHAR(255) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    original_value DOUBLE PRECISION DEFAULT 0.0,
    rescued_amount DOUBLE PRECISION DEFAULT 0.0,
    discount_percent INT DEFAULT 0,
    rescued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Recovery Stats Table
CREATE TABLE IF NOT EXISTS recovery_stats (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    total_revenue_rescued DOUBLE PRECISION DEFAULT 0.0,
    active_abandoned_count BIGINT DEFAULT 0,
    total_rescued_count BIGINT DEFAULT 0,
    recovery_rate VARCHAR(50) DEFAULT '0.0%'
);

-- Sample Data Ingestion
INSERT INTO abandoned_carts (id, customer_name, customer_email, customer_phone, total_value)
VALUES 
('cart-101', 'Sarah Jenkins', 'sarah.j@example.com', '+1 (555) 234-5678', 218.00),
('cart-102', 'David Miller', 'david.m@example.com', '+1 (555) 876-5432', 249.00)
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO rescued_sales (id, customer_name, customer_email, original_value, rescued_amount, discount_percent)
VALUES 
('cart-103', 'Emma Watson', 'emma.w@example.com', 179.00, 152.15, 15)
ON DUPLICATE KEY UPDATE id=id;
