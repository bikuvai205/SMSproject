require('dotenv').config();              // Load .env FIRST

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const basicAuth = require('express-basic-auth');

const Registration = require('./models/Registration'); // model import

const app = express();
const PORT = 5000;

// ──────────────────────────── MIDDLEWARE ────────────────────────────
app.use(cors());
app.use(express.json());

// ──────────────────────────── BASIC AUTH FOR ADMIN ────────────────────
app.use('/admin', basicAuth({
  users: { 
    [process.env.ADMIN_USERNAME || 'admin']: process.env.ADMIN_PASSWORD || 'password123' 
  },
  challenge: true,
  unauthorizedResponse: req => 'Unauthorized'
}));

// ──────────────────────────── ROOT ROUTE ─────────────────────────────
app.get('/', (req, res) => {
  res.send('💡 SMS backend is running. Try POST /api/register or GET /admin/registrations (with admin login).');
});

// ──────────────────────────── ROUTES ────────────────────────────────
// Registration route (public)
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

// Admin route to fetch all registrations (protected)
app.get('/admin/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    console.error('❌ Error fetching registrations:', err);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

// ──────────────────── MONGODB CONNECTION & SERVER START ─────────────
const uri = process.env.MONGO_URI;       // env variable is used

if (!uri) {
  console.error('MONGO_URI not found in .env');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
