import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const DB_PATH = process.env.DB_PATH || './database.db';

export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('✗ Error opening database:', err.message);
  }
});

// Promisify db operations
export const dbRun = (sql: string, params: any[] = []): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const dbGet = <T = any>(sql: string, params: any[] = []): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row as T | undefined);
      }
    });
  });
};

export const dbAll = <T = any>(sql: string, params: any[] = []): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve((rows || []) as T[]);
      }
    });
  });
};

export async function initializeDatabase(): Promise<void> {
  try {
    // Enable foreign keys
    await dbRun('PRAGMA foreign_keys = ON');

    // Check if users table exists
    const tableExists = await dbGet<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users'"
    );

    if (!tableExists) {
      console.log('Creating users table...');
      await dbRun(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          maidenName TEXT,
          age INTEGER NOT NULL,
          gender TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          phone TEXT,
          username TEXT UNIQUE NOT NULL,
          passworod TEXT NOT NULL,
          birthDate DATE,
          image LONGTEXT,
          bloodGroup TEXT,
          height REAL,
          weight REAL,
          eyeColor TEXT,
          hairColor TEXT,
          hairType TEXT,
          domain TEXT,
          ip TEXT,
          addressAddress TEXT,
          addressCity TEXT,
          addressState TEXT,
          addressStateCode TEXT,
          addressPostalCode TEXT,
          addressCoordinatesLat REAL,
          addressCoordinatesLng REAL,
          addressCountry TEXT,
          companyName TEXT,
          companyTitle TEXT,
          companyDepartment TEXT,
          role TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Insert seed data
      const seedData = [
        ['Emily', 'Johnson', 'Smith', 28, 'female', 'emily.johnson@x.dummyjson.com', '+1-570-502-1234', 'emilyj', 'emilypassword123', '1996-05-30', 'https://dummyjson.com/icon/emilyj/128', 'O-', 5.89, 129.3, 'green', 'auburn', 'curly', 'betterserve.com', '42.48.18.228', '42 Rainbow Village', 'Christianview', 'Georgia', 'GA', '85001', 33.7298, -84.3853, 'United States', 'Better Serve', 'Sales Manager', 'Sales', 'admin'],
        ['Michael', 'Brown', null, 35, 'male', 'michael.brown@x.dummyjson.com', '+1-567-890-5432', 'mbrown', 'michael2024pass', '1989-12-15', 'https://dummyjson.com/icon/mbrown/128', 'AB+', 5.95, 145.2, 'blue', 'black', 'straight', 'tech.com', '192.168.1.1', '123 Tech Street', 'New York', 'New York', 'NY', '10001', 40.7128, -74.0060, 'United States', 'Tech Solutions Inc', 'Software Engineer', 'Engineering', 'user'],
        ['Sarah', 'Davis', 'Wilson', 31, 'female', 'sarah.davis@x.dummyjson.com', '+44-1632-960001', 'sarahd', 'sarah123pass', '1993-08-22', 'https://dummyjson.com/icon/sarahd/128', 'A+', 5.67, 112.5, 'hazel', 'brown', 'wavy', 'marketing.co.uk', '203.0.113.45', '456 Market Road', 'London', 'England', 'EN', 'SW1A 1AA', 51.5074, -0.1278, 'United Kingdom', 'Market Masters', 'Marketing Director', 'Marketing', 'manager'],
        ['James', 'Wilson', null, 42, 'male', 'james.wilson@x.dummyjson.com', '+61-2-5550-0127', 'jameswilson', 'james.wilson.pass', '1982-03-10', 'https://dummyjson.com/icon/jameswilson/128', 'B-', 6.01, 152.8, 'brown', 'blonde', 'straight', 'finance.com.au', '203.0.113.89', '789 Finance Avenue', 'Sydney', 'New South Wales', 'NSW', '2000', -33.8688, 151.2093, 'Australia', 'Finance Global', 'Financial Analyst', 'Finance', 'user'],
        ['Lisa', 'Anderson', 'Chen', 29, 'female', 'lisa.anderson@x.dummyjson.com', '+1-415-555-0109', 'lisaa', 'lisapassword456', '1995-07-18', 'https://dummyjson.com/icon/lisaa/128', 'O+', 5.71, 118.9, 'green', 'red', 'curly', 'design.com', '198.51.100.178', '321 Design Plaza', 'San Francisco', 'California', 'CA', '94102', 37.7749, -122.4194, 'United States', 'Creative Designs', 'UX Designer', 'Design', 'user'],
        ['Robert', 'Martinez', null, 38, 'male', 'robert.martinez@x.dummyjson.com', '+34-91-746-3000', 'rmartinez', 'robert.martinez99', '1986-11-25', 'https://dummyjson.com/icon/rmartinez/128', 'AB-', 5.88, 140.5, 'dark brown', 'black', 'curly', 'espana.es', '203.0.113.101', '654 España Boulevard', 'Madrid', 'Madrid', 'MAD', '28001', 40.4168, -3.7038, 'Spain', 'Spanish Industries', 'Operations Manager', 'Operations', 'manager'],
        ['Amanda', 'Taylor', 'Johnson', 26, 'female', 'amanda.taylor@x.dummyjson.com', '+1-720-555-0147', 'amandataylor', 'amanda.t.2024', '1998-02-14', 'https://dummyjson.com/icon/amandataylor/128', 'B+', 5.65, 110.3, 'blue', 'auburn', 'straight', 'denver.com', '198.51.100.45', '987 Colorado Street', 'Denver', 'Colorado', 'CO', '80202', 39.7392, -104.9903, 'United States', 'Denver Tech', 'Junior Developer', 'Engineering', 'user'],
        ['David', 'Kim', null, 33, 'male', 'david.kim@x.dummyjson.com', '+82-2-1234-5678', 'davidkim', 'david.kim.pass123', '1991-09-03', 'https://dummyjson.com/icon/davidkim/128', 'O-', 5.79, 135.7, 'dark brown', 'black', 'straight', 'korea-tech.co.kr', '192.0.2.56', '123 Seoul Tech', 'Seoul', 'Seoul', 'SL', '03151', 37.5665, 126.9780, 'South Korea', 'Korea Tech Solutions', 'Senior Engineer', 'Engineering', 'manager'],
        ['Jennifer', 'Garcia', 'López', 30, 'female', 'jennifer.garcia@x.dummyjson.com', '+52-55-5555-0150', 'jgarcia', 'jennifer.garcia.mx', '1994-06-27', 'https://dummyjson.com/icon/jgarcia/128', 'A-', 5.58, 115.2, 'brown', 'black', 'wavy', 'mexico.com.mx', '192.0.2.78', '456 Mexico City', 'Mexico City', 'Mexico City', 'MX', '06500', 19.4326, -99.1332, 'Mexico', 'Mexico Global Corp', 'Sales Executive', 'Sales', 'user'],
        ['Christopher', 'Lee', null, 40, 'male', 'christopher.lee@x.dummyjson.com', '+65-6234-5678', 'clee', 'christopher.lee.sg', '1984-01-08', 'https://dummyjson.com/icon/clee/128', 'AB+', 5.91, 148.6, 'brown', 'black', 'straight', 'singapore-tech.sg', '203.0.113.200', '789 Singapore Avenue', 'Singapore', 'Singapore', 'SG', '018956', 1.3521, 103.8198, 'Singapore', 'Singapore Tech Hub', 'Director of Operations', 'Operations', 'admin']
      ];

      const insertStmt = `
        INSERT INTO users (
          firstName, lastName, maidenName, age, gender, email, phone, username, passworod,
          birthDate, image, bloodGroup, height, weight, eyeColor, hairColor, hairType, domain, ip,
          addressAddress, addressCity, addressState, addressStateCode, addressPostalCode,
          addressCoordinatesLat, addressCoordinatesLng, addressCountry, companyName, companyTitle,
          companyDepartment, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      for (const row of seedData) {
        await dbRun(insertStmt, row);
      }

      console.log('✓ Database initialized with seed data');
    } else {
      console.log('✓ Database connected successfully');
    }
  } catch (error) {
    console.error('✗ Database initialization failed:', error);
    throw error;
  }
}
