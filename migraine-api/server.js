import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import entries from './routes/entries.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/entries', entries);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
