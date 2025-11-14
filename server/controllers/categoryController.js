// categoryController.js - Controller for category operations

const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @route   GET /api/categories
// @desc    Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort('name');

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/categories/:id
// @desc    Get a single category
exports.getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      $or: [{ _id: id }, { slug: id }],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/categories
// @desc    Create a new category (Admin only)
exports.createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/categories/:id
// @desc    Update a category (Admin only)
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/categories/:id
// @desc    Delete a category (Admin only)
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    if (category.postsCount > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete category with posts',
      });
    }

    await Category.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
