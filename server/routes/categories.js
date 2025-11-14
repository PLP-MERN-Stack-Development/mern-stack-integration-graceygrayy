// categories.js - Routes for category operations

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { auth, authorize } = require('../middleware/auth');
const { validateCategory, handleValidationErrors } = require('../utils/validationRules');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);

// Admin only routes
router.post('/', auth, authorize(['admin']), validateCategory(), handleValidationErrors, categoryController.createCategory);
router.put('/:id', auth, authorize(['admin']), validateCategory(), handleValidationErrors, categoryController.updateCategory);
router.delete('/:id', auth, authorize(['admin']), categoryController.deleteCategory);

module.exports = router;
