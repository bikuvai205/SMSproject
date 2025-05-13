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

// API route to handle form submission
app.post('/api/register', (req, res) => {
  const { fullname, email, phone } = req.body;

  // Check if any field is empty
  if (!fullname || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Log the form data received from the frontend
  console.log('✅ Received form data:', req.body);

  // Respond with success message
  res.status(200).json({ message: 'Form submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
