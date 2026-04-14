# Avivo Backend - User Management API

A Node.js API built with Express and TypeScript that serves user data from a SQLite database, mirroring the structure from https://dummyjson.com/users.

## Features

- **RESTful API** with Express.js
- **TypeScript** for type safety
- **SQLite** database (zero installation required!)
- **CORS** support for frontend communication
- **Error handling** and validation
- **Automatic database initialization** on first run

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

That's it! No database installation needed. SQLite is built-in.

## Installation

### 1. Clone/Setup the project

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the backend folder:

```bash
cp .env.example .env
```

The default configuration works out of the box:

```env
DB_PATH=./database.db
SERVER_PORT=5000
NODE_ENV=development
```

**Optional:** Change `DB_PATH` if you want the database file in a different location.

### 4. Start the server

That's it! The database will be automatically created on first run with all the seed data.

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Running the Server

### Development Mode

```bash
npm run dev
```

The server will start with `ts-node` and the database will auto-initialize.

### Production Mode

```bash
npm run build
npm start
```

## What Happens on First Run

1. ✓ Database file is automatically created (`database.db`)
2. ✓ Users table is created with proper schema
3. ✓ 10 seed users are inserted automatically
4. ✓ Server starts and is ready for requests

## Database

### Location
- **Default**: `./database.db` in the backend folder
- **Configurable**: Set `DB_PATH` in `.env`

### What's Included
- Pre-populated with 10 user records
- All fields from dummyjson.com/users structure
- Ready to use immediately

## API Endpoints

### 1. Get All Users

```http
GET /api/users
```

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "firstName": "Emily",
      "lastName": "Johnson",
      "email": "emily.johnson@x.dummyjson.com",
      "age": 28,
      "gender": "female",
      "phone": "+1-570-502-1234",
      "company": {
        "name": "Better Serve",
        "title": "Sales Manager",
        "department": "Sales"
      },
      "address": {
        "country": "United States",
        "city": "Christianview",
        "state": "Georgia"
      },
      "role": "admin"
      // ... more fields
    }
    // ... more users
  ],
  "total": 10
}
```

### 2. Get Single User

```http
GET /api/users/:id
```

**Example:**
```http
GET /api/users/1
```

**Response:**
```json
{
  "id": 1,
  "firstName": "Emily",
  "lastName": "Johnson",
  // ... full user object
}
```

### 3. Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts          # Main Express server
│   ├── database.ts       # SQLite connection setup
│   ├── routes.ts         # API routes and endpoints
│   └── types.ts          # TypeScript interfaces
├── database.db           # SQLite database (auto-created)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Security Features

✓ **SQL Injection Prevention**: Uses parameterized queries
✓ **CORS Support**: Configured for frontend communication
✓ **Environment Variables**: Sensitive data kept in `.env` file
✓ **Error Handling**: Graceful error messages without exposing sensitive info
✓ **Type Safety**: TypeScript prevents runtime type errors

## Example Usage

### Using cURL

```bash
# Get all users
curl http://localhost:5000/api/users

# Get single user
curl http://localhost:5000/api/users/1

# Health check
curl http://localhost:5000/api/health
```

### Using Axios (from React)

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Get all users
const { data } = await apiClient.get('/users');

// Get single user
const user = await apiClient.get(`/users/1`);
```

## Troubleshooting

### "Cannot find module 'sqlite3'"
```bash
npm install
npm install sqlite3
```

### "EACCES: permission denied" when creating database
Ensure the backend folder has write permissions.

### Port already in use
Change `SERVER_PORT` in `.env` to an available port (e.g., 5001):
```env
SERVER_PORT=5001
```

### Database not initializing
Delete the old `database.db` file and restart the server - a new one will be created automatically.

## Performance

- **User Fetch**: ~5-50ms (instant from SQLite)
- **Server Startup**: < 1s
- **Database Size**: ~100KB
- **Concurrent Connections**: Limited by system

## Production Deployment

For production deployment:

1. Build the TypeScript:
```bash
npm run build
```

2. Set production environment variables:
```env
NODE_ENV=production
SERVER_PORT=5000
```

3. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start dist/index.js --name "avivo-api"
```

4. Back up your `database.db` file regularly!

## Database Operations

### View Database Contents

To browse the SQLite database file:

- **SQLite CLI**: `sqlite3 database.db`
- **GUI Tools**: 
  - DB Browser for SQLite (free, cross-platform)
  - SQLiteStudio
  - DBeaver

Example CLI command:
```bash
sqlite3 database.db ".tables"
sqlite3 database.db "SELECT * FROM users LIMIT 5;"
```

### Export Data

```bash
sqlite3 database.db ".mode csv" ".output users.csv" "SELECT * FROM users;" ".quit"
```

## API Response Format

All responses follow a consistent format:

**Success (GET /users):**
```json
{
  "users": [...],
  "total": 10
}
```

**Success (GET /users/:id):**
```json
{
  "id": 1,
  "firstName": "Emily",
  ...
}
```

**Error:**
```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

## License

ISC

## Support

For issues or questions:
1. Check this README
2. Verify `.env` configuration
3. Check server logs for errors
4. Ensure Node.js and npm are installed

