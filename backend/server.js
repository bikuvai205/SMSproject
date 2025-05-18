require('dotenv').config();              // Load .env FIRST

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const basicAuth = require('express-basic-auth');
const path      = require('path');

const Registration = require('./models/Registration');

const app  = express();
const PORT = 5000;

// ──────────────────────────── MIDDLEWARE ────────────────────────────
app.use(cors());
app.use(express.json());

// (Optional) serve CSS / JS from backend/public
app.use(express.static(path.join(__dirname, 'public')));

// ─────────── BASIC AUTH CONFIG (re‑used for data route) ─────────────
const adminAuth = basicAuth({
  users: {
    [process.env.ADMIN_USERNAME || 'admin']:
      process.env.ADMIN_PASSWORD || 'password123'
  },
  challenge: true,
  unauthorizedResponse: () => 'Unauthorized'
});

// ──────────────────────────── ROOT ROUTE ────────────────────────────
app.get('/', (_req, res) =>
  res.send('💡 SMS backend is running. Try POST /api/register or visit /admin/login')
);

// ───────────────────── PUBLIC REGISTRATION ROUTE ────────────────────
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


// ──────────────────────── ADMIN HTML PAGES  ─────────────────────────
// Login container
app.get('/admin/login', (_req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'admin-login.html'))
);

// Dashboard shell (requires front‑end JS to fetch data)
app.get('/admin/registrations', (_req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'))
);

// ───────────────────── PROTECTED DATA ENDPOINT ──────────────────────
app.get('/admin/data', adminAuth, async (_req, res) => {
  try {
    const regs = await Registration.find();
    res.json(regs);
  } catch (err) {
    console.error('❌ Error fetching registrations:', err);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});


// ───────────── MONGODB CONNECTION & SERVER STARTUP ──────────────────
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI not found in .env');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
