// posts.js - Routes for post operations

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { auth, authorize } = require('../middleware/auth');
const { validatePost, handleValidationErrors } = require('../utils/validationRules');

// Public routes
router.get('/', postController.getAllPosts);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPost);

// Protected routes
router.post('/', auth, validatePost(), handleValidationErrors, postController.createPost);
router.put('/:id', auth, validatePost(), handleValidationErrors, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/:id/comments', auth, postController.addComment);

module.exports = router;
