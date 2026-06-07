const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', usersController.signup);

router.post('/login', usersController.login);

router.get('/', usersController.getAllUsers);

module.exports = router;
