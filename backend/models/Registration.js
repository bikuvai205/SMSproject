// models/Registration.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    fullName:            { type: String, required: true },
    role:                { type: String, required: true },
    address:             { type: String, required: true },
    email:               { type: String, required: true },
    phone:               { type: String, required: true },
    citizenDoc:          { type: String, required: true },
    institutionName:     { type: String, required: true },
    panVat:              { type: String, required: true },
    institutionAddress:  { type: String, required: true },
    institutionEmail:    { type: String, required: true },
    headName:            { type: String, required: true },
    institutionContact:  { type: String, required: true },
    institutionType:     { type: String, required: true },
    additionalInfo:      { type: String }            // optional, so no `required`
  },
  { timestamps: true }   // <-- this adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Registration', registrationSchema);
