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
  const { fullName, email, phone } = req.body;

  console.log("📦 Incoming data:", req.body);
  console.log("💡 Extracted:", { fullName, email, phone });

  if (!fullName || !email || !phone) {
    console.log("❌ Missing field(s)");
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log('✅ Received form data:', req.body);
  res.status(200).json({ message: 'Form submitted successfully!' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
