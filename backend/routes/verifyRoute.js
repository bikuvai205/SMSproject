const express = require('express');
const router = express.Router();
const { generateId } = require('../controller/UserController');

router.get('/verify/:id', generateId )

module.exports = router;
