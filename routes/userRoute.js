const express = require('express');
const router = express.Router();
const passport = require('passport');
const { user } = require('../models');
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require('../controllers/userController');
const { authenticate } = require('../passport/passport.config');

router.post('/register', registerUser);
// router.post('/login', loginUser);
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json({
    message: 'Logged in successfully',
  });
});

// include the route controller in the router with lesser code.  most will be done by passport
router.get('/', getAllUsers);

module.exports = router;
