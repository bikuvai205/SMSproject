const ActiveUser = require('../models/ActiveUser.js');
const Registration = require('../models/Registration.js');
const mongoose = require('mongoose');

async function generateId(req, res) {
  try {
    const regId = req.params.id;

    // Validate regId as a MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(regId)) {
      console.error('Invalid ObjectId:', regId);
      return res.status(400).json({ error: 'Invalid registration ID' });
    }

    // Fetch the registration record
    const registration = await Registration.findById(regId);
    if (!registration) {
      console.warn(`No registration found with ID: ${regId}`);
      return res.status(404).json({ error: 'Registration not found' });
    }

    // Generate credentials
    const instituteId = Math.floor(100000 + Math.random() * 900000).toString();
    const superAdminId = Math.floor(100000 + Math.random() * 900000).toString();
    const password = 'superadmin123';
    console.log('Generated credentials:', { instituteId, superAdminId, password });

    // Check if already verified
    const alreadyExists = await ActiveUser.findOne({ linkedRegistrationId: regId });
    if (alreadyExists) {
      console.log('Already verified, skipping:', regId);
      return res.status(400).json({ error: 'Already verified.' });
    }

    // Save to ActiveUsers collection with registration data
    const user = new ActiveUser({
      instituteId,
      superAdminId,
      password,
      linkedRegistrationId: regId,
      fullName: registration.fullName,
      role: registration.role,
      address: registration.address,
      email: registration.email,
      phone: registration.phone,
      citizenDoc: registration.citizenDoc,
      institutionName: registration.institutionName,
      panVat: registration.panVat,
      institutionAddress: registration.institutionAddress,
      institutionEmail: registration.institutionEmail,
      headName: registration.headName,
      institutionContact: registration.institutionContact,
      institutionType: registration.institutionType,
      additionalInfo: registration.additionalInfo
    });
    const savedUser = await user.save();
    console.log('User saved to ActiveUser:', savedUser._id);

    // Delete the registration from the Registration collection
    const deletedReg = await Registration.findByIdAndDelete(regId);
    if (!deletedReg) {
      console.warn(`No registration found to delete with ID: ${regId}`);
    } else {
      console.log(`🗑️ Deleted registration with ID: ${regId}`);
    }
    res.json({ instituteId, superAdminId, password });
  } catch (err) {
    console.error('Verification Error:', err);
    res.status(500).json({ error: 'Server error during verification or deletion', details: err.message });
  }
}

module.exports = { generateId };