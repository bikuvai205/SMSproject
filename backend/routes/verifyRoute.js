const express = require('express');
const router = express.Router();

const usedInstituteIds = new Set(); // Store generated IDs temporarily

function generateUnique6DigitNumber(existingSet) {
  let num;
  do {
    num = Math.floor(100000 + Math.random() * 900000).toString();
  } while (existingSet.has(num));
  existingSet.add(num);
  return num;
}

router.get('/verify/:id', (req, res) => {
  const instituteId = generateUnique6DigitNumber(usedInstituteIds);
  const superAdminId = Math.floor(100000 + Math.random() * 900000).toString();
  const defaultPassword = 'superadmin123';

  // Change the key here to 'password' instead of 'defaultPassword'
  res.json({ instituteId, superAdminId, password: defaultPassword });
});

module.exports = router;
