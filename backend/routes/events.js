const express = require('express');
const pool = require('../config/database');
const { verifyToken, verifyAdminToken } = require('../middleware/auth');

const router = express.Router();

// Create Event (Admin)
router.post('/create', verifyAdminToken, async (req, res) => {
  try {
    const { eventName, clubName, eventDate, eventTime, location, description, capacity } = req.body;

    if (!eventName || !clubName || !eventDate || !eventTime || !location) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      `INSERT INTO events (event_name, club_name, event_date, event_time, location, description, capacity, admin_id, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [eventName, clubName, eventDate, eventTime, location, description || '', capacity || 100, req.adminId]
    );

    connection.release();

    res.status(201).json({
      message: 'Event created successfully',
      event: { id: result.insertId, eventName, clubName, eventDate, eventTime, location }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Events
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [events] = await connection.query(
      `SELECT id, event_name, club_name, event_date, event_time, location, description, capacity, 
              (SELECT COUNT(*) FROM registrations WHERE event_id = events.id) as registered_count
       FROM events WHERE event_date >= CURDATE() ORDER BY event_date ASC`
    );

    connection.release();

    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Event Details
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;

    const connection = await pool.getConnection();

    const [events] = await connection.query(
      `SELECT id, event_name, club_name, event_date, event_time, location, description, capacity,
              (SELECT COUNT(*) FROM registrations WHERE event_id = events.id) as registered_count
       FROM events WHERE id = ?`,
      [eventId]
    );

    connection.release();

    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event: events[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register for Event (User)
router.post('/:eventId/register', verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const connection = await pool.getConnection();

    // Check if event exists
    const [events] = await connection.query(
      'SELECT id, capacity FROM events WHERE id = ?',
      [eventId]
    );

    if (events.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    const [existing] = await connection.query(
      'SELECT id FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check capacity
    const [registered] = await connection.query(
      'SELECT COUNT(*) as count FROM registrations WHERE event_id = ?',
      [eventId]
    );

    if (registered[0].count >= events[0].capacity) {
      connection.release();
      return res.status(400).json({ message: 'Event is full' });
    }

    // Register user
    await connection.query(
      'INSERT INTO registrations (user_id, event_id, registered_at) VALUES (?, ?, NOW())',
      [userId, eventId]
    );

    connection.release();

    res.status(201).json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get User's Registered Events
router.get('/user/registered', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const connection = await pool.getConnection();

    const [events] = await connection.query(
      `SELECT e.id, e.event_name, e.club_name, e.event_date, e.event_time, e.location, e.description, 
              (SELECT COUNT(*) FROM registrations WHERE event_id = e.id) as registered_count
       FROM events e
       INNER JOIN registrations r ON e.id = r.event_id
       WHERE r.user_id = ? AND e.event_date >= CURDATE()
       ORDER BY e.event_date ASC`,
      [userId]
    );

    connection.release();

    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel Registration
router.delete('/:eventId/cancel', verifyToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.userId;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, eventId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Admin's Events
router.get('/admin/events', verifyAdminToken, async (req, res) => {
  try {
    const adminId = req.adminId;

    const connection = await pool.getConnection();

    const [events] = await connection.query(
      `SELECT id, event_name, club_name, event_date, event_time, location, capacity,
              (SELECT COUNT(*) FROM registrations WHERE event_id = events.id) as registered_count
       FROM events WHERE admin_id = ? ORDER BY event_date DESC`,
      [adminId]
    );

    connection.release();

    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Event (Admin)
router.put('/:eventId', verifyAdminToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const { eventName, clubName, eventDate, eventTime, location, description, capacity } = req.body;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE events SET event_name = ?, club_name = ?, event_date = ?, event_time = ?, 
              location = ?, description = ?, capacity = ? WHERE id = ? AND admin_id = ?`,
      [eventName, clubName, eventDate, eventTime, location, description, capacity, eventId, req.adminId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Event (Admin)
router.delete('/:eventId', verifyAdminToken, async (req, res) => {
  try {
    const { eventId } = req.params;

    const connection = await pool.getConnection();

    // Delete registrations first
    await connection.query('DELETE FROM registrations WHERE event_id = ?', [eventId]);

    // Delete event
    const [result] = await connection.query(
      'DELETE FROM events WHERE id = ? AND admin_id = ?',
      [eventId, req.adminId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
