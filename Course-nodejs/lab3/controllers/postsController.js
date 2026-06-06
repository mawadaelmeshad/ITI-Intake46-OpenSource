const ApiError = require('../utils/apiError');
const Post = require('../models/postModel');

async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'name email');
    if (!post) return next(new ApiError(404, 'Post not found'));
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const { title, content, userId } = req.body;
    const newPost = await Post.create({ title, content, userId });
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

async function updatePostId(req, res, next) {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return next(new ApiError(404, 'Post not found'));
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deletePostId(req, res, next) {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ApiError(404, 'Post not found'));
    res.json({ message: 'Post deleted', post: deleted });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePostId,
  deletePostId,
};
