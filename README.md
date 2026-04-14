# User Management App (Avivo Task)

## About This Project

This is a simple full-stack user management application built as part of an assignment.

It includes:

* A React + TypeScript frontend
* A Node.js + Express backend
* SQLite database (no installation required)

The main goal was to display users, search/filter them, and interact with API data.

---

## Features

* View list of users
* Search users by name, company, role, or country
* Refresh user data
* Add user (frontend mock)
* Delete user (frontend only)

---

## Tech Stack

Frontend:

* React
* TypeScript
* Chakra UI

Backend:

* Node.js
* Express
* TypeScript

Database:

* SQLite (file-based)

---

## How to Run the Project

### 1. Clone the repository

git clone https://github.com/Rahulprasad234/Avivo-Task.git

---

### 2. Run Backend

cd backend
npm install
npm run dev

Backend will run on:
http://localhost:5000

---

### 3. Run Frontend

cd frontend
npm install
npm run dev

Frontend will run on:
http://localhost:3000

---

## Database

* This project uses SQLite
* No setup required
* Database file (`database.db`) is created automatically
* Sample data is already added when backend starts

---

## API Endpoints

GET /api/users → Get all users
GET /api/users/:id → Get user by ID
GET /api/health → Check server status

---

## Notes

* Add/Delete user is handled on frontend only (not persisted in DB)
* SQLite is used for simplicity and easy setup
* Project structure is kept simple for understanding

---

## Author

Rahul Prasad

---

## Final Note

This project was built to demonstrate basic full-stack skills including API integration, React UI, and database handling.
