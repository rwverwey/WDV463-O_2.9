import express from 'express';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../db/mongoClient.js';

const router = express.Router();

// Get all entries
router.get('/', async (req, res) => {
  const db = await connectToDatabase();
  const entries = await db.collection('entries').find().sort({ createdAt: -1 }).toArray();
  res.json(entries);
});

// Get single entry
router.get('/:id', async (req, res) => {
  const db = await connectToDatabase();
  const entry = await db.collection('entries').findOne({ _id: new ObjectId(req.params.id) });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  res.json(entry);
});

// Create new entry
router.post('/', async (req, res) => {
  const db = await connectToDatabase();
  const doc = { ...req.body, createdAt: new Date() };
  const result = await db.collection('entries').insertOne(doc);
  res.status(201).json({ _id: result.insertedId, ...doc });
});

// Update entry
router.put('/:id', async (req, res) => {
  const db = await connectToDatabase();
  const result = await db.collection('entries').findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body },
    { returnDocument: 'after' }
  );
  res.json(result.value);
});

// Delete entry
router.delete('/:id', async (req, res) => {
  const db = await connectToDatabase();
  await db.collection('entries').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ success: true });
});

export default router;
