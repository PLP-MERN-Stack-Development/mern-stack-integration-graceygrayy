// postController.js - Controller for post operations

const Post = require('../models/Post');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @route   GET /api/posts
// @desc    Get all posts with pagination, filtering, and search
exports.getAllPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search, sort = '-createdAt' } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = { isPublished: true };
    if (category) {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('author', 'name email avatar')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/posts/:id
// @desc    Get a single post by ID or slug
exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({
      $or: [{ _id: id }, { slug: id }],
    })
      .populate('author', 'name email avatar bio')
      .populate('category', 'name slug')
      .populate('comments.user', 'name email avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Increment view count
    post.viewCount += 1;
    await post.save();

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/posts
// @desc    Create a new post
exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, content, excerpt, category, tags, featuredImage } = req.body;

    // Verify category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        error: 'Category not found',
      });
    }

    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      tags: tags || [],
      author: req.user.userId,
      featuredImage: featuredImage || 'default-post.jpg',
    });

    // Increment category posts count
    categoryExists.postsCount += 1;
    await categoryExists.save();

    const populatedPost = await post.populate('author', 'name email avatar').populate('category', 'name slug');

    res.status(201).json({
      success: true,
      data: populatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/posts/:id
// @desc    Update a post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, category, tags, featuredImage, isPublished } = req.body;

    let post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Check authorization
    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this post',
      });
    }

    // Update category count if category changed
    if (category && category !== post.category.toString()) {
      const oldCategory = await Category.findById(post.category);
      const newCategory = await Category.findById(category);

      if (oldCategory) {
        oldCategory.postsCount = Math.max(0, oldCategory.postsCount - 1);
        await oldCategory.save();
      }

      if (newCategory) {
        newCategory.postsCount += 1;
        await newCategory.save();
      }
    }

    post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        category,
        tags,
        featuredImage,
        isPublished,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('author', 'name email avatar')
      .populate('category', 'name slug');

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/posts/:id
// @desc    Delete a post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Check authorization
    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this post',
      });
    }

    // Decrement category posts count
    const category = await Category.findById(post.category);
    if (category) {
      category.postsCount = Math.max(0, category.postsCount - 1);
      await category.save();
    }

    await Post.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/posts/:id/comments
// @desc    Add a comment to a post
exports.addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Comment content is required',
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    await post.addComment(req.user.userId, content);

    const updatedPost = await post
      .populate('comments.user', 'name email avatar')
      .execPopulate();

    res.status(201).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/posts/search
// @desc    Search posts
exports.searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    const posts = await Post.find({
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
      ],
    })
      .populate('author', 'name email avatar')
      .populate('category', 'name slug')
      .limit(20);

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};
