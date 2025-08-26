-- Gym Management System Database Schema
-- Run this script to create the database and table

-- Create database
CREATE DATABASE IF NOT EXISTS gym_management;
USE gym_management;

-- Create members table
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender ENUM('Male','Female','Other') DEFAULT 'Other',
    phone VARCHAR(20),
    email VARCHAR(100),
    weight FLOAT,
    membership_plan VARCHAR(50) NOT NULL,
    joining_date DATE NOT NULL,
    duration_months INT NOT NULL,
    payment_status ENUM('Paid','Pending') DEFAULT 'Pending',
    total_price DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) DEFAULT 0.00,
    balance_amount DECIMAL(10,2) DEFAULT 0.00,
    membership_status ENUM('Active','Expired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO members (
    name, age, gender, phone, email, weight, membership_plan,
    joining_date, duration_months, payment_status, total_price, amount_paid
) VALUES 
(
    'John Doe', 28, 'Male', '+1234567890', 'john@example.com', 75.5,
    'Premium', '2024-01-15', 12, 'Paid', 599.00, 599.00
),
(
    'Jane Smith', 25, 'Female', '+1234567891', 'jane@example.com', 62.3,
    'Basic', '2024-02-01', 6, 'Pending', 299.00, 150.00
),
(
    'Mike Johnson', 32, 'Male', '+1234567892', 'mike@example.com', 82.1,
    'VIP', '2023-12-01', 3, 'Paid', 199.00, 199.00
),
(
    'Sarah Wilson', 29, 'Female', '+1234567893', 'sarah@example.com', 58.7,
    'Premium', '2024-01-20', 12, 'Pending', 599.00, 300.00
),
(
    'Tom Brown', 35, 'Male', '+1234567894', 'tom@example.com', 78.9,
    'Basic', '2024-03-01', 6, 'Paid', 299.00, 299.00
);

-- Create indexes for better performance
CREATE INDEX idx_members_name ON members(name);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_phone ON members(phone);
CREATE INDEX idx_members_status ON members(membership_status);
CREATE INDEX idx_members_joining_date ON members(joining_date);

-- Show table structure
DESCRIBE members;

-- Show sample data
SELECT * FROM members;