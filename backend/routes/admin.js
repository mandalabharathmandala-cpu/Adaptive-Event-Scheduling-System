const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { verifyAdminToken } = require('../middleware/auth');

// Get Dashboard Stats (Admin)
router.get('/stats', verifyAdminToken, async (req, res) => {
  try {
    const adminId = req.adminId;
    const connection = await pool.getConnection();

    // Total events created
    const [events] = await connection.query(
      'SELECT COUNT(*) as totalEvents FROM events WHERE admin_id = ?',
      [adminId]
    );

    // Total registrations across all events
    const [registrations] = await connection.query(
      `SELECT COUNT(*) as totalRegistrations FROM registrations r
       INNER JOIN events e ON r.event_id = e.id
       WHERE e.admin_id = ?`,
      [adminId]
    );

    // Upcoming events
    const [upcoming] = await connection.query(
      'SELECT COUNT(*) as upcomingEvents FROM events WHERE admin_id = ? AND event_date >= CURDATE()',
      [adminId]
    );

    // Past events
    const [past] = await connection.query(
      'SELECT COUNT(*) as pastEvents FROM events WHERE admin_id = ? AND event_date < CURDATE()',
      [adminId]
    );

    connection.release();

    res.json({
      stats: {
        totalEvents: events[0].totalEvents,
        totalRegistrations: registrations[0].totalRegistrations,
        upcomingEvents: upcoming[0].upcomingEvents,
        pastEvents: past[0].pastEvents
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Event Attendees (Admin)
router.get('/events/:eventId/attendees', verifyAdminToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const adminId = req.adminId;
    const connection = await pool.getConnection();

    // Verify event belongs to admin
    const [event] = await connection.query(
      'SELECT id FROM events WHERE id = ? AND admin_id = ?',
      [eventId, adminId]
    );

    if (event.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get attendees
    const [attendees] = await connection.query(
      `SELECT u.id, u.name, u.email, u.phone, r.registered_at
       FROM registrations r
       INNER JOIN users u ON r.user_id = u.id
       WHERE r.event_id = ?
       ORDER BY r.registered_at DESC`,
      [eventId]
    );

    connection.release();

    res.json({ attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Download Event Attendance CSV
router.get('/events/:eventId/download-csv', verifyAdminToken, async (req, res) => {
  try {
    const { eventId } = req.params;
    const adminId = req.adminId;
    const connection = await pool.getConnection();

    // Verify event belongs to admin
    const [event] = await connection.query(
      'SELECT event_name FROM events WHERE id = ? AND admin_id = ?',
      [eventId, adminId]
    );

    if (event.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get attendees
    const [attendees] = await connection.query(
      `SELECT u.name, u.email, u.phone, r.registered_at
       FROM registrations r
       INNER JOIN users u ON r.user_id = u.id
       WHERE r.event_id = ?
       ORDER BY r.registered_at DESC`,
      [eventId]
    );

    connection.release();

    // Create CSV
    let csv = 'Name,Email,Phone,Registered At\n';
    attendees.forEach(attendee => {
      csv += `"${attendee.name}","${attendee.email}","${attendee.phone}","${attendee.registered_at}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="event-${eventId}-attendees.csv"`);
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
