// backend/routes/loginRoute.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ActiveUser = require('../models/ActiveUser');

// Function to connect to an institute-specific database
const getInstituteDbConnection = async (instituteId) => {
  const dbName = `institute_${instituteId}`;
  const dbUri = `${process.env.MONGO_URI.split('/').slice(0, -1).join('/')}/${dbName}`;
  const connection = mongoose.createConnection(dbUri);
  await connection.asPromise();
  console.log(`Connected to institute database: ${dbName}`);
  return connection;
};

// Define a User model for institute-specific databases
const createUserModel = (dbConnection) => {
  const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], required: true },
    fullName: { type: String, required: true },
  });
  return dbConnection.model('User', userSchema);
};

router.post('/api/login', async (req, res) => {
  const { instituteId, userId, password } = req.body;

  try {
    // Step 1: Verify instituteId and get Super Admin credentials from ActiveUser
    const activeUser = await ActiveUser.findOne({ instituteId }).lean();
    if (!activeUser) {
      return res.status(404).json({ error: 'Institute not found' });
    }

    // Step 2: Check if userId matches Super Admin
    if (activeUser.superAdminId === userId && activeUser.password === password) {
      return res.json({ role: 'superAdmin', userId: activeUser.superAdminId, instituteId });
    }

    // Step 3: Connect to the institute-specific database
    const instituteDb = await getInstituteDbConnection(instituteId);
    const User = createUserModel(instituteDb);

    // Step 4: Check Teacher or Student credentials
    const user = await User.findOne({ userId }).lean();
    if (!user) {
      instituteDb.close();
      return res.status(401).json({ error: 'Invalid user ID or password' });
    }

    if (user.password !== password) {
      instituteDb.close();
      return res.status(401).json({ error: 'Invalid user ID or password' });
    }

    // Step 5: Return user role and details
    const response = { role: user.role, userId: user.userId, instituteId };
    instituteDb.close();
    res.json(response);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;