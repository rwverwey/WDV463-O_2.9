const express = require('express');
const mongoose = require('mongoose');
const MigraineEntry = require('../models/MigraineEntry');

const router = express.Router();

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await MigraineEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Get single entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await MigraineEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving entry' });
  }
});

// Create new entry
router.post('/', async (req, res) => {
  try {
    const newEntry = new MigraineEntry(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid entry data' });
  }
});

// Update entry
router.put('/:id', async (req, res) => {
  try {
    const updated = await MigraineEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete entry
router.delete('/:id', async (req, res) => {
  try {
    await MigraineEntry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
