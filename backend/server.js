require('dotenv').config(); // Load .env FIRST

const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Registration = require('./models/Registration');

const PORT = 5000;

// ─────────────────────── TRUST PROXY (IMPORTANT) ───────────────────────
app.set('trust proxy', 1); // 🔥 Add this before session middleware

// ─────────────────────── EXPRESS-SESSION SETUP ───────────────────────
app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true,
     sameSite: 'lax',
    secure: false // Set to true if using HTTPS
  }
}));

// ──────────────────────────── MIDDLEWARE ─────────────────────────────
app.use(cors({
  origin: 'http://localhost:3000', // adjust to your frontend
  credentials: true               // ⬅ allow cookies/session headers
}));

app.use(express.json());

// (Optional) serve CSS / JS from backend/public
app.use(express.static(path.join(__dirname, 'public')));

// ───────────── SESSION-BASED AUTH MIDDLEWARE FOR PROTECTED ROUTES ─────────────
const requireAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};

// ───────────────────── SESSION-BASED ADMIN LOGIN ─────────────────────
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === validUsername && password === validPassword) {
    req.session.isAdmin = true; // ✅ Set session
    console.log('✅ Session created:', req.session); // 👈 Log session
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// ──────────────────────────── ROOT ROUTE ─────────────────────────────
app.get('/', (_req, res) =>
  res.send('💡 SMS backend is running. Try POST /api/register or visit /admin/login')
);

// ───────────────────── PUBLIC REGISTRATION ROUTE ─────────────────────
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

// ──────────────────────── ADMIN HTML PAGES  ──────────────────────────
app.get('/admin/login', (_req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'admin-login.html'))
);

app.get('/admin/registrations', requireAdmin, (_req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'))
);

// ───────────────────── PROTECTED DATA ENDPOINT ───────────────────────
app.get('/admin/data', requireAdmin, async (_req, res) => {
  try {
    const regs = await Registration.find();
    res.json(regs);
  } catch (err) {
    console.error('❌ Error fetching registrations:', err);
    res.status(500).json({ message: 'Error fetching registrations' });
  }
});

app.get('/admin/session', (req, res) => {
  res.json({
    session: req.session,
    isAdmin: req.session.isAdmin || false
  });
});

// ───────────────────────────── LOGOUT ────────────────────────────────
app.post('/admin/logout', (req, res) => {
  console.log('🧾 Session before destroying:', req.session);

  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }

    // 👇 Clear the session cookie in the browser
    res.clearCookie('connect.sid', {
      path: '/', // Must match the path used to set the cookie
      httpOnly: true,
    });

    console.log('🧹 Session destroyed and cookie cleared');
    res.json({ success: true });
  });
});


// ───────────── MONGODB CONNECTION & SERVER STARTUP ───────────────────
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
