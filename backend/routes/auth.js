const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const pool = require('../config/database');

const router = express.Router();

// CAPTCHA Verification Function
async function verifyCaptcha(captchaToken) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY || 'YOUR_RECAPTCHA_SECRET_KEY';
    
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: captchaToken
      }
    });

    // For reCAPTCHA v2, check if success is true
    // For reCAPTCHA v3, check if success is true and score > 0.5
    return response.data.success && (response.data.score === undefined || response.data.score > 0.5);
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

// User Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const connection = await pool.getConnection();

    // Check if user exists
    const [existingUser] = await connection.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, phone, 'user']
    );

    connection.release();

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, role: 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: result.insertId, name, email, phone }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password, captchaToken } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return res.status(400).json({ message: 'CAPTCHA verification required' });
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    const connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT id, name, email, password, phone, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    connection.release();

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Sign in successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Sign In
router.post('/admin-signin', async (req, res) => {
  try {
    const { adminId, password, captchaToken } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({ message: 'Admin ID and password required' });
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return res.status(400).json({ message: 'CAPTCHA verification required' });
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    const connection = await pool.getConnection();

    const [admins] = await connection.query(
      'SELECT id, admin_id, name, password FROM admins WHERE admin_id = ?',
      [adminId]
    );

    if (admins.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = admins[0];

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    connection.release();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Admin sign in successful',
      token,
      admin: { id: admin.id, adminId: admin.admin_id, name: admin.name }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Keep old endpoint for backwards compatibility
router.post('/admin/signin', async (req, res) => {
  try {
    const { adminId, password, captchaToken } = req.body;

    if (!adminId || !password) {
      return res.status(400).json({ message: 'Admin ID and password required' });
    }

    // Verify CAPTCHA
    if (!captchaToken) {
      return res.status(400).json({ message: 'CAPTCHA verification required' });
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    const connection = await pool.getConnection();

    const [admins] = await connection.query(
      'SELECT id, admin_id, name, password FROM admins WHERE admin_id = ?',
      [adminId]
    );

    if (admins.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = admins[0];

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    connection.release();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Admin sign in successful',
      token,
      admin: { id: admin.id, adminId: admin.admin_id, name: admin.name }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User Profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const connection = await pool.getConnection();

    const [users] = await connection.query(
      'SELECT id, name, email, phone FROM users WHERE id = ?',
      [decoded.id]
    );

    connection.release();

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
