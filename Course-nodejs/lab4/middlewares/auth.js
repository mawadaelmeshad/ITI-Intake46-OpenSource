const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

/**
 * AUTH Middleware
 * Verifies JWT token and attaches user data to req.user
 * Must be called BEFORE protected route handlers
 */
async function auth(req, res, next) {
  try {
    // 1. Get token from header (format: "Bearer <token>")
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. Check if token exists
    if (!token) {
      return next(new ApiError(401, 'You are not logged in. Please log in to get access.'));
    }

    // 3. Promisify jwt.verify to use await
    const verify = promisify(jwt.verify);

    // 4. Verify token signature and expiration
    const decoded = await verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // 5. Check if user still exists in database (user might be deleted)
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ApiError(401, 'User no longer exists.'));
    }

    // 6. Attach user data to request for next middleware/handler
    req.user = currentUser;
    next();
  } catch (err) {
    // Handle JWT-specific errors
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
