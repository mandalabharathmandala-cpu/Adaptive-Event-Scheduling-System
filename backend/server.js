require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log('  POST   /api/auth/signup');
  console.log('  POST   /api/auth/signin');
  console.log('  POST   /api/auth/admin/signin');
  console.log('  GET    /api/auth/profile');
  console.log('  POST   /api/events/create');
  console.log('  GET    /api/events');
  console.log('  GET    /api/events/:eventId');
  console.log('  POST   /api/events/:eventId/register');
  console.log('  GET    /api/events/user/registered');
  console.log('  DELETE /api/events/:eventId/cancel');
  console.log('  GET    /api/events/admin/events');
  console.log('  PUT    /api/events/:eventId');
  console.log('  DELETE /api/events/:eventId');
  console.log('  GET    /api/admin/stats');
  console.log('  GET    /api/admin/events/:eventId/attendees');
  console.log('  GET    /api/admin/events/:eventId/download-csv');
});
