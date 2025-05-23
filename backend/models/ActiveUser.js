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
    ref: 'Registration',
    required: true,
  },
  fullName: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  citizenDoc: { type: String, required: true },
  institutionName: { type: String, required: true },
  panVat: { type: String, required: true },
  institutionAddress: { type: String, required: true },
  institutionEmail: { type: String, required: true },
  headName: { type: String, required: true },
  institutionContact: { type: String, required: true },
  institutionType: { type: String, required: true },
  additionalInfo: { type: String },
  credentialsSent: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('ActiveUser', activeUserSchema);