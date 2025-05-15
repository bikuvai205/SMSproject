const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Basic test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.post('/api/register', (req, res) => {
  const {
    fullName,
    role,
    address,
    email,
    phone,
    citizenDoc,
    institutionName,
    panVat,
    institutionAddress,
    institutionEmail,
    headName,
    institutionContact,
    institutionType,
  } = req.body;

  // Validate required fields
  const requiredFields = {
    fullName,
    role,
    address,
    email,
    phone,
    citizenDoc,
    institutionName,
    panVat,
    institutionAddress,
    institutionEmail,
    headName,
    institutionContact,
    institutionType,
  };

  const emptyField = Object.entries(requiredFields).find(([key, value]) => !value);

  if (emptyField) {
    return res.status(400).json({ message: `Missing required field: ${emptyField[0]}` });
  }

  // Log full form data
  console.log('✅ Received form data:', req.body);
  res.status(200).json({ message: 'Form submitted successfully!' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
