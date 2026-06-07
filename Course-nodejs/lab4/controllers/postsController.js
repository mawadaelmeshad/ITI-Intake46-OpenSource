const ApiError = require('../utils/apiError');
const Post = require('../models/postModel');


async function getPosts(req, res, next) {
  try {
    const posts = await Post.find().populate('userId', 'name email');
    
    // Add isOwner flag to each post
    const postsWithFlag = posts.map(post => ({
      ...post.toObject(),
      isOwner: post.userId._id.toString() === req.user._id.toString(),
    }));
    
    res.json({
      status: 'success',
      count: postsWithFlag.length,
      posts: postsWithFlag,
    });
  } catch (err) {
    next(err);
  }
}


async function getPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate('userId', 'name email');
    if (!post) return next(new ApiError(404, 'Post not found'));
    
    // Add isOwner flag
    const postWithFlag = {
      ...post.toObject(),
      isOwner: post.userId._id.toString() === req.user._id.toString(),
    };
    
    res.json({
      status: 'success',
      post: postWithFlag,
    });
  } catch (err) {
    next(err);
  }
}


async function createPost(req, res, next) {
  try {
    const { title, content } = req.body;
    
    // Automatically use the authenticated user's ID (don't accept it from request body)
    const newPost = await Post.create({
      title,
      content,
      userId: req.user._id, // Use authenticated user's ID
    });
    
    // Populate user data for response
    await newPost.populate('userId', 'name email');
    
    res.status(201).json({
      status: 'success',
      message: 'Post created successfully',
      post: {
        ...newPost.toObject(),
        isOwner: true, // Current user is always the owner of their own post
      },
    });
  } catch (err) {
    next(err);
  }
}


async function updatePostId(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return next(new ApiError(404, 'Post not found'));
    }
    
    // Check if the authenticated user is the post owner
    if (post.userId.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'You can only update your own posts'));
    }
    
    // Update only title and content (don't allow changing userId)
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    await post.save();
    
    await post.populate('userId', 'name email');
    
    res.json({
      status: 'success',
      message: 'Post updated successfully',
      post: {
        ...post.toObject(),
        isOwner: true,
      },
    });
  } catch (err) {
    next(err);
  }
}


async function deletePostId(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return next(new ApiError(404, 'Post not found'));
    }
    
    // Check if the authenticated user is the post owner
    if (post.userId.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'You can only delete your own posts'));
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({
      status: 'success',
      message: 'Post deleted successfully',
    });
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
