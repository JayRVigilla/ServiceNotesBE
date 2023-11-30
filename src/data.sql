DROP DATABASE IF EXISTS "service_notes";

CREATE DATABASE "service_notes";

\c "service_notes"

CREATE TABLE users (
    -- meta data
    id VARCHAR(36) PRIMARY KEY, -- uuid.v4()
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- user profile
    username VARCHAR(24) NOT_NULL,
    password_hash CHAR(24) NOT_NULL,
    img TEXT,

    -- user info
    name_first VARCHAR(50) NOT NULL,
    name_last VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT_NULL,
    -- user/location info
    location_street VARCHAR(255),
    location_city VARCHAR(255),
    location_state_provence VARCHAR(255),
    location_zip_code VARCHAR(255),
    location_country VARCHAR(255),

    );

CREATE TABLE companies (
        -- meta data
    id VARCHAR(36) PRIMARY KEY, -- uuid.v4()
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- company profile
    img TEXT,
    name VARCHAR(50) NOT NULL,
    -- assuming US numbers, but arbitrary extra space for international
    phone_number VARCHAR(24),
    admin_id VARCHAR(36) FOREIGN KEY REFERENCES users

    -- user/location info
    location_street VARCHAR(255),
    location_city VARCHAR(255),
    location_state_provence VARCHAR(255),
    location_zip_code VARCHAR(255),
    location_country VARCHAR(255),
    );

CREATE TABLE properties (
        -- meta data
    id VARCHAR(36) PRIMARY KEY, -- uuid.v4()
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- property profile
    img TEXT,
    name VARCHAR(50) NOT NULL,
    admin_id VARCHAR(36) FOREIGN KEY REFERENCES users

    -- assuming US numbers, but arbitrary extra space for international
    phone_number VARCHAR(24),
    -- property/location info
    location_street VARCHAR(255),
    location_city VARCHAR(255),
    location_state_provence VARCHAR(255),
    location_zip_code VARCHAR(255),
    location_country VARCHAR(255),
    );