# Backend Setup Guide - EventFlow

Your backend is ready! Follow these steps to get it running.

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Database
Create MySQL database and tables using the SQL script:

```sql
CREATE DATABASE eventflow;

USE eventflow;

-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins Table
CREATE TABLE admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_name VARCHAR(200) NOT NULL,
  club_name VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  capacity INT DEFAULT 100,
  admin_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- Registrations Table
CREATE TABLE registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_registration (user_id, event_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_registrations_user ON registrations(user_id);
CREATE INDEX idx_registrations_event ON registrations(event_id);
```

### 3. Create .env File
Copy `.env.example` to `.env` and update:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=eventflow
JWT_SECRET=your-secret-key-change-this
```

### 4. Start Server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server will run on: **http://localhost:5000**

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | User login |
| POST | `/api/auth/admin/signin` | Admin login |
| GET | `/api/auth/profile` | Get user profile |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:eventId` | Get event details |
| POST | `/api/events/create` | Create event (admin) |
| POST | `/api/events/:eventId/register` | Register for event |
| GET | `/api/events/user/registered` | Get user's events |
| DELETE | `/api/events/:eventId/cancel` | Cancel registration |
| PUT | `/api/events/:eventId` | Update event (admin) |
| DELETE | `/api/events/:eventId` | Delete event (admin) |

### Admin Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get dashboard stats |
| GET | `/api/admin/events/:eventId/attendees` | Get event attendees |
| GET | `/api/admin/events/:eventId/download-csv` | Download attendance CSV |

## Test with cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'

# Get Events
curl http://localhost:5000/api/events

# Sign In
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Connecting Frontend

Update your frontend JavaScript to call the backend:

```javascript
const API_URL = 'http://localhost:5000/api';

// Sign In Example
async function signIn(email, password) {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
}

// Get Events Example
async function getEvents() {
  const response = await fetch(`${API_URL}/events`);
  return await response.json();
}

// Register for Event Example
async function registerEvent(eventId) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/events/${eventId}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js         # Database connection
├── middleware/
│   └── auth.js             # JWT authentication
├── routes/
│   ├── auth.js             # Auth endpoints
│   ├── events.js           # Event endpoints
│   └── admin.js            # Admin endpoints
├── server.js               # Main server file
├── package.json            # Dependencies
├── .env                    # Environment variables
├── .env.example            # Example .env
└── README.md               # Full documentation
```

## Troubleshooting

**Error: "Cannot find module 'express'"**
- Run: `npm install`

**Error: "connect ECONNREFUSED 127.0.0.1:3306"**
- MySQL is not running
- Check DB credentials in .env

**Port 5000 already in use**
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

**CORS errors from frontend**
- CORS is enabled for all origins
- Update if needed in server.js

## Features Implemented

✅ User authentication (signup/signin)
✅ Admin authentication
✅ Event creation (admin)
✅ Event listing and filtering
✅ User event registration
✅ Event capacity management
✅ Admin dashboard stats
✅ Attendee tracking
✅ CSV download for events
✅ JWT token authentication
✅ Password hashing with bcrypt
✅ Database relationships
✅ Error handling

## Next Steps

1. Install dependencies: `npm install`
2. Set up MySQL database
3. Create .env file
4. Start server: `npm start`
5. Test with the provided cURL examples
6. Connect your frontend to the API
