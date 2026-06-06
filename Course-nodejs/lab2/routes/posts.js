const express = require('express');
const { body, validationResult } = require('express-validator');
const postsController = require('../controllers/postsController');

const router = express.Router();

const validatePost = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', errors: errors.array() });
    }
    next();
  },
];

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPostById);
router.post('/', validatePost, postsController.createPost);
router.put('/:id', validatePost, postsController.updatePostId);
router.delete('/:id', postsController.deletePostId);

module.exports = router;
