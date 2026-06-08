const express = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();

router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.get('/', auth, restrictTo('admin'), usersController.getAllUsers);

module.exports = router;
