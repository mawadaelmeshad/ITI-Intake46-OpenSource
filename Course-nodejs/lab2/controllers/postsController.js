const fs = require('fs').promises;
const path = require('path');
const ApiError = require('../utils/apiError');

const postsFile = path.join(__dirname, '..', 'posts.json');

async function readPosts() {
  const raw = await fs.readFile(postsFile, 'utf8');
  return JSON.parse(raw);
}

async function writePosts(posts) {
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2));
}

async function getPosts(req, res, next) {
  try {
    const posts = await readPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const posts = await readPosts();
    const id = Number(req.params.id);
    const post = posts.find((item) => item.id === id);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const posts = await readPosts();
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      throw new ApiError(400, 'title, content, and author are required');
    }
    const newId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost = { id: newId, title, content, author };
    posts.push(newPost);
    await writePosts(posts);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
}

async function updatePostId(req, res, next) {
  try {
    const posts = await readPosts();
    const id = Number(req.params.id);
    const index = posts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new ApiError(404, 'Post not found');
    }
    const { title, content, author } = req.body;
    const updatedPost = {
      ...posts[index],
      title: title ?? posts[index].title,
      content: content ?? posts[index].content,
      author: author ?? posts[index].author,
    };
    posts[index] = updatedPost;
    await writePosts(posts);
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
}

async function deletePostId(req, res, next) {
  try {
    const posts = await readPosts();
    const id = Number(req.params.id);
    const index = posts.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new ApiError(404, 'Post not found');
    }
    const deletedPost = posts.splice(index, 1)[0];
    await writePosts(posts);
    res.json({ message: 'Post deleted', post: deletedPost });
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
