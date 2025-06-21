const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const entriesRouter = require('./routes/entries');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Health-check
app.get('/api', (req, res) => {
  res.json({ status: 'API is running' });
});

// API routes
app.use('/api/entries', entriesRouter);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'dist');
  app.use(express.static(clientBuildPath));

  // Fallback for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
