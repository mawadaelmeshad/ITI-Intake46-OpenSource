const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

async function auth(req, res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError(401, 'You are not logged in. Please log in to get access.'));
    }

    const verify = promisify(jwt.verify);
    const decoded = await verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ApiError(401, 'User no longer exists.'));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid token. Please log in again.'));
    }
    if (err.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Your token has expired. Please log in again.'));
    }
    next(err);
  }
}

module.exports = auth;
