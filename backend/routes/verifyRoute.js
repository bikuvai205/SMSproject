const express = require('express');
const router = express.Router();
const ActiveUser = require('../models/ActiveUser');
const { generateId } = require('../controller/UserController');


const usedInstituteIds = new Set(); // Store generated IDs temporarily

function generateUnique6DigitNumber(existingSet) {
  let num;
  do {
    num = Math.floor(100000 + Math.random() * 900000).toString();
  } while (existingSet.has(num));
  existingSet.add(num);
  return num;
}


router.get('/verify/:id', generateId )

module.exports = router;
