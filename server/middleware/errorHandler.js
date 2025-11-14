// errorHandler.js - Error handling middleware

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Validation errors from express-validator
  if (err.array) {
    return res.status(400).json({
      success: false,
      errors: err.array(),
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      errors: messages,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token has expired',
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
