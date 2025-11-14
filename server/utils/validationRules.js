// validationRules.js - Validation rules for express-validator

const { body, validationResult } = require('express-validator');

const validatePost = () => {
  return [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 100 })
      .withMessage('Title cannot be more than 100 characters'),
    body('content')
      .notEmpty()
      .withMessage('Content is required'),
    body('excerpt')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Excerpt cannot be more than 200 characters'),
    body('category')
      .notEmpty()
      .withMessage('Category is required'),
    body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array'),
  ];
};

const validateCategory = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Category name is required')
      .isLength({ max: 50 })
      .withMessage('Category name cannot be more than 50 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage('Description cannot be more than 200 characters'),
  ];
};

const validateUser = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be valid')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ];
};

const validateLogin = () => {
  return [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Email must be valid')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ];
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  validatePost,
  validateCategory,
  validateUser,
  validateLogin,
  handleValidationErrors,
};
