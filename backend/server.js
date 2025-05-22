
require('dotenv').config();              // Load .env FIRST

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const basicAuth = require('express-basic-auth');
const path      = require('path');
const verifyRoute = require('./routes/verifyRoute');
const Registration = require('./models/Registration');
const ActiveUser = require('./models/ActiveUser');



const app  = express();
const PORT = process.env.PORT || 5000;

/* ──────────────────────────── MIDDLEWARE ─────────────────────────── */
app.use(cors());
app.use(express.json());

/* (optional) serve static assets (css / js / images) */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', verifyRoute);
const adminAuth = basicAuth({
  users : {
    [process.env.ADMIN_USERNAME || 'admin']:
      process.env.ADMIN_PASSWORD || 'password123'
  },
  unauthorizedResponse: () => 'Unauthorized'   // still returns 401
  /* challenge:false  <-- default, so omit */
});

/* ─────────────────────────── ROOT ROUTE ──────────────────────────── */
app.get('/', (_req, res) =>
  res.send(' SMS backend running. Try POST /api/register or visit /admin/login')
);

/* ───────────────── PUBLIC REGISTRATION ROUTE ─────────────────────── */
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

/* ──────────────────────── ADMIN HTML PAGES  ──────────────────────── */
app.get('/admin/login', (_req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'admin-login.html'))
);

app.get('/admin/registrations', (_req, res) =>
  res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'))
);
/* ───────────────────── DELETE REGISTRATION ───────────────────── */
app.delete('/admin/delete/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Record not found' });
    }
    console.log(`🗑️ Deleted registration with ID: ${id}`);
    res.json({ message: 'Registration deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting registration:', err);
    res.status(500).json({ message: 'Server error during deletion' });
  }
});
/* ──────────────────────── ADMIN AUTHENTICATION ───────────────────── */
app.post('/admin/verify-password', (req, res) => {
  const input = req.body.password;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (input === adminPass) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});



/* ───────────────────── PROTECTED DATA ENDPOINT ───────────────────── */
app.get('/admin/data', async (req, res) => {
  try {
    // Step 1: Get all registrations
    const allRegistrations = await Registration.find().lean();

    // Step 2: Get list of all verified registration IDs
    const activeUsers = await ActiveUser.find({}, 'linkedRegistrationId'); // only fetch IDs
    const verifiedIds = new Set(activeUsers.map(user => user.linkedRegistrationId.toString()));

    // Step 3: Filter out registrations that are already verified
    const unverified = allRegistrations.filter(reg => !verifiedIds.has(reg._id.toString()));

    res.json(unverified); // return only unverified registrations
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).json({ error: 'Error fetching registrations' });
  }
});

/* ──────────────────────── VERIFIED USERS LIST ───────────────────── */

app.get('/admin/verified-users', async (req, res) => {
  try {
    const activeUsers = await ActiveUser.find().lean();
    const ids = activeUsers.map(user => user.linkedRegistrationId);
    const registrations = await Registration.find({ _id: { $in: ids } }).lean();

    const combined = activeUsers.map(user => {
      const reg = registrations.find(r => r._id.toString() === user.linkedRegistrationId.toString());
      if (!reg) {
        return { ...user, missing: true, message: 'Original registration not found' };
      }
      return { ...reg, credentials: { instituteId: user.instituteId, superAdminId: user.superAdminId, password: user.password } };
    });

    res.json(combined);
  } catch (err) {
    console.error('Error fetching verified users:', err);
    res.status(500).json({ error: 'Error fetching verified users' });
  }
});

















/* ───────────── MONGODB CONNECTION & SERVER STARTUP ───────────────── */
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