const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all items (example route)
router.get('/', (req, res) => {
  db.query('SELECT * FROM sample_table', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Add a new item (example route)
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO sample_table (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(201).json({ message: 'Item added', id: results.insertId });
    }
  });
});

module.exports = router;
