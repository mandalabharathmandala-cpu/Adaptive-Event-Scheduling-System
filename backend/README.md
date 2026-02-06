# EventFlow Backend Setup

## Prerequisites
- Node.js (v14 or higher)
- MySQL Database
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Create `.env` file in the backend folder:**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=eventflow
JWT_SECRET=your-secret-key-here
```

3. **Create MySQL Database:**
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

## Running the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - User login
- `POST /api/auth/admin/signin` - Admin login
- `GET /api/auth/profile` - Get user profile (requires token)

### Events
- `GET /api/events` - Get all upcoming events
- `GET /api/events/:eventId` - Get event details
- `POST /api/events/create` - Create event (admin only)
- `POST /api/events/:eventId/register` - Register for event
- `GET /api/events/user/registered` - Get user's registered events
- `DELETE /api/events/:eventId/cancel` - Cancel registration
- `GET /api/events/admin/events` - Get admin's events
- `PUT /api/events/:eventId` - Update event (admin only)
- `DELETE /api/events/:eventId` - Delete event (admin only)

## Request/Response Examples

### Sign Up
**Request:**
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

### Sign In
**Request:**
```json
POST /api/auth/signin
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Sign in successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }
}
```

### Create Event (Admin)
**Request:**
```json
POST /api/events/create
Headers: Authorization: Bearer <token>
{
  "eventName": "Tech Conference 2024",
  "clubName": "Tech Club",
  "eventDate": "2024-03-15",
  "eventTime": "10:00:00",
  "location": "Main Hall",
  "description": "Annual tech conference",
  "capacity": 100
}
```

### Get All Events
**Request:**
```json
GET /api/events
```

**Response:**
```json
{
  "events": [
    {
      "id": 1,
      "event_name": "Tech Conference 2024",
      "club_name": "Tech Club",
      "event_date": "2024-03-15",
      "event_time": "10:00:00",
      "location": "Main Hall",
      "description": "Annual tech conference",
      "capacity": 100,
      "registered_count": 45
    }
  ]
}
```

### Register for Event
**Request:**
```json
POST /api/events/1/register
Headers: Authorization: Bearer <token>
```

## Testing with cURL

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","phone":"+1234567890"}'

# Get Events
curl http://localhost:5000/api/events

# Register for Event (with token)
curl -X POST http://localhost:5000/api/events/1/register \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project Structure
```
backend/
├── config/
│   └── database.js       # Database connection pool
├── middleware/
│   └── auth.js           # JWT authentication middleware
├── routes/
│   ├── auth.js           # Authentication routes
│   └── events.js         # Event management routes
├── package.json          # Project dependencies
├── server.js             # Main server file
└── .env                  # Environment variables (create this)
```

## Environment Variables
- `PORT` - Server port (default: 5000)
- `DB_HOST` - Database hostname (default: localhost)
- `DB_USER` - Database user (default: root)
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name (default: eventflow)
- `JWT_SECRET` - Secret key for JWT tokens

## Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file or kill the process using that port
```

**Database connection error:**
- Ensure MySQL is running
- Check .env database credentials
- Verify database exists

**Authentication errors:**
- Ensure token is included in Authorization header
- Format: `Authorization: Bearer <token>`
- Check token expiration (7 days by default)
