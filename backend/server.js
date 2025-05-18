// backend/server.js
require('dotenv').config();              // 1️⃣  Load .env FIRST

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Registration = require('./models/Registration'); // adjust path if models folder differs

const app = express();
const PORT = 5000;

// ──────────────────────────── MIDDLEWARE ────────────────────────────
app.use(cors());
app.use(express.json());

// ──────────────────────────── ROUTES ────────────────────────────────
app.post('/api/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    console.log('✅ Data saved:', registration.toJSON());
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error('❌ Error saving to DB:', err);
    res.status(500).json({ message: 'Server error while saving data' });
  }
});

// ──────────────────── MONGODB CONNECTION & SERVER START ─────────────
const uri = process.env.MONGO_URI;       // 2️⃣  Uses your env variable

if (!uri) {
  console.error('❌ MONGO_URI not found in .env');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
