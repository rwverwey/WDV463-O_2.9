const express = require('express');
const mongoose = require('mongoose');
const MigraineEntry = require('../models/MigraineEntry');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes below this line
router.use(authenticate);

// Get all entries for the authenticated user
router.get('/', async (req, res) => {
  try {
    const entries = await MigraineEntry.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json(entries);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Get a single entry if it belongs to the authenticated user
router.get('/:id', async (req, res) => {
  try {
    const entry = await MigraineEntry.findOne({ _id: req.params.id, userId: req.user.id });
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    return res.json(entry);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve entry' });
  }
});

// Create a new entry and associate it with the authenticated user
router.post('/', async (req, res) => {
  try {
    const { date, severity } = req.body;

    if (!date || !severity) {
      return res.status(400).json({ error: 'Date and severity are required' });
    }

    const newEntry = new MigraineEntry({ ...req.body, userId: req.user.id });
    const savedEntry = await newEntry.save();
    return res.status(201).json(savedEntry);
  } catch (err) {
    console.error('Create Error:', err.message, err.errors || '');
    return res.status(400).json({
      error: 'Invalid entry data',
      details: err.errors || err.message
    });
  }
});

// Update an entry if it belongs to the authenticated user
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await MigraineEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEntry) return res.status(404).json({ error: 'Entry not found' });
    return res.json(updatedEntry);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to update entry', details: err.message });
  }
});

// Delete an entry if it belongs to the authenticated user
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await MigraineEntry.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedEntry) return res.status(404).json({ error: 'Entry not found' });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;
