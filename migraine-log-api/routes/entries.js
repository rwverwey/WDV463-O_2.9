const express = require('express');
const mongoose = require('mongoose');
const MigraineEntry = require('../models/MigraineEntry');

const router = express.Router();

// Get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await MigraineEntry.find().sort({ createdAt: -1 });
    return res.json(entries);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch entries' });
  }
});

// Get single entry
router.get('/:id', async (req, res) => {
  try {
    const entry = await MigraineEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Entry not found' });
    return res.json(entry);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve entry' });
  }
});

// Create new entry
router.post('/', async (req, res) => {
  try {
    const { date, severity } = req.body;

    // Quick sanity check
    if (!date || !severity) {
      return res.status(400).json({ error: 'Date and severity are required' });
    }

    const newEntry = new MigraineEntry(req.body);
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

// Update entry
router.put('/:id', async (req, res) => {
  try {
    const updatedEntry = await MigraineEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEntry) return res.status(404).json({ error: 'Entry not found' });
    return res.json(updatedEntry);
  } catch (err) {
    return res.status(400).json({ error: 'Failed to update entry', details: err.message });
  }
});

// Delete entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await MigraineEntry.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ error: 'Entry not found' });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete entry' });
  }
});

module.exports = router;
