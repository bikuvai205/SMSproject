const mongoose = require('mongoose');

const activeUserSchema = new mongoose.Schema({
  instituteId: {
    type: String,
    required: true,
    unique: true,
  },
  superAdminId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: 'superadmin123',
  },
  linkedRegistrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration', // if you named your registration model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ActiveUser', activeUserSchema);
