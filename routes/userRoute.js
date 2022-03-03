const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { user } = require('../models');
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);

module.exports = router;
