DROP DATABASE IF EXISTS "service_notes_db";

CREATE DATABASE "service_notes_db";

\c "service_notes_db"

-- allows use of uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- created by ChatGPT
CREATE TABLE Users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code VARCHAR(10),
  img_url VARCHAR(255),  -- You might want to adjust the size based on your needs
  password_hash VARCHAR(255),
  username VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserTypes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES Users(id),
  type VARCHAR(50) NOT NULL CHECK (type IN ('PropertyManager', 'BusinessAdmin', 'Employee'))
);

CREATE TABLE Properties (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES Users(id),
  property_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  admin UUID REFERENCES Users(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Company_Employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES Companies(id),
  employee_id UUID REFERENCES Users(id)
);

CREATE TABLE Company_Schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES Companies(id),
  property_id UUID REFERENCES Properties(id),
  date_time TIMESTAMP NOT NULL,
  duration INTERVAL NOT NULL,
  notes TEXT
);

CREATE TABLE Company_Notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_schedule_id UUID REFERENCES Company_Schedules(id),
  property_id UUID REFERENCES Properties(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Note_Employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_note_id UUID REFERENCES Company_Notes(id),
  employee_id UUID REFERENCES Users(id)
);

CREATE TABLE Owner_Notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_note_id UUID REFERENCES Company_Notes(id),
  property_id UUID REFERENCES Properties(id),
  note TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

\c "postgres"
\q
-- END ChatGPT

-- CREATE TABLE users (
--     -- meta data
--     id UUID PRIMARY KEY, -- uuid.v4()
--     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

--     -- user profile
--     username VARCHAR(24),
--     password_hash CHAR(24),
--     img TEXT,

--     -- user info
--     name_first VARCHAR(50) NOT NULL,
--     name_last VARCHAR(50) NOT NULL,
--     email VARCHAR(255),
--     -- user/location info
--     location_street VARCHAR(255),
--     location_city VARCHAR(255),
--     location_state_provence VARCHAR(255),
--     location_zip_code VARCHAR(255),
--     location_country VARCHAR(255)
--     );

-- CREATE TABLE companies (
--         -- meta data
--     id UUID PRIMARY KEY, -- uuid.v4()
--     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
--     created_by UUID REFERENCES users

--     -- company profile
--     img TEXT,
--     name VARCHAR(50) NOT NULL,
--     -- assuming US numbers, but arbitrary extra space for international
--     phone_number VARCHAR(24),
--     admin_id VARCHAR(36) REFERENCES users

--     -- user/location info
--     location_street VARCHAR(255),
--     location_city VARCHAR(255),
--     location_state_provence VARCHAR(255),
--     location_zip_code VARCHAR(255),
--     location_country VARCHAR(255)
--     );

-- CREATE TABLE properties (
--         -- meta data
--     id UUID PRIMARY KEY, -- uuid.v4()
--     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

--     -- property profile
--     img TEXT,
--     name VARCHAR(50) NOT NULL,
--     admin_id VARCHAR(36) REFERENCES users

--     -- assuming US numbers, but arbitrary extra space for international
--     phone_number VARCHAR(24),
--     -- property/location info
--     location_street VARCHAR(255),
--     location_city VARCHAR(255),
--     location_state_provence VARCHAR(255),
--     location_zip_code VARCHAR(255),
--     location_country VARCHAR(255)
--     );

-- CREATE TABLE jobs (
--     id UUID PRIMARY KEY, -- uuid.v4()
--     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

--     property VARCHAR(36) REFERENCES properties -- property_id

--     assignee_company VARCHAR(36)  REFERENCES users -- company_id
--     assignee VARCHAR(36) REFERENCES users -- user_id
--     created_by VARCHAR(36) REFERENCES users -- user_id aka company_admin
--     assigned_at TIMESTAMPTZ,

--     completed_at TIMESTAMPTZ,
--     notes LONGTEXT

--     -- TODO: recurring? scheduling details?

-- )

-- -- TODO: through tables
-- -- usersToCompanies: who are agents of a company
-- -- jobsToProperties: jobs that took place at a property
-- -- jobsToCompanies: jobs completed by a company