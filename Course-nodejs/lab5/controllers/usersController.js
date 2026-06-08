const User = require('../models/userModel');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const emailService = require('../services/emailService');

const signToken = promisify(jwt.sign);

async function signup(req, res, next) {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    if (!password || !passwordConfirm) {
      return next(new ApiError(400, 'Please provide password and passwordConfirm'));
    }

    if (password !== passwordConfirm) {
      return next(new ApiError(400, 'Passwords do not match'));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, 'Email already in use'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const token = await signToken(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    emailService
      .sendEmail('welcome', { name: newUser.name }, newUser.email, 'Welcome to our platform')
      .catch((emailErr) => console.error('Welcome email failed:', emailErr.message));

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

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, 'Please provide email and password'));
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    const token = await signToken(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

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

module.exports = { signup, login, getAllUsers };
