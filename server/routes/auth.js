// auth.js - Routes for authentication

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validateUser, validateLogin, handleValidationErrors } = require('../utils/validationRules');

// Public routes
router.post('/register', validateUser(), handleValidationErrors, authController.register);
router.post('/login', validateLogin(), handleValidationErrors, authController.login);

// Protected routes
router.get('/me', auth, authController.getCurrentUser);
router.put('/profile', auth, authController.updateProfile);

module.exports = router;
