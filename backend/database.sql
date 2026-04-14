-- Create database
CREATE DATABASE IF NOT EXISTS avivo_users;
USE avivo_users;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  maidenName VARCHAR(100),
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  phone VARCHAR(20),
  username VARCHAR(100) UNIQUE NOT NULL,
  passworod VARCHAR(255) NOT NULL,
  birthDate DATE,
  image LONGTEXT,
  bloodGroup VARCHAR(10),
  height DECIMAL(5, 2),
  weight DECIMAL(6, 2),
  eyeColor VARCHAR(20),
  hairColor VARCHAR(20),
  hairType VARCHAR(20),
  domain VARCHAR(255),
  ip VARCHAR(45),
  addressAddress VARCHAR(255),
  addressCity VARCHAR(100),
  addressState VARCHAR(100),
  addressStateCode VARCHAR(10),
  addressPostalCode VARCHAR(20),
  addressCoordinatesLat DECIMAL(10, 8),
  addressCoordinatesLng DECIMAL(11, 8),
  addressCountry VARCHAR(100),
  companyName VARCHAR(255),
  companyTitle VARCHAR(100),
  companyDepartment VARCHAR(100),
  role VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_country (addressCountry),
  INDEX idx_company (companyName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data based on dummyjson.com/users
INSERT INTO users (firstName, lastName, maidenName, age, gender, email, phone, username, passworod, birthDate, image, bloodGroup, height, weight, eyeColor, hairColor, hairType, domain, ip, addressAddress, addressCity, addressState, addressStateCode, addressPostalCode, addressCoordinatesLat, addressCoordinatesLng, addressCountry, companyName, companyTitle, companyDepartment, role) VALUES
('Emily', 'Johnson', 'Smith', 28, 'female', 'emily.johnson@x.dummyjson.com', '+1-570-502-1234', 'emilyj', 'emilypassword123', '1996-05-30', 'https://dummyjson.com/icon/emilyj/128', 'O-', 5.89, 129.3, 'green', 'auburn', 'curly', 'betterserve.com', '42.48.18.228', '42 Rainbow Village', 'Christianview', 'Georgia', 'GA', '85001', 33.7298, -84.3853, 'United States', 'Better Serve', 'Sales Manager', 'Sales', 'admin'),
('Michael', 'Brown', NULL, 35, 'male', 'michael.brown@x.dummyjson.com', '+1-567-890-5432', 'mbrown', 'michael2024pass', '1989-12-15', 'https://dummyjson.com/icon/mbrown/128', 'AB+', 5.95, 145.2, 'blue', 'black', 'straight', 'tech.com', '192.168.1.1', '123 Tech Street', 'New York', 'New York', 'NY', '10001', 40.7128, -74.0060, 'United States', 'Tech Solutions Inc', 'Software Engineer', 'Engineering', 'user'),
('Sarah', 'Davis', 'Wilson', 31, 'female', 'sarah.davis@x.dummyjson.com', '+44-1632-960001', 'sarahd', 'sarah123pass', '1993-08-22', 'https://dummyjson.com/icon/sarahd/128', 'A+', 5.67, 112.5, 'hazel', 'brown', 'wavy', 'marketing.co.uk', '203.0.113.45', '456 Market Road', 'London', 'England', 'EN', 'SW1A 1AA', 51.5074, -0.1278, 'United Kingdom', 'Market Masters', 'Marketing Director', 'Marketing', 'manager'),
('James', 'Wilson', NULL, 42, 'male', 'james.wilson@x.dummyjson.com', '+61-2-5550-0127', 'jameswilson', 'james.wilson.pass', '1982-03-10', 'https://dummyjson.com/icon/jameswilson/128', 'B-', 6.01, 152.8, 'brown', 'blonde', 'straight', 'finance.com.au', '203.0.113.89', '789 Finance Avenue', 'Sydney', 'New South Wales', 'NSW', '2000', -33.8688, 151.2093, 'Australia', 'Finance Global', 'Financial Analyst', 'Finance', 'user'),
('Lisa', 'Anderson', 'Chen', 29, 'female', 'lisa.anderson@x.dummyjson.com', '+1-415-555-0109', 'lisaa', 'lisapassword456', '1995-07-18', 'https://dummyjson.com/icon/lisaa/128', 'O+', 5.71, 118.9, 'green', 'red', 'curly', 'design.com', '198.51.100.178', '321 Design Plaza', 'San Francisco', 'California', 'CA', '94102', 37.7749, -122.4194, 'United States', 'Creative Designs', 'UX Designer', 'Design', 'user'),
('Robert', 'Martinez', NULL, 38, 'male', 'robert.martinez@x.dummyjson.com', '+34-91-746-3000', 'rmartinez', 'robert.martinez99', '1986-11-25', 'https://dummyjson.com/icon/rmartinez/128', 'AB-', 5.88, 140.5, 'dark brown', 'black', 'curly', 'espana.es', '203.0.113.101', '654 España Boulevard', 'Madrid', 'Madrid', 'MAD', '28001', 40.4168, -3.7038, 'Spain', 'Spanish Industries', 'Operations Manager', 'Operations', 'manager'),
('Amanda', 'Taylor', 'Johnson', 26, 'female', 'amanda.taylor@x.dummyjson.com', '+1-720-555-0147', 'amandataylor', 'amanda.t.2024', '1998-02-14', 'https://dummyjson.com/icon/amandataylor/128', 'B+', 5.65, 110.3, 'blue', 'auburn', 'straight', 'denver.com', '198.51.100.45', '987 Colorado Street', 'Denver', 'Colorado', 'CO', '80202', 39.7392, -104.9903, 'United States', 'Denver Tech', 'Junior Developer', 'Engineering', 'user'),
('David', 'Kim', NULL, 33, 'male', 'david.kim@x.dummyjson.com', '+82-2-1234-5678', 'davidkim', 'david.kim.pass123', '1991-09-03', 'https://dummyjson.com/icon/davidkim/128', 'O-', 5.79, 135.7, 'dark brown', 'black', 'straight', 'korea-tech.co.kr', '192.0.2.56', '123 Seoul Tech', 'Seoul', 'Seoul', 'SL', '03151', 37.5665, 126.9780, 'South Korea', 'Korea Tech Solutions', 'Senior Engineer', 'Engineering', 'manager'),
('Jennifer', 'Garcia', 'López', 30, 'female', 'jennifer.garcia@x.dummyjson.com', '+52-55-5555-0150', 'jgarcia', 'jennifer.garcia.mx', '1994-06-27', 'https://dummyjson.com/icon/jgarcia/128', 'A-', 5.58, 115.2, 'brown', 'black', 'wavy', 'mexico.com.mx', '192.0.2.78', '456 Mexico City', 'Mexico City', 'Mexico City', 'MX', '06500', 19.4326, -99.1332, 'Mexico', 'Mexico Global Corp', 'Sales Executive', 'Sales', 'user'),
('Christopher', 'Lee', NULL, 40, 'male', 'christopher.lee@x.dummyjson.com', '+65-6234-5678', 'clee', 'christopher.lee.sg', '1984-01-08', 'https://dummyjson.com/icon/clee/128', 'AB+', 5.91, 148.6, 'brown', 'black', 'straight', 'singapore-tech.sg', '203.0.113.200', '789 Singapore Avenue', 'Singapore', 'Singapore', 'SG', '018956', 1.3521, 103.8198, 'Singapore', 'Singapore Tech Hub', 'Director of Operations', 'Operations', 'admin');
