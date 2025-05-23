require('dotenv').config(); // Load .env FIRST

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const path = require('path');
const nodemailer = require('nodemailer'); // Added for email sending
const verifyRoute = require('./routes/verifyRoute');
const Registration = require('./models/Registration');
const ActiveUser = require('./models/ActiveUser');

const app = express();
const PORT = process.env.PORT || 5000;

/* ──────────────────────────── MIDDLEWARE ──────────────────────────── */
app.use(cors());
app.use(express.json());

/* (optional) serve static assets (css / js / images) */
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', verifyRoute);
const adminAuth = basicAuth({
  users: {
    [process.env.ADMIN_USERNAME || 'admin']: process.env.ADMIN_PASSWORD || 'password123',
  },
  unauthorizedResponse: () => 'Unauthorized', // still returns 401
});

/* ──────────────────────────── EMAIL SETUP ──────────────────────────── */
// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services (e.g., SendGrid, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email address (from .env)
    pass: process.env.EMAIL_PASS, // Your app-specific password (from .env)
  },
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
  console.log('Attempting to delete registration with ID:', id);
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

/* ───────────────────── DELETE ACTIVE USER (CANCEL SUBSCRIPTION) ───────────────────── */
app.delete('/admin/cancel-subscription/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  console.log('Attempting to cancel subscription with ID:', id);
  try {
    const deleted = await ActiveUser.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Active user not found' });
    }
    console.log(`🗑️ Canceled subscription for active user with ID: ${id}`);
    res.json({ message: 'Subscription canceled successfully' });
  } catch (err) {
    console.error('❌ Error canceling subscription:', err);
    res.status(500).json({ message: 'Server error during cancellation' });
  }
});

/* ──────────────────────── ADMIN AUTHENTICATION ───────────────────── */
app.post('/admin/verify-password', (req, res) => {
  const input = req.body.password;
  const adminPass = process.env.ADMIN_PASSWORD;
  console.log('Verifying password:', input);

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
    const activeUsers = await ActiveUser.find({}, 'linkedRegistrationId');
    const verifiedIds = new Set(activeUsers.map(user => user.linkedRegistrationId.toString()));

    // Step 3: Filter out registrations that are already verified
    const unverified = allRegistrations.filter(reg => !verifiedIds.has(reg._id.toString()));

    res.json(unverified);
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).json({ error: 'Error fetching registrations' });
  }
});

/* ──────────────────────── VERIFIED USERS LIST ───────────────────── */

app.get('/admin/verified-users', async (req, res) => {
  try {
    const activeUsers = await ActiveUser.find().lean();
    const combined = activeUsers.map(user => ({
      ...user,
      credentials: {
        instituteId: user.instituteId,
        superAdminId: user.superAdminId,
        password: user.password,
      },
      credentialsSent: user.credentialsSent, // Add this line
    }));
    res.json(combined);
  } catch (err) {
    console.error('Error fetching verified users:', err);
    res.status(500).json({ error: 'Error fetching verified users' });
  }
});

/* ───────────────────── SEND CREDENTIALS VIA EMAIL ───────────────────── */
/* ───────────────────── SEND CREDENTIALS VIA EMAIL ───────────────────── */
app.post('/admin/send-credentials', adminAuth, async (req, res) => {
  const { id, email } = req.body;
  console.log('Attempting to send credentials - ID:', id, 'Email:', email);

  try {
    // Fetch active user data from MongoDB
    const user = await ActiveUser.findById(id).lean();
    if (!user) {
      console.log('User not found for ID:', id);
      return res.status(404).json({ error: 'Active user not found' });
    }

    // Check if credentials were already sent
    if (user.credentialsSent) {
      console.log('Credentials already sent for user ID:', id);
      return res.status(400).json({ error: 'Credentials have already been sent' });
    }

    const { instituteId, superAdminId, password } = user;
    if (!instituteId || !superAdminId || !password) {
      console.log('Missing credentials for user ID:', id);
      return res.status(400).json({ error: 'Credentials missing for this user' });
    }

    // Fetch the full name from the linked Registration
    const registration = await Registration.findById(user.linkedRegistrationId).lean();
    console.log('Linked Registration ID:', user.linkedRegistrationId, 'Found Registration:', registration);
    const fullName = registration ? registration.fullName : 'User'; // Fallback to 'User' if not found

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Login Credentials',
      text: `Hi ${fullName},\n\nYour login credentials are:\nInstitute ID: ${instituteId}\nSuper Admin ID: ${superAdminId}\nPassword: ${password}\n\nRegards,\nAdmin Team`,
    };

    console.log('Sending email with options:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log(`📧 Credentials sent to ${email} for user ID: ${id}`);

    // Mark credentials as sent
    await ActiveUser.findByIdAndUpdate(id, { credentialsSent: true });

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Email sending error:', err.message, 'Stack:', err.stack);
    res.status(500).json({ error: 'Failed to send email' });
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