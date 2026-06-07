const User = require('../models/userModel');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Promisify jwt.sign to avoid callback-based code
const signToken = promisify(jwt.sign);

/**
 * SIGNUP Controller
 * Creates a new user after validating and hashing the password
 */
async function signup(req, res, next) {
  try {
    const { name, email, password, passwordConfirm, role } = req.body;

    // 1. Validate that password and passwordConfirm are provided
    if (!password || !passwordConfirm) {
      return next(new ApiError(400, 'Please provide password and passwordConfirm'));
    }

    // 2. Validate that both passwords match
    if (password !== passwordConfirm) {
      return next(new ApiError(400, 'Passwords do not match'));
    }

    // 3. Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, 'Email already in use'));
    }

    // 4. Hash the password (10 rounds of salt)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the new user with hashed password
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user', // Default role is 'user'
    });

    // 6. Generate JWT token for the new user
    const token = await signToken(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // 7. Send success response with token
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * LOGIN Controller
 * Validates email and password, and generates JWT token
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1. Validate that email and password are provided
    if (!email || !password) {
      return next(new ApiError(400, 'Please provide email and password'));
    }

    // 2. Check if user exists and get password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    // 3. Compare provided password with hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    // 4. Generate JWT token
    const token = await signToken(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // 5. Send success response with token
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET ALL USERS Controller
 * Fetches all users (will be protected with admin-only access)
 */
async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      count: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signup,
  login,
  getAllUsers,
};
