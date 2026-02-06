# EventFlow Backend - Complete Setup Instructions

## Prerequisites Check

Before starting, ensure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL Server** - [Download here](https://dev.mysql.com/downloads/mysql/)
- **MySQL Client** or **MySQL Workbench** - for running database setup

## Step 1: Install Node.js

If not already installed:
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the prompts
4. **Restart your terminal/PowerShell after installation**

Verify installation:
```bash
node --version
npm --version
```

## Step 2: Install Backend Dependencies

Navigate to the backend folder and run setup:

**For Windows:**
```bash
cd backend
setup.bat
```

**For macOS/Linux:**
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

**Or manually:**
```bash
npm install
```

This installs all required packages (Express, MySQL, JWT, bcrypt, etc.)

## Step 3: Set Up MySQL Database

### Option A: Using MySQL Command Line

1. Open MySQL Command Line or MySQL Workbench
2. Connect to your MySQL server
3. Run the SQL script:

```bash
# Windows
mysql -u root -p < backend\database-setup.sql

# macOS/Linux
mysql -u root -p < backend/database-setup.sql
```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to **File → Open SQL Script**
4. Select `backend/database-setup.sql`
5. Click **Execute** (Lightning bolt icon)

### Option C: Manual Setup

1. Open MySQL Workbench or command line
2. Run this command:
```sql
CREATE DATABASE eventflow;
USE eventflow;
```

3. Then copy and paste the entire contents of `backend/database-setup.sql`

**Demo Accounts Created:**
- Admin: `admin_id: ADMIN001` | Password: `password123`
- User: `email: demo@example.com` | Password: `password123`

## Step 4: Create Environment Configuration

In the `backend` folder, create a new file named `.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=eventflow

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL password!

## Step 5: Start the Backend Server

```bash
cd backend
npm start
```

Expected output:
```
Server running on http://localhost:5000
API endpoints:
  POST   /api/auth/signup
  POST   /api/auth/signin
  POST   /api/auth/admin/signin
  ...
```

## Step 6: Verify Everything Works

Test with a simple request:

```bash
# In PowerShell/Terminal, test if server is running:
curl http://localhost:5000/api/health

# Expected response:
# {"message":"Server is running"}
```

## Quick Test Commands

### Test User Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "password":"password123",
    "phone":"+1234567890"
  }'
```

### Test Get All Events
```bash
curl http://localhost:5000/api/events
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin/signin `
  -H "Content-Type: application/json" `
  -d '{
    "adminId":"ADMIN001",
    "password":"password123"
  }'
```

## Troubleshooting

### Error: "npm: command not found"
- Node.js not installed or not in PATH
- **Solution:** Install Node.js from [nodejs.org](https://nodejs.org/) and restart terminal

### Error: "Cannot find module 'express'"
- Dependencies not installed
- **Solution:** Run `npm install` in the backend folder

### Error: "connect ECONNREFUSED 127.0.0.1:3306"
- MySQL is not running
- **Solution:** Start MySQL Server
  - Windows: Use MySQL Workbench or Services
  - macOS: `brew services start mysql@5.7`
  - Linux: `sudo systemctl start mysql`

### Error: "Access denied for user 'root'@'localhost'"
- Wrong MySQL password in .env
- **Solution:** Update DB_PASSWORD in .env with correct password

### Error: "Port 5000 already in use"
- Another process using port 5000
- **Solution:** 
  - Change PORT in .env to another number (e.g., 5001)
  - Or kill process: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`

### Error: "Unexpected token in JSON at position 0"
- Usually from frontend trying to parse non-JSON response
- **Solution:** Ensure backend is running and CORS is properly configured

## Development Mode (Optional)

For auto-reload during development:

1. Install nodemon globally:
```bash
npm install -g nodemon
```

2. Start server with auto-reload:
```bash
npm run dev
```

## Project Structure After Setup

```
backend/
├── config/
│   └── database.js              # Database connection pool
├── middleware/
│   └── auth.js                  # JWT authentication
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   ├── events.js                # Event management endpoints
│   └── admin.js                 # Admin dashboard endpoints
├── node_modules/                # Installed dependencies
├── server.js                    # Main server file
├── package.json                 # Project configuration
├── .env                         # Environment variables (created)
├── .env.example                 # Template for .env
├── setup.bat                    # Setup script for Windows
├── setup.sh                     # Setup script for macOS/Linux
├── database-setup.sql           # SQL script for database
├── README.md                    # Full documentation
└── COMPLETE_SETUP.md            # This file
```

## Next Steps

1. ✅ Install Node.js
2. ✅ Run setup script (`setup.bat` or `setup.sh`)
3. ✅ Set up MySQL database
4. ✅ Create .env file
5. ✅ Start server with `npm start`
6. **Now:** Connect your frontend to the backend

## Connect Frontend to Backend

In your frontend JavaScript files, add:

```javascript
const API_URL = 'http://localhost:5000/api';

// Then use API_URL in your fetch calls:
fetch(`${API_URL}/events`)
fetch(`${API_URL}/auth/signin`, { method: 'POST', ... })
```

## Support

For more information:
- See [backend/README.md](backend/README.md) for API documentation
- See [BACKEND_SETUP.md](BACKEND_SETUP.md) for quick reference
- Check [backend/.env.example](backend/.env.example) for all configuration options

## Security Notes

⚠️ **Important for Production:**
- Never commit `.env` file to version control
- Change `JWT_SECRET` to a strong random string
- Use strong MySQL password
- Enable HTTPS in production
- Set `NODE_ENV=production`
- Use environment-specific credentials
