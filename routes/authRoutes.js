const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController.js');

// POST /api/auth/login
router.post('/login', loginUser);

// POST /api/auth/signup
router.post('/register', registerUser);

module.exports = router;
