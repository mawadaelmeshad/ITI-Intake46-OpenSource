const express = require('express');
const postsController = require('../controllers/postsController');
const validate = require('../middlewares/validate');
const { createPostSchema, updatePostSchema } = require('../validators/postSchema');
const auth = require('../middlewares/auth');

const router = express.Router();

// Protect all routes with authentication middleware
router.use(auth);

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPostById);
router.post('/', validate(createPostSchema), postsController.createPost);
router.put('/:id', validate(updatePostSchema), postsController.updatePostId);
router.delete('/:id', postsController.deletePostId);

module.exports = router;
